import { Instagram, Youtube, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/german.cakes.jaipur?igsh=d3FjNTE1Zm5xbHN4&utm_source=qr",
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@germancakesjaipur",
    label: "YouTube",
  },
  {
    icon: MessageCircle,
    href: "https://wa.me/919660719462",
    label: "WhatsApp",
  },
];

export default function SocialSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.4 }}
      className="fixed right-2 md:right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1 md:gap-1.5 bg-card/80 backdrop-blur-xl rounded-full py-1.5 md:py-2 px-1 md:px-1.5 shadow-card border border-border/20"
    >
      {socials.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 + i * 0.08 }}
            className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent transition-all"
          >
            <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
