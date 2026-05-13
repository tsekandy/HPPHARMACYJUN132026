/*
  # Create Articles Table

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text, article title)
      - `slug` (text, URL-friendly slug)
      - `excerpt` (text, short summary)
      - `content` (text, full article content)
      - `author` (text, author name)
      - `category` (text, article category)
      - `read_time` (integer, estimated reading time in minutes)
      - `published_date` (timestamp, publication date)
      - `featured_image` (text, featured image URL)
      - `tags` (text[], array of tags for SEO)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `articles` table
    - Add policy for public SELECT access (articles are public)
    - Add policy for authenticated users to create/update articles
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  category text NOT NULL,
  read_time integer DEFAULT 5,
  published_date timestamptz NOT NULL,
  featured_image text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Articles are publicly readable"
  ON articles
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published_date ON articles(published_date DESC);
