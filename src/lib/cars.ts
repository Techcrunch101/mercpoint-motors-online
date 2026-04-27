import { supabase } from "@/integrations/supabase/client";

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  trim: string | null;
  price: string;
  mileage: string | null;
  fuel: string | null;
  transmission: string | null;
  engine: string | null;
  tag: string | null;
  image_url: string;
  is_new_arrival: boolean;
  created_at: string;
};

export async function fetchCars(): Promise<Car[]> {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Car[];
}

export async function fetchNewArrivals(): Promise<Car[]> {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("is_new_arrival", true)
    .order("created_at", { ascending: false })
    .limit(8);
  if (error) throw error;
  return (data ?? []) as Car[];
}