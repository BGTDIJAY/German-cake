import { useEffect, useRef, memo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import menuClassic from "@/assets/new/teddy-cake.jpg";
import menuGourmet from "@/assets/new/designer-cake.jpg";
import menuDesigner from "@/assets/new/pretty-doll-cake.jpg";
import menuPhoto from "@/assets/new/photo-cake.jpg";
import menuDesserts from "@/assets/new/strawberry-teddy-cake.jpg";
import menuWedding from "@/assets/new/cake-for-girls.jpg";

interface CategoryItem {
  label: string;
  image: string;
  // Category and subcategory match values used in the catalog filter URL params
  category?: string;
  sub?: string;
  startingPrice: number;
}

const categories: CategoryItem[] = [
  { label: "Teddy Cake",       image: menuClassic,  sub: "Animal Cakes",         category: "Theme Cakes",    startingPrice: 650 },
  { label: "Designer Cake",    image: menuGourmet,  sub: "All Designer Cakes",   category: "Theme Cakes",    startingPrice: 850 },
  { label: "Doll Cake",        image: menuDesigner, sub: "Princess Cakes",       category: "Theme Cakes",    startingPrice: 900 },
  { label: "Photo Cake",       image: menuPhoto,    sub: "Birthday Photo Cakes", category: "Birthday Cakes", startingPrice: 750 },
  { label: "Theme Cake",       image: menuDesserts, category: "Theme Cakes",     startingPrice: 700 },
  { label: "Cake for Girls",   image: menuWedding,  sub: "Cakes For Girls",      category: "Theme Cakes",    startingPrice: 800 },
];

function buildLink(cat: CategoryItem) {
  const params = new URLSearchParams();
  if (cat.category) params.set("category", cat.category);
  if (cat.sub) params.set("sub", cat.sub);
  return `/catalog?${params.toString()}`;
}

function MenuShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // Add-to-cart removed from menu tiles — sizes vary; use Customize instead.
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let scrollPos = el.scrollLeft;
    const speed = 0.4;

    const animate = () => {
      if (!paused && el) {
        scrollPos += speed;
        if (scrollPos >= el.scrollWidth / 2) scrollPos = 0;
        el.scrollLeft = scrollPos;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [paused]);

  // Duplicate items for seamless loop
  const items = [...categories, ...categories];

  return (
    <section className="py-8 md:py-16 bg-accent/30">
      <div className="text-center mb-5 md:mb-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-1.5 md:mb-3 font-medium">Browse by Style</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold">
            Our <span className="text-gradient-teal italic">Menu</span>
          </h2>
          <p className="text-[11px] md:text-sm text-muted-foreground mt-1.5 md:mt-2">
            Tap a category to explore — or order in one tap
          </p>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        className="flex gap-3 md:gap-6 overflow-x-auto scroll-hide px-3 md:px-8 snap-x snap-mandatory md:snap-none"
        style={{ scrollBehavior: "auto" }}
      >
        {items.map((cat, i) => (
          <motion.div
            key={`${cat.label}-${i}`}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
            className="flex-shrink-0 w-[44vw] sm:w-44 md:w-52 lg:w-60 snap-start group"
          >
            <div
              onClick={() => navigate(buildLink(cat))}
              className="relative aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-card border border-border/10 mb-2 md:mb-3 cursor-pointer"
            >
              <img
                src={cat.image}
                alt={`${cat.label} cakes — starting at ₹${cat.startingPrice}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 44vw, (max-width: 768px) 11rem, (max-width: 1024px) 13rem, 15rem"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2 md:bottom-2 md:left-3 md:right-3">
                <p className="text-white text-[9px] md:text-[10px] uppercase tracking-wider opacity-80">From</p>
                <p className="text-white font-display font-bold text-sm md:text-lg leading-tight">₹{cat.startingPrice}</p>
              </div>
            </div>

            <p className="text-center text-[11px] md:text-sm font-semibold uppercase tracking-wider text-foreground/75 group-hover:text-primary transition-colors mb-2">
              {cat.label}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/custom-cake?style=${encodeURIComponent(cat.label)}`);
              }}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 md:py-2.5 rounded-full gradient-primary text-primary-foreground text-[11px] md:text-xs font-semibold uppercase tracking-wide hover:shadow-glow-teal transition-all active:scale-95"
              aria-label={`Customize ${cat.label}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Customize
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default memo(MenuShowcase);
