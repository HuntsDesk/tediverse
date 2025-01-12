import React, { useState, useEffect } from 'react';
import { HeaderBanner } from '../common/HeaderBanner';
import { ScheduleCard } from './cards/ScheduleCard';
import { StarsCard } from './cards/StarsCard';
import { MessagesCard } from './cards/MessagesCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { defaultAvatar } from '../../assets/defaultAvatar';
import { supabase } from '../../lib/supabase-client';
import { syncAuthUser } from '../../lib/syncAuthUser';

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    user: null,
    activities: [],
    messages: [],
    stars: []
  });

  useEffect(() => {
    async function initializeData() {
      try {
        setLoading(true);
        
        // Sync auth user with database
        const user = await syncAuthUser();
        
        if (!user) {
          throw new Error('No user found');
        }

        // Fetch user's data
        const [activities, messages, stars] = await Promise.all([
          supabase
            .from('activities')
            .select('*')
            .eq('user_id', user.id)
            .order('time_scheduled'),
          supabase
            .from('messages')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false }),
          supabase
            .from('stars')
            .select('*')
            .eq('user_id', user.id)
        ]);

        setData({
          user,
          activities: activities.data || [],
          messages: messages.data || [],
          stars: stars.data || []
        });
      } catch (err) {
        console.error('Error initializing data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    initializeData();
  }, []);

  // ... rest of the component remains the same
}
