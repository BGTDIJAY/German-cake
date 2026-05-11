import { motion } from "framer-motion";
import { memo, useState } from "react";
import { Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CakeQuickView from "./CakeQuickView";
import type { CakeProduct } from "@/lib/adminApi";

import bestTeddyCake from "@/assets/new/teddy-cake.jpg";
import bestDollCake from "@/assets/new/doll-cake.jpg";
import bestCricketCake from "@/assets/new/cricket-theme-cake.jpg";
import bestPhotoCake from "@/assets/new/photo-cake.jpg";
import bestStrawberryTeddy from "@/assets/new/strawberry-teddy-cake.jpg";
import bestCakeForGirls from "@/assets/new/cake-for-girls.jpg";

interface Bestseller {
  id: string;
  name: string;
  image: string;
  category: string;
  subcategory: string;
  description: string;
  sizePrices: Record<string, number>;
}

const bestsellers: Bestseller[] = [
  {
    id: "best-teddy",
    name: "Cute Teddy Theme Cake",
    image: bestTeddyCake,
    category: "Theme Cakes",
    subcategory: "Animal Cakes",
    description: "Adorable teddy bear theme — perfect for kids' birthdays. Soft buttercream, vegetarian.",
    sizePrices: { "0.5 kg": 650, "1 kg": 1200, "1.5 kg": 1700, "2 kg": 2200, "2.5 kg": 2700, "3 kg": 3200 },
  },
  {
    id: "best-doll",
    name: "Pretty Doll Cake",
    image: bestDollCake,
    category: "Theme Cakes",
    subcategory: "Princess Cakes",
    description: "Classic princess doll cake with hand-piped frosting and edible decorations.",
    sizePrices: { "1 kg": 1199, "1.5 kg": 1700, "2 kg": 2200, "2.5 kg": 2700, "3 kg": 3200 },
  },
  {
    id: "best-cricket",
    name: "Cricket Theme Cake",
    image: bestCricketCake,
    category: "Theme Cakes",
    subcategory: "Sports Cakes",
    description: "For the cricket fan — pitch, bat, ball and stumps in edible buttercream.",
    sizePrices: { "0.5 kg": 700, "1 kg": 1099, "1.5 kg": 1599, "2 kg": 2099, "2.5 kg": 2599, "3 kg": 3099 },
  },
  {
    id: "best-photo",
    name: "Personalised Photo Cake",
    image: bestPhotoCake,
    category: "Birthday Cakes",
    subcategory: "Birthday Photo Cakes",
    description: "Print any photo on top — share photo on WhatsApp after ordering.",
    sizePrices: { "0.5 kg": 550, "1 kg": 799, "1.5 kg": 1199, "2 kg": 1599, "2.5 kg": 1999, "3 kg": 2399 },
  },
  {
    id: "best-strawberry-teddy",
    name: "Strawberry Teddy Cake",
    image: bestStrawberryTeddy,
    category: "Theme Cakes",
    subcategory: "Animal Cakes",
    description: "Strawberry cream with a fondant teddy on top. A bestseller for first birthdays.",
    sizePrices: { "0.5 kg": 650, "1 kg": 949, "1.5 kg": 1399, "2 kg": 1849, "2.5 kg": 2299, "3 kg": 2749 },
  },
  {
    id: "best-girls",
    name: "Princess Cake for Girls",
    image: bestCakeForGirls,
    category: "Theme Cakes",
    subcategory: "Cakes For Girls",
    description: "Pastel princess theme cake with rosettes and pearl finish.",
    sizePrices: { "0.5 kg": 700, "1 kg": 1049, "1.5 kg": 1499, "2 kg": 1999, "2.5 kg": 2499, "3 kg": 2999 },
  },
];

function startingPrice(b: Bestseller) {
  const prices = Object.values(b.sizePrices);
  return prices.length ? Math.min(...prices) : 0;
}

function toCakeProduct(b: Bestseller): CakeProduct {
  const smallestSize = Object.keys(b.sizePrices).sort(
    (a, z) => parseFloat(a) - parseFloat(z)
  )[0] ?? "1 kg";
  return {
    id: b.id,
    name: b.name,
    price: startingPrice(b),
    size: smallestSize,
    category: b.category,
    subcategory: b.subcategory,
    description: b.description,
    image: b.image,
    sizePrices: b.sizePrices,
    createdAt: "",
  };
}

function BestsellerSection() {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [activeCake, setActiveCake] = useState<CakeProduct | null>(null);

  const toggleLike = (i: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <section className="py-10 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-10"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-display font-bold">
            Our <span className="text-gradient-teal italic">Bestsellers</span>
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground mt-2">
            Tap any cake to choose size & order
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5">
          {bestsellers.map((cake, i) => {
            const from = startingPrice(cake);
            return (
              <motion.div
                key={cake.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group cursor-pointer"
                onClick={() => setActiveCake(toCakeProduct(cake))}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-card border border-border/10 mb-2">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 w-4 h-4 md:w-5 md:h-5 rounded-sm border-2 border-green-600 bg-white flex items-center justify-center">
                    <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-600" />
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(i); }}
                    aria-label="Save to favourites"
                    className="absolute top-2 right-2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/85 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${liked.has(i) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                  </button>
                </div>
                <h3 className="text-xs md:text-sm font-medium text-foreground truncate">{cake.name}</h3>
                <p className="text-sm md:text-base font-bold text-foreground mt-0.5">
                  <span className="text-[10px] md:text-xs font-medium text-muted-foreground mr-1">From</span>
                  ₹{from}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-6 md:mt-10"
        >
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-primary uppercase tracking-wider hover:underline underline-offset-4 transition-all"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>

      <CakeQuickView
        cake={activeCake}
        open={activeCake !== null}
        onClose={() => setActiveCake(null)}
      />
    </section>
  );
}

export default memo(BestsellerSection);
