// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { DbProduct } from "@/hooks/use-products";
// import { ChevronRight, ArrowUpRight, Box } from "lucide-react";

// interface ProductCardProps {
//   product: DbProduct;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const isKit = product.category?.toLowerCase().includes("collage");
//   const [selectedSize, setSelectedSize] = useState(isKit ? "A6" : "A5");

//   // Dynamic pricing based on category
//   const posterSizes = [
//     { label: "A5", price: 69 },
//     { label: "A4", price: 109 },
//     { label: "A3", price: 139 },
//     { label: "13x19", price: 159 },
//   ];

//   const kitSizes = [
//     { label: "A6", price: 349 },
//     { label: "A5", price: 790 },
//     { label: "A4", price: 990 },
//   ];

//   const activeSizes = isKit ? kitSizes : posterSizes;
//   const activeData =
//     activeSizes.find((s) => s.label === selectedSize) || activeSizes[0];

//   return (
//     <div className="group flex flex-col h-full bg-white border-2 border-foreground hover:shadow-[8px_8px_0px_0px_rgba(0,212,255,1)] md:hover:shadow-[12px_12px_0px_0px_rgba(0,212,255,1)] transition-all duration-500 overflow-hidden">
//       <Link
//         to={`/product/${product.id}`}
//         className="block relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-muted border-b-2 border-foreground"
//       >
//         {product.image_url ? (
//           <img
//             src={product.image_url}
//             alt={product.name}
//             className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
//             loading="lazy"
//           />
//         ) : (
//           <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30">
//             <span className="font-display text-[8px] sm:text-[10px] tracking-[0.3em] text-foreground/20 uppercase font-black">
//               Preview Missing
//             </span>
//           </div>
//         )}

//         {/* Dynamic Badge for Kits */}
//         {isKit && (
//           <div className="absolute top-2 left-2 bg-primary border-2 border-foreground px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
//             <span className="text-[8px] font-black uppercase italic">
//               30 Piece Kit
//             </span>
//           </div>
//         )}

//         <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white border-2 border-foreground flex items-center justify-center md:translate-y-[-60px] md:group-hover:translate-y-0 transition-transform duration-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
//           <ArrowUpRight size={16} className="text-foreground" />
//         </div>
//       </Link>

//       <div className="p-4 sm:p-6 flex flex-col flex-1 gap-4 bg-white">
//         <div>
//           <h3 className="font-display text-base sm:text-lg font-black tracking-tight uppercase text-foreground mb-1 truncate group-hover:text-primary transition-colors">
//             {product.name}
//           </h3>
//           <p className="font-body text-[9px] sm:text-[10px] text-foreground/40 font-black tracking-widest uppercase italic">
//             {product.category} — {product.subcategory?.replace("_", " ")}
//           </p>
//         </div>

//         {/* RESPONSIVE SIZE SELECTOR */}
//         <div
//           className={`grid gap-1 py-2 border-y-2 border-foreground/5 ${isKit ? "grid-cols-3" : "grid-cols-4"}`}
//         >
//           {activeSizes.map((size) => (
//             <button
//               key={size.label}
//               onClick={() => setSelectedSize(size.label)}
//               className={`flex flex-col items-center justify-center py-2 px-1 border-2 transition-all ${
//                 selectedSize === size.label
//                   ? "bg-foreground text-background border-foreground"
//                   : "bg-transparent text-foreground border-transparent hover:border-foreground/20"
//               }`}
//             >
//               <span className="text-[9px] font-black leading-none mb-1">
//                 {size.label}
//               </span>
//               <span className="text-[8px] opacity-70 font-bold">
//                 ₹{size.price}
//               </span>
//             </button>
//           ))}
//         </div>

//         <div className="mt-auto pt-2 flex flex-wrap items-end justify-between gap-4">
//           <div className="flex flex-col min-w-fit">
//             <span className="text-[9px] sm:text-[10px] font-black text-foreground/30 uppercase tracking-widest mb-1">
//               {selectedSize} {isKit ? "Full Set" : "Print"}
//             </span>
//             <div className="flex items-center gap-2">
//               <span className="text-xl sm:text-2xl font-black text-foreground tabular-nums">
//                 ₹{activeData.price}
//               </span>
//             </div>
//           </div>

//           <Link
//             to={`/product/${product.id}`}
//             className="flex-1 sm:flex-none h-10 sm:h-12 px-4 sm:px-6 bg-foreground text-background flex items-center justify-center gap-2 sm:gap-3 hover:bg-accent hover:text-white transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,212,255,0.2)] md:hover:shadow-none active:translate-x-0.5 active:translate-y-0.5"
//           >
//             <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
//               VIEW
//             </span>
//             <ChevronRight size={14} strokeWidth={3} />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import { useState } from "react";
import { Link } from "react-router-dom";
import { DbProduct } from "@/hooks/use-products";
import { ChevronRight, ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: DbProduct;
}

interface SizeOption {
  label: string;
  price: number;
}

const ProductCard = ({ product }: ProductCardProps): JSX.Element => {
  const isKit: boolean = product.category?.toLowerCase().includes("collage");
  const [selectedSize, setSelectedSize] = useState<string>(isKit ? "A6" : "A5");

  // Standardized pricing to match your "Starting at ₹69" claim
  const posterSizes: SizeOption[] = [
    { label: "A5", price: 69 },
    { label: "A4", price: 109 },
    { label: "A3", price: 139 },
    { label: "13x19", price: 159 },
  ];

  const kitSizes: SizeOption[] = [
    { label: "A6", price: 349 },
    { label: "A5", price: 790 },
    { label: "A4", price: 990 },
  ];

  const activeSizes: SizeOption[] = isKit ? kitSizes : posterSizes;
  const activeData: SizeOption =
    activeSizes.find((s) => s.label === selectedSize) || activeSizes[0];

  // CLOUDINARY OPTIMIZATION FIX
  const optimizedImage = product.image_url
    ? product.image_url.replace("/upload/", "/upload/w_600,f_auto,q_auto/")
    : null;

  return (
    <div className="group flex flex-col h-full bg-white border-2 border-foreground hover:shadow-[8px_8px_0px_0px_#00D4FF] md:hover:shadow-[12px_12px_0px_0px_#00D4FF] transition-all duration-500 overflow-hidden">
      <Link
        to={`/product/${product.id}`}
        className="block relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-muted border-b-2 border-foreground"
      >
        {optimizedImage ? (
          <img
            src={optimizedImage}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30">
            <span className="font-display text-[8px] sm:text-[10px] tracking-[0.3em] text-foreground/20 uppercase font-black">
              Preview Missing
            </span>
          </div>
        )}

        {isKit && (
          <div className="absolute top-2 left-2 bg-primary border-2 border-foreground px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10">
            <span className="text-[8px] font-black uppercase italic text-foreground">
              30 Piece Kit
            </span>
          </div>
        )}

        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white border-2 border-foreground flex items-center justify-center md:translate-y-[-60px] md:group-hover:translate-y-0 transition-transform duration-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10">
          <ArrowUpRight size={16} className="text-foreground" />
        </div>
      </Link>

      <div className="p-4 sm:p-6 flex flex-col flex-1 gap-4 bg-white">
        <div>
          <h3 className="font-display text-base sm:text-lg font-black tracking-tight uppercase text-foreground mb-1 truncate group-hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="font-body text-[9px] sm:text-[10px] text-foreground/40 font-black tracking-widest uppercase italic">
            {product.category} — {product.subcategory?.replace("_", " ")}
          </p>
        </div>

        {/* RESPONSIVE SIZE SELECTOR */}
        <div
          className={`grid gap-1 py-2 border-y-2 border-foreground/5 ${isKit ? "grid-cols-3" : "grid-cols-4"}`}
        >
          {activeSizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(size.label)}
              className={`flex flex-col items-center justify-center py-2 px-1 border-2 transition-all ${
                selectedSize === size.label
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-foreground border-transparent hover:border-foreground/20"
              }`}
            >
              <span className="text-[9px] font-black leading-none mb-1 uppercase">
                {size.label}
              </span>
              <span className="text-[8px] opacity-70 font-bold">
                ₹{size.price}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-2 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col min-w-fit">
            <span className="text-[9px] sm:text-[10px] font-black text-foreground/30 uppercase tracking-widest mb-1">
              {selectedSize} {isKit ? "Full Set" : "Print"}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black text-foreground tabular-nums">
                ₹{activeData.price}
              </span>
              <span className="text-[10px] text-foreground/20 line-through font-bold">
                ₹{Math.round(activeData.price * 1.6)}
              </span>
            </div>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="flex-1 sm:flex-none h-10 sm:h-12 px-4 sm:px-6 bg-foreground text-background flex items-center justify-center gap-2 sm:gap-3 hover:bg-primary hover:text-foreground transition-all duration-300 shadow-[4px_4px_0px_0px_#00D4FF] md:hover:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
              VIEW
            </span>
            <ChevronRight size={14} strokeWidth={3} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;