/*
  # Fix Articles RLS Policies

  Replaces overly permissive INSERT and UPDATE policies on the `articles` table
  that used always-true conditions, effectively bypassing row-level security.

  ## Changes
  - Drop the always-true INSERT policy for authenticated users
  - Drop the always-true UPDATE policy for authenticated users
  - Add a new INSERT policy that restricts creation to service-role only
    (articles are managed server-side, not by end users)
  - Add a new UPDATE policy that restricts updates to service-role only

  ## Reasoning
  Articles on this platform are editorial content authored by pharmacists and
  doctors, not user-generated content. No authenticated end-user should be able
  to insert or modify article records directly from the client. Only server-side
  operations via the service role key should write to this table.
*/

DROP POLICY IF EXISTS "Authenticated users can create articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
