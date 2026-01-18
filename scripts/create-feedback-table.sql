-- Create website_feedback table in Neon database
-- Run this in the Neon SQL editor

CREATE TABLE IF NOT EXISTS website_feedback (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL DEFAULT 'rating',
  rating INTEGER,
  feedback TEXT,
  page_title VARCHAR(255),
  page_url VARCHAR(500),
  user_agent TEXT,
  ip_address VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS website_feedback_status_idx ON website_feedback(status);
CREATE INDEX IF NOT EXISTS website_feedback_type_idx ON website_feedback(type);
CREATE INDEX IF NOT EXISTS website_feedback_created_at_idx ON website_feedback(created_at DESC);

-- Add comment
COMMENT ON TABLE website_feedback IS 'Stores visitor feedback from the website (ratings and comments)';
