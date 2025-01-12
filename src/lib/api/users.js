import { supabase } from '../supabase-client';

export async function getTestUser() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('name', 'Teddy')
      .single();

    if (error) {
      console.error('Error fetching test user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getTestUser:', error);
    return null;
  }
}
