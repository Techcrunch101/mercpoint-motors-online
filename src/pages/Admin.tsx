import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { fetchCars, type Car } from "@/lib/cars";
import { Trash2, Upload, LogOut, Plus, Loader2 } from "lucide-react";

const empty = {
  make: "", model: "", year: new Date().getFullYear(), trim: "", price: "",
  mileage: "", fuel: "Petrol", transmission: "Automatic", engine: "", tag: "Just In",
  is_new_arrival: true, description: "", category: "Sedan",
};

const Admin = () => {
  const nav = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [form, setForm] = useState(empty);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) { nav("/auth", { replace: true }); return; }
      const uid = data.session.user.id;
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", uid);
      const admin = (roles ?? []).some((r: any) => r.role === "admin");
      if (!active) return;
      setIsAdmin(admin);
      setChecking(false);
      if (admin) load();
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) nav("/auth", { replace: true });
    });
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, [nav]);

  const load = async () => {
    try { setCars(await fetchCars()); }
    catch (e: any) { toast({ title: "Load failed", description: e.message, variant: "destructive" }); }
  };

  const signOut = async () => { await supabase.auth.signOut(); nav("/auth"); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) { toast({ title: "Add at least one photo", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      const urls: string[] = [];
      for (const f of files) {
        const ext = f.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage.from("car-images").upload(path, f, { contentType: f.type });
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from("car-images").getPublicUrl(path);
        urls.push(urlData.publicUrl);
      }
      const { error: insErr } = await supabase.from("cars").insert({
        ...form,
        year: Number(form.year),
        image_url: urls[0],
        images: urls,
      });
      if (insErr) throw insErr;
      toast({ title: "Car added", description: `${form.year} ${form.make} ${form.model}` });
      setForm(empty); setFiles([]);
      (document.getElementById("car-file") as HTMLInputElement).value = "";
      load();
    } catch (e: any) {
      toast({ title: "Failed", description: e.message, variant: "destructive" });
    } finally { setSubmitting(false); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this car?")) return;
    const { error } = await supabase.from("cars").delete().eq("id", id);
    if (error) { toast({ title: "Delete failed", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Deleted" });
    load();
  };

  if (checking) {
    return <main className="min-h-screen bg-carbon flex items-center justify-center text-steel"><Loader2 className="animate-spin mr-2" /> Loading…</main>;
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-carbon flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-chrome text-2xl">Not an admin</h1>
          <p className="text-steel mt-3">Your account exists but doesn't have admin access yet. Ask the owner to grant the admin role to your user in the backend, then sign in again.</p>
          <button onClick={signOut} className="mt-6 px-5 h-10 rounded-sm bg-primary text-primary-foreground">Sign out</button>
        </div>
      </main>
    );
  }

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));
  const input = "w-full h-10 px-3 bg-carbon text-chrome border border-midnight rounded-sm focus:border-primary outline-none text-sm";

  return (
    <main className="min-h-screen bg-carbon py-10 px-6">
      <div className="max-w-[1280px] mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <div className="eyebrow">Mercpoint Admin</div>
            <h1 className="font-display text-chrome text-3xl mt-1">Stock Management</h1>
          </div>
          <div className="flex gap-2">
            <a href="/" className="px-4 h-10 inline-flex items-center rounded-sm border border-midnight text-steel hover:text-chrome text-sm">View site</a>
            <button onClick={signOut} className="px-4 h-10 inline-flex items-center gap-2 rounded-sm bg-gunmetal border border-midnight text-chrome text-sm hover:border-primary/40">
              <LogOut className="size-4" /> Sign out
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-6">
          <form onSubmit={submit} className="lg:col-span-5 bg-gunmetal border border-midnight rounded-sm p-6 space-y-4 h-fit sticky top-6">
            <h2 className="font-display text-chrome text-xl flex items-center gap-2"><Plus className="size-5 text-primary" /> Add new car</h2>

            <label className="block">
              <div className="spec text-steel mb-1.5">Photos (select multiple)</div>
              <div className="border border-dashed border-midnight rounded-sm p-4 hover:border-primary/40 transition-colors">
                <input id="car-file" type="file" accept="image/*" multiple required onChange={e => setFiles(Array.from(e.target.files ?? []))}
                  className="block w-full text-sm text-steel file:mr-3 file:px-3 file:h-9 file:rounded-sm file:border-0 file:bg-primary file:text-primary-foreground" />
                {files.length > 0 && <div className="spec text-primary mt-2 flex items-center gap-1"><Upload className="size-3" /> {files.length} file(s) selected</div>}
              </div>
            </label>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Make"><input className={input} required value={form.make} onChange={e => set("make", e.target.value)} placeholder="Toyota" /></Field>
              <Field label="Model"><input className={input} required value={form.model} onChange={e => set("model", e.target.value)} placeholder="Crown" /></Field>
              <Field label="Year"><input type="number" className={input} required value={form.year} onChange={e => set("year", e.target.value)} /></Field>
              <Field label="Trim"><input className={input} value={form.trim} onChange={e => set("trim", e.target.value)} placeholder="Athlete" /></Field>
              <Field label="Price"><input className={input} required value={form.price} onChange={e => set("price", e.target.value)} placeholder="KES 3,200,000" /></Field>
              <Field label="Mileage"><input className={input} value={form.mileage} onChange={e => set("mileage", e.target.value)} placeholder="68,000 km" /></Field>
              <Field label="Fuel">
                <select className={input} value={form.fuel} onChange={e => set("fuel", e.target.value)}>
                  {["Petrol","Diesel","Hybrid","Electric"].map(o => <option key={o} className="bg-gunmetal">{o}</option>)}
                </select>
              </Field>
              <Field label="Transmission">
                <select className={input} value={form.transmission} onChange={e => set("transmission", e.target.value)}>
                  {["Automatic","Manual","CVT","PDK"].map(o => <option key={o} className="bg-gunmetal">{o}</option>)}
                </select>
              </Field>
              <Field label="Engine"><input className={input} value={form.engine} onChange={e => set("engine", e.target.value)} placeholder="2.5L V6" /></Field>
              <Field label="Category">
                <select className={input} value={form.category} onChange={e => set("category", e.target.value)}>
                  {["Sedan","SUV","Truck","Hatchback","Coupe","Wagon","Van","Convertible"].map(o => <option key={o} className="bg-gunmetal">{o}</option>)}
                </select>
              </Field>
              <Field label="Tag">
                <select className={input} value={form.tag} onChange={e => set("tag", e.target.value)}>
                  {["Just In","Featured","Sold","Hot Deal",""].map(o => <option key={o} value={o} className="bg-gunmetal">{o || "None"}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Description">
              <textarea className={`${input} h-24 py-2`} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Condition, features, history…" />
            </Field>

            <label className="flex items-center gap-2 text-sm text-chrome">
              <input type="checkbox" checked={form.is_new_arrival} onChange={e => set("is_new_arrival", e.target.checked)} />
              Show in "New Arrivals" popup
            </label>

            <button disabled={submitting} type="submit"
              className="w-full h-11 rounded-sm bg-primary text-primary-foreground font-medium shadow-cta hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2">
              {submitting ? <><Loader2 className="size-4 animate-spin" /> Uploading…</> : <>Add to stock</>}
            </button>
          </form>

          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-display text-chrome text-xl">Current stock <span className="text-steel">({cars.length})</span></h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {cars.map(c => (
                <article key={c.id} className="bg-gunmetal border border-midnight rounded-sm overflow-hidden">
                  <div className="aspect-[4/3] bg-carbon overflow-hidden">
                    <img src={c.image_url} alt={`${c.make} ${c.model}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="spec text-steel">{c.year} · {c.make}</div>
                    <div className="font-display text-chrome">{c.model} {c.trim}</div>
                    <div className="text-sm text-primary mt-1">{c.price}</div>
                    <button onClick={() => remove(c.id)} className="mt-3 inline-flex items-center gap-1 spec text-steel hover:text-primary">
                      <Trash2 className="size-3" /> Remove
                    </button>
                  </div>
                </article>
              ))}
              {cars.length === 0 && <div className="col-span-full text-steel spec">No cars yet — add your first listing.</div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <div className="spec text-steel mb-1.5">{label}</div>
    {children}
  </label>
);

export default Admin;