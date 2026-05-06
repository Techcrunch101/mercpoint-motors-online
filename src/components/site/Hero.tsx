import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import hero from "@/assets/hero-grille.jpg";

const makes = ["All makes", "Mercedes-Benz", "BMW", "Toyota", "Land Rover", "Audi", "Porsche"];
const bodies = ["All body types", "Sedan", "SUV", "Coupe", "Pickup"];
const prices = ["Any price", "Under KES 3M", "3M – 6M", "6M – 12M", "12M+"];

const inventoryByMake: Record<string, number> = {
  "All makes": 142, "Mercedes-Benz": 38, "BMW": 24, "Toyota": 41,
  "Land Rover": 17, "Audi": 12, "Porsche": 10,
};

function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const display = useTransform(mv, (v) => Math.round(v).toString());
  const [text, setText] = useState(value.toString());
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
    const unsub = display.on("change", (v) => setText(v));
    return () => { controls.stop(); unsub(); };
  }, [value, mv, display]);
  return <span className="font-mono tabular-nums">{text}</span>;
}

export const Hero = () => {
  const [make, setMake] = useState("All makes");
  const count = inventoryByMake[make] ?? 142;

  return (
    <section className="relative min-h-[100svh] flex items-center pt-16 overflow-hidden">
      <motion.img
        src={hero}
        alt="Mercedes-AMG grille detail"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "var(--gradient-fade)" }} />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 w-full grid grid-cols-12 gap-6 py-24">
        <div className="col-span-12 lg:col-span-7">
          <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="eyebrow flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-primary" />
            Premium Auto Dealership — Mombasa
          </motion.div>
          <motion.h1
            initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display font-semibold text-chrome text-[44px] sm:text-[64px] lg:text-[88px] leading-[1.02] tracking-[-0.035em]"
          >
            Drive the<br />exceptional.
          </motion.h1>
          <motion.p
            initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 max-w-[52ch] text-steel text-base sm:text-lg leading-relaxed"
          >
            Skip the six-month import wait and the auction guesswork. Every Mercpoint vehicle
            is cleared, inspected, and ready for transfer the day you sign.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }} className="mt-10 flex items-center gap-6">
            <div>
              <div className="font-display text-chrome text-2xl"><AnimatedNumber value={142} /></div>
              <div className="spec text-steel mt-1">Vehicles in stock</div>
            </div>
            <div className="w-px h-10 hairline" />
            <div>
              <div className="font-display text-chrome text-2xl">150<span className="text-steel">pt</span></div>
              <div className="spec text-steel mt-1">Inspection</div>
            </div>
            <div className="w-px h-10 hairline" />
            <div>
              <div className="font-display text-chrome text-2xl">14<span className="text-steel">y</span></div>
              <div className="spec text-steel mt-1">In Mombasa</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 180, damping: 22 }}
          className="col-span-12 lg:col-span-5 lg:mt-16"
        >
          <div className="bg-gunmetal/95 backdrop-blur border border-midnight rounded-sm shadow-elev p-6">
            <div className="flex items-center justify-between">
              <div className="eyebrow">Find Your Vehicle</div>
              <div className="spec text-primary">LIVE</div>
            </div>
            <div className="mt-5 space-y-3">
              <Field label="Make">
                <select value={make} onChange={(e) => setMake(e.target.value)} className="select-base">
                  {makes.map(m => <option key={m} className="bg-gunmetal">{m}</option>)}
                </select>
              </Field>
              <Field label="Body type">
                <select className="select-base">
                  {bodies.map(b => <option key={b} className="bg-gunmetal">{b}</option>)}
                </select>
              </Field>
              <Field label="Price range">
                <select className="select-base">
                  {prices.map(p => <option key={p} className="bg-gunmetal">{p}</option>)}
                </select>
              </Field>
            </div>
            <a href="#inventory" className="mt-5 w-full inline-flex items-center justify-between gap-2 px-5 h-12 rounded-sm bg-primary text-primary-foreground font-medium shadow-cta hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 ease-glide">
              <span className="inline-flex items-center gap-2"><Search className="size-4" /> Search <AnimatedNumber value={count} /> vehicles</span>
              <ArrowRight className="size-4" />
            </a>
            <p className="mt-3 spec text-steel">All units physically present at our Mombasa yard.</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .select-base {
          width: 100%; height: 44px; padding: 0 12px;
          background: hsl(var(--carbon)); color: hsl(var(--chrome));
          border: 1px solid hsl(var(--midnight));
          border-radius: 2px; font-size: 14px;
          appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'><polyline points='6 9 12 15 18 9'/></svg>");
          background-repeat: no-repeat;
          background-position: right 12px center;
          transition: border-color 0.3s var(--ease-glide);
        }
        .select-base:focus { outline: none; border-color: hsl(var(--primary)); }
      `}</style>
    </section>
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <div className="spec text-steel mb-1.5">{label}</div>
    {children}
  </label>
);
