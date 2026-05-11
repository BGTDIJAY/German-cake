import { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Link } from "react-router-dom";
import gDesigner from "@/assets/new/designer-cake.jpg";
import gCricket2 from "@/assets/new/cricket-theme-cake-2.jpg";
import gPrettyDoll from "@/assets/new/pretty-doll-cake.jpg";
import gLawyer from "@/assets/new/lawyer-theme-cake.jpg";
import gTeddy2 from "@/assets/new/teddy-cake-2.jpg";
import gTeddyTheme3 from "@/assets/new/teddy-theme-cake-3.jpg";
import gPhotoCake from "@/assets/new/photo-cake.jpg";
import gCakeForGirls from "@/assets/new/cake-for-girls.jpg";
import gMakeup from "@/assets/new/cake-17-makeup.jpg";
import gNaruto from "@/assets/new/cake-18-naruto.jpg";
import gTeddyChoco from "@/assets/new/cake-19-teddy-choco.jpg";
import gChocoMousse from "@/assets/new/cake-20-choco-mousse.jpg";
import gGoku from "@/assets/new/cake-21-goku.jpg";
import gKrishna from "@/assets/new/cake-22-krishna-pot.jpg";
import gGlaze from "@/assets/new/cake-23-glaze-pastry.jpg";
import gBlackGold from "@/assets/new/cake-24-black-gold.jpg";
import gFloral from "@/assets/new/cake-25-floral.jpg";
import gBatman from "@/assets/new/cake-26-batman.jpg";
import gNbc from "@/assets/new/cake-34-nbc-retirement.jpg";
import gMeshu from "@/assets/new/cake-35-meshu-teddy.jpg";
import gChocoRing from "@/assets/new/cake-36-choco-rose-ring.jpg";
import gCricketTier from "@/assets/new/cake-37-cricket-tier.jpg";
import gMangoChoco from "@/assets/new/cake-38-mango-choco.jpg";
import gBlueTeddy from "@/assets/new/cake-42-blue-teddy.jpg";
import gFreshFruit from "@/assets/new/cake-43-fresh-fruit.jpg";
import gChocoButterfly from "@/assets/new/cake-44-choco-butterfly.jpg";
import gRosetteDrip from "@/assets/new/cake-45-rosette-drip.jpg";
import gSanjayRose from "@/assets/new/cake-46-sanjay-rose.jpg";

// Each item picks a span class for a magazine-style collage layout.
// Spans repeat in a pattern so the grid auto-balances on every screen.
const SPAN_PATTERN = [
  "col-span-2 row-span-2",  // big hero
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",  // tall
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",  // wide
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2",  // big hero
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",  // tall
];

const gallery = [
  { img: gNbc, label: "Corporate Retirement", tag: "Custom" },
  { img: gMeshu, label: "Meshu Teddy Theme", tag: "Birthday" },
  { img: gChocoRing, label: "Chocolate Rose Ring", tag: "Premium" },
  { img: gCricketTier, label: "Cricket Tier Cake", tag: "Trending" },
  { img: gMangoChoco, label: "Mango & Chocolate", tag: "Gourmet" },
  { img: gBlueTeddy, label: "Blue Teddy Tower", tag: "Kids" },
  { img: gFreshFruit, label: "Fresh Fruit Cake", tag: "Healthy" },
  { img: gChocoButterfly, label: "Choco Butterfly", tag: "Elegant" },
  { img: gRosetteDrip, label: "Rosette Drip Cake", tag: "For Her" },
  { img: gSanjayRose, label: "White Rose Special", tag: "Anniversary" },
  { img: gDesigner, label: "Designer Special", tag: "Premium" },
  { img: gCricket2, label: "Cricket Theme", tag: "Trending" },
  { img: gPrettyDoll, label: "Pretty Doll", tag: "Bestseller" },
  { img: gLawyer, label: "Lawyer Theme", tag: "Custom" },
  { img: gMakeup, label: "Makeup Theme", tag: "For Her" },
  { img: gNaruto, label: "Naruto Anime", tag: "Anime" },
  { img: gTeddyChoco, label: "Choco Teddy", tag: "Kids" },
  { img: gChocoMousse, label: "Chocolate Mousse", tag: "Gourmet" },
  { img: gTeddy2, label: "Teddy Cake", tag: "Popular" },
  { img: gTeddyTheme3, label: "Teddy Theme", tag: "Cute" },
  { img: gPhotoCake, label: "Photo Cake", tag: "Personalised" },
  { img: gCakeForGirls, label: "Cake for Girls", tag: "Trending" },
  { img: gGoku, label: "Goku Dragon Ball", tag: "Anime" },
  { img: gKrishna, label: "Krishna Pot", tag: "Festive" },
  { img: gGlaze, label: "Mirror Glaze", tag: "Premium" },
  { img: gBlackGold, label: "Black & Gold", tag: "Elegant" },
  { img: gFloral, label: "Floral Square", tag: "Classic" },
  { img: gBatman, label: "Batman Theme", tag: "Kids" },
];

function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section id="gallery" className="py-10 md:py-20 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-border/30" />

      <div className="container mx-auto px-3 md:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 md:mb-14"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-2 md:mb-3 font-medium">Our Creations</p>
          <h2 className="text-2xl md:text-4xl lg:text-6xl font-display font-bold">
            Cake <span className="text-gradient-teal italic">Gallery</span>
          </h2>
          <p className="text-[11px] md:text-sm text-muted-foreground mt-2">A magazine-style collage of our work — tap any cake to see it up close</p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 auto-rows-[110px] sm:auto-rows-[140px] md:auto-rows-[170px] lg:auto-rows-[190px] gap-2 md:gap-3 grid-flow-dense">
          {gallery.map((item, i) => {
            const span = SPAN_PATTERN[i % SPAN_PATTERN.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: Math.min(i * 0.025, 0.4) }}
                onClick={() => setLightbox(i)}
                className={`group relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer shadow-card border border-border/10 active:scale-95 transition-transform ${span}`}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-1.5 left-1.5 md:top-2.5 md:left-2.5 px-1.5 md:px-2 py-0.5 rounded-full bg-card/85 backdrop-blur text-[8px] md:text-[10px] font-semibold text-primary uppercase tracking-wider">
                  {item.tag}
                </span>
                <div className="absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 w-6 h-6 md:w-7 md:h-7 rounded-full bg-card/85 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3 h-3 md:w-3.5 md:h-3.5 text-foreground" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                  <span className="text-white font-display font-semibold text-[11px] md:text-sm drop-shadow-lg line-clamp-1">{item.label}</span>
                </div>
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
            to="/gallery"
            className="inline-flex items-center gap-2 px-5 md:px-8 py-2.5 md:py-3 rounded-full gradient-primary text-primary-foreground font-medium text-[11px] md:text-sm tracking-wide hover:shadow-glow-teal transition-all hover:scale-105 uppercase"
          >
            View Full Gallery
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/85 backdrop-blur-xl flex items-center justify-center p-3 md:p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={gallery[lightbox].img}
                alt={gallery[lightbox].label}
                className="w-full max-h-[80vh] object-contain rounded-2xl md:rounded-3xl shadow-dreamy bg-card"
              />
              <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 bg-card/90 backdrop-blur rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm md:text-lg">{gallery[lightbox].label}</h3>
                  <span className="text-[9px] md:text-xs text-primary font-medium uppercase tracking-wider">{gallery[lightbox].tag}</span>
                </div>
                <span className="text-[10px] md:text-xs text-muted-foreground">{lightbox + 1}/{gallery.length}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default memo(GallerySection);
