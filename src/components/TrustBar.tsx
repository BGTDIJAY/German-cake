import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { memo } from "react";

function TrustBar() {
  return (
    <section className="py-3 md:py-4 bg-accent/30 border-y border-border/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 md:gap-3"
        >
          <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-yellow-500" />
          <span className="text-xs md:text-sm font-bold text-foreground">
            Rated 4.8 / 5
          </span>
          <span className="text-border">|</span>
          <span className="text-xs md:text-sm text-muted-foreground">
            Trusted by <span className="font-semibold text-foreground">500+</span> Happy Customers
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(TrustBar);
