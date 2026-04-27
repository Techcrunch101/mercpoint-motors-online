import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { fetchNewArrivals, type Car } from "@/lib/cars";

export const NewArrivalsModal = () => {
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(async () => {
      try {
        const data = await fetchNewArrivals();
        if (data.length) { setCars(data); setOpen(true); }
      } catch {}
    }, 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIdx(i => (i + 1) % cars.length);
      if (e.key === "ArrowLeft") setIdx(i => (i - 1 + cars.length) % cars.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, cars.length]);

  const car = cars[idx];
  const next = () => setIdx(i => (i + 1) % cars.length);
  const prev = () => setIdx(i => (i - 1 + cars.length) % cars.length);

  return (
    <AnimatePresence>
      {open && car && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] bg-carbon/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: 30, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-gunmetal border border-midnight rounded-sm overflow-hidden shadow-elev"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-midnight">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span className="eyebrow">New Arrivals · {idx + 1} / {cars.length}</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-steel hover:text-chrome">
                <X className="size-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] bg-carbon overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={car.id}
                  src={car.image_url}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              {cars.length > 1 && (
                <>
                  <button onClick={prev} aria-label="Previous"
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-10 rounded-sm bg-carbon/70 backdrop-blur border border-midnight text-chrome hover:border-primary flex items-center justify-center">
                    <ChevronLeft className="size-5" />
                  </button>
                  <button onClick={next} aria-label="Next"
                    className="absolute right-3 top-1/2 -translate-y-1/2 size-10 rounded-sm bg-carbon/70 backdrop-blur border border-midnight text-chrome hover:border-primary flex items-center justify-center">
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
              {car.tag && (
                <span className="absolute top-4 left-4 spec bg-primary text-primary-foreground px-2 py-1">{car.tag}</span>
              )}
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <div className="spec text-steel">{car.year} · {car.make}</div>
                <h3 className="font-display font-semibold text-chrome text-2xl tracking-tight mt-1">{car.model} {car.trim}</h3>
                <div className="text-primary font-display mt-2">{car.price}</div>
              </div>
              <div className="flex gap-2">
                <a href="/stock" className="px-4 h-11 inline-flex items-center rounded-sm border border-midnight text-chrome text-sm hover:border-primary/40">View all stock</a>
                <a href={`https://wa.me/254729321412?text=${encodeURIComponent(`Hi Mercpoint, I'm interested in the ${car.year} ${car.make} ${car.model}`)}`}
                  target="_blank" rel="noreferrer"
                  className="px-5 h-11 inline-flex items-center rounded-sm bg-primary text-primary-foreground text-sm font-medium shadow-cta hover:-translate-y-0.5 active:scale-[0.98] transition-all">
                  Enquire now
                </a>
              </div>
            </div>

            {cars.length > 1 && (
              <div className="px-6 pb-5 flex gap-1.5">
                {cars.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} aria-label={`Go to ${i+1}`}
                    className={`h-1 flex-1 rounded-full transition-colors ${i === idx ? "bg-primary" : "bg-midnight"}`} />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};