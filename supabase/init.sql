-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    title TEXT NOT NULL,
    type TEXT NOT NULL, -- 'daily_schedule', 'homework', 'emotion_tool', etc.
    emoji TEXT,
    time_scheduled TIME,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create stars table
CREATE TABLE IF NOT EXISTS stars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    amount INTEGER NOT NULL,
    reason TEXT,
    activity_id UUID REFERENCES activities(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    from_type TEXT NOT NULL, -- 'parent', 'teacher'
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create emotion_logs table
CREATE TABLE IF NOT EXISTS emotion_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    emotion TEXT NOT NULL,
    response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert test data
-- First, insert our test user
INSERT INTO users (name, avatar_url) 
VALUES ('Teddy', 'https://ucarecdn.com/6c5af2a2-157d-4ba4-b47e-beec9b05213a/-/format/auto/')
ON CONFLICT (id) DO NOTHING
RETURNING id;

-- Store the user_id for use in other inserts
DO $$ 
DECLARE
    test_user_id UUID;
BEGIN
    SELECT id INTO test_user_id FROM users WHERE name = 'Teddy';

    -- Insert sample activities
    INSERT INTO activities (user_id, title, type, emoji, time_scheduled) VALUES
    (test_user_id, 'Wake Up & Get Ready', 'daily_schedule', '🌅', '08:00:00'),
    (test_user_id, 'Breakfast Time', 'daily_schedule', '🥣', '09:00:00'),
    (test_user_id, 'Learning Time', 'daily_schedule', '📚', '10:00:00'),
    (test_user_id, 'Lunch Break', 'daily_schedule', '🍎', '12:00:00'),
    (test_user_id, 'Reading Practice - Chapter 3', 'homework', '📚', NULL);

    -- Insert sample messages
    INSERT INTO messages (user_id, from_type, content) VALUES
    (test_user_id, 'parent', 'Have a great day sweetie! 🌟'),
    (test_user_id, 'teacher', 'Great job in class today! 📚');

    -- Insert initial stars
    INSERT INTO stars (user_id, amount, reason) VALUES
    (test_user_id, 6, 'Initial stars');
END $$;
