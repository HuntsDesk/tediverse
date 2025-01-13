import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase-client';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data including role and relationships
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          family_members!family_members_profile_id_fkey (
            family:families!family_members_family_id_fkey (
              id,
              name
            ),
            relationship,
            is_primary
          ),
          institution_members!institution_members_profile_id_fkey (
            institution:institutions!institution_members_institution_id_fkey (
              id,
              name,
              type
            ),
            role
          )
        `)
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchUserProfile(session.user.id)
          .then(profile => {
            setProfile(profile);
            setLoading(false);
          })
          .catch(err => {
            setError(err);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        try {
          const profile = await fetchUserProfile(session.user.id);
          setProfile(profile);
        } catch (err) {
          setError(err);
        }
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email, password, userData) => {
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (signUpError) throw signUpError;

      // Create profile after successful signup
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: user.id,
            role: userData.role,
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: email
          }
        ]);

      if (profileError) throw profileError;

    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  };

  // Helper function to check if user has specific role
  const hasRole = (role) => {
    return profile?.role === role;
  };

  // Helper function to check if user has access to a child
  const hasChildAccess = async (childId) => {
    try {
      const { data, error } = await supabase
        .rpc('has_child_access', {
          child_uuid: childId,
          viewer_uuid: user?.id
        });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error checking child access:', error);
      return false;
    }
  };

  const value = {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    hasRole,
    hasChildAccess,
    isChild: () => hasRole('child'),
    isParent: () => hasRole('parent'),
    isEducator: () => hasRole('educator'),
    isProfessional: () => hasRole('professional'),
    isAdmin: () => hasRole('admin')
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
