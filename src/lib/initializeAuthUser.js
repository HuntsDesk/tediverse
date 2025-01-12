import { supabase } from './supabase';

export async function initializeAuthAndData() {
  console.log('Starting auth user initialization...');
  try {
    // First, get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('Current session:', session);

    if (sessionError) {
      console.error('Session error:', sessionError);
      throw sessionError;
    }

    let currentUser;

    if (!session) {
      // Try to sign in
      console.log('No session, attempting sign in...');
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'teddy.test@example.com',
        password: 'Password123!'
      });

      if (signInError) {
        console.log('Sign in failed, attempting sign up...');
        // Sign up if sign in fails
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: 'teddy.test@example.com',
          password: 'Password123!',
          options: {
            data: {
              name: 'Teddy'
            }
          }
        });

        if (signUpError) {
          console.error('Sign up error:', signUpError);
          throw signUpError;
        }

        currentUser = signUpData.user;
        console.log('New user created:', currentUser);
      } else {
        currentUser = signInData.user;
        console.log('User signed in:', currentUser);
      }
    } else {
      currentUser = session.user;
      console.log('Using existing session user:', currentUser);
    }

    // Check if user exists in database
    const { data: existingDbUser, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('id', currentUser.id)
      .maybeSingle(); // Use maybeSingle instead of single to avoid error if no row exists

    console.log('Existing DB user:', existingDbUser);

    let dbUser;

    if (!existingDbUser) {
      console.log('Creating database user entry...');
      // Create user profile if it doesn't exist
      const { data: newDbUser, error: createError } = await supabase
        .from('users')
        .insert([
          {
            id: currentUser.id,
            name: 'Teddy',
            avatar_url: null
          }
        ])
        .select()
        .single();

      if (createError) {
        console.error('Error creating user profile:', createError);
        throw createError;
      }

      dbUser = newDbUser;
      console.log('Created new database user:', dbUser);

      // Initialize default data for new user
      const activities = [
        { 
          user_id: dbUser.id, 
          title: "Wake Up & Get Ready", 
          type: "daily_schedule", 
          emoji: "🌅", 
          time_scheduled: '08:00:00' 
        },
        { 
          user_id: dbUser.id, 
          title: "Breakfast Time", 
          type: "daily_schedule", 
          emoji: "🥣", 
          time_scheduled: '09:00:00' 
        },
        { 
          user_id: dbUser.id, 
          title: "Learning Time", 
          type: "daily_schedule", 
          emoji: "📚", 
          time_scheduled: '10:00:00' 
        },
        { 
          user_id: dbUser.id, 
          title: "Lunch Break", 
          type: "daily_schedule", 
          emoji: "🍎", 
          time_scheduled: '12:00:00' 
        }
      ];

      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activities')
        .insert(activities)
        .select();

      if (activitiesError) {
        console.error('Error creating activities:', activitiesError);
        throw activitiesError;
      }

      const messages = [
        { 
          user_id: dbUser.id, 
          from_type: "Parent", 
          content: "Have a great day sweetie! 🌟" 
        },
        { 
          user_id: dbUser.id, 
          from_type: "Teacher", 
          content: "Great job in class today! 📚" 
        }
      ];

      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .insert(messages)
        .select();

      if (messagesError) {
        console.error('Error creating messages:', messagesError);
        throw messagesError;
      }

      const { data: starsData, error: starsError } = await supabase
        .from('stars')
        .insert([
          { 
            user_id: dbUser.id, 
            amount: 6, 
            reason: "Initial stars" 
          }
        ])
        .select();

      if (starsError) {
        console.error('Error creating stars:', starsError);
        throw starsError;
      }

      return {
        user: dbUser,
        activities: activitiesData,
        messages: messagesData,
        stars: starsData
      };
    } else {
      dbUser = existingDbUser;
      console.log('Using existing database user:', dbUser);

      // Fetch existing data
      const { data: activitiesData } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', dbUser.id)
        .order('time_scheduled');

      const { data: messagesData } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', dbUser.id)
        .order('created_at', { ascending: false });

      const { data: starsData } = await supabase
        .from('stars')
        .select('*')
        .eq('user_id', dbUser.id);

      return {
        user: dbUser,
        activities: activitiesData || [],
        messages: messagesData || [],
        stars: starsData || []
      };
    }

  } catch (error) {
    console.error('Error in initialization:', error);
    throw error;
  }
}
