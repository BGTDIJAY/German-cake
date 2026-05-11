import { Link } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-bark text-white py-10 md:py-16 pb-20 md:pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />

      <div className="container mx-auto px-3 md:px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-script mb-3 md:mb-4 text-white/90">German Cakes</h3>
            <p className="text-white/35 text-xs md:text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Premium cakes, desserts & fast food handcrafted with love in Jaipur since 2018. Every bite tells a story.
            </p>
            <div className="flex items-center gap-2 mt-4 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/german.cakes.jaipur?igsh=d3FjNTE1Zm5xbHN4&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-gold/20 text-white/60 hover:text-gold transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@germancakesjaipur"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-gold/20 text-white/60 hover:text-gold transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-display font-semibold mb-3 md:mb-5 text-white/70 uppercase text-xs md:text-sm tracking-widest">Quick Links</h4>
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-white/35">
              <Link to="/catalog" className="block hover:text-gold transition-colors">Our Menu</Link>
              <Link to="/custom-cake" className="block hover:text-gold transition-colors">Custom Cakes</Link>
              <Link to="/gallery" className="block hover:text-gold transition-colors">Gallery</Link>
              <Link to="/reviews" className="block hover:text-gold transition-colors">Reviews</Link>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-display font-semibold mb-3 md:mb-5 text-white/70 uppercase text-xs md:text-sm tracking-widest">Contact</h4>
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-white/35">
              <p>📞 +91 96607 19462</p>
              <p>📍 Anand Niketan, 6, Sirsi Rd, Bindayaka, Jaipur, Rajasthan 302041</p>
              <p>🕙 Open until 10:00 PM</p>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-white/5 text-center space-y-2">
          <p className="text-[10px] md:text-xs text-white/20 uppercase tracking-widest">
            © 2018–2026 German Cakes. All rights reserved.
          </p>
          <p className="text-[10px] md:text-xs text-white/30">
            Designed & Developed by{" "}
            <a
              href="https://vsr-tech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors font-semibold"
            >
              VSR Tech
            </a>
          </p>
          <Link
            to="/admin/login"
            className="inline-block text-[10px] text-white/10 hover:text-white/30 transition-colors mt-2"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
