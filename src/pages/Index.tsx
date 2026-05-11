import Navbar from "@/components/Navbar";
import CategoryBar from "@/components/CategoryBar";
import HeroSection from "@/components/HeroSection";
import MenuShowcase from "@/components/MenuShowcase";
import BestsellerSection from "@/components/BestsellerSection";
import CustomCakeSection from "@/components/CustomCakeSection";
import OurPromise from "@/components/OurPromise";
import OfferBanner from "@/components/OfferBanner";
import TrustBar from "@/components/TrustBar";
import GallerySection from "@/components/GallerySection";
import ReviewSection from "@/components/ReviewSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="German Cakes Bindayaka Jaipur | Best Bakery & Custom Cakes Near You"
        description="German Cakes — Bindayaka's premium bakery in Jaipur. Order custom, designer, photo & theme cakes, desserts & fast food online. Same-day delivery."
        path="/"
        keywords="German Cakes, German Cakes Bindayaka, German Cakes Jaipur, custom cakes Jaipur, designer cakes, photo cakes, theme cakes, eggless cakes, bakery near me, bakery in Jaipur, cakes in Rajasthan, cake delivery Bindayaka"
      />
      <Navbar />
      <HeroSection />
      <CategoryBar />
      <MenuShowcase />
      <BestsellerSection />
      <CustomCakeSection />
      <OurPromise />
      <OfferBanner />
      <TrustBar />
      <GallerySection />
      <ReviewSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
