import { supabase } from './supabase';
import { createTestUser } from '../services/userService';

export async function initializeTestData() {
  console.log('Starting data initialization...');
  try {
    // Create test user with auth
    const { authData, userData } = await createTestUser();
    const userId = userData.id;

    // Create test activities
    const { data: existingActivities } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId);

    if (!existingActivities || existingActivities.length === 0) {
      const activities = [
        { user_id: userId, title: "Wake Up & Get Ready", type: "daily_schedule", emoji: "🌅", time_scheduled: "08:00" },
        { user_id: userId, title: "Breakfast Time", type: "daily_schedule", emoji: "🥣", time_scheduled: "09:00" },
        { user_id: userId, title: "Learning Time", type: "daily_schedule", emoji: "📚", time_scheduled: "10:00" },
        { user_id: userId, title: "Lunch Break", type: "daily_schedule", emoji: "🍎", time_scheduled: "12:00" }
      ];

      await supabase.from('activities').insert(activities);
    }

    // Create test messages
    const { data: existingMessages } = await supabase
      .from('messages')
      .select('*')
      .eq('user_id', userId);

    if (!existingMessages || existingMessages.length === 0) {
      const messages = [
        { user_id: userId, from_type: "Parent", content: "Have a great day sweetie! 🌟" },
        { user_id: userId, from_type: "Teacher", content: "Great job in class today! 📚" }
      ];

      await supabase.from('messages').insert(messages);
    }

    // Create initial stars
    const { data: existingStars } = await supabase
      .from('stars')
      .select('*')
      .eq('user_id', userId);

    if (!existingStars || existingStars.length === 0) {
      await supabase
        .from('stars')
        .insert([
          { user_id: userId, amount: 6, reason: "Initial stars" }
        ]);
    }

    return { userId };
  } catch (error) {
    console.error('Error initializing test data:', error);
    throw error;
  }
}
