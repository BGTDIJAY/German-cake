import { motion } from "framer-motion";
import { ShoppingCart, Cake, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCakes, type CakeProduct } from "@/lib/adminApi";
import CakeQuickView from "@/components/CakeQuickView";
import { openWhatsAppOrder } from "@/lib/whatsapp";

export default function ProductGrid() {
  const { addItem } = useCart();
  const [allCakes, setAllCakes] = useState<CakeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const gridTopRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const subFilter = searchParams.get("sub");
  const queryFilter = (searchParams.get("q") ?? "").trim().toLowerCase();
  const pinParam = searchParams.get("pin");

  useEffect(() => {
    fetchCakes()
      .then((cakes) => setAllCakes(cakes))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Apply filters whenever inputs change
  const products = useMemo(() => {
    let list = allCakes;
    if (categoryFilter) list = list.filter((c) => c.category === categoryFilter);
    if (subFilter) list = list.filter((c) => c.subcategory === subFilter);
    if (queryFilter) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(queryFilter) ||
          c.category.toLowerCase().includes(queryFilter) ||
          (c.subcategory ?? "").toLowerCase().includes(queryFilter) ||
          (c.description ?? "").toLowerCase().includes(queryFilter)
      );
    }
    return list;
  }, [allCakes, categoryFilter, subFilter, queryFilter]);

  // When ?pin=<id> is in the URL, sync it into local pin state and reset on filter change
  useEffect(() => {
    setPinnedId(pinParam);
    if (pinParam) {
      // Auto-open the quick-view modal when arriving via search / shared link
      setQuickViewId(pinParam);
      setTimeout(() => gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  }, [pinParam, categoryFilter, subFilter, queryFilter]);

  // Order: pinned first, then related (same subcategory, else same category), then rest
  const ordered = useMemo(() => {
    if (!pinnedId) return products;
    const pinned = allCakes.find((p) => p.id === pinnedId);
    if (!pinned) return products;

    // Make sure the pinned cake is included even if filters would normally exclude it
    const others = products.filter((p) => p.id !== pinnedId);
    const related = others.filter(
      (p) =>
        (pinned.subcategory && p.subcategory === pinned.subcategory) ||
        (!pinned.subcategory && p.category === pinned.category)
    );
    const relatedIds = new Set(related.map((p) => p.id));
    const rest = others.filter((p) => !relatedIds.has(p.id));
    return [pinned, ...related, ...rest];
  }, [products, allCakes, pinnedId]);

  const heading = subFilter || categoryFilter || (queryFilter ? `Results for "${queryFilter}"` : null);

  return (
    <section id="products" ref={gridTopRef} className="py-12 md:py-20 bg-background relative scroll-mt-24">
      <div className="container mx-auto px-3 md:px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-2 md:mb-3 font-medium">
            {subFilter ? categoryFilter : "Fresh & Delicious"}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold">
            {heading ? (
              <span className="text-gradient-teal italic">{heading}</span>
            ) : (
              <>Our Best <span className="text-gradient-teal italic">Cakes</span></>
            )}
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : ordered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Cake className="w-12 h-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {heading ? `No cakes in "${heading}" yet` : "Coming Soon"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {heading ? "Check back shortly or browse other categories!" : "Our catalog is being updated. Check back shortly!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {ordered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, layout: { duration: 0.35 } }}
                onClick={() => {
                  setPinnedId(p.id);
                  // Smoothly scroll the pinned cake to the top of the grid
                  gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  // Open quick-view modal in place of navigating to a detail page
                  setTimeout(() => setQuickViewId(p.id), 350);
                }}
                className={`group bg-card rounded-2xl md:rounded-3xl overflow-hidden shadow-card hover-lift border cursor-pointer transition-all ${
                  pinnedId === p.id ? "border-primary ring-2 ring-primary/30" : "border-border/20"
                }`}
              >
                <div className="relative aspect-square bg-gradient-to-br from-accent/40 to-teal-light/30 p-4 md:p-6 flex items-center justify-center overflow-hidden">
                  <img
                    src={p.image || "/placeholder.svg"}
                    alt={p.name}
                    className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-2 transition-all duration-500"
                    loading="lazy"
                  />
                  {(p.subcategory || p.category) && (
                    <span className="absolute top-2 left-2 md:top-3 md:left-3 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-gold text-white text-[8px] md:text-[10px] font-bold uppercase tracking-wider shadow-card">
                      {p.subcategory || p.category}
                    </span>
                  )}
                </div>
                <div className="p-3 md:p-5">
                  <h3 className="font-display font-semibold text-sm md:text-lg text-foreground leading-tight line-clamp-1">{p.name}</h3>
                  <div className="flex items-center gap-1.5 md:gap-2 mt-1">
                    <span className="text-base md:text-lg font-bold text-gradient-teal font-display">₹{p.price}</span>
                  </div>
                  <div className="mt-2 md:mt-3 grid grid-cols-2 gap-1.5 md:gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem({ id: p.id, name: p.name, price: p.price, image: p.image || "/placeholder.svg" });
                      }}
                      className="flex items-center justify-center gap-1 px-2 py-2 md:py-2.5 rounded-full gradient-primary text-primary-foreground text-[10px] md:text-xs font-medium hover:shadow-glow-teal transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide"
                    >
                      <ShoppingCart className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      <span className="hidden xs:inline sm:inline">Add</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const msg =
                          `Hi German Cakes! 👋\n\nI'd like to buy:\n\n` +
                          `🎂 *${p.name}*\n` +
                          `💰 Price: ₹${p.price}\n` +
                          `🏷️ Category: ${p.category}${p.subcategory ? ` › ${p.subcategory}` : ""}\n\n` +
                          `Please confirm availability & delivery. Thank you!`;
                        openWhatsAppOrder(msg);
                      }}
                      className="flex items-center justify-center gap-1 px-2 py-2 md:py-2.5 rounded-full bg-[#25D366] text-white text-[10px] md:text-xs font-medium hover:shadow-card transition-all hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wide"
                    >
                      <MessageCircle className="w-3 h-3 md:w-3.5 md:h-3.5" />
                      Buy
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Discount banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 rounded-2xl md:rounded-3xl gradient-primary p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-glow-teal"
        >
          <div className="text-center md:text-left">
            <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-1 md:mb-2">Tasty discount</p>
            <h3 className="text-4xl md:text-6xl font-display font-bold text-white">10%</h3>
            <p className="text-white/70 text-xs md:text-sm mt-1 md:mt-2">When buying from ₹999</p>
          </div>
          <a
            href="#products"
            className="px-6 md:px-8 py-3 rounded-full bg-white text-teal-dark font-semibold text-xs md:text-sm uppercase tracking-wide hover:shadow-dreamy transition-all hover:scale-105"
          >
            More details
          </a>
        </motion.div>
      </div>

      <CakeQuickView
        cake={allCakes.find((c) => c.id === quickViewId) ?? null}
        open={!!quickViewId}
        onClose={() => setQuickViewId(null)}
        onDeleted={(id) => setAllCakes((prev) => prev.filter((c) => c.id !== id))}
      />
    </section>
  );
}
