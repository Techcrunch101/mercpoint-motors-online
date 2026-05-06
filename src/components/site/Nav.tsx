import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import logo from "@/assets/mercpoint-logo.png";

const links = [
  { label: "Inventory", href: "#inventory" },
  { label: "Stock List", href: "/stock" },
  { label: "Standard", href: "/#standard" },
  { label: "Reviews", href: "/#reviews" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

export const Nav = () => (
  <motion.header
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-white/80 border-b border-midnight"
  >
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
      <a href="/" className="flex items-center gap-3">
        <img src={logo} alt="Mercpoint Motors" className="h-14 w-14 object-contain drop-shadow-md" />
        <div className="leading-none">
          <div className="font-display font-bold text-chrome tracking-tight text-[15px]">MERCPOINT</div>
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
      <a href="tel:+254729321412" className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-primary text-primary-foreground font-medium text-sm shadow-cta hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 ease-glide">
        <Phone className="size-4" /> Call Sales
      </a>
    </div>
  </motion.header>
);
