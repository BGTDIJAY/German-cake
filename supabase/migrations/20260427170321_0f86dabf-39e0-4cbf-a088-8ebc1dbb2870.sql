ALTER TABLE public.cakes 
ADD COLUMN IF NOT EXISTS subcategory text,
ADD COLUMN IF NOT EXISTS description text;