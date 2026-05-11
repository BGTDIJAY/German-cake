import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Calendar, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { memo } from "react";

const contactItems = [
  { icon: MapPin, title: "Address", text: "Anand Niketan, 6, Sirsi Rd, Bindayaka, Jaipur, Rajasthan 302041" },
  { icon: Phone, title: "Phone", text: "+91 96607 19462", href: "tel:+919660719462" },
  { icon: Clock, title: "Open Until", text: "10:00 PM" },
  { icon: Calendar, title: "Est.", text: "Since 2018" },
];

function ContactSection() {
  return (
    <section id="contact" className="py-8 md:py-20 relative bg-card overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border/30" />
      <div className="absolute top-1/3 -right-20 w-32 md:w-72 h-32 md:h-72 rounded-full bg-accent/30 blur-[80px]" />
      <div className="absolute bottom-1/3 -left-20 w-32 md:w-72 h-32 md:h-72 rounded-full bg-accent/30 blur-[80px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5 md:mb-14"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-1.5 md:mb-3 font-medium">Find Us</p>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-display font-bold">
            Visit <span className="text-gradient-teal italic">German Cakes</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Mobile layout */}
          <div className="flex flex-col gap-2.5 md:hidden">
            {contactItems.map((info, i) => {
              const Icon = info.icon;
              const card = (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 bg-background rounded-xl px-4 py-3 border border-border/10 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow-teal">
                    <Icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{info.title}</p>
                    <p className="text-xs font-semibold text-foreground leading-snug">{info.text}</p>
                  </div>
                </motion.div>
              );
              return info.href ? (
                <a key={info.title} href={info.href}>{card}</a>
              ) : (
                <div key={info.title}>{card}</div>
              );
            })}
          </div>

          {/* Desktop layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactItems.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background rounded-3xl p-8 text-center shadow-card hover-lift border border-border/10"
                >
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-5 shadow-glow-teal">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-2">{info.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{info.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Google Maps embed */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-5 md:mt-10 max-w-5xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden border border-border/10 shadow-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.2!2d75.7!3d26.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAnand+Niketan+6+Sirsi+Rd+Bindayaka+Jaipur+Rajasthan+302041!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="220"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="German Cakes Jaipur Location"
              className="w-full h-[180px] md:h-[280px]"
            />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-5 md:mt-10 flex flex-col sm:flex-row gap-2.5 md:gap-3 justify-center items-center"
        >
          <a
            href="https://wa.me/919660719462"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 md:px-8 py-2.5 md:py-3 rounded-full gradient-primary text-primary-foreground font-medium text-xs md:text-sm tracking-wide hover:shadow-glow-teal transition-all hover:scale-105 uppercase"
          >
            <MessageCircle className="w-4 h-4" /> Order on WhatsApp
          </a>
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 md:px-8 py-2.5 md:py-3 rounded-full border border-primary/30 text-primary font-medium text-xs md:text-sm tracking-wide hover:bg-accent transition-all hover:scale-105 uppercase"
          >
            <MapPin className="w-4 h-4" /> View Map & Details
          </Link>
          <a
            href="https://www.instagram.com/german.cakes.jaipur/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 md:px-8 py-2.5 md:py-3 rounded-full border border-primary/30 text-primary font-medium text-xs md:text-sm tracking-wide hover:bg-accent transition-all hover:scale-105 uppercase"
          >
            <Instagram className="w-4 h-4" /> Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ContactSection);
