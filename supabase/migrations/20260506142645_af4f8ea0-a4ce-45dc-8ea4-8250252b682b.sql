ALTER TABLE public.cars
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS images text[] NOT NULL DEFAULT '{}'::text[];