import { supabase } from '../lib/supabase';

export async function signUpUser(email, password, name) {
  try {
    // First, create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Then create the profile in our users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id, // Use the auth user's ID
          name,
          avatar_url: null
        }
      ])
      .select()
      .single();

    if (userError) throw userError;

    return { authData, userData };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    // Get the authenticated user
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError) throw authError;
    if (!authUser) return null;

    // Get the user profile
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (userError) throw userError;

    return {
      ...authUser,
      ...userData
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    throw error;
  }
}

// For development/testing only
export async function createTestUser() {
  try {
    // Create a test auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'teddy@example.com',
      password: 'testpassword123',
    });

    if (authError) throw authError;

    // Create the user profile
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user.id,
          name: 'Teddy',
          avatar_url: null
        }
      ])
      .select()
      .single();

    if (userError) throw userError;

    return { authData, userData };
  } catch (error) {
    console.error('Error creating test user:', error);
    throw error;
  }
}
