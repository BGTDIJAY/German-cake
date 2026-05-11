import { useState, useEffect, useMemo, useCallback } from "react";
import { Search, ShoppingCart, Menu, X, Home, Cake, Image, MessageCircle, Star, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { popularSearches, getRecentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } from "@/data/products";
import { fetchCakes, type CakeProduct } from "@/lib/adminApi";


const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Catalog", href: "/catalog" },
  { label: "Custom Cakes", href: "/custom-cake" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

const mobileTabLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Catalog", href: "/catalog", icon: Cake },
  { label: "Gallery", href: "/gallery", icon: Image },
  { label: "Reviews", href: "/reviews", icon: Star },
  { label: "Contact", href: "/contact", icon: MessageCircle },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [allCakes, setAllCakes] = useState<CakeProduct[]>([]);
  const { items, setCartOpen } = useCart();
  const navigate = useNavigate();
  
  const location = useLocation();
  const isHome = location.pathname === "/";
  const useLight = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lazy-load live cakes the first time the search panel opens
  useEffect(() => {
    if (!searchOpen || allCakes.length > 0) return;
    fetchCakes().then(setAllCakes).catch(() => {});
  }, [searchOpen, allCakes.length]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const searchResults = useMemo<CakeProduct[]>(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allCakes.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.subcategory ?? "").toLowerCase().includes(q) ||
        (c.description ?? "").toLowerCase().includes(q)
    );
  }, [searchQuery, allCakes]);

  const handleSearchOpen = useCallback(() => {
    setSearchOpen(true);
    setRecentSearches(getRecentSearches());
  }, []);

  const handleSearchClose = useCallback(() => {
    if (searchQuery.trim()) addRecentSearch(searchQuery);
    setSearchOpen(false);
    setSearchQuery("");
  }, [searchQuery]);

  const handleSuggestionClick = useCallback((term: string) => {
    setSearchQuery(term);
    addRecentSearch(term);
    setRecentSearches(getRecentSearches());
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-card/80 backdrop-blur-2xl shadow-dreamy py-2"
            : "bg-transparent py-3 md:py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(0, 3).map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1.5px] after:rounded-full after:transition-all hover:after:w-full ${
                  useLight
                    ? "text-white/60 hover:text-white after:bg-white"
                    : "text-foreground/50 hover:text-primary after:bg-primary"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <Link to="/" className="flex items-center gap-2">
            <span className={`text-2xl md:text-3xl lg:text-4xl font-script transition-colors ${
              useLight ? "text-white" : "text-gradient-teal"
            }`}>
              German Cakes
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.slice(3).map((l) => (
              <Link
                key={l.label}
                to={l.href}
                className={`text-xs uppercase tracking-[0.15em] font-medium transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1.5px] after:rounded-full after:transition-all hover:after:w-full ${
                  useLight
                    ? "text-white/60 hover:text-white after:bg-white"
                    : "text-foreground/50 hover:text-primary after:bg-primary"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => { searchOpen ? handleSearchClose() : handleSearchOpen(); }}
              className={`p-2 md:p-2.5 rounded-full transition-colors ${
                useLight ? "hover:bg-white/10" : "hover:bg-accent"
              }`}
            >
              <Search className={`w-4 h-4 ${useLight ? "text-white/70" : "text-foreground/50"}`} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className={`p-2 md:p-2.5 rounded-full transition-colors relative ${
                useLight ? "hover:bg-white/10" : "hover:bg-accent"
              }`}
            >
              <ShoppingCart className={`w-4 h-4 ${useLight ? "text-white/70" : "text-foreground/50"}`} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-gold text-white text-[9px] md:text-[10px] flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 md:p-2.5 rounded-full transition-colors ${
                useLight ? "hover:bg-white/10" : "hover:bg-accent"
              }`}
            >
              {mobileOpen ? (
                <X className={`w-5 h-5 ${useLight ? "text-white" : "text-foreground"}`} />
              ) : (
                <Menu className={`w-5 h-5 ${useLight ? "text-white" : "text-foreground"}`} />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <>
              {/* Overlay to close search */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-[-1]"
                onClick={handleSearchClose}
              />
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-visible bg-card/95 backdrop-blur-2xl border-t border-border/20"
              >
                <div className="container mx-auto px-4 py-3 md:py-4">
                  {/* Search input */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                          addRecentSearch(searchQuery);
                          setRecentSearches(getRecentSearches());
                        }
                        if (e.key === "Escape") handleSearchClose();
                      }}
                      placeholder="Search cakes, desserts, categories..."
                      className="w-full pl-10 pr-10 py-3 rounded-2xl bg-background text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all text-sm"
                    />
                    {searchQuery ? (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-accent transition-colors"
                      >
                        <X className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSearchClose}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {/* Results / Suggestions panel */}
                  <div className="mt-3 bg-card rounded-2xl border border-border/30 shadow-card max-h-[60vh] overflow-y-auto scroll-hide">
                    {searchQuery.trim() ? (
                      searchResults.length > 0 ? (
                        <div className="py-1">
                          <div className="px-4 pt-3 pb-2">
                            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
                            </p>
                          </div>
                          {searchResults.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => {
                                addRecentSearch(searchQuery);
                                const q = searchQuery.trim();
                                setSearchQuery("");
                                setSearchOpen(false);
                                // Pin clicked cake to top of catalog; related cakes follow
                                navigate(`/catalog?pin=${p.id}${q ? `&q=${encodeURIComponent(q)}` : ""}`);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent/50 active:bg-accent transition-colors text-left"
                            >
                              <img
                                src={p.image || "/placeholder.svg"}
                                alt={p.name}
                                className="w-11 h-11 rounded-xl object-cover flex-shrink-0 border border-border/20"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-xs text-primary font-bold">₹{p.price}</span>
                                  {p.subcategory && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium capitalize">{p.subcategory}</span>
                                  )}
                                  {p.category && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-secondary/20 text-secondary-foreground font-medium capitalize">{p.category}</span>
                                  )}
                                </div>
                              </div>
                              <div className="flex-shrink-0 p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
                                <ArrowRight className="w-3.5 h-3.5 text-primary" />
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-8 text-center">
                          <Search className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">No results for "{searchQuery}"</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">Try "cupcake", "pastry", "cookie", or "chocolate"</p>
                        </div>
                      )
                    ) : (
                      <div className="py-2">
                        {recentSearches.length > 0 && (
                          <div className="mb-1">
                            <div className="flex items-center justify-between px-4 pt-2.5 pb-1.5">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3 h-3 text-muted-foreground" />
                                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Recent searches</p>
                              </div>
                              <button
                                onClick={() => { clearRecentSearches(); setRecentSearches([]); }}
                                className="text-[10px] text-muted-foreground hover:text-destructive transition-colors font-medium"
                              >
                                Clear all
                              </button>
                            </div>
                            {recentSearches.map((term) => (
                              <div key={term} className="flex items-center gap-1 px-4 py-1.5 hover:bg-accent/50 transition-colors group">
                                <button
                                  onClick={() => handleSuggestionClick(term)}
                                  className="flex items-center gap-3 flex-1 text-left py-0.5"
                                >
                                  <Clock className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />
                                  <span className="text-sm text-foreground/70 flex-1">{term}</span>
                                  <ArrowRight className="w-3 h-3 text-muted-foreground/30" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeRecentSearch(term);
                                    setRecentSearches(getRecentSearches());
                                  }}
                                  className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-destructive/10 transition-all"
                                >
                                  <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                                </button>
                              </div>
                            ))}
                            <div className="mx-4 my-1.5 border-t border-border/20" />
                          </div>
                        )}

                        {/* Categories */}
                        <div className="flex items-center gap-1.5 px-4 pt-1 pb-2">
                          <Cake className="w-3 h-3 text-muted-foreground" />
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Categories</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 px-4 pb-2.5">
                          {["Cake", "Cupcake", "Pastry", "Cookie", "Dessert", "Theme Cake", "Occasion"].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => handleSuggestionClick(cat)}
                              className="px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 hover:bg-primary/15 text-xs text-primary hover:text-primary transition-colors font-medium"
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        <div className="mx-4 my-1 border-t border-border/20" />

                        {/* Popular */}
                        <div className="flex items-center gap-1.5 px-4 pt-2 pb-2">
                          <TrendingUp className="w-3 h-3 text-muted-foreground" />
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Popular searches</p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                          {popularSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => handleSuggestionClick(term)}
                              className="px-3 py-1.5 rounded-full bg-accent/60 hover:bg-accent text-xs text-foreground/70 hover:text-primary transition-colors font-medium"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-card/95 backdrop-blur-2xl"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col gap-0.5">
                {navLinks.map((l) => (
                  <Link
                    key={l.label}
                    to={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2.5 px-4 rounded-xl text-foreground/60 hover:bg-accent hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-card/95 backdrop-blur-2xl border-t border-border/30 safe-area-bottom">
        <div className="flex items-center justify-around py-1.5 pb-2">
          {mobileTabLinks.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.label}
                to={tab.href}
                className="flex flex-col items-center gap-0.5 px-2 py-1 text-foreground/40 hover:text-primary transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setCartOpen(true)}
            className="flex flex-col items-center gap-0.5 px-2 py-1 text-foreground/40 hover:text-primary transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-[10px] font-medium">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 right-0 w-4 h-4 rounded-full bg-gold text-white text-[9px] flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
