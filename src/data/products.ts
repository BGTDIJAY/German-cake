import cake1 from "@/assets/cake-1.png";
import cake2 from "@/assets/cake-2.png";
import cake3 from "@/assets/cake-3.png";
import cake4 from "@/assets/cake-4.png";
import cake5 from "@/assets/cake-5.png";
import cake6 from "@/assets/cake-6.png";
import cake7 from "@/assets/cake-7.png";
import cakeCustom from "@/assets/cake-custom.png";
import bestChocoTruffle from "@/assets/best-choco-truffle.jpg";
import bestButterscotch from "@/assets/best-butterscotch.jpg";
import bestRedVelvet from "@/assets/best-red-velvet.jpg";
import bestPineapple from "@/assets/best-pineapple.jpg";
import bestBlackForest from "@/assets/best-black-forest.jpg";
import bestStrawberry from "@/assets/best-strawberry.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  category?: string;
}

export const allProducts: Product[] = [
  // Cakes
  { id: "1", name: "Red Velvet Dream", price: 599, originalPrice: 699, image: cake1, badge: "Bestseller", category: "cake" },
  { id: "2", name: "Chocolate Truffle", price: 499, originalPrice: 599, image: cake2, badge: "10% OFF", category: "cake" },
  { id: "3", name: "Butterscotch Bliss", price: 449, image: cake3, category: "cake" },
  { id: "4", name: "Strawberry Vanilla", price: 549, originalPrice: 649, image: cake4, badge: "New", category: "cake" },
  { id: "5", name: "Black Forest", price: 479, image: cake5, category: "cake" },
  { id: "6", name: "Mango Delight", price: 529, image: cake6, badge: "Seasonal", category: "cake" },
  { id: "7", name: "Pineapple Classic", price: 399, image: cake7, category: "cake" },
  { id: "8", name: "Wedding Elegance", price: 2499, originalPrice: 2999, image: cakeCustom, badge: "Premium", category: "cake" },
  { id: "b1", name: "Rich Chocolate Truffle Cake", price: 549, image: bestChocoTruffle, category: "cake" },
  { id: "b2", name: "Butterscotch Crunch Cake", price: 529, image: bestButterscotch, category: "cake" },
  { id: "b3", name: "Red Velvet Cream Cake", price: 599, image: bestRedVelvet, category: "cake" },
  { id: "b4", name: "Fresh Pineapple Cake", price: 499, image: bestPineapple, category: "cake" },
  { id: "b5", name: "Black Forest Cake", price: 549, image: bestBlackForest, category: "cake" },
  { id: "b6", name: "Strawberry Fresh Cream Cake", price: 579, image: bestStrawberry, category: "cake" },
  // Cupcakes
  { id: "cu1", name: "Chocolate Cupcake", price: 89, image: bestChocoTruffle, category: "cupcake" },
  { id: "cu2", name: "Red Velvet Cupcake", price: 99, image: bestRedVelvet, badge: "Popular", category: "cupcake" },
  { id: "cu3", name: "Vanilla Buttercream Cupcake", price: 79, image: bestButterscotch, category: "cupcake" },
  { id: "cu4", name: "Strawberry Cupcake", price: 89, image: bestStrawberry, category: "cupcake" },
  { id: "cu5", name: "Blueberry Cupcake", price: 99, image: bestPineapple, badge: "New", category: "cupcake" },
  // Pastries
  { id: "pa1", name: "Chocolate Pastry", price: 69, image: bestChocoTruffle, category: "pastry" },
  { id: "pa2", name: "Pineapple Pastry", price: 59, image: bestPineapple, category: "pastry" },
  { id: "pa3", name: "Black Forest Pastry", price: 69, image: bestBlackForest, badge: "Bestseller", category: "pastry" },
  { id: "pa4", name: "Butterscotch Pastry", price: 59, image: bestButterscotch, category: "pastry" },
  { id: "pa5", name: "Strawberry Pastry", price: 65, image: bestStrawberry, category: "pastry" },
  // Cookies
  { id: "co1", name: "Chocolate Chip Cookie", price: 39, image: bestChocoTruffle, category: "cookie" },
  { id: "co2", name: "Butter Cookie Box", price: 199, image: bestButterscotch, badge: "Gift Pack", category: "cookie" },
  { id: "co3", name: "Almond Cookie", price: 49, image: bestPineapple, category: "cookie" },
  { id: "co4", name: "Oatmeal Raisin Cookie", price: 45, image: bestBlackForest, category: "cookie" },
  // Desserts
  { id: "de1", name: "Chocolate Mousse", price: 149, image: bestChocoTruffle, badge: "Chef's Pick", category: "dessert" },
  { id: "de2", name: "Tiramisu", price: 199, image: bestButterscotch, category: "dessert" },
  { id: "de3", name: "Fruit Tart", price: 179, image: bestStrawberry, category: "dessert" },
  { id: "de4", name: "Cheesecake Slice", price: 169, image: bestRedVelvet, badge: "Popular", category: "dessert" },
  // Theme & Occasion
  { id: "th1", name: "Kids Birthday Cake", price: 899, originalPrice: 1099, image: cakeCustom, badge: "Theme", category: "theme cake" },
  { id: "th2", name: "Anniversary Special Cake", price: 1299, image: cake1, badge: "Premium", category: "occasion" },
  { id: "th3", name: "Baby Shower Cake", price: 999, image: cake4, category: "occasion" },
  { id: "th4", name: "Cartoon Character Cake", price: 1199, image: cakeCustom, badge: "Kids", category: "theme cake" },
];

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.badge && p.badge.toLowerCase().includes(q))
  );
}

export const popularSearches = ["Red Velvet", "Chocolate", "Cupcake", "Pastry", "Cookie", "Black Forest", "Mousse", "Wedding"];

const RECENT_KEY = "german_cakes_recent_searches";
const MAX_RECENT = 6;

export function getRecentSearches(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string) {
  const q = query.trim();
  if (!q) return;
  const recent = getRecentSearches().filter((r) => r.toLowerCase() !== q.toLowerCase());
  recent.unshift(q);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

export function removeRecentSearch(query: string) {
  const recent = getRecentSearches().filter((r) => r !== query);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

export function clearRecentSearches() {
  localStorage.removeItem(RECENT_KEY);
}
