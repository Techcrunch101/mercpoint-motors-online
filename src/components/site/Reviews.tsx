import { motion } from "framer-motion";

const quotes = [
  { q: "I drove out the same afternoon I signed. Logbook in my name within a week. No back-and-forth, no surprises on the bill.", name: "Wanjiku Mathenge", role: "Bought a 2020 BMW X5", },
  { q: "They quoted my trade-in fairly and credited it on the spot. The C-Class I picked up had clearly been gone over by people who actually know the car.", name: "Ahmed Yusuf", role: "Bought a 2021 Mercedes C200", },
  { q: "I had been burned by direct imports twice. Mercpoint showed me the inspection report before I even asked. That changed how I shop.", name: "Brian Otieno", role: "Bought a 2019 Land Cruiser ZX", },
];

export const Reviews = () => (
  <section id="reviews" className="bg-carbon py-24 lg:py-32">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
      <div className="eyebrow flex items-center gap-3">
        <span className="inline-block w-8 h-px bg-primary" /> Owners
      </div>
      <h2 className="mt-4 font-display font-semibold text-chrome text-3xl sm:text-5xl tracking-[-0.025em] leading-[1.05] max-w-3xl">
        What people who actually<br/>bought from us say.
      </h2>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {quotes.map((t, i) => (
          <motion.figure
            key={i}
            initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gunmetal border border-midnight rounded-sm p-8 flex flex-col"
          >
            <div className="font-display text-primary text-4xl leading-none">"</div>
            <blockquote className="mt-4 text-chrome text-lg leading-relaxed flex-1">{t.q}</blockquote>
            <figcaption className="mt-8 pt-6 border-t border-midnight">
              <div className="font-display text-chrome text-sm">{t.name}</div>
              <div className="spec text-steel mt-1">{t.role}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);
