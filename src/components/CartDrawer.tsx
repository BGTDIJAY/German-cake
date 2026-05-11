import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { openWhatsAppOrder } from "@/lib/whatsapp";

export default function CartDrawer() {
  const { items, cartOpen, setCartOpen, removeItem, updateQty, total, clearCart } = useCart();
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<"COD" | "UPI">("COD");

  const handleOrder = () => {
    // Build WhatsApp message with order details
    const itemLines = items
      .map((item) => `• ${item.name} x${item.quantity} — ₹${item.price * item.quantity}`)
      .join("\n");

    const message = `🎂 *New Order — German Cakes*\n\n` +
      `*Customer:* ${name || "Not provided"}\n` +
      `*Phone:* ${phone || "Not provided"}\n` +
      `*Address:* ${address || "Not provided"}\n` +
      `*Payment:* ${payment}\n\n` +
      `*Order Items:*\n${itemLines}\n\n` +
      `*Total: ₹${total}*\n\n` +
      `Thank you! 🙏`;

    openWhatsAppOrder(message);

    // Show confirmation
    setOrderPlaced(true);
    clearCart();

    // Auto-close after 4 seconds
    setTimeout(() => {
      setOrderPlaced(false);
      setCheckoutMode(false);
      setCartOpen(false);
      setName("");
      setPhone("");
      setAddress("");
    }, 4000);
  };

  const handleClose = () => {
    setCartOpen(false);
    setCheckoutMode(false);
    setOrderPlaced(false);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bark/30 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              <h3 className="text-xl font-display font-bold flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                {orderPlaced ? "Order Confirmed" : checkoutMode ? "Checkout" : "Your Cart"}
              </h3>
              <button onClick={handleClose} className="p-2.5 rounded-full hover:bg-accent transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderPlaced ? (
              /* Order placed confirmation */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, delay: 0.1 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-primary mb-6" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-display font-bold text-foreground mb-2"
                >
                  Order Placed on WhatsApp! 🎉
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="text-muted-foreground text-sm max-w-xs"
                >
                  Your order has been sent to our WhatsApp. We'll confirm your order and delivery details shortly!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  Check your WhatsApp for confirmation
                </motion.div>
              </div>
            ) : !checkoutMode ? (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.length === 0 ? (
                    <div className="text-center text-muted-foreground py-16">
                      <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-border" />
                      <p className="font-display text-lg">Your cart is empty</p>
                      <p className="text-sm mt-1">Add some delicious cakes!</p>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center bg-accent/20 rounded-2xl p-3 border border-border/10">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded-xl bg-background p-1" />
                        <div className="flex-1">
                          <h4 className="font-display font-semibold text-sm">{item.name}</h4>
                          <p className="text-primary font-bold text-sm">₹{item.price * item.quantity}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="p-1 rounded-lg hover:bg-background transition-colors"><Minus className="w-3 h-3" /></button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="p-1 rounded-lg hover:bg-background transition-colors"><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))
                  )}
                </div>
                {items.length > 0 && (
                  <div className="p-6 border-t border-border/30 space-y-4">
                    <div className="flex justify-between text-lg font-display font-bold">
                      <span>Total</span>
                      <span className="text-gradient-teal">₹{total}</span>
                    </div>
                    <button
                      onClick={() => setCheckoutMode(true)}
                      className="w-full py-3.5 rounded-full gradient-primary text-primary-foreground font-medium shadow-glow-teal hover:shadow-dreamy transition-all uppercase tracking-wide text-sm"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Order summary */}
                <div className="bg-accent/20 rounded-2xl p-4 border border-border/10">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium mb-2">Order Summary</p>
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm py-1">
                      <span className="text-foreground/70">{item.name} × {item.quantity}</span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <input
                  placeholder="Full Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-accent/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/20"
                />
                <input
                  placeholder="Phone Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-accent/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/20"
                />
                <textarea
                  placeholder="Delivery Address"
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-accent/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/20 resize-none"
                />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">Payment Method</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setPayment("COD")}
                      className={`flex-1 py-3.5 rounded-full text-sm font-medium uppercase tracking-wide transition-all ${
                        payment === "COD"
                          ? "gradient-primary text-primary-foreground shadow-glow-teal"
                          : "bg-accent/40 text-foreground/60 border border-border/30"
                      }`}
                    >
                      COD
                    </button>
                    <button
                      onClick={() => setPayment("UPI")}
                      className={`flex-1 py-3.5 rounded-full text-sm font-medium uppercase tracking-wide transition-all ${
                        payment === "UPI"
                          ? "gradient-gold text-white"
                          : "bg-accent/40 text-foreground/60 border border-border/30"
                      }`}
                    >
                      UPI
                    </button>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-display font-bold pt-4 border-t border-border/30">
                  <span>Total</span>
                  <span className="text-gradient-teal">₹{total}</span>
                </div>
                <button
                  onClick={handleOrder}
                  disabled={!name.trim() || !phone.trim()}
                  className="w-full py-3.5 rounded-full gradient-primary text-primary-foreground font-medium shadow-glow-teal hover:shadow-dreamy transition-all uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.352 0-4.55-.636-6.453-1.744l-.452-.268-3.137 1.051 1.051-3.137-.268-.452A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Place Order on WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
