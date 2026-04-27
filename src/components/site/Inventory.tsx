import { motion } from "framer-motion";
import { Gauge, Calendar, Fuel, Cog, ArrowUpRight, ShieldCheck } from "lucide-react";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import car4 from "@/assets/car-4.jpg";
import car5 from "@/assets/car-5.jpg";
import car6 from "@/assets/car-6.jpg";

type Car = {
  img: string; year: number; make: string; model: string; trim: string;
  price: string; km: string; fuel: string; trans: string; engine: string; tag?: string;
};

const cars: Car[] = [
  { img: car1, year: 2021, make: "Mercedes-Benz", model: "C200", trim: "AMG Line", price: "KES 5,850,000", km: "32,400 km", fuel: "Petrol", trans: "Automatic", engine: "1.5L Turbo", tag: "Featured" },
  { img: car2, year: 2020, make: "BMW", model: "X5", trim: "xDrive40i M Sport", price: "KES 9,200,000", km: "41,800 km", fuel: "Petrol", trans: "Automatic", engine: "3.0L I6 Turbo" },
  { img: car3, year: 2019, make: "Toyota", model: "Land Cruiser", trim: "ZX V8", price: "KES 14,400,000", km: "58,100 km", fuel: "Petrol", trans: "Automatic", engine: "4.6L V8", tag: "Just In" },
  { img: car4, year: 2022, make: "Land Rover", model: "Range Rover Sport", trim: "HSE Dynamic", price: "KES 16,750,000", km: "21,300 km", fuel: "Diesel", trans: "Automatic", engine: "3.0L I6 D300" },
  { img: car5, year: 2020, make: "Audi", model: "Q7", trim: "55 TFSI quattro", price: "KES 8,100,000", km: "47,600 km", fuel: "Petrol", trans: "Automatic", engine: "3.0L V6 TFSI" },
  { img: car6, year: 2021, make: "Porsche", model: "Cayenne", trim: "Coupe Platinum", price: "KES 17,900,000", km: "18,200 km", fuel: "Petrol", trans: "PDK", engine: "3.0L V6 Turbo", tag: "Featured" },
];

export const Inventory = () => (
  <section id="inventory" className="bg-carbon py-24 lg:py-32">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
        <div>
          <div className="eyebrow flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-primary" />
            Featured Inventory
          </div>
          <h2 className="mt-4 font-display font-semibold text-chrome text-3xl sm:text-5xl tracking-[-0.025em] leading-[1.05]">
            Six in our showroom<br/>this week.
          </h2>
        </div>
        <a href="#contact" className="group inline-flex items-center gap-2 text-sm text-chrome hover:text-primary transition-colors">
          View full stock list <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((c, i) => (
          <motion.article
            key={i}
            initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group bg-gunmetal border border-midnight rounded-sm overflow-hidden hover:-translate-y-1 hover:border-primary/40 transition-all duration-500 ease-glide"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-carbon">
              <img src={c.img} alt={`${c.year} ${c.make} ${c.model}`} loading="lazy" width={1280} height={896} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-carbon/0 group-hover:bg-carbon/40 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-glide">
                <span className="spec text-primary border border-primary/60 px-3 py-2">VIEW DETAILS</span>
              </div>
              {c.tag && (
                <span className="absolute top-3 left-3 spec bg-primary text-primary-foreground px-2 py-1">{c.tag}</span>
              )}
              <span className="absolute top-3 right-3 spec text-chrome bg-carbon/70 backdrop-blur border border-midnight px-2 py-1 inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3" /> 150-PT
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <div className="spec text-steel">{c.year} · {c.make}</div>
                  <h3 className="font-display font-semibold text-chrome text-xl mt-1 tracking-tight">{c.model}</h3>
                  <div className="text-sm text-steel mt-0.5">{c.trim}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-chrome text-base whitespace-nowrap">{c.price}</div>
                  <div className="spec text-steel mt-0.5">Drive away</div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-midnight grid grid-cols-2 gap-3">
                <Spec icon={<Gauge className="size-3.5" />}>{c.km}</Spec>
                <Spec icon={<Fuel className="size-3.5" />}>{c.fuel}</Spec>
                <Spec icon={<Cog className="size-3.5" />}>{c.trans}</Spec>
                <Spec icon={<Calendar className="size-3.5" />}>{c.engine}</Spec>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const Spec = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 spec text-steel"><span className="text-primary">{icon}</span>{children}</div>
);
