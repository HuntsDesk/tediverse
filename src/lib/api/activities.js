import { supabase } from '../supabase-client';

export async function getUserActivities(userId) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', userId)
    .order('time_scheduled');

  if (error) throw error;
  return data;
}

export async function updateActivity(activityId, updates) {
  const { data, error } = await supabase
    .from('activities')
    .update(updates)
    .eq('id', activityId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function toggleActivityCompletion(activityId, userId) {
  // First, get the current activity state
  const { data: activity, error: fetchError } = await supabase
    .from('activities')
    .select('completed')
    .eq('id', activityId)
    .single();

  if (fetchError) throw fetchError;

  // Toggle the completion state
  const { data, error } = await supabase
    .from('activities')
    .update({ completed: !activity.completed })
    .eq('id', activityId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
