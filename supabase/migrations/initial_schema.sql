-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create activities table
CREATE TABLE activities (
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
CREATE TABLE stars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    amount INTEGER NOT NULL,
    reason TEXT,
    activity_id UUID REFERENCES activities(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    from_type TEXT NOT NULL, -- 'parent', 'teacher'
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create emotion_logs table
CREATE TABLE emotion_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    emotion TEXT NOT NULL,
    response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert initial test data
INSERT INTO users (name, avatar_url) VALUES
('Teddy', 'https://ucarecdn.com/6c5af2a2-157d-4ba4-b47e-beec9b05213a/-/format/auto/');

-- Insert sample activities
INSERT INTO activities (user_id, title, type, emoji, time_scheduled) VALUES
((SELECT id FROM users WHERE name = 'Teddy'), 'Wake Up & Get Ready', 'daily_schedule', '🌅', '08:00:00'),
((SELECT id FROM users WHERE name = 'Teddy'), 'Breakfast Time', 'daily_schedule', '🥣', '09:00:00'),
((SELECT id FROM users WHERE name = 'Teddy'), 'Learning Time', 'daily_schedule', '📚', '10:00:00'),
((SELECT id FROM users WHERE name = 'Teddy'), 'Lunch Break', 'daily_schedule', '🍎', '12:00:00'),
((SELECT id FROM users WHERE name = 'Teddy'), 'Reading Practice - Chapter 3', 'homework', '📚', NULL);

-- Insert sample messages
INSERT INTO messages (user_id, from_type, content) VALUES
((SELECT id FROM users WHERE name = 'Teddy'), 'parent', 'Have a great day sweetie! 🌟'),
((SELECT id FROM users WHERE name = 'Teddy'), 'teacher', 'Great job in class today! 📚');

-- Insert initial stars
INSERT INTO stars (user_id, amount, reason) VALUES
((SELECT id FROM users WHERE name = 'Teddy'), 6, 'Initial stars');
