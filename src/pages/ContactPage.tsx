import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, Calendar, Mail, MessageCircle, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "919660719462";

const contactCards = [
  {
    icon: MapPin,
    title: "Visit Us",
    text: "Anand Niketan, 6, Sirsi Rd, Bindayaka, Jaipur, Rajasthan 302041",
    action: { label: "Get Directions", href: "https://maps.google.com/?q=Anand+Niketan+6+Sirsi+Rd+Bindayaka+Jaipur+Rajasthan+302041" },
  },
  {
    icon: Phone,
    title: "Call Us",
    text: "+91 96607 19462",
    action: { label: "Call Now", href: "tel:+919660719462" },
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Chat with us for orders & queries",
    action: { label: "Send Message", href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd like to inquire about cakes.")}` },
  },
  {
    icon: Clock,
    title: "Working Hours",
    text: "Open Daily · 10:00 AM – 10:00 PM",
    action: null,
  },
];

const ContactPage = () => (
  <div className="min-h-screen bg-background pt-16 md:pt-20">
    <SEO
      title="Contact German Cakes Bindayaka Jaipur | Call, WhatsApp & Visit"
      description="Visit German Cakes at Anand Niketan, Sirsi Road, Bindayaka, Jaipur. Call +91 96607 19462 or WhatsApp us for orders, custom cakes & enquiries."
      path="/contact"
      keywords="contact German Cakes, bakery contact Jaipur, cake shop Bindayaka phone, German Cakes address, German Cakes WhatsApp"
    />
    <Navbar />

    {/* Hero banner */}
    <section className="relative bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/10 py-14 md:py-24 overflow-hidden">
      <div className="absolute top-10 -left-20 w-60 h-60 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-10 -right-20 w-60 h-60 rounded-full bg-secondary/10 blur-[100px]" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-2 font-medium">Get in Touch</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-3">
            Contact <span className="text-gradient-teal italic">German Cakes</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
            Serving Jaipur with love since <strong>2018</strong>. Reach out for custom orders, inquiries, or just to say hello!
          </p>
        </motion.div>
      </div>
    </section>

    {/* Contact cards */}
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
          {contactCards.map((info, i) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-5 md:p-6 shadow-card hover-lift border border-border/10 flex flex-col"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl gradient-primary flex items-center justify-center mb-3 shadow-glow-teal">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-base md:text-lg mb-1">{info.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed flex-1">{info.text}</p>
                {info.action && (
                  <a
                    href={info.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    {info.action.label} <ArrowRight className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Map + quick info */}
    <section className="pb-10 md:pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl overflow-hidden shadow-card border border-border/10"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.5!2d75.71!3d26.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3!2sAnand+Niketan+6+Sirsi+Rd+Bindayaka+Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="German Cakes Location - Anand Niketan, Sirsi Rd, Bindayaka, Jaipur"
            />
          </motion.div>

          {/* Side info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border/10 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display font-bold text-xl md:text-2xl mb-4">
                <span className="text-gradient-teal">German Cakes</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Your favorite cake shop in Jaipur, crafting delicious cakes & desserts since 2018. We specialize in custom-designed cakes for every celebration.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>Established in <strong className="text-foreground">2018</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>Anand Niketan, Sirsi Rd, Jaipur</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-6">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full gradient-primary text-primary-foreground font-medium text-xs uppercase tracking-wide hover:shadow-glow-teal transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <a
                href="https://www.instagram.com/german.cakes.jaipur/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-accent text-foreground font-medium text-xs uppercase tracking-wide hover:bg-accent/80 transition-all"
              >
                <Instagram className="w-3.5 h-3.5" /> Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <Footer />
    <WhatsAppButton />
  </div>
);

export default ContactPage;
