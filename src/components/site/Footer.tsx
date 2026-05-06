export const Footer = () => (
  <footer className="bg-background border-t border-midnight">
    <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="spec text-steel">© {new Date().getFullYear()} Mercpoint Motors Ltd · Mombasa, Kenya</div>
      <div className="flex items-center gap-6 spec text-steel">
        <a href="/#inventory" className="hover:text-chrome transition-colors">Inventory</a>
        <a href="/stock" className="hover:text-chrome transition-colors">Stock List</a>
        <a href="/about" className="hover:text-chrome transition-colors">About</a>
        <a href="/#contact" className="hover:text-chrome transition-colors">Contact</a>
      </div>
    </div>
  </footer>
);
