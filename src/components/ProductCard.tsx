// import { Link } from "react-router-dom";
// import { DbProduct } from "@/hooks/use-products";
// import { ChevronRight } from "lucide-react";

// interface ProductCardProps {
//   product: DbProduct;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   return (
//     <div className="group flex flex-col h-full bg-[#050505] border border-white/5 hover:border-white/10 transition-all duration-300">
//       {/* IMAGE SECTION - Removed Grayscale */}
//       <Link
//         to={`/product/${product.id}`}
//         className="block relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]"
//       >
//         {product.image_url ? (
//           <img
//             src={product.image_url}
//             alt={product.name}
//             className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
//             loading="lazy"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center">
//             <span className="font-sans text-[10px] tracking-[0.3em] text-gray-700 uppercase font-black">
//               No Preview
//             </span>
//           </div>
//         )}

//         {/* SIZE TAGS OVERLAY */}
//         <div className="absolute bottom-4 left-4 flex gap-1.5">
//           {["A5", "A4", "A3"].map((size) => (
//             <span
//               key={size}
//               className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[8px] font-black px-1.5 py-0.5 rounded-none tracking-widest uppercase"
//             >
//               {size}
//             </span>
//           ))}
//         </div>
//       </Link>

//       <div className="p-5 flex flex-col flex-1 gap-3">
//         <div>
//           <h3 className="font-sans text-[11px] font-black tracking-widest uppercase text-white mb-1 truncate leading-tight">
//             {product.name}
//           </h3>
//           <p className="font-sans text-[9px] text-gray-500 font-bold tracking-widest uppercase">
//             {product.category} // {product.subcategory?.replace("_", " ")}
//           </p>
//         </div>

//         {/* PRICE LOGIC - Starting from 79 */}
//         <div className="mt-auto pt-4 border-t border-white/5 flex items-end justify-between">
//           <div className="flex flex-col">
//             <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">
//               Starting from
//             </span>
//             <span className="text-xl font-black text-primary tabular-nums">
//               ₹79
//             </span>
//           </div>

//           <Link
//             to={`/product/${product.id}`}
//             className="h-10 px-4 bg-white text-black flex items-center justify-center gap-2 hover:bg-primary transition-all duration-300"
//           >
//             <span className="text-[9px] font-black uppercase tracking-widest">
//               Details
//             </span>
//             <ChevronRight size={14} />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import { Link } from "react-router-dom";
import { DbProduct } from "@/hooks/use-products";
import { ChevronRight, ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: DbProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group flex flex-col h-full bg-white border-2 border-foreground hover:shadow-[12px_12px_0px_0px_rgba(0,212,255,1)] transition-all duration-500 overflow-hidden">
      {/* IMAGE SECTION */}
      <Link
        to={`/product/${product.id}`}
        className="block relative aspect-[3/4] overflow-hidden bg-muted border-b-2 border-foreground"
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-muted/30">
            <span className="font-display text-[10px] tracking-[0.3em] text-foreground/20 uppercase font-black">
              Preview Missing
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* SIZE TAGS OVERLAY - Industrial Label Style */}
        <div className="absolute top-4 left-4 flex flex-col gap-1">
          {["A5", "A4", "A3"].map((size) => (
            <span
              key={size}
              className="bg-foreground text-background text-[8px] font-black px-2 py-0.5 rounded-none tracking-widest uppercase"
            >
              {size}
            </span>
          ))}
        </div>

        {/* Quick View Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white border-2 border-foreground flex items-center justify-center translate-y-[-60px] group-hover:translate-y-0 transition-transform duration-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <ArrowUpRight size={18} className="text-foreground" />
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1 gap-4 bg-white">
        <div>
          <h3 className="font-display text-lg font-black tracking-tight uppercase text-foreground mb-1 truncate leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="font-body text-[10px] text-foreground/40 font-black tracking-widest uppercase italic">
            {product.category} — {product.subcategory?.replace("_", " ")}
          </p>
        </div>

        {/* PRICE SECTION */}
        <div className="mt-auto pt-6 border-t-2 border-foreground/5 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-foreground/30 uppercase tracking-widest mb-1">
              Starting from
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-foreground tabular-nums">
                ₹79
              </span>
              <div className="px-1.5 py-0.5 bg-accent-lime text-[9px] font-black uppercase">
                Save 40%
              </div>
            </div>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="h-12 px-6 bg-foreground text-background flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(0,212,255,0.2)] hover:shadow-none active:translate-x-1 active:translate-y-1"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">
              GET IT
            </span>
            <ChevronRight size={16} strokeWidth={3} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;