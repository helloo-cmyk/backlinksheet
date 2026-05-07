-- Update project_backlinks to include site_url for easier monitoring
ALTER TABLE project_backlinks ADD COLUMN IF NOT EXISTS site_url TEXT;
