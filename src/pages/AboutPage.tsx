import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Award, Heart, Sparkles, Users, Cake, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const values = [
  { icon: Heart, title: "Made with Love", text: "Every cake is handcrafted with care, the way grandma's recipes were always meant to be." },
  { icon: Sparkles, title: "Premium Ingredients", text: "Pure dairy, real fruits and Belgian-style chocolate — nothing artificial, nothing skimped." },
  { icon: Award, title: "Award-Winning", text: "Trusted by thousands of Jaipur families for birthdays, weddings and corporate events since 2018." },
  { icon: Users, title: "1000+ Happy Clients", text: "From intimate get-togethers to grand celebrations, we've baked our way into countless hearts." },
  { icon: Cake, title: "Custom Designs", text: "Photo cakes, theme cakes, tiered cakes — if you can dream it, our pastry chefs can craft it." },
  { icon: Clock, title: "Always Fresh", text: "Baked-to-order daily. Same-day delivery available across Jaipur." },
];

const AboutPage = () => {
  useEffect(() => {
    document.title = "About German Cakes Bindayaka Jaipur | Our Story & Bakery";
  }, []);

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <SEO
        title="About German Cakes Bindayaka Jaipur | Our Story & Bakery"
        description="Bindayaka's most-loved bakery since 2018. Premium custom cakes, designer pastries & celebrations across Jaipur and Rajasthan. Read our story."
        path="/about"
        keywords="about German Cakes, German Cakes story, best bakery Bindayaka, bakery in Jaipur, Jaipur cake studio, premium bakery Rajasthan"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-90" />
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-gold/30 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-white/20 blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-white/70 mb-3 font-medium"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white"
          >
            Welcome to <span className="font-script italic text-gold">German Cakes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-2xl mx-auto text-sm md:text-base text-white/80 leading-relaxed"
          >
            Bindayaka's most-loved bakery — crafting premium custom cakes, designer pastries and heartfelt
            celebrations across Jaipur and Rajasthan since 2018.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-2 font-medium">Since 2018</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              A bakery built on <span className="text-gradient-teal italic">passion</span>
            </h2>
          </motion.div>

          <div className="space-y-5 text-foreground/75 text-sm md:text-base leading-relaxed">
            <p>
              German Cakes began in a tiny home kitchen in Bindayaka with a single oven, a worn-out whisk and
              one big dream — to bake the kind of cakes that make people pause mid-bite. What started as
              weekend orders for friends quickly grew into one of Jaipur's most-loved neighbourhood bakeries.
            </p>
            <p>
              Today, our flagship store on Sirsi Road is where families come for first birthdays, where
              couples come for anniversaries, and where corporate teams come for celebrations big and small.
              Every cake that leaves our counter is hand-finished, photographed and signed off by our head
              pastry chef.
            </p>
            <p>
              We believe a great cake is more than dessert — it's the centrepiece of every memory. That's why
              we use real cream, premium chocolate, fresh seasonal fruits and never cut corners. Whether
              you're ordering a classic black forest or a fully custom theme cake, you'll taste the difference.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-6 mt-10 md:mt-14">
            {[
              { value: "1000+", label: "Happy Customers" },
              { value: "8+", label: "Years Baking" },
              { value: "100+", label: "Cake Designs" },
            ].map((s) => (
              <div key={s.label} className="text-center p-4 md:p-6 rounded-2xl bg-card border border-border/30 shadow-card">
                <p className="text-2xl md:text-4xl font-display font-bold text-gradient-teal">{s.value}</p>
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 md:py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-2 font-medium">Why Choose Us</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Baked with <span className="text-gradient-teal italic">love</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 md:p-6 rounded-2xl bg-background border border-border/30 hover-lift"
                >
                  <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center mb-3 shadow-glow-teal">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-base md:text-lg text-foreground mb-1.5">{v.title}</h3>
                  <p className="text-xs md:text-sm text-foreground/65 leading-relaxed">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto rounded-3xl gradient-primary p-8 md:p-14 text-center shadow-glow-teal">
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white">
              Ready to celebrate?
            </h2>
            <p className="text-white/75 mt-3 text-sm md:text-base">
              Browse our catalog or design a custom cake — we'll make it unforgettable.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/catalog"
                className="px-6 md:px-8 py-3 rounded-full bg-white text-teal-dark font-semibold text-xs md:text-sm uppercase tracking-wide hover:shadow-dreamy transition-all hover:scale-105"
              >
                Browse Catalog
              </Link>
              <Link
                to="/custom-cake"
                className="px-6 md:px-8 py-3 rounded-full bg-gold text-white font-semibold text-xs md:text-sm uppercase tracking-wide hover:shadow-dreamy transition-all hover:scale-105"
              >
                Custom Cake
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default AboutPage;
