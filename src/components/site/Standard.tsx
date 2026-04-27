import { motion } from "framer-motion";
import { ClipboardCheck, FileBadge, Repeat } from "lucide-react";

const items = [
  { n: "01", icon: ClipboardCheck, title: "150-Point Inspection", body: "Every vehicle is bench-tested across mechanical, electrical and bodywork checkpoints by our in-house technicians before it ever reaches the showroom floor." },
  { n: "02", icon: FileBadge, title: "Duty Cleared, Title Ready", body: "All units are KRA cleared with logbook on hand. You leave the yard with the vehicle and the paperwork the same day." },
  { n: "03", icon: Repeat, title: "Trade-In Valuation", body: "Bring your current vehicle. We provide a transparent, market-rate written offer within 24 hours and apply it directly to your purchase." },
];

export const Standard = () => (
  <section id="standard" className="relative bg-gunmetal py-24 lg:py-32 border-y border-midnight overflow-hidden">
    <div className="absolute inset-0 carbon-grid opacity-30 [mask-image:radial-gradient(circle_at_50%_50%,black,transparent_70%)]" />
    <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10">
      <div className="max-w-3xl">
        <div className="eyebrow flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-primary" /> The Mercpoint Standard
        </div>
        <h2 className="mt-4 font-display font-semibold text-chrome text-3xl sm:text-5xl tracking-[-0.025em] leading-[1.05]">
          Three reasons buyers stop<br/>shopping after their first visit.
        </h2>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-midnight">
        {items.map((it, i) => (
          <motion.div
            key={it.n}
            initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gunmetal p-8 lg:p-10 group"
          >
            <div className="flex items-start justify-between">
              <div className="size-12 rounded-sm border border-midnight flex items-center justify-center text-primary group-hover:border-primary/60 transition-colors">
                <it.icon className="size-5" />
              </div>
              <div className="font-mono text-steel text-sm">{it.n}</div>
            </div>
            <h3 className="mt-8 font-display font-semibold text-chrome text-xl tracking-tight">{it.title}</h3>
            <p className="mt-3 text-steel text-sm leading-relaxed max-w-[40ch]">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
