import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { motion } from "framer-motion";
import { ShieldCheck, Handshake, Wrench, MapPin, Sparkles } from "lucide-react";
import logo from "@/assets/mercpoint-logo.png";

const values = [
  { icon: ShieldCheck, title: "Trust by default", body: "Every car comes with a 150-point inspection report and KRA-cleared paperwork. No surprises after you sign." },
  { icon: Handshake, title: "Honest pricing", body: "What we quote is what you pay. Trade-ins valued transparently against open market rates." },
  { icon: Wrench, title: "After-sale care", body: "Our service network keeps your vehicle running long after the keys change hands." },
];

const About = () => (
  <main className="min-h-screen bg-background">
    <Nav />

    <section className="pt-32 pb-16 px-6 lg:px-10 max-w-[1440px] mx-auto">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="eyebrow flex items-center gap-3"><span className="inline-block w-8 h-px bg-primary" /> About Mercpoint</div>
          <h1 className="mt-4 font-display font-bold text-chrome text-4xl sm:text-6xl tracking-[-0.03em] leading-[1.02]">
            A Nairobi dealership<br/>built on straight talk.
          </h1>
          <p className="mt-6 text-steel text-lg leading-relaxed max-w-[58ch]">
            Mercpoint Motors Ltd was founded to fix what most car buyers in Kenya already know is broken — the guesswork, the hidden defects, the paperwork that drags on for weeks. We source, inspect, and prepare every vehicle ourselves, then sell it from one showroom on Moi Avenue with the logbook ready to transfer.
          </p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center"
        >
          <img src={logo} alt="Mercpoint Motors logo" className="w-72 h-72 object-contain" />
        </motion.div>
      </div>
    </section>

    <section className="bg-gunmetal border-y border-midnight py-20 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="eyebrow flex items-center gap-3"><span className="inline-block w-8 h-px bg-primary" /> What we stand for</div>
        <h2 className="mt-4 font-display font-bold text-chrome text-3xl sm:text-5xl tracking-[-0.025em]">Three things we won't compromise.</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title}
              initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-background border border-midnight rounded-lg p-8"
            >
              <div className="size-12 rounded-md border border-midnight flex items-center justify-center text-primary"><v.icon className="size-5" /></div>
              <h3 className="mt-6 font-display font-semibold text-chrome text-xl">{v.title}</h3>
              <p className="mt-3 text-steel leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 px-6 lg:px-10 max-w-[1440px] mx-auto">
      <div className="grid md:grid-cols-3 gap-6">
        <Stat n="14+" label="Years sourcing in Kenya" />
        <Stat n="2,400+" label="Vehicles delivered" />
        <Stat n="150-pt" label="Inspection on every unit" />
      </div>
    </section>

    <section className="bg-gunmetal border-t border-midnight py-20 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="eyebrow flex items-center gap-3"><span className="inline-block w-8 h-px bg-primary" /> Visit us</div>
          <h2 className="mt-4 font-display font-bold text-chrome text-3xl sm:text-4xl tracking-[-0.025em]">New showroom on Moi Avenue.</h2>
          <p className="mt-4 text-steel leading-relaxed max-w-[55ch]">Opposite Equity Bank, Nairobi. Walk in any weekday between 8 AM and 6 PM — there is always someone from sales on the floor ready to walk you through the stock.</p>
          <a href="/#contact" className="mt-8 inline-flex items-center gap-2 px-6 h-12 rounded-md bg-primary text-primary-foreground font-medium shadow-cta hover:-translate-y-0.5 active:scale-[0.98] transition-all">
            <MapPin className="size-4" /> Get directions
          </a>
        </div>
        <div className="bg-background border border-midnight rounded-lg p-8">
          <Sparkles className="size-5 text-primary" />
          <blockquote className="mt-4 font-display text-chrome text-xl leading-snug tracking-tight">
            "We don't sell cars we wouldn't drive ourselves. That single rule has shaped every decision we've made since 2010."
          </blockquote>
          <div className="mt-6 spec text-steel">— The Mercpoint team</div>
        </div>
      </div>
    </section>

    <Footer />
    <WhatsAppFab />
  </main>
);

const Stat = ({ n, label }: { n: string; label: string }) => (
  <div className="border border-midnight rounded-lg p-8">
    <div className="font-display font-bold text-chrome text-5xl tracking-[-0.04em] tabular-nums">{n}</div>
    <div className="spec text-steel mt-3">{label}</div>
  </div>
);

export default About;