import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function MobileBottomBar() {
  const { items, setCartOpen } = useCart();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 bg-white/90 backdrop-blur-xl border-t border-border/30 p-3 flex gap-3">
      <a
        href="#products"
        className="flex-1 py-3 rounded-full gradient-primary text-primary-foreground text-center font-medium text-sm uppercase tracking-wide"
      >
        Order Now
      </a>
      <button
        onClick={() => setCartOpen(true)}
        className="px-5 py-3 rounded-full gradient-gold text-white font-medium text-sm flex items-center gap-2 uppercase tracking-wide"
      >
        <ShoppingCart className="w-4 h-4" />
        {totalItems > 0 && <span>{totalItems}</span>}
      </button>
    </div>
  );
}
