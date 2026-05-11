import Navbar from "@/components/Navbar";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";

const GalleryPage = () => (
  <div className="min-h-screen bg-background pt-16 md:pt-20">
    <SEO
      title="Cake Gallery | German Cakes Bindayaka Jaipur — Photo, Theme & Designer Cakes"
      description="Browse our gallery of custom, designer, photo and theme cakes baked in Bindayaka, Jaipur. Real cakes delivered to real customers across Rajasthan."
      path="/gallery"
      keywords="cake gallery Jaipur, designer cake photos, theme cake gallery, custom cake gallery, German Cakes gallery, Bindayaka cakes photos"
    />
    <Navbar />
    <GallerySection />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default GalleryPage;
