import { supabase } from './supabase';

export async function syncAuthUser() {
  console.log('Starting user sync...');
  try {
    // Get current auth user
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
    
    if (authError) {
      console.error('Auth error:', authError);
      throw authError;
    }

    if (!authUser) {
      console.log('No authenticated user found');
      return null;
    }

    console.log('Auth user found:', authUser);

    // Check if user exists in database
    const { data: dbUser, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .maybeSingle();

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    if (!dbUser) {
      console.log('Creating database user...');
      // Create user in database
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([
          {
            id: authUser.id,
            name: 'Teddy',
            avatar_url: null,
            created_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (createError) {
        console.error('Error creating user:', createError);
        throw createError;
      }

      console.log('Database user created:', newUser);

      // Initialize default data
      await initializeUserData(newUser.id);

      return newUser;
    }

    console.log('Database user found:', dbUser);
    return dbUser;
  } catch (error) {
    console.error('Error in syncAuthUser:', error);
    throw error;
  }
}

async function initializeUserData(userId) {
  console.log('Initializing user data for:', userId);
  try {
    // Create activities
    const activities = [
      { 
        user_id: userId, 
        title: "Wake Up & Get Ready", 
        type: "daily_schedule", 
        emoji: "🌅", 
        time_scheduled: '08:00:00' 
      },
      { 
        user_id: userId, 
        title: "Breakfast Time", 
        type: "daily_schedule", 
        emoji: "🥣", 
        time_scheduled: '09:00:00' 
      },
      { 
        user_id: userId, 
        title: "Learning Time", 
        type: "daily_schedule", 
        emoji: "📚", 
        time_scheduled: '10:00:00' 
      },
      { 
        user_id: userId, 
        title: "Lunch Break", 
        type: "daily_schedule", 
        emoji: "🍎", 
        time_scheduled: '12:00:00' 
      }
    ];

    const { error: activitiesError } = await supabase
      .from('activities')
      .insert(activities);

    if (activitiesError) throw activitiesError;

    // Create messages
    const messages = [
      { 
        user_id: userId, 
        from_type: "Parent", 
        content: "Have a great day sweetie! 🌟" 
      },
      { 
        user_id: userId, 
        from_type: "Teacher", 
        content: "Great job in class today! 📚" 
      }
    ];

    const { error: messagesError } = await supabase
      .from('messages')
      .insert(messages);

    if (messagesError) throw messagesError;

    // Create initial stars
    const { error: starsError } = await supabase
      .from('stars')
      .insert([
        { 
          user_id: userId, 
          amount: 6, 
          reason: "Initial stars" 
        }
      ]);

    if (starsError) throw starsError;

    console.log('User data initialized successfully');
  } catch (error) {
    console.error('Error initializing user data:', error);
    throw error;
  }
}
