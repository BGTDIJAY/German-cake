import Navbar from "@/components/Navbar";
import ReviewSection from "@/components/ReviewSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";

const ReviewsPage = () => (
  <div className="min-h-screen bg-background pt-16 md:pt-20">
    <SEO
      title="Customer Reviews | German Cakes Bindayaka Jaipur"
      description="Read 1000+ five-star reviews from happy customers across Jaipur and Rajasthan. See why German Cakes is Bindayaka's most-loved bakery."
      path="/reviews"
      keywords="German Cakes reviews, best bakery reviews Jaipur, Bindayaka bakery reviews, cake shop reviews Jaipur"
    />
    <Navbar />
    <ReviewSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default ReviewsPage;
