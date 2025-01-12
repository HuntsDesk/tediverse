import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { handleSupabaseError, isSupabaseError } from '../utils/errorHandling';

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('name', 'Teddy')
        .single();

      if (error) {
        throw isSupabaseError(error) 
          ? handleSupabaseError(error, { action: 'fetchUser' })
          : error;
      }

      if (!data) {
        throw new Error('User not found');
      }

      setUser(data);
    } catch (err) {
      console.error('Error in useUser:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refreshUser = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refreshUser };
}

export function useActivities(userId) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('user_id', userId)
        .order('time_scheduled');

      if (error) {
        throw isSupabaseError(error)
          ? handleSupabaseError(error, { action: 'fetchActivities', userId })
          : error;
      }

      setActivities(data || []);
    } catch (err) {
      console.error('Error in useActivities:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const toggleActivity = useCallback(async (activityId) => {
    try {
      const activity = activities.find(a => a.id === activityId);
      if (!activity) {
        throw new Error('Activity not found');
      }

      // Optimistic update
      setActivities(prev => 
        prev.map(a => a.id === activityId 
          ? { ...a, completed: !a.completed }
          : a
        )
      );

      const { data, error } = await supabase
        .from('activities')
        .update({ completed: !activity.completed })
        .eq('id', activityId)
        .select()
        .single();

      if (error) {
        // Revert optimistic update on error
        setActivities(prev => 
          prev.map(a => a.id === activityId ? activity : a)
        );
        throw isSupabaseError(error)
          ? handleSupabaseError(error, { action: 'toggleActivity', activityId })
          : error;
      }

      // Add stars if activity is completed
      if (data.completed) {
        const { error: starError } = await supabase
          .from('stars')
          .insert([
            { 
              user_id: userId,
              amount: 1,
              reason: `Completed: ${data.title}`,
              activity_id: activityId
            }
          ]);

        if (starError) {
          console.error('Error adding stars:', starError);
        }
      }
    } catch (err) {
      console.error('Error in toggleActivity:', err);
      setError(err);
    }
  }, [activities, userId]);

  const refreshActivities = useCallback(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { 
    activities, 
    loading, 
    error, 
    toggleActivity,
    refreshActivities
  };
}

// Similar enhancements for useStars and useMessages...
