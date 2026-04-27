import { useEffect, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { fetchCars, type Car } from "@/lib/cars";
import { Gauge, Fuel, Cog, Calendar, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Stock = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetchCars().then(setCars).finally(() => setLoading(false));
  }, []);

  const filtered = cars.filter(c => {
    const t = `${c.year} ${c.make} ${c.model} ${c.trim ?? ""}`.toLowerCase();
    return t.includes(q.toLowerCase());
  });

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <section className="pt-32 pb-20 px-6 lg:px-10 max-w-[1440px] mx-auto">
        <div className="eyebrow flex items-center gap-3"><span className="inline-block w-8 h-px bg-primary" /> Live Stock List</div>
        <h1 className="mt-4 font-display font-semibold text-chrome text-4xl sm:text-6xl tracking-[-0.025em] leading-[1.05]">Every car<br />in the yard.</h1>
        <p className="mt-6 text-steel max-w-[55ch] leading-relaxed">Updated by our team as soon as units land. Tap any car to enquire on WhatsApp.</p>

        <div className="mt-10 mb-8">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search make, model or year…"
            className="w-full max-w-md h-12 px-4 bg-gunmetal text-chrome border border-midnight rounded-sm focus:border-primary outline-none" />
        </div>

        {loading ? (
          <div className="text-steel flex items-center gap-2"><Loader2 className="size-4 animate-spin" /> Loading stock…</div>
        ) : filtered.length === 0 ? (
          <div className="text-steel">No cars match your search yet. New arrivals are added daily — try clearing the filter.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c, i) => (
              <motion.article key={c.id}
                initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-gunmetal border border-midnight rounded-sm overflow-hidden hover:-translate-y-1 hover:border-primary/40 transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden bg-carbon">
                  <img src={c.image_url} alt={`${c.year} ${c.make} ${c.model}`} loading="lazy" className="w-full h-full object-cover" />
                  {c.tag && <span className="absolute top-3 left-3 spec bg-primary text-primary-foreground px-2 py-1">{c.tag}</span>}
                  <span className="absolute top-3 right-3 spec text-chrome bg-carbon/70 backdrop-blur border border-midnight px-2 py-1 inline-flex items-center gap-1.5">
                    <ShieldCheck className="size-3" /> 150-PT
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <div className="spec text-steel">{c.year} · {c.make}</div>
                      <h3 className="font-display font-semibold text-chrome text-xl mt-1 tracking-tight">{c.model}</h3>
                      {c.trim && <div className="text-sm text-steel mt-0.5">{c.trim}</div>}
                    </div>
                    <div className="font-display text-chrome text-base whitespace-nowrap">{c.price}</div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-midnight grid grid-cols-2 gap-3 text-xs">
                    {c.mileage && <Spec icon={<Gauge className="size-3.5" />}>{c.mileage}</Spec>}
                    {c.fuel && <Spec icon={<Fuel className="size-3.5" />}>{c.fuel}</Spec>}
                    {c.transmission && <Spec icon={<Cog className="size-3.5" />}>{c.transmission}</Spec>}
                    {c.engine && <Spec icon={<Calendar className="size-3.5" />}>{c.engine}</Spec>}
                  </div>
                  <a href={`https://wa.me/254729321412?text=${encodeURIComponent(`Hi Mercpoint, I'm interested in the ${c.year} ${c.make} ${c.model}`)}`}
                    target="_blank" rel="noreferrer"
                    className="mt-5 block text-center h-10 leading-10 rounded-sm bg-primary text-primary-foreground text-sm font-medium hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                    Enquire on WhatsApp
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
      <Footer />
      <WhatsAppFab />
    </main>
  );
};

const Spec = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 spec text-steel"><span className="text-primary">{icon}</span>{children}</div>
);

export default Stock;