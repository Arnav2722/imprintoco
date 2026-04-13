import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface StickerItem {
  id: number;
  name: string;
  price: number;
  img: string;
}

const STICKERS: StickerItem[] = [
  {
    id: 1,
    name: "Caffeine & Gas",
    price: 49,
    img: "https://images.unsplash.com/photo-1572375927083-074900481232?q=80&w=800",
  },
  {
    id: 2,
    name: "Neo Tokyo Drift",
    price: 59,
    img: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=800",
  },
  {
    id: 3,
    name: "Turbo Snail",
    price: 49,
    img: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800",
  },
  {
    id: 4,
    name: "Initial D AE86",
    price: 69,
    img: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?q=80&w=800",
  },
];

const Stickers = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white font-bricolage transition-colors duration-500">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        <header className="mb-16 flex justify-between items-end">
          <div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic">
              Vinyl <span className="text-primary">Slaps</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-4 italic">
              High-grade waterproof stickers for your machines
            </p>
          </div>
          <div className="hidden md:block bg-primary text-black px-4 py-2 text-[10px] font-black uppercase italic tracking-tighter shadow-lg">
            Free shipping on 10+ Slaps
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {STICKERS.map((s) => (
            <div
              key={s.id}
              className="group border border-black/5 dark:border-white/5 p-4 bg-black/[0.01] dark:bg-white/[0.01] hover:border-primary transition-all"
            >
              <div className="aspect-square bg-white overflow-hidden mb-4">
                <img
                  src={s.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={s.name}
                />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-tight italic mb-2">
                {s.name}
              </h3>
              <p className="text-lg font-black italic text-primary">
                ₹{s.price}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stickers;
