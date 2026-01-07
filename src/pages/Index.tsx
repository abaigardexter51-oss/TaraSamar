import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { DestinationsPreview } from "@/components/home/DestinationsPreview";
import { BusinessesPreview } from "@/components/home/BusinessesPreview";
import { BookingCTA } from "@/components/home/BookingCTA";
import { Testimonials } from "@/components/home/Testimonials";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DestinationsPreview />
      <BusinessesPreview />
      <BookingCTA />
      <Testimonials />
      <Footer />
    </main>
  );
};

export default Index;
