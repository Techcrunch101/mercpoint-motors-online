import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Clock, Users } from "lucide-react";
import logo from "@/assets/mercpoint-logo.png";

export const Contact = () => (
  <section id="contact" className="relative bg-gunmetal border-t border-midnight py-24 lg:py-32 overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
      <motion.div
        initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-7"
      >
        <div className="eyebrow flex items-center gap-3">
          <span className="inline-block w-8 h-px bg-primary" /> Visit · Call · WhatsApp
        </div>
        <h2 className="mt-4 font-display font-semibold text-chrome text-3xl sm:text-5xl tracking-[-0.025em] leading-[1.05]">
          The fastest way to<br/>buy is in person.
        </h2>
        <p className="mt-6 text-steel text-base sm:text-lg max-w-[55ch] leading-relaxed">
          Visit our <span className="text-chrome">new showroom along Moi Avenue, opposite Equity Bank</span>.
          You're welcome for all the best deals in town. Drop by for a viewing, or send a quick WhatsApp with the model you're after.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <a href="tel:+254729321412"
            className="group bg-primary text-primary-foreground rounded-md p-5 flex items-center justify-between shadow-cta hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-glide">
            <div>
              <div className="spec opacity-80">Call sales</div>
              <div className="font-display font-semibold text-lg mt-1">+254 729 321 412</div>
            </div>
            <Phone className="size-6" />
          </a>
          <a href="https://chat.whatsapp.com/KPDoVhS86thHAI1RNt658H" target="_blank" rel="noreferrer"
            className="group bg-background border border-midnight rounded-md p-5 flex items-center justify-between hover:-translate-y-1 hover:border-primary/40 transition-all duration-300 ease-glide">
            <div>
              <div className="spec text-steel">Daily stock alerts</div>
              <div className="font-display font-semibold text-chrome text-lg mt-1">Join WhatsApp Group</div>
            </div>
            <Users className="size-6 text-primary" />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
        whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-5"
      >
        <div className="bg-background border border-midnight rounded-lg p-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Mercpoint Motors" className="size-12 object-contain" />
            <div>
              <div className="font-display font-semibold text-chrome">Mercpoint Motors Ltd</div>
              <div className="spec text-steel mt-0.5">Showroom · Service · Sourcing</div>
            </div>
          </div>
          <div className="mt-8 space-y-5">
            <Row icon={MapPin} title="New Showroom"><>Moi Avenue, opposite Equity Bank<br/>Mombasa, Kenya</></Row>
            <Row icon={Clock} title="Hours"><>Mon – Sat · 8:00 – 18:00<br/>Sun · By appointment</></Row>
            <Row icon={Mail} title="Email">sales@mercpointmotors.co.ke</Row>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Row = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="flex gap-4">
    <div className="size-9 rounded-sm border border-midnight flex items-center justify-center text-primary shrink-0">
      <Icon className="size-4" />
    </div>
    <div>
      <div className="spec text-steel">{title}</div>
      <div className="text-chrome text-sm mt-1 leading-relaxed">{children}</div>
    </div>
  </div>
);
