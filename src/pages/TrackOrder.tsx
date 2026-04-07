// import { useState } from "react";
// import { db } from "../lib/firebase";
// import { doc, getDoc } from "firebase/firestore";

// export default function TrackOrder() {
//   const [id, setId] = useState("");
//   const [order, setOrder] = useState(null);

//   const fetchOrder = async () => {
//     const ref = doc(db, "orders", id);
//     const snap = await getDoc(ref);
//     if (snap.exists()) {
//       setOrder(snap.data());
//     } else {
//       alert("Order not found");
//     }
//   };

//   return (
//     <div>
//       <input onChange={(e) => setId(e.target.value)} />
//       <button onClick={fetchOrder}>Track</button>

//       {order && (
//         <div>
//           <p>Status: {order.status}</p>
//           <p>Total: {order.total}</p>
//         </div>
//       )}
//     </div>
//   );
// }

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
}

const TrackOrder = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchOrder = async () => {
    if (!orderId.trim()) {
      toast({ title: "Enter Order ID", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const ref = doc(db, "orders", orderId.trim());
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setOrder(snap.data() as OrderData);
      } else {
        setOrder(null);
        toast({
          title: "Order Not Found",
          description: "Check your ID and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "System Error",
        description: "Connection failed.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    { label: "Confirmed", key: "pending", icon: <Clock size={18} /> },
    { label: "Processing", key: "processing", icon: <Package size={18} /> },
    { label: "In Transit", key: "shipped", icon: <Truck size={18} /> },
    { label: "Delivered", key: "delivered", icon: <CheckCircle size={18} /> },
  ];

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((step) => step.key === status);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-left">
          <header className="mb-12">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              Track <span className="text-primary">Acquisition</span>
            </h1>
            <p className="text-gray-500 text-[10px] font-black tracking-[0.4em] uppercase">
              Enter your unique order identifier to sync with the warehouse.
            </p>
          </header>

          {/* SEARCH TERMINAL */}
          <div className="flex flex-col md:flex-row gap-4 mb-16 bg-[#0a0a0a] border border-white/5 p-6 rounded-sm">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                size={18}
              />
              <Input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="ORDER ID (e.g. ord_12345)"
                className="bg-transparent border-white/10 rounded-none h-14 pl-12 text-white font-bold tracking-widest uppercase focus:border-primary"
              />
            </div>
            <Button
              onClick={fetchOrder}
              disabled={loading}
              className="h-14 px-10 bg-primary text-black font-black uppercase tracking-widest rounded-none hover:bg-white transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Initiate Sync"}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            {order && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* STATUS TIMELINE */}
                <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                    {statusSteps.map((step, index) => {
                      const isCompleted = getStatusIndex(order.status) >= index;
                      return (
                        <div
                          key={step.key}
                          className={`flex flex-col items-start gap-4 ${isCompleted ? "opacity-100" : "opacity-20"}`}
                        >
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded-none border ${isCompleted ? "border-primary bg-primary text-black" : "border-white/10 text-white"}`}
                          >
                            {step.icon}
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">
                              {step.label}
                            </p>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">
                              {isCompleted ? "Verified" : "Pending"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="hidden md:block h-[1px] bg-white/5 w-full mt-8 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(getStatusIndex(order.status) / 3) * 100}%`,
                      }}
                      className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_#FAFF00]"
                    />
                  </div>
                </div>

                {/* ORDER SPECS */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm space-y-6">
                    <h3 className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase">
                      Artifact Details
                    </h3>
                    <div className="space-y-4">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center border-b border-white/5 pb-2"
                        >
                          <p className="text-xs font-black uppercase text-white">
                            {item.name} × {item.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-end pt-4">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">
                        Total Value
                      </p>
                      <p className="text-3xl font-black text-primary leading-none">
                        ₹{order.total}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm space-y-6">
                    <h3 className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase">
                      Delivery Point
                    </h3>
                    <div className="flex items-center gap-4 text-white">
                      <MapPin size={20} className="text-primary" />
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
                          Destination Zone
                        </p>
                        <p className="text-lg font-black uppercase tracking-tight">
                          {order.pincode || "Processing"}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                      <p className="text-[9px] text-gray-500 font-bold uppercase leading-relaxed">
                        Artifacts are shipped using high-security waterproof
                        packaging via premium logistic partners.
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