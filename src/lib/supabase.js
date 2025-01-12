import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Initializing Supabase with:', { 
  url: supabaseUrl,
  keyLength: supabaseKey?.length // Don't log the full key
});

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  },
  global: {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }
  }
});

export async function getMostRecentUser(name) {
  console.log('Fetching user:', name);
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('name', name)
      .order('created_at', { ascending: false })
      .limit(1);

    console.log('User fetch result:', { data, error });

    if (error) throw error;
    if (!data || data.length === 0) throw new Error('User not found');
    
    return data[0];
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

// Helper function to initialize test data if needed
export async function initializeTestData() {
  try {
    // Check if we have a test user
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('name', 'Teddy')
      .limit(1);

    if (!userData || userData.length === 0) {
      // Create test user
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert([
          { 
            name: 'Teddy',
            avatar_url: null
          }
        ])
        .select()
        .single();

      if (userError) throw userError;

      // Create test activities
      const activities = [
        { user_id: newUser.id, title: "Wake Up & Get Ready", type: "daily_schedule", emoji: "🌅", time_scheduled: "08:00:00" },
        { user_id: newUser.id, title: "Breakfast Time", type: "daily_schedule", emoji: "🥣", time_scheduled: "09:00:00" },
        { user_id: newUser.id, title: "Learning Time", type: "daily_schedule", emoji: "📚", time_scheduled: "10:00:00" },
        { user_id: newUser.id, title: "Lunch Break", type: "daily_schedule", emoji: "🍎", time_scheduled: "12:00:00" }
      ];

      const { error: activitiesError } = await supabase
        .from('activities')
        .insert(activities);

      if (activitiesError) throw activitiesError;

      // Create test messages
      const messages = [
        { user_id: newUser.id, from_type: "Parent", content: "Have a great day sweetie! 🌟" },
        { user_id: newUser.id, from_type: "Teacher", content: "Great job in class today! 📚" }
      ];

      const { error: messagesError } = await supabase
        .from('messages')
        .insert(messages);

      if (messagesError) throw messagesError;

      // Add initial stars
      const { error: starsError } = await supabase
        .from('stars')
        .insert([
          { user_id: newUser.id, amount: 6, reason: "Initial stars" }
        ]);

      if (starsError) throw starsError;

      console.log('Test data initialized successfully');
      return true;
    }

    console.log('Test data already exists');
    return false;
  } catch (error) {
    console.error('Error initializing test data:', error);
    throw error;
  }
}
