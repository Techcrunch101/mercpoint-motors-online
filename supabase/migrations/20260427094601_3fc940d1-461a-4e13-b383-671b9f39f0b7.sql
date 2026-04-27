
-- Replace overly broad public SELECT on storage.objects for car-images
DROP POLICY "Public can view car images" ON storage.objects;
-- Public images remain accessible via public URL (bucket is public). Restrict listing to admins.
CREATE POLICY "Admins can list car images" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));

-- Lock down has_role function exposure
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
