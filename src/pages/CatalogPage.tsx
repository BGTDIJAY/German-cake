import Navbar from "@/components/Navbar";
import CategoryBar from "@/components/CategoryBar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";

const CatalogPage = () => (
  <div className="min-h-screen bg-background pt-16 md:pt-20">
    <SEO
      title="Cake Catalog | German Cakes Bindayaka Jaipur — Order Custom & Designer Cakes"
      description="Shop birthday cakes, designer cakes, photo cakes, theme cakes, eggless cakes, cupcakes & desserts online. Same-day delivery across Jaipur."
      path="/catalog"
      keywords="cake catalog Jaipur, order cake online Jaipur, custom cakes, designer cakes, photo cakes, theme cakes, eggless cakes, cupcakes, pastries, German Cakes Bindayaka"
    />
    <Navbar />
    <CategoryBar />
    <ProductGrid />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default CatalogPage;
