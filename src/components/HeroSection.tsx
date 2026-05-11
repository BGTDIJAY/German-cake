import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroCake from "@/assets/hero-cake.png";
import { openWhatsAppOrder } from "@/lib/whatsapp";

export default function HeroSection() {
  const navigate = useNavigate();
  const handleBuy = () => {
    openWhatsAppOrder("Hi! I'd like to order the Vintage Cake (₹499, 2.5 LB). Please confirm availability.");
  };
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden flex items-center pt-16 md:pt-20 pb-0">
      {/* Abstract decorative shapes */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-white/5 blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-white/5 blur-[60px]" />

      {/* Floating petals - hidden on mobile for performance */}
      <motion.div
        className="hidden md:block absolute top-[22%] left-[48%] w-5 h-8 rounded-full bg-pink-300/50 rotate-45"
        animate={{ y: [0, -20, 0], rotate: [45, 60, 45] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hidden md:block absolute top-[18%] left-[55%] w-4 h-6 rounded-full bg-pink-200/40 rotate-12"
        animate={{ y: [0, -15, 0], rotate: [12, -10, 12] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="hidden md:block absolute top-[30%] left-[42%] w-3 h-5 rounded-full bg-pink-300/30 -rotate-30"
        animate={{ y: [0, -25, 0], rotate: [-30, 10, -30] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <div className="absolute top-20 right-[15%] w-2 md:w-3 h-2 md:h-3 rounded-full bg-gold/60 float-animation" />
      <div className="absolute top-40 left-[20%] w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-white/40 float-animation-delayed" />

      <div className="w-full relative z-10 px-4 md:px-6 lg:px-12 xl:px-20">
        {/* Mobile layout: stacked */}
        <div className="flex flex-col lg:hidden items-center justify-center min-h-[calc(100vh-64px)] gap-4">
          {/* Cake image - centered on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute top-[5%] right-[-2%] bg-white/85 backdrop-blur-xl px-3 py-2 rounded-xl shadow-dreamy z-20 float-animation-delayed"
            >
              <div className="text-[8px] uppercase tracking-widest text-muted-foreground">Cake</div>
              <div className="text-base font-script text-foreground">"Vintage"</div>
            </motion.div>

            <motion.img
              src={heroCake}
              alt="Premium Vintage Cake with roses on a cake stand"
              className="w-[280px] sm:w-[320px] float-animation drop-shadow-2xl"
            />
          </motion.div>

          {/* Text content - mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl font-display font-bold leading-[1.1] mb-3">
              <span className="text-white/90 italic tracking-wide">THE TASTE</span>
              <br />
              <span className="text-white font-bold uppercase">OF <span className="italic font-normal text-white/80">YOUR</span></span>
              <br />
              <span className="text-white uppercase font-bold tracking-wide">CELEBRATION</span>
            </h1>

            <p className="text-xs text-white/50 max-w-[250px] mx-auto mb-5 leading-relaxed font-light italic">
              Individual and custom-made cakes. Guests of your holiday will be delighted.
            </p>

            <div className="flex flex-row gap-3 justify-center">
              <button
                onClick={handleBuy}
                className="px-6 py-2.5 rounded-full bg-white/90 text-teal-dark font-semibold text-xs tracking-wider hover:shadow-dreamy transition-all uppercase"
              >
                Buy
              </button>
              <button
                onClick={() => navigate("/catalog")}
                className="px-6 py-2.5 rounded-full border-2 border-white/30 text-white font-semibold text-xs tracking-wider hover:bg-white/10 transition-all uppercase"
              >
                View all
              </button>
            </div>
          </motion.div>

          {/* Mobile specs row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-6 mt-2"
          >
            <div className="text-center">
              <div className="text-[8px] uppercase tracking-widest text-white/40">Weight</div>
              <div className="text-lg font-display font-bold text-white">2.5 <span className="text-[10px] font-body font-normal text-white/50">LB</span></div>
            </div>
            <div className="text-center">
              <div className="text-[8px] uppercase tracking-widest text-white/40">Time</div>
              <div className="text-lg font-display font-bold text-white">72 <span className="text-[10px] font-body font-normal text-white/50">H</span></div>
            </div>
            <div className="text-center">
              <div className="text-[8px] uppercase tracking-widest text-white/40">Price</div>
              <div className="text-lg font-display font-bold text-white">₹499</div>
            </div>
          </motion.div>

        </div>

        {/* Desktop layout: three columns */}
        <div className="hidden lg:flex relative items-end lg:items-center justify-center min-h-[calc(100vh-80px)]">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 text-left max-w-md"
          >
            <h1 className="text-7xl xl:text-8xl font-display font-bold leading-[1.05] mb-6">
              <span className="text-white/90 italic tracking-wide">THE TASTE</span>
              <br />
              <span className="text-white font-bold uppercase">OF <span className="italic font-normal text-white/80">YOUR</span></span>
              <br />
              <span className="text-white uppercase font-bold tracking-wide">CELEBRATION</span>
            </h1>

            <p className="text-sm text-white/50 max-w-xs mb-8 leading-relaxed font-light italic">
              Individual and custom-made cakes.
              <br />
              Guests of your holiday will be delighted.
            </p>

            <div className="flex flex-row gap-4">
              <button
                onClick={handleBuy}
                className="px-8 py-3 rounded-full bg-white/90 text-teal-dark font-semibold text-sm tracking-wider hover:shadow-dreamy transition-all hover:scale-105 uppercase"
              >
                Buy
              </button>
              <button
                onClick={() => navigate("/catalog")}
                className="px-8 py-3 rounded-full border-2 border-white/30 text-white font-semibold text-sm tracking-wider hover:bg-white/10 transition-all hover:scale-105 uppercase"
              >
                View all
              </button>
            </div>
          </motion.div>

          {/* Center - Hero Cake */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative z-10 flex items-end justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute top-[15%] right-[-5%] md:right-[5%] bg-white/85 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-dreamy z-20 float-animation-delayed"
            >
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Cake</div>
              <div className="text-xl font-script text-foreground">"Vintage"</div>
            </motion.div>

            <motion.img
              src={heroCake}
              alt="Premium Vintage Cake with roses on a cake stand"
              className="w-[480px] lg:w-[560px] xl:w-[620px] float-animation drop-shadow-2xl"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
          </motion.div>

          {/* Right - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col items-end text-right absolute right-0 top-1/2 -translate-y-1/2 z-20 gap-7"
          >
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">Cake description</div>
              <p className="text-xs text-white/60 leading-relaxed max-w-[200px]">
                Sponge cake with cocoa in combination with cappuccino cream and blueberries
              </p>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Cake weight</div>
              <div className="text-3xl font-display font-bold text-white">
                2.5 <span className="text-sm font-body font-normal text-white/50">POUND</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Production time</div>
              <div className="text-3xl font-display font-bold text-white">
                72 <span className="text-sm font-body font-normal text-white/50">H</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Product price</div>
              <div className="text-4xl font-display font-bold text-white">
                ₹499
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop carousel dots */}
        <div className="hidden lg:flex gap-2 justify-center pb-8 -mt-4 relative z-20">
          <span className="w-2.5 h-2.5 rounded-full bg-white" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80H1440V20C1440 20 1200 60 720 60C240 60 0 20 0 20V80Z" fill="hsl(168, 28%, 95%)" />
        </svg>
      </div>
    </section>
  );
}
