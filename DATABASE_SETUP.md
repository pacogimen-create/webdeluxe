# Database Setup for Web Club Natación

## Instructions

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `jmeocdswloypokifrlcc`
3. Navigate to **SQL Editor** (in the left sidebar)
4. Click **New Query**
5. Copy and paste the SQL below
6. Click **Run** or press `Ctrl+Enter`

## SQL Schema

```sql
-- Create email_signups table
CREATE TABLE IF NOT EXISTS email_signups (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  source text DEFAULT 'cta_form'
);

-- Enable Row Level Security
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for form submissions from website)
CREATE POLICY "Allow anonymous inserts" ON email_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated reads (for future admin dashboard)
CREATE POLICY "Allow authenticated reads" ON email_signups
  FOR SELECT
  TO authenticated
  USING (true);
```

## Verify Setup

After running the SQL:

1. Go to **Table Editor** in Supabase Dashboard
2. You should see the `email_signups` table
3. Click on it to verify the columns:
   - `id` (uuid, primary key)
   - `email` (text, unique)
   - `created_at` (timestamp)
   - `source` (text)

## Table Structure

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | uuid | Primary key, auto-generated | Unique identifier for each signup |
| `email` | text | NOT NULL, UNIQUE | User's email address |
| `created_at` | timestamp | Default: now() | When the signup was created |
| `source` | text | Default: 'cta_form' | Where the signup came from |

## Security

- **Row Level Security (RLS)** is enabled
- Anonymous users can INSERT (submit emails from website)
- Only authenticated users can SELECT (view the data)
- This prevents unauthorized access to email addresses
