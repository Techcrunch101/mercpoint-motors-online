import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import logo from "@/assets/mercpoint-logo.jpg";

const links = [
  { label: "Inventory", href: "#inventory" },
  { label: "Standard", href: "#standard" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export const Nav = () => (
  <motion.header
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-carbon/70 border-b border-midnight"
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
      <a href="#" className="flex items-center gap-3">
        <div className="size-9 rounded-sm overflow-hidden ring-1 ring-midnight">
          <img src={logo} alt="Mercpoint Motors" className="w-full h-full object-cover" />
        </div>
        <div className="leading-none">
          <div className="font-display font-semibold text-chrome tracking-tight text-[15px]">MERCPOINT</div>
          <div className="spec text-steel text-[10px] mt-0.5">MOTORS LTD</div>
        </div>
      </a>
      <nav className="hidden md:flex items-center gap-8">
        {links.map(l => (
          <a key={l.href} href={l.href} className="text-sm text-steel hover:text-chrome transition-colors duration-300 ease-glide">
            {l.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <a href="tel:+254729321412" className="hidden sm:inline-flex items-center gap-2 text-xs text-steel hover:text-chrome transition-colors">
          <Phone className="size-3.5" /> +254 729 321 412
        </a>
        <a href="https://wa.me/254729321412" target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 h-10 rounded-sm bg-primary text-primary-foreground font-medium text-sm shadow-cta hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 ease-glide">
          <MessageCircle className="size-4" /> WhatsApp
        </a>
      </div>
    </div>
  </motion.header>
);
