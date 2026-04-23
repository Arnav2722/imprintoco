// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion } from "framer-motion";
// import { ArrowRight, Search, Zap, Compass } from "lucide-react";

// const COLLECTIONS = [
//   {
//     title: "Cars",
//     sub: "cars",
//     count: "42+ Designs",
//     img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
//     color: "#00D4FF",
//   },
//   {
//     title: "Bikes",
//     sub: "bikes",
//     count: "28+ Designs",
//     img: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800",
//     color: "#FF3E3E",
//   },
//   {
//     title: "Formula 1",
//     sub: "f1",
//     count: "15+ Designs",
//     img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800",
//     color: "#FFFFFF",
//   },
//   {
//     title: "MotoGP",
//     sub: "motogp",
//     count: "12+ Designs",
//     img: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800",
//     color: "#FFD700",
//   },
//   {
//     title: "Football",
//     sub: "football",
//     count: "35+ Designs",
//     img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
//     color: "#4ADE80",
//   },
//   {
//     title: "Cricket",
//     sub: "cricket",
//     count: "20+ Designs",
//     img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
//     color: "#60A5FA",
//   },
//   {
//     title: "Marvel",
//     sub: "marvel",
//     count: "50+ Designs",
//     img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=800",
//     color: "#ED1D24",
//   },
//   {
//     title: "DC",
//     sub: "dc",
//     count: "30+ Designs",
//     img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800",
//     color: "#0476F2",
//   },
//   {
//     title: "TV Series",
//     sub: "tv-series",
//     count: "40+ Designs",
//     img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800",
//     color: "#A855F7",
//   },
//   {
//     title: "Music",
//     sub: "music",
//     count: "25+ Designs",
//     img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800",
//     color: "#F472B6",
//   },
//   {
//     title: "Video Games",
//     sub: "games",
//     count: "45+ Designs",
//     img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
//     color: "#34D399",
//   },
// ];

// const Explore = () => {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");

//   const filteredCollections = COLLECTIONS.filter((c) =>
//     c.title.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div className="min-h-screen bg-white text-black font-body selection:bg-black selection:text-white">
//       <Navbar />

//       <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-10 max-w-[1600px] mx-auto">
//         {/* HEADER SECTION */}
//         <div className="border-b-2 md:border-b-4 border-black pb-8 md:pb-12 mb-10 md:mb-16">
//           <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 md:gap-10">
//             <div className="space-y-2">
//               <div className="flex items-center gap-2 text-primary">
//                 <Compass size={18} className="md:w-5 md:h-5" strokeWidth={3} />
//                 <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em]">
//                   Directory
//                 </span>
//               </div>
//               <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
//                 ALL <span className="text-primary italic">COLLECTIONS</span>
//               </h1>
//             </div>

//             <div className="relative w-full lg:max-w-md">
//               <input
//                 type="text"
//                 placeholder="Find a collection..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full bg-gray-50 border-2 border-black p-3 md:p-4 pl-10 md:pl-12 font-bold uppercase tracking-widest text-[10px] md:text-xs outline-none focus:bg-primary/5 transition-colors"
//               />
//               <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 opacity-30 w-4 h-4 md:w-5 md:h-5" />
//             </div>
//           </div>
//         </div>

//         {/* COLLECTIONS GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
//           {filteredCollections.map((col, i) => (
//             <motion.div
//               key={col.sub}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-50px" }}
//               transition={{ delay: i * 0.05 }}
//               onClick={() => navigate(`/shop?sub=${col.sub}`)}
//               className="group relative h-[350px] sm:h-[400px] lg:h-[450px] overflow-hidden border-2 border-black cursor-pointer bg-black"
//             >
//               {/* Image */}
//               <img
//                 src={col.img}
//                 alt={col.title}
//                 className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
//               />

//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

//               {/* Content */}
//               <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end">
//                 <div className="space-y-3 md:space-y-4">
//                   <div className="flex items-center gap-2 md:gap-3">
//                     <span
//                       className="h-1 w-8 md:w-12"
//                       style={{ backgroundColor: col.color }}
//                     />
//                     <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/80">
//                       {col.count}
//                     </span>
//                   </div>

//                   <div className="flex justify-between items-end">
//                     <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
//                       {col.title}
//                     </h2>
//                     <div className="bg-white p-2 md:p-3 border-2 border-black group-hover:bg-primary group-hover:scale-110 transition-all">
//                       <ArrowRight
//                         className="w-5 h-5 md:w-6 md:h-6"
//                         strokeWidth={3}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Interactive Borders (Hidden on mobile for performance) */}
//               <div className="hidden lg:block absolute inset-0 border-[0px] group-hover:border-[12px] border-primary/10 transition-all duration-300 pointer-events-none" />
//             </motion.div>
//           ))}
//         </div>

//         {/* B2B FOOTER CTA */}
//         <div className="mt-16 md:mt-24 bg-black p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between border-2 md:border-4 border-primary shadow-[6px_6px_0_0_#000] md:shadow-[10px_10px_0_0_#000]">
//           <div className="space-y-2 mb-8 lg:mb-0">
//             <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter">
//               Running a business?
//             </h3>
//             <p className="text-white/60 font-bold uppercase text-[8px] md:text-[10px] tracking-[0.2em]">
//               Bulk orders and custom B2B protocols available.
//             </p>
//           </div>
//           <button
//             onClick={() => navigate("/bulk-posters")}
//             className="w-full lg:w-auto bg-primary border-2 border-black px-8 md:px-10 py-3 md:py-4 font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-white transition-colors flex items-center justify-center gap-3 shadow-[4px_4px_0_0_rgba(255,255,255,0.2)]"
//           >
//             Inquire Now <Zap size={14} className="md:w-4 md:h-4" fill="black" />
//           </button>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Explore;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Search, Zap, Compass } from "lucide-react";

interface CollectionItem {
  title: string;
  sub: string;
  count: string;
  img: string;
  color: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    title: "Cars",
    sub: "cars",
    count: "42+ DESIGNS",
    img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
    color: "#00D4FF",
  },
  {
    title: "Bikes",
    sub: "bikes",
    count: "28+ DESIGNS",
    img: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800",
    color: "#FF3E3E",
  },
  {
    title: "Formula 1",
    sub: "f1",
    count: "15+ DESIGNS",
    img: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&q=80&w=800",
    color: "#FFFFFF",
  },
  {
    title: "MotoGP",
    sub: "motogp",
    count: "12+ DESIGNS",
    img: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800",
    color: "#FFD700",
  },
  {
    title: "Football",
    sub: "football",
    count: "35+ DESIGNS",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
    color: "#4ADE80",
  },
  {
    title: "Cricket",
    sub: "cricket",
    count: "20+ DESIGNS",
    img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    color: "#60A5FA",
  },
  {
    title: "Marvel",
    sub: "marvel",
    count: "50+ DESIGNS",
    img: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80&w=800",
    color: "#ED1D24",
  },
  {
    title: "DC",
    sub: "dc",
    count: "30+ DESIGNS",
    img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800",
    color: "#0476F2",
  },
  {
    title: "TV Series",
    sub: "tv-series",
    count: "40+ DESIGNS",
    img: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=800",
    color: "#A855F7",
  },
  {
    title: "Music",
    sub: "music",
    count: "25+ DESIGNS",
    img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800",
    color: "#F472B6",
  },
  {
    title: "Video Games",
    sub: "games",
    count: "45+ DESIGNS",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
    color: "#34D399",
  },
];

const Explore = (): JSX.Element => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  const filteredCollections = COLLECTIONS.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white text-black font-body selection:bg-black selection:text-white">
      <Navbar />

      <main className="pt-24 md:pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        {/* HEADER SECTION - Reduced Sizes */}
        <div className="border-b-2 border-black pb-8 mb-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Compass size={14} strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Directory
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                ALL <span className="text-primary italic">COLLECTIONS</span>
              </h1>
            </div>

            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                placeholder="SEARCH..."
                value={search}
                onChange={(e) => setSearch(e.target.value.toUpperCase())}
                className="w-full border-2 border-black p-3 pl-12 font-black uppercase text-[10px] outline-none focus:bg-primary/5 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-20 w-4 h-4" />
            </div>
          </div>
        </div>

        {/* COLLECTIONS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCollections.map((col, i) => (
            <motion.div
              key={col.sub}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/shop?sub=${col.sub}`)}
              className="group relative h-[300px] md:h-[400px] overflow-hidden border-2 border-black cursor-pointer bg-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[8px_8px_0px_0px_#00D4FF] transition-all duration-300"
            >
              <img
                src={col.img}
                alt={col.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              />

              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-1 w-8"
                      style={{ backgroundColor: col.color }}
                    />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">
                      {col.count}
                    </span>
                  </div>
                  <div className="flex justify-between items-end">
                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none italic">
                      {col.title}
                    </h2>
                    <div className="bg-white p-2 border-2 border-black group-hover:bg-primary transition-all">
                      <ArrowRight size={18} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* B2B FOOTER CTA - Balanced Size */}
        <div className="mt-16 bg-black p-8 flex flex-col md:flex-row items-center justify-between border-4 border-primary shadow-[6px_6px_0px_0px_#000]">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-white text-2xl font-black uppercase tracking-tighter">
              RUNNING A BUSINESS?
            </h3>
            <p className="text-primary font-black uppercase text-[10px] tracking-widest mt-1">
              Bulk orders and B2B protocols available.
            </p>
          </div>
          <button
            onClick={() => navigate("/bulk-posters")}
            className="bg-primary border-2 border-black px-8 py-3 font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all flex items-center gap-3"
          >
            INQUIRE NOW <Zap size={14} fill="black" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;