import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, MessageCircle, Tag, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCake, type CakeProduct } from "@/lib/adminApi";
import { useCart } from "@/context/CartContext";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { openWhatsAppOrder } from "@/lib/whatsapp";
import { toast } from "sonner";

function sizeRank(s: string) {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 999;
}

interface Props {
  cake: CakeProduct | null;
  open: boolean;
  onClose: () => void;
  onDeleted?: (id: string) => void;
}

export default function CakeQuickView({ cake, open, onClose, onDeleted }: Props) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isLoggedIn } = useAdminAuth();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [deleting, setDeleting] = useState(false);

  // Reset selected size whenever the cake changes
  useEffect(() => {
    if (!cake) return;
    const keys = Object.keys(cake.sizePrices ?? {});
    if (keys.length > 0) {
      const smallest = [...keys].sort((a, b) => sizeRank(a) - sizeRank(b))[0];
      setSelectedSize(smallest);
    } else {
      setSelectedSize(cake.size ?? "");
    }
  }, [cake]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const sizeOptions = useMemo(() => {
    if (!cake) return [] as { size: string; price: number }[];
    const entries = Object.entries(cake.sizePrices ?? {});
    if (entries.length > 0) {
      return entries
        .map(([size, price]) => ({ size, price: Number(price) }))
        .sort((a, b) => sizeRank(a.size) - sizeRank(b.size));
    }
    return cake?.size ? [{ size: cake.size, price: cake.price }] : [];
  }, [cake]);

  const currentPrice = useMemo(() => {
    if (!cake) return 0;
    const match = sizeOptions.find((o) => o.size === selectedSize);
    return match ? match.price : cake.price;
  }, [cake, sizeOptions, selectedSize]);

  if (!cake) return null;

  const handleWhatsApp = () => {
    const msg =
      `Hi German Cakes! 👋\n\nI'd like to order:\n\n` +
      `🎂 *${cake.name}*\n` +
      `📏 Size: ${selectedSize || cake.size}\n` +
      `💰 Price: ₹${currentPrice}\n` +
      `🏷️ Category: ${cake.category}${cake.subcategory ? ` › ${cake.subcategory}` : ""}\n\n` +
      `Please confirm availability and delivery details. Thank you!`;
    openWhatsAppOrder(msg);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteCake(cake.id);
      toast.success("Cake deleted");
      onDeleted?.(cake.id);
      onClose();
    } catch (err: any) {
      toast.error(err.message ?? "Failed to delete cake");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-background w-full max-w-[420px] sm:max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-background/90 backdrop-blur border border-border/40 shadow-card flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-background transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
              {/* Image — compact on mobile so the entire card fits in one frame */}
              <div className="relative h-44 sm:h-56 md:h-auto md:min-h-[420px] bg-gradient-to-br from-accent/40 to-teal-light/30">
                <img
                  src={cake.image || "/placeholder.svg"}
                  alt={cake.name}
                  className="w-full h-full object-contain p-3 md:p-6"
                />
                {cake.subcategory && (
                  <span className="absolute top-2 left-2 md:top-3 md:left-3 inline-flex items-center gap-1 px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-gold text-white text-[9px] md:text-[10px] font-bold uppercase tracking-wider shadow-card">
                    <Tag className="w-2.5 h-2.5 md:w-3 md:h-3" /> {cake.subcategory}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col p-3.5 sm:p-5 md:p-7">
                <p className="text-[9px] md:text-xs uppercase tracking-[0.25em] text-primary mb-1 md:mb-2 font-medium line-clamp-1">
                  {cake.category}
                  {cake.subcategory && ` › ${cake.subcategory}`}
                </p>
                <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-foreground leading-tight">
                  {cake.name}
                </h2>

                <div className="flex items-baseline gap-2 mt-1.5 md:mt-3">
                  <motion.span
                    key={currentPrice}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient-teal font-display"
                  >
                    ₹{currentPrice}
                  </motion.span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">
                    {selectedSize ? `for ${selectedSize}` : "inclusive of taxes"}
                  </span>
                </div>

                {cake.description && (
                  <p className="mt-2 md:mt-4 text-[11px] md:text-sm text-foreground/70 leading-relaxed whitespace-pre-line max-h-16 md:max-h-32 overflow-y-auto line-clamp-3 md:line-clamp-none">
                    {cake.description}
                  </p>
                )}

                {sizeOptions.length > 0 && (
                  <div className="mt-3 md:mt-5">
                    <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1.5 md:mb-2">
                      Choose Size
                    </p>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {sizeOptions.map(({ size, price }) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[11px] md:text-xs font-medium border transition-all flex flex-col items-center gap-0 md:gap-0.5 leading-tight ${
                            selectedSize === size
                              ? "bg-primary text-primary-foreground border-primary shadow-glow-teal"
                              : "bg-background text-foreground/70 border-border hover:border-primary/40 hover:text-primary"
                          }`}
                        >
                          <span>{size}</span>
                          <span className={`text-[9px] md:text-[10px] ${selectedSize === size ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                            ₹{price}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3 md:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  <Button
                    size="sm"
                    className="gap-2 h-10 md:h-11 text-xs md:text-sm"
                    onClick={() => {
                      addItem({
                        id: selectedSize ? `${cake.id}__${selectedSize}` : cake.id,
                        name: selectedSize ? `${cake.name} (${selectedSize})` : cake.name,
                        price: currentPrice,
                        image: cake.image || "/placeholder.svg",
                      });
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleWhatsApp}
                    className="gap-2 h-10 md:h-11 text-xs md:text-sm border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#1ebe57]"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </Button>
                </div>

                {isLoggedIn && (
                  <div className="mt-4 p-3 rounded-xl border border-primary/30 bg-primary/5">
                    <p className="text-[10px] uppercase tracking-wider text-primary font-semibold mb-2">
                      Admin actions
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => {
                          onClose();
                          navigate(`/admin/add?edit=${cake.id}`);
                        }}
                      >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="gap-2" disabled={deleting}>
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this cake?</AlertDialogTitle>
                            <AlertDialogDescription>
                              "{cake.name}" will be permanently removed from the public catalog. This cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )}

                <div className="mt-3 md:mt-5 pt-2.5 md:pt-4 border-t border-border/30 text-[10px] md:text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-0.5 md:block md:space-y-1">
                  <p>✓ Freshly baked to order</p>
                  <p>✓ Eggless options</p>
                  <p className="hidden md:block">✓ Same-day delivery in Jaipur</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
