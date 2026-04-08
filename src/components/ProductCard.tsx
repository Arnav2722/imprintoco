// import { Link } from "react-router-dom";
// import { DbProduct } from "@/hooks/use-products";
// import { useCart } from "@/contexts/CartContext";

// interface ProductCardProps {
//   product: DbProduct;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const { addToCart } = useCart();

//   return (
//     <div className="group">
//       <Link to={`/product/${product.id}`} className="block">
//         <div className="relative bg-surface-low overflow-hidden mb-3 aspect-square">
//           {product.image_url ? (
//             <img
//               src={product.image_url}
//               alt={product.name}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-150"
//               loading="lazy"
//               width={800}
//               height={800}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-surface-container">
//               <span className="font-display text-xs tracking-widest text-muted-foreground uppercase">
//                 {product.category}
//               </span>
//             </div>
//           )}
//           {product.badge && (
//             <span className="absolute top-3 left-3 bg-secondary text-foreground font-display text-[10px] tracking-widest font-bold px-2 py-1 uppercase">
//               {product.badge}
//             </span>
//           )}
//         </div>
//       </Link>
//       <h3 className="font-display text-xs tracking-wider uppercase text-foreground mb-1">
//         <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
//           {product.name}
//         </Link>
//       </h3>
//       <div className="flex items-center justify-between">
//         <p className="font-display text-sm font-bold text-primary">₹{product.price}</p>
//         <button
//           onClick={() => addToCart(product)}
//           className="font-display text-[10px] tracking-widest uppercase bg-primary text-primary-foreground px-3 py-1.5 hover:brightness-110 transition-all duration-150"
//         >
//           BUY NOW
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import { Link } from "react-router-dom";
import { DbProduct } from "@/hooks/use-products";
import { ChevronRight } from "lucide-react";

interface ProductCardProps {
  product: DbProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group flex flex-col h-full bg-[#050505] border border-white/5 hover:border-white/10 transition-all duration-300">
      {/* IMAGE SECTION - Removed Grayscale */}
      <Link
        to={`/product/${product.id}`}
        className="block relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]"
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-sans text-[10px] tracking-[0.3em] text-gray-700 uppercase font-black">
              No Preview
            </span>
          </div>
        )}

        {/* SIZE TAGS OVERLAY */}
        <div className="absolute bottom-4 left-4 flex gap-1.5">
          {["A5", "A4", "A3"].map((size) => (
            <span
              key={size}
              className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-[8px] font-black px-1.5 py-0.5 rounded-none tracking-widest uppercase"
            >
              {size}
            </span>
          ))}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-sans text-[11px] font-black tracking-widest uppercase text-white mb-1 truncate leading-tight">
            {product.name}
          </h3>
          <p className="font-sans text-[9px] text-gray-500 font-bold tracking-widest uppercase">
            {product.category} // {product.subcategory?.replace("_", " ")}
          </p>
        </div>

        {/* PRICE LOGIC - Starting from 79 */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">
              Starting from
            </span>
            <span className="text-xl font-black text-primary tabular-nums">
              ₹79
            </span>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="h-10 px-4 bg-white text-black flex items-center justify-center gap-2 hover:bg-primary transition-all duration-300"
          >
            <span className="text-[9px] font-black uppercase tracking-widest">
              Details
            </span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;