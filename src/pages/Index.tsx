import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { BrandStrip } from "@/components/site/BrandStrip";
import { Inventory } from "@/components/site/Inventory";
import { Standard } from "@/components/site/Standard";
import { Reviews } from "@/components/site/Reviews";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { NewArrivalsModal } from "@/components/site/NewArrivalsModal";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, []);
  return (
  <main className="min-h-screen bg-background">
    <Nav />
    <Hero />
    <BrandStrip />
    <Inventory />
    <Standard />
    <Reviews />
    <Contact />
    <Footer />
    <NewArrivalsModal />
    <WhatsAppFab />
  </main>
  );
};

export default Index;
