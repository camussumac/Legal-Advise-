/*
  # Create storage and contracts tables

  1. Storage Setup
    - Enable storage for contract files
    - Set up bucket for contracts

  2. Contracts Table
    - Create contracts table for tracking uploaded documents
    - Store metadata and analysis results
    
  3. Security
    - Enable RLS
    - Add policies for user access
*/

-- Create contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  content text,
  file_path text,
  uploaded_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending',
  states text[] NOT NULL DEFAULT '{}',
  categories text[] NOT NULL DEFAULT '{}',
  analysis jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own contracts"
  ON contracts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contracts"
  ON contracts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contracts"
  ON contracts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);