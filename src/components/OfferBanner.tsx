import { motion } from "framer-motion";
import { Gift, Percent, X } from "lucide-react";
import { memo, useState, useEffect } from "react";

const OFFER_USED_KEY = "german_cakes_first_order_used";

function OfferBanner() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const used = localStorage.getItem(OFFER_USED_KEY);
    setDismissed(used === "true");
  }, []);

  if (dismissed) return null;

  return (
    <section className="py-6 md:py-10 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-lg md:text-2xl font-display font-bold mb-4 md:mb-6"
        >
          Exclusive <span className="text-gradient-teal italic">Offers</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto relative"
        >
          <button
            onClick={() => {
              localStorage.setItem(OFFER_USED_KEY, "true");
              setDismissed(true);
            }}
            className="absolute -top-2 -right-2 z-10 w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>

          <div className="relative rounded-2xl overflow-hidden shadow-card border border-border/20">
            <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 rounded-full bg-background" />
            <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full bg-background" />

            <div className="flex">
              <div className="flex-1 gradient-primary p-5 md:p-7 text-primary-foreground">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase opacity-90">
                    Website Exclusive
                  </span>
                </div>
                <h3 className="text-xl md:text-3xl font-display font-bold leading-tight mb-1">
                  10% OFF
                </h3>
                <p className="text-sm md:text-base font-semibold opacity-95">
                  On Your 1st Website Order
                </p>
                <p className="text-[9px] md:text-[11px] mt-2 opacity-70">
                  T&C Apply | Valid on orders placed via website only
                </p>
              </div>

              <div className="w-28 md:w-36 bg-accent/40 flex flex-col items-center justify-center border-l border-dashed border-border/30 relative">
                <Percent className="w-10 h-10 md:w-14 md:h-14 text-primary/15 absolute" />
                <span className="text-[10px] md:text-xs text-muted-foreground font-semibold tracking-wider z-10">
                  USE CODE
                </span>
                <span className="text-sm md:text-lg font-display font-bold text-primary z-10 mt-0.5">
                  FIRST10
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { OFFER_USED_KEY };
export default memo(OfferBanner);
