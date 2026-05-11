import { motion } from "framer-motion";
import { Shield, Award, Clock, Sparkles } from "lucide-react";
import { memo } from "react";

const promises = [
  { icon: Shield, title: "100% Hygienic", desc: "Made in certified clean kitchens" },
  { icon: Award, title: "Best Ingredients", desc: "Premium quality in every bite" },
  { icon: Clock, title: "Freshly Baked", desc: "Made fresh for every order" },
  { icon: Sparkles, title: "Since 2018", desc: "Trusted by thousands in Jaipur" },
];

function OurPromise() {
  return (
    <section className="py-8 md:py-12 bg-accent/20 border-y border-border/10">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-lg md:text-2xl font-display font-bold mb-6 md:mb-8"
        >
          Our <span className="text-gradient-teal italic">Promise</span>
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {promises.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 bg-card rounded-2xl px-4 py-3 md:px-5 md:py-4 shadow-card border border-border/10"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow-teal">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-[11px] md:text-sm font-bold text-foreground">{p.title}</h3>
                  <p className="text-[9px] md:text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(OurPromise);
