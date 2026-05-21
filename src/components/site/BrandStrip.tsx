const brands = [
  "AUDI", "BMW", "BYD", "CHANGAN", "GWM (HAVAL)", "HONDA", "HYUNDAI",
  "JAGUAR", "KIA", "LAND ROVER / RANGE ROVER", "LEXUS", "MAZDA",
  "MERCEDES-BENZ", "NISSAN", "PORSCHE", "PROTON", "SUBARU", "TOYOTA", "VOLKSWAGEN",
];

export const BrandStrip = () => (
  <section className="border-y border-midnight bg-carbon py-8 overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-6 flex items-center justify-between">
      <div className="eyebrow">Marques We Source</div>
      <div className="spec text-steel">18+ Premium Brands</div>
    </div>
    <div className="relative">
      <div className="flex marquee gap-16 w-max">
        {[...brands, ...brands].map((b, i) => (
          <div key={i} className="font-display font-semibold text-steel/60 hover:text-chrome transition-colors text-2xl whitespace-nowrap tracking-tight">
            {b}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-carbon to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-carbon to-transparent" />
    </div>
  </section>
);
