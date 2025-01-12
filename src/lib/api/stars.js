import { supabase } from '../supabase-client';

export async function getUserStars(userId) {
  const { data, error } = await supabase
    .from('stars')
    .select('amount')
    .eq('user_id', userId);

  if (error) throw error;
  return data.reduce((sum, star) => sum + star.amount, 0);
}

export async function addStars(userId, amount, reason, activityId = null) {
  const { data, error } = await supabase
    .from('stars')
    .insert([
      {
        user_id: userId,
        amount,
        reason,
        activity_id: activityId
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
