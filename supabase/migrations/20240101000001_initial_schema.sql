-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table with role-based structure
CREATE TYPE user_role AS ENUM ('child', 'parent', 'educator', 'professional', 'admin');

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create families table to group related users
CREATE TABLE families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create family_members to handle family relationships
CREATE TABLE family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID REFERENCES families(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    relationship TEXT NOT NULL, -- 'parent', 'child', etc.
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(family_id, profile_id)
);

-- Create schools/institutions
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'school', 'clinic', 'therapy_center', etc.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create institution_members for staff
CREATE TABLE institution_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- 'teacher', 'administrator', 'therapist', etc.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(institution_id, profile_id)
);

-- Create student_enrollments for children
CREATE TABLE student_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
    status TEXT NOT NULL, -- 'active', 'inactive', etc.
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(child_id, institution_id)
);

-- Create access_permissions for fine-grained control
CREATE TABLE access_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grantor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    grantee_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    child_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    permission_type TEXT NOT NULL, -- 'view', 'edit', 'admin'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    UNIQUE(grantor_id, grantee_id, child_id)
);

-- Add RLS (Row Level Security) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE institution_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_permissions ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id);

-- Function to check if user has access to a child
CREATE OR REPLACE FUNCTION has_child_access(child_uuid UUID, viewer_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        -- Direct family access
        SELECT 1 FROM family_members fm
        WHERE fm.profile_id = viewer_uuid
        AND EXISTS (
            SELECT 1 FROM family_members fm2
            WHERE fm2.family_id = fm.family_id
            AND fm2.profile_id = child_uuid
        )
        UNION
        -- Institution access
        SELECT 1 FROM institution_members im
        JOIN student_enrollments se ON se.institution_id = im.institution_id
        WHERE im.profile_id = viewer_uuid
        AND se.child_id = child_uuid
        AND se.status = 'active'
        UNION
        -- Direct permission
        SELECT 1 FROM access_permissions ap
        WHERE ap.grantee_id = viewer_uuid
        AND ap.child_id = child_uuid
        AND (ap.expires_at IS NULL OR ap.expires_at > NOW())
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Indexes for performance
CREATE INDEX idx_family_members_family_id ON family_members(family_id);
CREATE INDEX idx_family_members_profile_id ON family_members(profile_id);
CREATE INDEX idx_institution_members_institution_id ON institution_members(institution_id);
CREATE INDEX idx_institution_members_profile_id ON institution_members(profile_id);
CREATE INDEX idx_student_enrollments_child_id ON student_enrollments(child_id);
CREATE INDEX idx_student_enrollments_institution_id ON student_enrollments(institution_id);
CREATE INDEX idx_access_permissions_child_id ON access_permissions(child_id);
