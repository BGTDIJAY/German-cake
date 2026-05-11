import { useState, memo } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Sparkles, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import cakeCustom from "@/assets/cake-custom.png";
import { openWhatsAppOrder } from "@/lib/whatsapp";

const steps = ["Flavor", "Size", "Theme", "Details"];
const flavors = ["Chocolate", "Vanilla", "Red Velvet", "Butterscotch", "Pineapple", "Mango", "Black Forest", "Strawberry"];
const sizes = ["0.5 kg", "1 kg", "1.5 kg", "2 kg", "3 kg", "5 kg"];
const themes = ["Birthday", "Wedding", "Anniversary", "Cartoon", "Floral", "Minimalist", "Photo Cake", "Other"];

function CustomCakeSection() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ flavor: "", size: "", theme: "", message: "", date: "", customFlavor: "", customSize: "", customTheme: "" });

  const getFlavor = () => form.customFlavor || form.flavor || "Not selected";
  const getSize = () => form.customSize || form.size || "Not selected";
  const getTheme = () => form.customTheme || form.theme || "Not selected";

  const handleSubmitWhatsApp = () => {
    const lines = [
      "🎂 *Custom Cake Order - German Cakes*",
      "",
      `🍰 *Flavor:* ${getFlavor()}`,
      `📏 *Size:* ${getSize()}`,
      `🎨 *Theme:* ${getTheme()}`,
      `✍️ *Message on cake:* ${form.message || "None"}`,
      `📅 *Delivery Date:* ${form.date || "Not specified"}`,
      "",
      "Please confirm availability and price. Thank you! 🙏",
    ];
    openWhatsAppOrder(lines.join("\n"));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmitWhatsApp();
  };

  return (
    <section id="custom" className="py-12 md:py-20 relative overflow-hidden bg-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-border/30" />
      <div className="absolute top-20 -left-20 w-40 md:w-80 h-40 md:h-80 rounded-full bg-teal-light/50 blur-[100px]" />
      <div className="absolute bottom-10 -right-20 w-48 md:w-96 h-48 md:h-96 rounded-full bg-accent/30 blur-[100px]" />

      <div className="container mx-auto px-3 md:px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="absolute w-80 h-80 rounded-full bg-accent/30 blur-3xl" />
            <img src={cakeCustom} alt="Custom Cake" className="relative z-10 w-80 float-animation drop-shadow-xl" loading="lazy" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-primary mb-2 md:mb-3 font-medium flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" /> Customize
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-display font-bold mb-6 md:mb-10">
              Create Your <span className="text-gradient-teal italic">Dream Cake</span>
            </h2>

            <div className="flex gap-2 md:gap-3 mb-6 md:mb-8">
              {steps.map((s, i) => (
                <div key={s} className="flex-1">
                  <div className={`h-1 md:h-1.5 rounded-full transition-all ${i <= step ? "gradient-primary" : "bg-border"}`} />
                  <span className={`text-[8px] md:text-[10px] mt-1.5 md:mt-2 block uppercase tracking-widest ${i <= step ? "text-primary font-medium" : "text-muted-foreground"}`}>{s}</span>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-card border border-border/10 min-h-[180px] md:min-h-[220px]">
              {step === 0 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {flavors.map((f) => (
                      <button key={f} onClick={() => setForm({ ...form, flavor: f, customFlavor: "" })}
                        className={`px-3 md:px-4 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium transition-all ${
                          form.flavor === f && !form.customFlavor ? "gradient-primary text-primary-foreground shadow-glow-teal" : "bg-accent/40 hover:bg-accent text-foreground/50 hover:text-primary"
                        }`}>{f}</button>
                    ))}
                  </div>
                  <input type="text" placeholder="Or type your own flavor..." value={form.customFlavor}
                    onChange={(e) => setForm({ ...form, customFlavor: e.target.value, flavor: "" })}
                    className="w-full px-4 py-3 rounded-xl md:rounded-2xl bg-accent/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/20 text-sm" />
                </div>
              )}
              {step === 1 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {sizes.map((s) => (
                      <button key={s} onClick={() => setForm({ ...form, size: s, customSize: "" })}
                        className={`px-3 md:px-4 py-3 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium transition-all ${
                          form.size === s && !form.customSize ? "gradient-primary text-primary-foreground shadow-glow-teal" : "bg-accent/40 hover:bg-accent text-foreground/50 hover:text-primary"
                        }`}>{s}</button>
                    ))}
                  </div>
                  <input type="text" placeholder="Or type your own size (e.g. 4 kg, 2-tier)..." value={form.customSize}
                    onChange={(e) => setForm({ ...form, customSize: e.target.value, size: "" })}
                    className="w-full px-4 py-3 rounded-xl md:rounded-2xl bg-accent/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/20 text-sm" />
                </div>
              )}
              {step === 2 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 md:gap-3">
                    {themes.map((t) => (
                      <button key={t} onClick={() => setForm({ ...form, theme: t, customTheme: "" })}
                        className={`px-3 md:px-4 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium transition-all ${
                          form.theme === t && !form.customTheme ? "gradient-primary text-primary-foreground shadow-glow-teal" : "bg-accent/40 hover:bg-accent text-foreground/50 hover:text-primary"
                        }`}>{t}</button>
                    ))}
                  </div>
                  <input type="text" placeholder="Or describe your own theme..." value={form.customTheme}
                    onChange={(e) => setForm({ ...form, customTheme: e.target.value, theme: "" })}
                    className="w-full px-4 py-3 rounded-xl md:rounded-2xl bg-accent/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/20 text-sm" />
                </div>
              )}
              {step === 3 && (
                <div className="space-y-3 md:space-y-4">
                  <input type="text" placeholder="Message on cake..." value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl md:rounded-2xl bg-accent/30 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/20 text-sm" />
                  <div className="flex items-center gap-2 md:gap-3">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                    <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl md:rounded-2xl bg-accent/30 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/20 text-sm" />
                  </div>
                  <p className="text-[10px] md:text-xs text-muted-foreground text-center">📷 You can send reference images directly on WhatsApp after submitting</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 md:gap-3 mt-4 md:mt-6">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)}
                  className="px-4 md:px-6 py-3 rounded-full bg-card border border-border text-foreground/60 font-medium hover:bg-accent transition-all text-xs md:text-sm uppercase tracking-wide">
                  Back
                </button>
              )}
              <button onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-6 py-3 rounded-full gradient-primary text-primary-foreground font-medium shadow-glow-teal hover:shadow-dreamy transition-all hover:scale-[1.02] text-xs md:text-sm uppercase tracking-wide">
                {step < 3 ? (<>Next <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" /></>) : (<><MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4" /> Send on WhatsApp</>)}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default memo(CustomCakeSection);
