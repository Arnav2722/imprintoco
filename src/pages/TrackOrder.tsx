// import { useState } from "react";
// import { db } from "@/lib/firebase";
// import { doc, getDoc, Timestamp } from "firebase/firestore";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Search,
//   Package,
//   Truck,
//   CheckCircle,
//   Clock,
//   Loader2,
//   MapPin,
//   Zap,
//   Activity,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";

// interface OrderData {
//   status: "pending" | "processing" | "shipped" | "delivered";
//   total: number;
//   createdAt: Timestamp;
//   items: Array<{
//     name: string;
//     quantity: number;
//   }>;
//   pincode?: string;
// }

// const TrackOrder = () => {
//   const [orderId, setOrderId] = useState<string>("");
//   const [order, setOrder] = useState<OrderData | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const { toast } = useToast();

//   const fetchOrder = async () => {
//     if (!orderId.trim()) {
//       toast({ title: "ID REQUIRED", variant: "destructive" });
//       return;
//     }

//     setLoading(true);
//     try {
//       const ref = doc(db, "orders", orderId.trim());
//       const snap = await getDoc(ref);

//       if (snap.exists()) {
//         setOrder(snap.data() as OrderData);
//         toast({
//           title: "PROTOCOL SYNCED",
//           description: "Manifest data retrieved.",
//         });
//       } else {
//         setOrder(null);
//         toast({
//           title: "NOT FOUND",
//           description: "ID does not exist in the archive.",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         title: "SYSTEM ERROR",
//         description: "Satellite link failed.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const statusSteps = [
//     {
//       label: "Confirmed",
//       key: "pending",
//       icon: <Clock size={20} strokeWidth={3} />,
//     },
//     {
//       label: "Processing",
//       key: "processing",
//       icon: <Package size={20} strokeWidth={3} />,
//     },
//     {
//       label: "Shipped",
//       key: "shipped",
//       icon: <Truck size={20} strokeWidth={3} />,
//     },
//     {
//       label: "Delivered",
//       key: "delivered",
//       icon: <CheckCircle size={20} strokeWidth={3} />,
//     },
//   ];

//   const getStatusIndex = (status: string) => {
//     return statusSteps.findIndex((step) => step.key === status);
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-40 pb-32 px-6 max-w-[1200px] mx-auto">
//         <div className="max-w-4xl mx-auto">
//           <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
//             <div>
//               <div className="flex items-center gap-2 mb-4">
//                 <Zap size={18} className="text-accent fill-accent" />
//                 <span className="text-[11px] font-black uppercase tracking-[0.5em] text-foreground/40">
//                   Logistics Hub
//                 </span>
//               </div>
//               <h1 className="font-display text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.8]">
//                 TRACKING <br />
//                 <span className="text-primary not-italic">PROTOCOL.</span>
//               </h1>
//             </div>
//             <div className="bg-white border-2 border-foreground p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-1 max-w-[240px]">
//               <p className="text-[10px] font-black uppercase leading-tight text-foreground/60">
//                 Sync with the live warehouse feed to monitor your artifact
//                 dispatch.
//               </p>
//             </div>
//           </header>

//           {/* SEARCH TERMINAL */}
//           <div className="flex flex-col md:flex-row gap-6 mb-20 bg-white border-4 border-foreground p-8 shadow-[12px_12px_0px_0px_rgba(0,212,255,1)] group focus-within:shadow-none transition-all">
//             <div className="relative flex-1 group">
//               <Search
//                 className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
//                 size={24}
//                 strokeWidth={3}
//               />
//               <Input
//                 value={orderId}
//                 onChange={(e) => setOrderId(e.target.value)}
//                 placeholder="UNIQUE ORDER ID"
//                 className="bg-muted border-2 border-foreground rounded-none h-16 pl-16 text-sm font-black tracking-[0.3em] uppercase focus-visible:ring-0 focus:bg-white transition-all"
//               />
//             </div>
//             <Button
//               onClick={fetchOrder}
//               disabled={loading}
//               className="h-16 px-12 bg-foreground text-background font-black uppercase tracking-[0.2em] rounded-none hover:bg-primary hover:text-foreground transition-all flex items-center gap-3 active:translate-x-1 active:translate-y-1"
//             >
//               {loading ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 <>
//                   INITIATE SYNC <Activity size={18} />
//                 </>
//               )}
//             </Button>
//           </div>

//           <AnimatePresence mode="wait">
//             {order && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.98 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.98 }}
//                 className="space-y-12"
//               >
//                 {/* STATUS VISUALIZER */}
//                 <div className="bg-white border-4 border-foreground p-10 md:p-16 relative overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,0.05)]">
//                   <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
//                     <Truck size={160} />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
//                     {statusSteps.map((step, index) => {
//                       const isCompleted = getStatusIndex(order.status) >= index;
//                       const isCurrent = getStatusIndex(order.status) === index;
//                       return (
//                         <div
//                           key={step.key}
//                           className={`flex flex-col items-center md:items-start gap-6 transition-all duration-500 ${isCompleted ? "opacity-100" : "opacity-20 scale-90"}`}
//                         >
//                           <div
//                             className={`w-16 h-16 flex items-center justify-center border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${isCompleted ? "border-foreground bg-primary text-foreground rotate-0" : "border-foreground/10 bg-white text-foreground/10 rotate-12"}`}
//                           >
//                             {step.icon}
//                           </div>
//                           <div className="text-center md:text-left">
//                             <p
//                               className={`text-xs font-black uppercase tracking-widest leading-none mb-2 ${isCurrent ? "text-primary italic" : ""}`}
//                             >
//                               {step.label}
//                             </p>
//                             <div
//                               className={`inline-flex px-3 py-1 border-2 text-[9px] font-black uppercase ${isCompleted ? "border-foreground bg-accent-lime" : "border-foreground/10"}`}
//                             >
//                               {isCompleted ? "VERIFIED" : "WAITING"}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   {/* INDUSTRIAL PROGRESS BAR */}
//                   <div className="hidden md:block h-6 bg-muted border-2 border-foreground w-full mt-16 relative overflow-hidden">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={{
//                         width: `${(getStatusIndex(order.status) / 3) * 100}%`,
//                       }}
//                       className="absolute top-0 left-0 h-full bg-primary border-r-4 border-foreground"
//                     >
//                       <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_20px)]" />
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* LOGISTICS SPECS */}
//                 <div className="grid md:grid-cols-2 gap-10">
//                   <div className="bg-white border-4 border-foreground p-10 space-y-8 shadow-[10px_10px_0px_0px_rgba(0,212,255,1)]">
//                     <div className="flex items-center gap-3 border-b-2 border-foreground/5 pb-4">
//                       <Package size={20} className="text-primary" />
//                       <h3 className="text-[11px] font-black text-foreground uppercase tracking-[0.4em]">
//                         MANIFEST LOG
//                       </h3>
//                     </div>
//                     <div className="space-y-4">
//                       {order.items.map((item, i) => (
//                         <div
//                           key={i}
//                           className="flex justify-between items-center bg-muted p-4 border-2 border-foreground/5"
//                         >
//                           <p className="text-sm font-black uppercase italic">
//                             {item.name}
//                           </p>
//                           <span className="bg-foreground text-background px-3 py-1 text-[10px] font-black italic">
//                             x{item.quantity}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex justify-between items-end pt-6 border-t-4 border-foreground">
//                       <p className="text-[10px] font-black text-foreground/30 uppercase tracking-widest leading-none">
//                         Net Value
//                       </p>
//                       <p className="font-display text-5xl font-black text-foreground leading-none tracking-tighter">
//                         ₹{order.total}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="bg-white border-4 border-foreground p-10 space-y-8 shadow-[10px_10px_0px_0px_rgba(255,46,99,1)]">
//                     <div className="flex items-center gap-3 border-b-2 border-foreground/5 pb-4">
//                       <MapPin size={20} className="text-accent" />
//                       <h3 className="text-[11px] font-black text-foreground uppercase tracking-[0.4em]">
//                         DESTINATION
//                       </h3>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
//                         Target Zone:
//                       </span>
//                       <p className="font-display text-4xl font-black uppercase italic leading-none">
//                         {order.pincode || "CALCULATING"}
//                       </p>
//                     </div>
//                     <div className="p-6 border-2 border-foreground/5 bg-accent-lime/10 rotate-1">
//                       <p className="text-[10px] font-black text-foreground/60 uppercase leading-relaxed tracking-tight">
//                         Artifacts are secured in high-impact tube packaging and
//                         shipped via priority courier protocols.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default TrackOrder;

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Loader2,
  MapPin,
  Zap,
  Activity,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface OrderData {
  status: "pending" | "processing" | "shipped" | "delivered";
  total: number;
  createdAt: Timestamp;
  items: Array<{
    name: string;
    quantity: number;
  }>;
  pincode?: string;
  trackingId?: string; // Real tracking ID from Delhivery/Shiprocket
  carrier?: string; // "Delhivery", "BlueDart", etc.
}

const TrackOrder = (): JSX.Element => {
  const [orderId, setOrderId] = useState<string>("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchOrder = async (): Promise<void> => {
    if (!orderId.trim()) {
      toast({ title: "ID REQUIRED", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Order ID usually upper-case in DB
      const ref = doc(db, "orders", orderId.trim().toUpperCase());
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setOrder(snap.data() as OrderData);
        toast({
          title: "PROTOCOL SYNCED",
          description: "Live tracking feed active.",
        });
      } else {
        setOrder(null);
        toast({
          title: "NOT FOUND",
          description: "Check your ID and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "SYSTEM ERROR",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    {
      label: "Confirmed",
      key: "pending",
      icon: <Clock size={18} strokeWidth={3} />,
    },
    {
      label: "Processing",
      key: "processing",
      icon: <Package size={18} strokeWidth={3} />,
    },
    {
      label: "Shipped",
      key: "shipped",
      icon: <Truck size={18} strokeWidth={3} />,
    },
    {
      label: "Delivered",
      key: "delivered",
      icon: <CheckCircle size={18} strokeWidth={3} />,
    },
  ];

  const getStatusIndex = (status: string): number => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  // Logic to redirect to actual tracking portal
  const openExternalTracking = (): void => {
    if (order?.trackingId) {
      const delhiveryURL = `https://www.delhivery.com/track/package/${order.trackingId}`;
      window.open(delhiveryURL, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-body selection:bg-primary">
      <Navbar />

      <main className="pt-28 md:pt-40 pb-32 px-6 max-w-[1400px] mx-auto">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 border-b-2 border-black pb-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-primary fill-primary" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/40">
                Logistics Control v1.0
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">
              TRACKING <span className="text-primary not-italic">BASE.</span>
            </h1>
          </header>

          {/* SEARCH TERMINAL */}
          <div className="flex flex-col md:flex-row gap-4 mb-16 bg-white border-2 md:border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_#00D4FF]">
            <div className="relative flex-1 group">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-primary transition-all"
                size={20}
                strokeWidth={3}
              />
              <Input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                placeholder="ORDER ID (IMP-XXXX)"
                className="bg-muted border-2 border-black rounded-none h-14 pl-14 text-[10px] md:text-xs font-black tracking-widest focus-visible:ring-0 focus:bg-white transition-all"
              />
            </div>
            <Button
              onClick={fetchOrder}
              disabled={loading}
              className="h-14 px-10 bg-black text-white font-black uppercase tracking-widest text-[10px] rounded-none hover:bg-primary hover:text-black transition-all flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  SYNC DATA <Activity size={14} />
                </>
              )}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {order && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* TRACKING ID CALLOUT (The Real Tracking) */}
                {order.trackingId && (
                  <div className="bg-primary border-2 md:border-4 border-black p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[6px_6px_0px_0px_#000]">
                    <div className="space-y-1 text-center md:text-left">
                      <p className="text-[8px] font-black uppercase opacity-60">
                        Consignment ID
                      </p>
                      <p className="text-xl md:text-2xl font-black italic uppercase">
                        {order.trackingId}
                      </p>
                    </div>
                    <Button
                      onClick={openExternalTracking}
                      className="bg-black text-white px-8 h-12 rounded-none font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all"
                    >
                      OPEN DELHI_VERY FEED <ExternalLink size={14} />
                    </Button>
                  </div>
                )}

                {/* STATUS VISUALIZER */}
                <div className="bg-white border-2 md:border-4 border-black p-8 md:p-12 relative overflow-hidden shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)]">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                    {statusSteps.map((step, index) => {
                      const isCompleted = getStatusIndex(order.status) >= index;
                      const isCurrent = getStatusIndex(order.status) === index;
                      return (
                        <div
                          key={step.key}
                          className={`flex flex-col items-center md:items-start gap-4 transition-all duration-500 ${isCompleted ? "opacity-100" : "opacity-20"}`}
                        >
                          <div
                            className={`w-12 h-12 flex items-center justify-center border-2 md:border-4 shadow-[4px_4px_0px_0px_#000] transition-all ${isCompleted ? "border-black bg-primary text-black" : "border-black/10 bg-white text-black/10"}`}
                          >
                            {step.icon}
                          </div>
                          <div className="text-center md:text-left">
                            <p
                              className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${isCurrent ? "text-primary italic" : ""}`}
                            >
                              {step.label}
                            </p>
                            <span className="text-[7px] font-black uppercase opacity-40">
                              {isCompleted ? "VERIFIED" : "PENDING"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* PROGRESS LINE */}
                  <div className="hidden md:block h-3 bg-muted border-2 border-black w-full mt-12 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(getStatusIndex(order.status) / 3) * 100}%`,
                      }}
                      className="absolute top-0 left-0 h-full bg-primary border-r-2 border-black"
                    />
                  </div>
                </div>

                {/* LOGISTICS SPECS */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white border-2 md:border-4 border-black p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-black/5 pb-3">
                      <Package size={18} className="text-primary" />
                      <h3 className="text-[10px] font-black uppercase tracking-widest">
                        Manifest Log
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center bg-gray-50 p-3 border border-black/5"
                        >
                          <p className="text-[11px] font-black uppercase italic">
                            {item.name}
                          </p>
                          <span className="bg-black text-white px-2 py-0.5 text-[9px] font-black italic">
                            x{item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-end pt-4 border-t-2 border-black">
                      <p className="text-[9px] font-black text-black/20 uppercase tracking-widest">
                        Net Value
                      </p>
                      <p className="text-3xl font-black text-black leading-none tracking-tighter">
                        ₹{order.total}
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border-2 md:border-4 border-black p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-black/5 pb-3">
                      <MapPin size={18} className="text-primary" />
                      <h3 className="text-[10px] font-black uppercase tracking-widest">
                        Destination
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] font-black uppercase opacity-20">
                        Target Zone:
                      </span>
                      <p className="text-3xl font-black uppercase italic leading-none">
                        {order.pincode || "302001"}
                      </p>
                    </div>
                    <div className="p-4 border-2 border-black bg-primary/10 rotate-1">
                      <p className="text-[9px] font-black text-black/60 uppercase leading-relaxed tracking-tight">
                        SECURED IN REINFORCED PACKAGING. SHIPPED VIA PRIORITY
                        COURIER LOGISTICS.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;