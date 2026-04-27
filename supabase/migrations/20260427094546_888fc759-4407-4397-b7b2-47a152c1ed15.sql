
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users see own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Cars
CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  trim TEXT,
  price TEXT NOT NULL,
  mileage TEXT,
  fuel TEXT,
  transmission TEXT,
  engine TEXT,
  tag TEXT,
  image_url TEXT NOT NULL,
  is_new_arrival BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cars" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Admins can insert cars" ON public.cars FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update cars" ON public.cars FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete cars" ON public.cars FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for car images
INSERT INTO storage.buckets (id, name, public) VALUES ('car-images', 'car-images', true);

CREATE POLICY "Public can view car images" ON storage.objects FOR SELECT USING (bucket_id = 'car-images');
CREATE POLICY "Admins can upload car images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update car images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete car images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));
