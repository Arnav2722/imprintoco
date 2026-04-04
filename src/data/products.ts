export interface Product {
  id: string;
  name: string;
  price: number;
  category: "stickers" | "posters";
  subcategory: "cars" | "bikes" | "f1" | "motogp" | "jdm" | "quotes";
  image: string;
  badge?: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Tokyo Drift Vinyl",
    price: 69,
    category: "stickers",
    subcategory: "jdm",
    image: "product-stickers",
    badge: "NEW",
    description: "Premium vinyl JDM sticker pack. Waterproof, high-gloss finish.",
  },
  {
    id: "2",
    name: "R34 Icon Poster",
    price: 199,
    category: "posters",
    subcategory: "jdm",
    image: "hero-car",
    description: "Gallery-quality Skyline R34 GT-R poster. Matte finish, 300gsm.",
  },
  {
    id: "3",
    name: "Night Runner Pack",
    price: 149,
    category: "stickers",
    subcategory: "cars",
    image: "product-jdm",
    badge: "HOT",
    description: "5-piece sticker set featuring iconic night racing scenes.",
  },
  {
    id: "4",
    name: "Senna Spirit Decal",
    price: 49,
    category: "stickers",
    subcategory: "f1",
    image: "product-poster-f1",
    description: "Tribute decal to the legend. UV-resistant vinyl.",
  },
  {
    id: "5",
    name: "MotoGP Beast Poster",
    price: 249,
    category: "posters",
    subcategory: "motogp",
    image: "product-bike",
    description: "High-contrast MotoGP action poster. Premium matte paper.",
  },
  {
    id: "6",
    name: "Born To Lose Print",
    price: 179,
    category: "posters",
    subcategory: "quotes",
    image: "product-quote",
    description: "Motivational racing typography. Bold, unapologetic design.",
  },
  {
    id: "7",
    name: "F1 Grid Vinyl Set",
    price: 99,
    category: "stickers",
    subcategory: "f1",
    image: "product-poster-f1",
    badge: "LIMITED",
    description: "Complete F1 grid sticker collection. Collector's edition.",
  },
  {
    id: "8",
    name: "Superbike Decal Pack",
    price: 79,
    category: "stickers",
    subcategory: "motogp",
    image: "product-bike",
    description: "MotoGP-inspired vinyl decals. Weatherproof and durable.",
  },
];
