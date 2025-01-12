import { supabase } from '../supabase-client';

export async function getRecentMessages(userId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data;
}

export async function markMessageAsRead(messageId) {
  const { data, error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('id', messageId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
