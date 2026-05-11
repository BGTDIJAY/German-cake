import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  PartyPopper, Cake, Palette, Heart, Cookie, 
  Gift, Sparkles, Star, ChevronDown, X,
  HeartHandshake, TreePine, Sun, Flower2, 
  Stethoscope, Users, Crown, Flame, Ribbon, Droplets, 
  Camera, Gamepad2, Cherry, IceCreamCone,
  Baby, Cat, Car, Fish, Bike, Train, Plane,
  Sword, Music, Beer, Shirt, Trophy, Footprints,
  GraduationCap, Gem, Drama, Brush, UtensilsCrossed,
  CakeSlice, Coffee, Candy, CircleDot
} from "lucide-react";

interface SubItem {
  label: string;
  icon?: React.ElementType;
}

interface SubGroup {
  title: string;
  items: SubItem[];
}

interface Category {
  label: string;
  icon: React.ElementType;
  subGroups?: SubGroup[];
  highlight?: boolean;
  isLink?: boolean;
}

const categories: Category[] = [
  {
    label: "Customized Cakes",
    icon: Sparkles,
    highlight: true,
    isLink: true,
  },
  {
    label: "Occasion",
    icon: PartyPopper,
    subGroups: [
      {
        title: "Celebrate Every Moment",
        items: [
          { label: "Valentine's Day", icon: Heart },
          { label: "Mother's Day", icon: Flower2 },
          { label: "Father's Day", icon: Crown },
          { label: "Friendship Day", icon: Users },
          { label: "Birthday", icon: Gift },
          { label: "Anniversary", icon: HeartHandshake },
          { label: "World Health Day", icon: Stethoscope },
          { label: "Earth Day", icon: TreePine },
          { label: "World Environment Day", icon: Sun },
          { label: "National Doctor's Day", icon: Stethoscope },
          { label: "Husband Appreciation Day", icon: Heart },
          { label: "Wife Appreciation Day", icon: Heart },
          { label: "International Men's Day", icon: Crown },
          { label: "Moments of Joy", icon: Sparkles },
          { label: "Christmas", icon: Star },
          { label: "New Year", icon: PartyPopper },
          { label: "Diwali", icon: Flame },
          { label: "Raksha Bandhan", icon: Ribbon },
        ],
      },
    ],
  },
  {
    label: "Cakes",
    icon: Cake,
    subGroups: [
      {
        title: "Trending Cakes",
        items: [
          { label: "Fire Cakes", icon: Flame },
          { label: "Ribbon Cakes", icon: Ribbon },
          { label: "Fresh Drops", icon: Droplets },
          { label: "Cricket Cakes", icon: Gamepad2 },
          { label: "Gourmet Cakes", icon: Star },
          { label: "Bento Cakes", icon: IceCreamCone },
          { label: "Camera Cakes", icon: Camera },
          { label: "Anime Cakes", icon: Sparkles },
          { label: "Labubu Cakes", icon: Star },
          { label: "Pinata Cakes", icon: Gift },
          { label: "Drip Cakes", icon: Droplets },
        ],
      },
      {
        title: "By Flavours",
        items: [
          { label: "Chocolate Cakes", icon: Cookie },
          { label: "Butterscotch Cakes", icon: Cherry },
          { label: "Strawberry Cakes", icon: Cherry },
          { label: "Pineapple Cakes", icon: Cherry },
          { label: "Kit Kat Cakes", icon: Cookie },
          { label: "Black Forest Cakes", icon: TreePine },
          { label: "Red Velvet Cakes", icon: Heart },
          { label: "Vanilla Cakes", icon: IceCreamCone },
          { label: "Fruit Cakes", icon: Cherry },
          { label: "Blueberry Cakes", icon: Cherry },
        ],
      },
    ],
  },
  {
    label: "Theme Cakes",
    icon: Palette,
    subGroups: [
      {
        title: "Kids Cakes",
        items: [
          { label: "1st Birthday Cakes", icon: Baby },
          { label: "Princess Cakes", icon: Crown },
          { label: "Animal Cakes", icon: Cat },
          { label: "Masha & The Bear Cakes", icon: Cat },
          { label: "Cakes For Boys", icon: Star },
          { label: "Cakes For Girls", icon: Heart },
          { label: "Number Cakes", icon: CircleDot },
          { label: "Alphabet Cakes", icon: GraduationCap },
          { label: "Car and Vehicle Cakes", icon: Car },
          { label: "Baby Shark Cakes", icon: Fish },
          { label: "Thomas and Friends Cakes", icon: Train },
          { label: "Winnie the Pooh Cakes", icon: Heart },
          { label: "All Kids Cakes", icon: Sparkles },
        ],
      },
      {
        title: "Character Cakes",
        items: [
          { label: "Spiderman Cakes", icon: Sparkles },
          { label: "Unicorn Cakes", icon: Star },
          { label: "Barbie Cakes", icon: Heart },
          { label: "Harry Potter Cakes", icon: Star },
          { label: "Avenger Cakes", icon: Sword },
          { label: "Peppa Pig Cakes", icon: Cat },
          { label: "Doraemon Cakes", icon: Cat },
          { label: "Naruto Cakes", icon: Flame },
          { label: "Cocomelon Cakes", icon: Cherry },
          { label: "Cartoon Cakes", icon: Drama },
          { label: "Super Hero Cakes", icon: Sword },
          { label: "Bluey Cakes", icon: Cat },
          { label: "Bike Cakes", icon: Bike },
          { label: "Iron-Man Cakes", icon: Sword },
          { label: "Moana Cakes", icon: Droplets },
          { label: "Train Cakes", icon: Train },
          { label: "Transformers Cakes", icon: Star },
          { label: "Dragon Ball Cakes", icon: Flame },
          { label: "Panda Cakes", icon: Cat },
          { label: "Fish Cakes", icon: Fish },
          { label: "Ben 10 Cakes", icon: Star },
          { label: "Demon Slayer Cakes", icon: Sword },
          { label: "Bubu Dudu Cakes", icon: Heart },
        ],
      },
      {
        title: "Grown Up Cakes",
        items: [
          { label: "Makeup Cakes", icon: Brush },
          { label: "Bride To Be Cakes", icon: Gem },
          { label: "Wedding Cakes", icon: HeartHandshake },
          { label: "Gym Cakes", icon: Trophy },
          { label: "Party Cakes", icon: PartyPopper },
          { label: "BTS Cakes", icon: Music },
          { label: "Police Cakes", icon: Shirt },
          { label: "Army Cakes", icon: Sword },
          { label: "Beer Cakes", icon: Beer },
          { label: "Bachelor Cakes", icon: PartyPopper },
          { label: "CA Cakes", icon: GraduationCap },
          { label: "Guitar Cakes", icon: Music },
          { label: "Aeroplane Cakes", icon: Plane },
        ],
      },
      {
        title: "More Cakes",
        items: [
          { label: "Jungle Theme Cakes", icon: TreePine },
          { label: "Cricket Cakes", icon: Gamepad2 },
          { label: "Football Cakes", icon: Trophy },
          { label: "Basketball Cakes", icon: Trophy },
          { label: "Rainbow Cakes", icon: Sparkles },
          { label: "Butterfly Cakes", icon: Flower2 },
          { label: "Shinchan Cakes", icon: Star },
          { label: "Dinosaur Cakes", icon: Cat },
          { label: "Pikachu Cakes", icon: Flame },
          { label: "Hulk Cakes", icon: Sword },
          { label: "Jungle Book Cakes", icon: TreePine },
          { label: "All Designer Cakes", icon: Palette },
        ],
      },
    ],
  },
  {
    label: "By Relationship",
    icon: Heart,
    subGroups: [
      {
        title: "For Him",
        items: [
          { label: "Cakes For Friend", icon: Users },
          { label: "Cakes for Father", icon: Crown },
          { label: "Cakes for Husband", icon: Heart },
          { label: "Cakes for Brother", icon: Users },
          { label: "Cakes For Boyfriend", icon: Heart },
        ],
      },
      {
        title: "For Her",
        items: [
          { label: "Cakes For Friend", icon: Users },
          { label: "Cakes for Mother", icon: Flower2 },
          { label: "Cakes for Wife", icon: Heart },
          { label: "Cakes For Girlfriend", icon: Heart },
          { label: "Cakes for Sister", icon: Heart },
        ],
      },
    ],
  },
  {
    label: "Desserts",
    icon: Cookie,
    subGroups: [
      {
        title: "All Desserts",
        items: [
          { label: "Jar Cakes", icon: CakeSlice },
          { label: "Pastries", icon: CakeSlice },
          { label: "Cheese Cakes", icon: CakeSlice },
          { label: "Cup Cakes", icon: Coffee },
          { label: "Brownies", icon: Cookie },
          { label: "Cookies", icon: Cookie },
          { label: "Tea Cakes", icon: Coffee },
        ],
      },
    ],
  },
  {
    label: "Birthday Cakes",
    icon: Gift,
    subGroups: [
      {
        title: "Birthday Cakes",
        items: [
          { label: "1st Birthday Cakes", icon: Baby },
          { label: "2nd Birthday Cakes", icon: Cake },
          { label: "18th Birthday Cakes", icon: PartyPopper },
          { label: "40th Birthday Cakes", icon: Star },
          { label: "50th Birthday Cakes", icon: Crown },
          { label: "Birthday Photo Cakes", icon: Camera },
          { label: "Half Birthday Cakes", icon: CakeSlice },
        ],
      },
    ],
  },
  {
    label: "Anniversary",
    icon: HeartHandshake,
    subGroups: [
      {
        title: "All Anniversary Cakes",
        items: [
          { label: "1st Anniversary Cakes", icon: Heart },
          { label: "5th Anniversary Cakes", icon: Heart },
          { label: "10th Anniversary Cakes", icon: Gem },
          { label: "25th Anniversary Cakes", icon: Crown },
          { label: "50th Anniversary Cakes", icon: Star },
          { label: "Anniversary Cakes For Parents", icon: Users },
          { label: "Anniversary Photo Cakes", icon: Camera },
        ],
      },
    ],
  },
];

export default function CategoryBar() {
  const [active, setActive] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleMouseEnter = useCallback((i: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    const cat = categories[i];
    if (cat.isLink) {
      setOpenDropdown(null);
      return;
    }
    if (cat.subGroups) {
      setOpenDropdown(i);
    }
    setActive(i);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  }, []);

  const handleCategoryClick = (i: number) => {
    const cat = categories[i];
    setActive(i);
    if (cat.isLink) {
      navigate("/custom-cake");
      setOpenDropdown(null);
      return;
    }
    // Navigate to catalog filtered by this category
    navigate(`/catalog?category=${encodeURIComponent(cat.label)}`);
    setOpenDropdown(null);
  };

  const colsClass = (count: number) => {
    if (count >= 4) return "md:grid-cols-4";
    if (count === 3) return "md:grid-cols-3";
    if (count === 2) return "md:grid-cols-2";
    return "md:grid-cols-1";
  };

  return (
    <div
      className="sticky top-[48px] md:top-[56px] lg:top-[64px] z-40 bg-white/90 backdrop-blur-xl border-b border-border/30"
      ref={dropdownRef}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center py-2 md:py-2.5">
          <div className="flex gap-1.5 md:gap-2 overflow-x-auto scroll-hide w-full">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              const isOpen = openDropdown === i;
              const hasDropdown = !!cat.subGroups;

              return (
                <div
                  key={cat.label}
                  className="relative flex-shrink-0"
                  onMouseEnter={() => handleMouseEnter(i)}
                >
                  <button
                    onClick={() => handleCategoryClick(i)}
                    className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap transition-all ${
                      cat.highlight
                        ? active === i
                          ? "bg-gradient-to-r from-secondary to-gold text-secondary-foreground shadow-md ring-2 ring-secondary/30"
                          : "bg-gradient-to-r from-secondary/80 to-gold/60 text-secondary-foreground hover:shadow-md ring-1 ring-secondary/20"
                        : active === i
                        ? "gradient-primary text-primary-foreground shadow-glow-teal"
                        : "text-foreground/50 hover:bg-accent hover:text-primary"
                    }`}
                  >
                    <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
                    {cat.label}
                    {hasDropdown && (
                      <ChevronDown className={`w-2.5 h-2.5 md:w-3 md:h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    )}
                    {cat.highlight && (
                      <motion.span
                        className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-destructive"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dropdown panel - compact */}
      <AnimatePresence>
        {openDropdown !== null && categories[openDropdown].subGroups && (
          <motion.div
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-border/40 shadow-dreamy z-50 overflow-hidden"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="container mx-auto px-3 md:px-4 py-2 md:py-3 max-h-[40vh] overflow-y-auto">
              <button
                onClick={() => setOpenDropdown(null)}
                className="absolute top-2 right-3 p-1 rounded-full hover:bg-accent transition-colors text-muted-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className={`grid gap-2 md:gap-3 ${colsClass(categories[openDropdown].subGroups!.length)}`}>
                {categories[openDropdown].subGroups!.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-[9px] md:text-[10px] font-semibold text-primary uppercase tracking-wider mb-1 flex items-center gap-1">
                      <span className="w-3 h-px bg-primary/30" />
                      {group.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-0">
                      {group.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <button
                            key={item.label}
                            className="flex items-center gap-1 px-1.5 py-1 rounded text-[9px] md:text-[10px] text-foreground/70 hover:bg-accent hover:text-primary transition-all group text-left"
                            onClick={() => {
                              setOpenDropdown(null);
                              navigate(`/catalog?category=${encodeURIComponent(categories[openDropdown!].label)}&sub=${encodeURIComponent(item.label)}`);
                            }}
                          >
                            {ItemIcon && (
                              <ItemIcon className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                            )}
                            <span className="truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
