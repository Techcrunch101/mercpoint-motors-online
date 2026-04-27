import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { BrandStrip } from "@/components/site/BrandStrip";
import { Inventory } from "@/components/site/Inventory";
import { Standard } from "@/components/site/Standard";
import { Reviews } from "@/components/site/Reviews";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { NewArrivalsModal } from "@/components/site/NewArrivalsModal";

const Index = () => (
  <main className="min-h-screen bg-carbon">
    <Nav />
    <Hero />
    <BrandStrip />
    <Inventory />
    <Standard />
    <Reviews />
    <Contact />
    <Footer />
    <NewArrivalsModal />
  </main>
);

export default Index;
