// Single source of truth for category → subcategory taxonomy
// Used by CategoryBar (nav) and Admin Add/Edit Cake form.

export interface CategoryNode {
  label: string;
  subcategories: string[];
}

export const CATEGORY_TREE: CategoryNode[] = [
  {
    label: "Customized Cakes",
    subcategories: [],
  },
  {
    label: "Occasion",
    subcategories: [
      "Valentine's Day", "Mother's Day", "Father's Day", "Friendship Day",
      "Birthday", "Anniversary", "World Health Day", "Earth Day",
      "World Environment Day", "National Doctor's Day",
      "Husband Appreciation Day", "Wife Appreciation Day",
      "International Men's Day", "Moments of Joy", "Christmas",
      "New Year", "Diwali", "Raksha Bandhan",
    ],
  },
  {
    label: "Cakes",
    subcategories: [
      "Fire Cakes", "Ribbon Cakes", "Fresh Drops", "Cricket Cakes",
      "Gourmet Cakes", "Bento Cakes", "Camera Cakes", "Anime Cakes",
      "Labubu Cakes", "Pinata Cakes", "Drip Cakes",
      "Chocolate Cakes", "Butterscotch Cakes", "Strawberry Cakes",
      "Pineapple Cakes", "Kit Kat Cakes", "Black Forest Cakes",
      "Red Velvet Cakes", "Vanilla Cakes", "Fruit Cakes", "Blueberry Cakes",
    ],
  },
  {
    label: "Theme Cakes",
    subcategories: [
      "1st Birthday Cakes", "Princess Cakes", "Animal Cakes",
      "Masha & The Bear Cakes", "Cakes For Boys", "Cakes For Girls",
      "Number Cakes", "Alphabet Cakes", "Car and Vehicle Cakes",
      "Baby Shark Cakes", "Thomas and Friends Cakes",
      "Winnie the Pooh Cakes", "All Kids Cakes",
      "Spiderman Cakes", "Unicorn Cakes", "Barbie Cakes",
      "Harry Potter Cakes", "Avenger Cakes", "Peppa Pig Cakes",
      "Doraemon Cakes", "Naruto Cakes", "Cocomelon Cakes",
      "Cartoon Cakes", "Super Hero Cakes", "Bluey Cakes", "Bike Cakes",
      "Iron-Man Cakes", "Moana Cakes", "Train Cakes", "Transformers Cakes",
      "Dragon Ball Cakes", "Panda Cakes", "Fish Cakes", "Ben 10 Cakes",
      "Demon Slayer Cakes", "Bubu Dudu Cakes",
      "Makeup Cakes", "Bride To Be Cakes", "Wedding Cakes", "Gym Cakes",
      "Party Cakes", "BTS Cakes", "Police Cakes", "Army Cakes",
      "Beer Cakes", "Bachelor Cakes", "CA Cakes", "Guitar Cakes",
      "Aeroplane Cakes",
      "Jungle Theme Cakes", "Football Cakes", "Basketball Cakes",
      "Rainbow Cakes", "Butterfly Cakes", "Shinchan Cakes",
      "Dinosaur Cakes", "Pikachu Cakes", "Hulk Cakes",
      "Jungle Book Cakes", "All Designer Cakes",
    ],
  },
  {
    label: "By Relationship",
    subcategories: [
      "Cakes For Friend", "Cakes for Father", "Cakes for Husband",
      "Cakes for Brother", "Cakes For Boyfriend", "Cakes for Mother",
      "Cakes for Wife", "Cakes For Girlfriend", "Cakes for Sister",
    ],
  },
  {
    label: "Desserts",
    subcategories: [
      "Jar Cakes", "Pastries", "Cheese Cakes", "Cup Cakes",
      "Brownies", "Cookies", "Tea Cakes",
    ],
  },
  {
    label: "Birthday Cakes",
    subcategories: [
      "1st Birthday Cakes", "2nd Birthday Cakes", "18th Birthday Cakes",
      "40th Birthday Cakes", "50th Birthday Cakes",
      "Birthday Photo Cakes", "Half Birthday Cakes",
    ],
  },
  {
    label: "Anniversary",
    subcategories: [
      "1st Anniversary Cakes", "5th Anniversary Cakes",
      "10th Anniversary Cakes", "25th Anniversary Cakes",
      "50th Anniversary Cakes", "Anniversary Cakes For Parents",
      "Anniversary Photo Cakes",
    ],
  },
];

export const CAKE_SIZES = ["0.5 kg", "1 kg", "1.5 kg", "2 kg", "2.5 kg", "3 kg", "5 kg"];

export function getSubcategoriesFor(categoryLabel: string): string[] {
  return CATEGORY_TREE.find((c) => c.label === categoryLabel)?.subcategories ?? [];
}
