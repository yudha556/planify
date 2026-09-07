-- ============================================
-- PLANIFY DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Projects Table
-- Stores user's projects with form state for auto-save/resume
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Untitled Project',
    description TEXT DEFAULT '',
    project_type TEXT NOT NULL DEFAULT 'webapp',
    current_step INT NOT NULL DEFAULT 1,
    form_data JSONB DEFAULT '{}',
    generated_brief JSONB DEFAULT NULL,
    document_style TEXT NOT NULL DEFAULT 'professional',
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON projects(updated_at DESC);

-- 2. Activity Logs Table
-- Stores timeline of user activity (for History page)
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    coins_used INT NOT NULL DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast user + time lookups
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- 3. Enable RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for projects
-- Users can only see/modify their own projects
CREATE POLICY "Users can view own projects" ON projects
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
    FOR DELETE USING (auth.uid() = user_id);

-- 5. RLS Policies for activity_logs
-- Users can only see their own logs
CREATE POLICY "Users can view own activity" ON activity_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity" ON activity_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. Service role bypass (so our backend can do everything)
-- The supabase service role key bypasses RLS by default, so no extra policy needed.

-- 7. Auto-update updated_at trigger for projects
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
