# Supabase Database Setup - UCAM Swimming Club

## Quick Start

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `jmeocdswloypokifrlcc`
3. Navigate to **SQL Editor** → **New Query**
4. Copy and paste the SQL below
5. Click **Run** (or press `Ctrl+Enter`)

---

## Complete Database Schema

```sql
-- ============================================
-- UCAM Swimming Club Database Schema
-- ============================================

-- 1. NEWS TABLE
-- Store news articles and announcements
CREATE TABLE IF NOT EXISTS news (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  image_url text,
  author_id uuid REFERENCES auth.users(id),
  published boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- 2. COACHES TABLE
-- Team and coaching staff information
CREATE TABLE IF NOT EXISTS coaches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  image_url text,
  specialties text[],
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. SCHEDULES TABLE
-- Training schedules
CREATE TABLE IF NOT EXISTS schedules (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  group_name text NOT NULL,
  location text DEFAULT 'Piscina UCAM',
  description text,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

-- 4. CONTACT SUBMISSIONS TABLE
-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at timestamp with time zone DEFAULT now()
);

-- 5. ADMIN USERS TABLE
-- Admin user profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role text DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at timestamp with time zone DEFAULT now()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_news_published ON news(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_coaches_order ON coaches(display_order, active);
CREATE INDEX IF NOT EXISTS idx_schedules_day ON schedules(day_of_week, active);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status, created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- NEWS POLICIES
-- Public can read published news
CREATE POLICY "Public can view published news" ON news
  FOR SELECT
  USING (published = true);

-- Authenticated users (admins) can do everything
CREATE POLICY "Admins can manage all news" ON news
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- COACHES POLICIES
-- Public can view active coaches
CREATE POLICY "Public can view active coaches" ON coaches
  FOR SELECT
  USING (active = true);

-- Admins can manage coaches
CREATE POLICY "Admins can manage coaches" ON coaches
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- SCHEDULES POLICIES
-- Public can view active schedules
CREATE POLICY "Public can view active schedules" ON schedules
  FOR SELECT
  USING (active = true);

-- Admins can manage schedules
CREATE POLICY "Admins can manage schedules" ON schedules
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- CONTACT SUBMISSIONS POLICIES
-- Anonymous users can insert (submit form)
CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Admins can view and manage submissions
CREATE POLICY "Admins can view contact submissions" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update contact submissions" ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ADMIN USERS POLICIES
-- Only authenticated users can view admin users
CREATE POLICY "Admins can view admin users" ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for news table
DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample coaches
INSERT INTO coaches (name, role, bio, specialties, display_order, active) VALUES
  ('Carlos Martínez', 'Director Técnico', 'Más de 15 años de experiencia en natación competitiva.', ARRAY['Técnica', 'Competición'], 1, true),
  ('Ana García', 'Entrenadora Principal', 'Especialista en desarrollo de jóvenes nadadores.', ARRAY['Infantil', 'Juvenil'], 2, true),
  ('Miguel Sánchez', 'Entrenador Asistente', 'Enfocado en técnica de estilo libre y mariposa.', ARRAY['Técnica', 'Velocidad'], 3, true)
ON CONFLICT DO NOTHING;

-- Insert sample schedules
INSERT INTO schedules (day_of_week, start_time, end_time, group_name, location, active) VALUES
  (1, '17:00', '18:30', 'Infantil', 'Piscina UCAM', true),
  (1, '18:30', '20:00', 'Juvenil', 'Piscina UCAM', true),
  (3, '17:00', '18:30', 'Infantil', 'Piscina UCAM', true),
  (3, '18:30', '20:00', 'Juvenil', 'Piscina UCAM', true),
  (5, '17:00', '18:30', 'Infantil', 'Piscina UCAM', true),
  (5, '18:30', '20:00', 'Juvenil', 'Piscina UCAM', true)
ON CONFLICT DO NOTHING;

-- Insert sample news article
INSERT INTO news (title, slug, content, excerpt, published) VALUES
  ('Bienvenidos a UCAM Natación', 
   'bienvenidos-ucam-natacion',
   'Estamos emocionados de presentar nuestra nueva plataforma digital. Aquí encontrarás todas las novedades del club, horarios de entrenamiento, y mucho más.',
   'Descubre nuestra nueva plataforma digital',
   true)
ON CONFLICT DO NOTHING;
```

---

## Storage Setup (For Images)

After running the SQL above, set up storage for images:

1. Go to **Storage** in Supabase Dashboard
2. Click **New Bucket**
3. Create bucket named: `club-images`
4. Set it to **Public**
5. Add the following policies:

```sql
-- Allow public to read images
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'club-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'club-images');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete images" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'club-images');
```

---

## Verify Setup

After running the SQL:

1. Go to **Table Editor** in Supabase Dashboard
2. Verify these tables exist:
   - ✅ `news`
   - ✅ `coaches`
   - ✅ `schedules`
   - ✅ `contact_submissions`
   - ✅ `admin_users`

3. Check sample data was inserted
4. Verify storage bucket `club-images` is created

---

## Creating Your First Admin User

To create an admin user:

1. Go to **Authentication** → **Users** in Supabase
2. Click **Add User** → **Create new user**
3. Enter email and password
4. Copy the user's UUID
5. Go to **SQL Editor** and run:

```sql
INSERT INTO admin_users (id, full_name, role)
VALUES ('YOUR-USER-UUID-HERE', 'Your Name', 'super_admin');
```

---

## Database Schema Overview

| Table | Purpose | Public Access |
|-------|---------|---------------|
| `news` | News articles | Published only |
| `coaches` | Team members | Active only |
| `schedules` | Training times | Active only |
| `contact_submissions` | Form submissions | Insert only |
| `admin_users` | Admin profiles | Authenticated only |

## Security Features

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Public can only read published/active content
- ✅ Anonymous users can submit contact forms
- ✅ Only authenticated users can manage content
- ✅ Automatic timestamp updates
- ✅ Data validation with CHECK constraints
