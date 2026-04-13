// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// interface MultiItem {
//   id: number;
//   name: string;
//   price: number;
//   type: string;
//   img: string;
// }

// const MULTI_DATA: MultiItem[] = [
//   {
//     id: 1,
//     name: "Neon JDM Collage Kit",
//     price: 599,
//     type: "50-Piece Kit",
//     img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800",
//   },
//   {
//     id: 2,
//     name: "Cyberpunk 5-Panel Split",
//     price: 1299,
//     type: "Split Poster",
//     img: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=800",
//   },
//   {
//     id: 3,
//     name: "Motorsport Combo Set",
//     price: 899,
//     type: "30-Piece Kit",
//     img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
//   },
//   {
//     id: 4,
//     name: "Anime Legend 3-Piece Split",
//     price: 999,
//     type: "Split Poster",
//     img: "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=800",
//   },
// ];

// const MultiCollections = () => {
//   return (
//     <div className="min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white font-bricolage transition-colors duration-500">
//       <Navbar />
//       <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
//         <header className="mb-16 space-y-4">
//           <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
//             Multi <span className="text-primary not-italic">Collections</span>
//           </h1>
//           <p className="text-black/40 dark:text-white/40 text-[10px] font-black tracking-[0.4em] uppercase">
//             Transform your walls with massive split art and collage sets
//           </p>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {MULTI_DATA.map((item) => (
//             <div
//               key={item.id}
//               className="group relative border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01] p-6 transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.03]"
//             >
//               <div className="aspect-video overflow-hidden mb-8 relative">
//                 <img
//                   src={item.img}
//                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   alt={item.name}
//                 />
//                 <div className="absolute top-4 left-4 bg-primary text-black text-[8px] font-black px-3 py-1 uppercase italic shadow-xl">
//                   New Arrival
//                 </div>
//               </div>
//               <div className="flex justify-between items-end">
//                 <div className="space-y-2">
//                   <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
//                     {item.type}
//                   </span>
//                   <h3 className="text-3xl font-black uppercase italic leading-none">
//                     {item.name}
//                   </h3>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-2xl font-black italic mb-4">
//                     ₹{item.price}
//                   </p>
//                   <button className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-primary dark:hover:bg-primary transition-all">
//                     View Set
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default MultiCollections;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface MultiItem {
  id: number;
  name: string;
  price: number;
  type: string;
  img: string;
}

const MULTI_DATA: MultiItem[] = [
  {
    id: 1,
    name: "Cars Collage Kit",
    price: 599,
    type: "50-Piece Kit",
    img: "../Posters/CarsA6Posters.png",
  },
  {
    id: 2,
    name: "Cyberpunk 5-Panel Split",
    price: 1299,
    type: "Split Poster",
    img: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=800",
  },
  {
    id: 3,
    name: "Motorsport Combo Set",
    price: 899,
    type: "30-Piece Kit",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
  },
  {
    id: 4,
    name: "Anime Legend 3-Piece Split",
    price: 999,
    type: "Split Poster",
    img: "https://images.unsplash.com/photo-1542332213-31f87348057f?q=80&w=800",
  },
];

const MultiCollections = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white font-bricolage transition-colors duration-500">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        <header className="mb-16 space-y-4">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
            Multi <span className="text-primary not-italic">Collections</span>
          </h1>
          <p className="text-black/40 dark:text-white/40 text-[10px] font-black tracking-[0.4em] uppercase">
            Transform your walls with massive split art and collage sets
          </p>
        </header>

        {/* ✅ Grid adjusted: 3 columns on desktop for better portrait view */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MULTI_DATA.map((item) => (
            <div
              key={item.id}
              className="group relative border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01] p-5 transition-all hover:bg-black/[0.04] dark:hover:bg-white/[0.03]"
            >
              {/* ✅ Fixed: aspect-video changed to aspect-[2/3] for Portrait mode */}
              <div className="aspect-[2/3] overflow-hidden mb-8 relative bg-black/5 dark:bg-white/5">
                <img
                  src={item.img}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={item.name}
                />
                <div className="absolute top-4 left-4 bg-primary text-black text-[8px] font-black px-3 py-1 uppercase italic shadow-xl">
                  New Arrival
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    {item.type}
                  </span>
                  <h3 className="text-2xl font-black uppercase italic leading-tight">
                    {item.name}
                  </h3>
                </div>

                <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-4">
                  <p className="text-xl font-black italic">₹{item.price}</p>
                  <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 text-[9px] font-black uppercase tracking-widest hover:bg-primary dark:hover:bg-primary transition-all">
                    View Set
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MultiCollections;
