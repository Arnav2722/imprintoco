// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Plus,
//   Trash2,
//   ArrowLeft,
//   LogOut,
//   Loader2,
//   Upload,
//   Image as ImageIcon,
//   X,
//   Star,
//   Edit,
//   Mail,
//   MessageCircle,
// } from "lucide-react";
// import { auth, db } from "@/lib/firebase";
// import { onAuthStateChanged, signOut, User } from "firebase/auth";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   Timestamp,
//   QueryDocumentSnapshot,
//   orderBy,
//   query,
// } from "firebase/firestore";

// type CategoryType = "stickers" | "posters" | "combo";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   image_url: string;
//   category: CategoryType;
//   subcategory: string;
//   badge: string;
//   is_active: boolean;
//   is_featured: boolean;
// }

// interface Order {
//   id: string;
//   customerName: string;
//   email: string;
//   phone: string;
//   items: { name: string; quantity: number; price: number }[];
//   totalAmount: number;
//   status: "pending" | "shipped" | "delivered";
//   createdAt: Timestamp;
// }

// const Admin = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [view, setView] = useState<"products" | "orders">("products");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const initialFormState = {
//     name: "",
//     price: "",
//     description: "",
//     image_url: "",
//     category: "posters" as CategoryType,
//     subcategory: "",
//     badge: "",
//     is_active: true,
//     is_featured: false,
//   };

//   const [form, setForm] = useState(initialFormState);

//   const sendWhatsApp = (order: Order, type: "confirm" | "shipping") => {
//     const message =
//       type === "confirm"
//         ? `Hi ${order.customerName}, aapka Imprinto order #${order.id} confirm ho gaya hai. Total: ₹${order.totalAmount}. Thank you!`
//         : `Hi ${order.customerName}, good news! Aapka order #${order.id} ship ho gaya hai. Jald hi aap tak pahuch jayega.`;

//     const encodedMsg = encodeURIComponent(message);
//     window.open(`https://wa.me/${order.phone}?text=${encodedMsg}`, "_blank");
//   };

//   const sendEmail = (order: Order, type: "confirm" | "shipping") => {
//     const subject =
//       type === "confirm"
//         ? `Order Confirmed - #${order.id}`
//         : `Your Order has Shipped! - #${order.id}`;
//     const body =
//       type === "confirm"
//         ? `Hi ${order.customerName},\n\nThank you for shopping with Imprinto. Your order #${order.id} has been confirmed.\nTotal Amount: ₹${order.totalAmount}`
//         : `Hi ${order.customerName},\n\nYour order #${order.id} is on its way!`;

//     window.location.href = `mailto:${order.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//   };

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const snapshot = await getDocs(collection(db, "products"));
//       const list = snapshot.docs.map((docSnap: QueryDocumentSnapshot) => ({
//         id: docSnap.id,
//         ...(docSnap.data() as Omit<Product, "id">),
//       }));
//       setProducts(list);
//     } catch (error) {
//       toast({ title: "Products error", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   }, [toast]);

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
//       const snapshot = await getDocs(q);
//       const list = snapshot.docs.map((docSnap: QueryDocumentSnapshot) => ({
//         id: docSnap.id,
//         ...(docSnap.data() as Omit<Order, "id">),
//       }));
//       setOrders(list);
//     } catch (error) {
//       toast({ title: "Orders error", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   }, [toast]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
//       if (!user || user.email !== "support.imprinto@gmail.com") {
//         navigate("/");
//         return;
//       }
//       if (view === "products") {
//         fetchProducts();
//       } else {
//         fetchOrders();
//       }
//       setCheckingAuth(false);
//     });
//     return () => unsubscribe();
//   }, [navigate, fetchProducts, fetchOrders, view]);

//   const handleSave = async () => {
//     if (!form.name || !form.price || !form.image_url) {
//       toast({ title: "Data missing", variant: "destructive" });
//       return;
//     }
//     const payload = {
//       ...form,
//       price: Number(form.price),
//       updatedAt: Timestamp.now(),
//     };
//     try {
//       if (editingId) {
//         await updateDoc(doc(db, "products", editingId), payload);
//         toast({ title: "Updated" });
//       } else {
//         await addDoc(collection(db, "products"), {
//           ...payload,
//           createdAt: Timestamp.now(),
//         });
//         toast({ title: "Created" });
//       }
//       resetForm();
//       fetchProducts();
//     } catch (err) {
//       toast({ title: "Save failed", variant: "destructive" });
//     }
//   };

//   const resetForm = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setForm(initialFormState);
//   };

//   if (checkingAuth) return null;

//   return (
//     <div className="min-h-screen bg-[#050505] text-white">
//       <nav className="border-b border-white/10 bg-[#080808] px-8 py-6 flex justify-between items-center sticky top-0 z-50">
//         <div className="flex items-center gap-6">
//           <button
//             onClick={() => navigate("/")}
//             className="text-gray-500 hover:text-white"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <div className="flex gap-6 ml-4">
//             <button
//               onClick={() => setView("products")}
//               className={`text-[10px] font-bold uppercase ${view === "products" ? "text-primary" : "text-gray-500"}`}
//             >
//               Products
//             </button>
//             <button
//               onClick={() => setView("orders")}
//               className={`text-[10px] font-bold uppercase ${view === "orders" ? "text-primary" : "text-gray-500"}`}
//             >
//               Orders
//             </button>
//           </div>
//         </div>
//         <div className="flex gap-4">
//           {view === "products" && (
//             <Button
//               onClick={() => setShowForm(true)}
//               className="bg-primary text-black font-bold h-10 px-6 rounded-none text-[10px]"
//             >
//               Add Product
//             </Button>
//           )}
//           <Button
//             variant="outline"
//             className="border-white/10 rounded-none h-10 w-10"
//             onClick={() => signOut(auth)}
//           >
//             <LogOut size={14} />
//           </Button>
//         </div>
//       </nav>

//       <main className="p-10">
//         {loading ? (
//           <div className="flex justify-center py-40">
//             <Loader2 className="animate-spin text-primary" />
//           </div>
//         ) : view === "products" ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//             {products.map((p) => (
//               <div
//                 key={p.id}
//                 className="bg-[#080808] border border-white/5 group"
//               >
//                 <div className="aspect-[3/4]">
//                   <img
//                     src={p.image_url}
//                     className="w-full h-full object-cover"
//                     alt={p.name}
//                   />
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-[11px] font-bold uppercase truncate">
//                     {p.name}
//                   </h3>
//                   <div className="flex justify-between items-center mt-4">
//                     <p className="text-primary font-bold">₹{p.price}</p>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => {
//                           setEditingId(p.id);
//                           setForm({ ...p, price: String(p.price) });
//                           setShowForm(true);
//                         }}
//                         className="p-1.5 border border-white/10 hover:bg-white hover:text-black"
//                       >
//                         <Edit size={12} />
//                       </button>
//                       <button
//                         onClick={() => {
//                           if (confirm("Delete?")) {
//                             deleteDoc(doc(db, "products", p.id)).then(
//                               fetchProducts,
//                             );
//                           }
//                         }}
//                         className="p-1.5 border border-white/10 text-red-500 hover:bg-red-500 hover:text-white"
//                       >
//                         <Trash2 size={12} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="max-w-5xl mx-auto space-y-4">
//             {orders.map((o) => (
//               <div
//                 key={o.id}
//                 className="bg-[#080808] border border-white/10 p-6 flex flex-col md:flex-row justify-between gap-6"
//               >
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <span
//                       className={`text-[9px] px-2 py-0.5 font-bold uppercase ${o.status === "pending" ? "bg-yellow-500/20 text-yellow-500" : "bg-green-500/20 text-green-500"}`}
//                     >
//                       {o.status}
//                     </span>
//                     <p className="text-[10px] text-gray-500 font-bold uppercase">
//                       ID: {o.id}
//                     </p>
//                   </div>
//                   <h3 className="text-lg font-bold uppercase tracking-tight">
//                     {o.customerName}
//                   </h3>
//                   <p className="text-xs text-gray-400">
//                     {o.email} | {o.phone}
//                   </p>
//                   <div className="mt-4 pt-4 border-t border-white/5">
//                     {o.items.map((item, i) => (
//                       <p
//                         key={i}
//                         className="text-[10px] text-gray-500 uppercase"
//                       >
//                         {item.name} x {item.quantity}
//                       </p>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="flex flex-col md:items-end justify-between gap-4">
//                   <p className="text-xl font-bold text-primary">
//                     ₹{o.totalAmount}
//                   </p>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => sendWhatsApp(o, "confirm")}
//                       className="p-2 border border-green-600/20 text-green-500"
//                     >
//                       <MessageCircle size={14} />
//                     </button>
//                     <button
//                       onClick={() => sendEmail(o, "confirm")}
//                       className="p-2 border border-blue-600/20 text-blue-500"
//                     >
//                       <Mail size={14} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Admin;

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import {
  Trash2,
  LogOut,
  Loader2,
  X,
  Edit,
  Mail,
  MessageCircle,
  Package,
  ShoppingCart,
} from "lucide-react";
import { auth, db } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";

type CategoryType = "stickers" | "posters" | "combo";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: CategoryType;
  subcategory: string;
  badge: string;
  is_active: boolean;
  is_featured: boolean;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered";
  createdAt: Timestamp;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [view, setView] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialFormState = {
    name: "",
    price: "",
    description: "",
    image_url: "",
    category: "posters" as CategoryType,
    subcategory: "",
    badge: "",
    is_active: true,
    is_featured: false,
  };

  const [form, setForm] = useState(initialFormState);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "products"), orderBy("name", "asc"));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Product, "id">),
      }));
      setProducts(list);
    } catch (err: unknown) {
      toast({ title: "Product Fetch Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Order, "id">),
      }));
      setOrders(list);
    } catch (err: unknown) {
      toast({ title: "Order Fetch Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: FirebaseUser | null) => {
        if (!user || user.email !== "support.imprinto@gmail.com") {
          navigate("/");
          return;
        }
        setCheckingAuth(false);

        // ✅ Fixed: Expression converted to a proper statement
        if (view === "products") {
          fetchProducts();
        } else {
          fetchOrders();
        }
      },
    );
    return () => unsubscribe();
  }, [navigate, fetchProducts, fetchOrders, view]);

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image_url) {
      toast({ title: "Missing Required Fields", variant: "destructive" });
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      updatedAt: Timestamp.now(),
    };

    try {
      setLoading(true);
      if (editingId) {
        const productRef = doc(db, "products", editingId);
        await updateDoc(productRef, payload);
        toast({ title: "Product Updated" });
      } else {
        await addDoc(collection(db, "products"), {
          ...payload,
          createdAt: Timestamp.now(),
        });
        toast({ title: "Product Created" });
      }
      resetForm();
      fetchProducts();
    } catch (err: unknown) {
      toast({ title: "Save Failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(initialFormState);
  };

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage selection:bg-primary selection:text-black">
      <Navbar />

      <div className="pt-28 pb-6 px-10 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#080808]/50 border-b border-white/5">
        <div className="flex bg-black p-1 border border-white/5">
          <button
            onClick={() => setView("products")}
            className={`flex items-center gap-2 px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
              view === "products"
                ? "bg-primary text-black"
                : "text-gray-500 hover:text-white"
            }`}
          >
            <Package size={14} /> Inventory
          </button>
          <button
            onClick={() => setView("orders")}
            className={`flex items-center gap-2 px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all ${
              view === "orders"
                ? "bg-primary text-black"
                : "text-gray-500 hover:text-white"
            }`}
          >
            <ShoppingCart size={14} /> Orders
          </button>
        </div>

        <div className="flex gap-4">
          {view === "products" && (
            <Button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-none h-12 px-8 hover:bg-primary transition-all"
            >
              Add Artifact
            </Button>
          )}
          <Button
            onClick={() => signOut(auth)}
            variant="outline"
            className="border-white/10 text-red-500 hover:bg-red-500 hover:text-white rounded-none h-12 transition-all px-4"
          >
            <LogOut size={16} />
          </Button>
        </div>
      </div>

      <main className="p-10">
        {loading && !showForm ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">
              Syncing Vault...
            </p>
          </div>
        ) : view === "products" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-[#080808] border border-white/5 group relative"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={p.image_url}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={p.name}
                  />
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-[11px] font-black uppercase tracking-tight truncate">
                    {p.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <p className="text-primary font-black italic">₹{p.price}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(p.id);
                          setForm({ ...p, price: String(p.price) });
                          setShowForm(true);
                        }}
                        className="p-2 border border-white/5 hover:bg-primary hover:text-black transition-all"
                      >
                        <Edit size={12} />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Purge this artifact?")) {
                            await deleteDoc(doc(db, "products", p.id));
                            fetchProducts();
                          }
                        }}
                        className="p-2 border border-white/5 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-4">
            {orders.map((o) => (
              <div
                key={o.id}
                className="bg-[#080808] border border-white/5 p-8 flex flex-col md:flex-row justify-between gap-8 animate-in fade-in duration-500"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="bg-primary/10 text-primary text-[9px] px-3 py-1 font-black uppercase tracking-widest">
                      {o.status}
                    </span>
                    <span className="text-[9px] text-gray-600 font-bold uppercase">
                      ID: {o.id}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter italic">
                    {o.customerName}
                  </h3>
                  <div className="flex gap-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                    <span>{o.email}</span>
                    <span>|</span>
                    <span>{o.phone}</span>
                  </div>
                  <div className="pt-4 border-t border-white/5 space-y-2">
                    {o.items.map((item, i) => (
                      <p
                        key={i}
                        className="text-[10px] text-gray-400 font-black uppercase tracking-widest"
                      >
                        {item.name}{" "}
                        <span className="text-primary">x{item.quantity}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:items-end justify-between gap-6">
                  <p className="text-4xl font-black text-white italic">
                    ₹{o.totalAmount}
                  </p>
                  <div className="flex gap-3">
                    <button className="p-4 border border-white/5 hover:bg-green-500 hover:text-black transition-all text-green-500">
                      <MessageCircle size={18} />
                    </button>
                    <button className="p-4 border border-white/5 hover:bg-blue-500 hover:text-black transition-all text-blue-500">
                      <Mail size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 backdrop-blur-xl animate-in zoom-in duration-300">
          <div className="bg-[#080808] border border-white/10 w-full max-w-2xl p-10 relative space-y-8 overflow-y-auto max-h-[90vh]">
            <button
              onClick={resetForm}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">
              {editingId ? "Modify Artifact" : "Inject New Artifact"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                  Name
                </label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-black border-white/10 rounded-none h-12 uppercase font-bold focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                  Price (INR)
                </label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="bg-black border-white/10 rounded-none h-12 font-bold focus:border-primary transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                  Image URL
                </label>
                <Input
                  value={form.image_url}
                  onChange={(e) =>
                    setForm({ ...form, image_url: e.target.value })
                  }
                  className="bg-black border-white/10 rounded-none h-12 font-bold focus:border-primary transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                  Description
                </label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="bg-black border-white/10 rounded-none min-h-[100px] uppercase font-bold focus:border-primary transition-all"
                />
              </div>
            </div>
            <Button
              onClick={handleSave}
              className="w-full bg-primary text-black font-black uppercase h-16 rounded-none tracking-widest text-lg hover:bg-white transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : editingId ? (
                "Update Identity"
              ) : (
                "Confirm Injection"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;