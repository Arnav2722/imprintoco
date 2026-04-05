
-- Create category enum
CREATE TYPE public.product_category AS ENUM ('stickers', 'posters', 'combo');

-- Create subcategory enum
CREATE TYPE public.product_subcategory AS ENUM (
  'custom', 'superhero', 'cars', 'f1', 'motogp', 'bikes', 
  'movies', 'tv_series', 'music', 'video_games', 
  'motivation', 'cricket', 'football'
);

-- Create poster size enum
CREATE TYPE public.poster_size AS ENUM ('A5', 'A4', 'A3', 'A2', '13x19');

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT,
  image_url TEXT,
  category product_category NOT NULL DEFAULT 'stickers',
  subcategory product_subcategory NOT NULL DEFAULT 'custom',
  badge TEXT,
  available_sizes poster_size[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read access for active products
CREATE POLICY "Anyone can view active products"
  ON public.products
  FOR SELECT
  USING (is_active = true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index for filtering
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_subcategory ON public.products(subcategory);
CREATE INDEX idx_products_active ON public.products(is_active);
