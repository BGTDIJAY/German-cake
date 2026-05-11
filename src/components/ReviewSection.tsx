import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Priya S.", text: "The best cakes in Jaipur! Ordered a custom wedding cake and it was absolutely stunning. Highly recommend!", rating: 5 },
  { name: "Rahul M.", text: "Amazing taste and beautiful presentation. The Red Velvet was out of this world!", rating: 5 },
  { name: "Anjali K.", text: "German Cakes never disappoints. Perfect for every celebration. Love their butterscotch!", rating: 5 },
  { name: "Vikram T.", text: "Ordered a photo cake for my daughter's birthday. She was thrilled! Great quality.", rating: 4 },
  { name: "Sneha P.", text: "The custom cake wizard made ordering so easy. The cake turned out exactly as I wanted!", rating: 5 },
  { name: "Arjun D.", text: "Fast delivery and the cake was fresh and delicious. Will order again!", rating: 5 },
];

const doubled = [...reviews, ...reviews];

export default function ReviewSection() {
  return (
    <section id="reviews" className="py-12 md:py-20 overflow-hidden bg-background relative">
      <div className="container mx-auto px-3 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-2 md:mb-3 font-medium">Feedback</p>
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold">
            What They <span className="text-gradient-teal italic">Say</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex animate-marquee">
          {doubled.map((r, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 md:w-80 mx-2 md:mx-3 bg-card rounded-2xl md:rounded-3xl p-5 md:p-7 shadow-card border border-border/10"
            >
              <div className="flex gap-0.5 mb-3 md:mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3.5 h-3.5 md:w-4 md:h-4 ${j < r.rating ? "fill-gold text-gold" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-5 leading-relaxed line-clamp-3">{r.text}</p>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-7 h-7 md:w-9 md:h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-[10px] md:text-xs font-bold">
                  {r.name.charAt(0)}
                </div>
                <span className="font-semibold text-xs md:text-sm text-foreground">{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
