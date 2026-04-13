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

// interface FormState {
//   name: string;
//   price: string;
//   description: string;
//   image_url: string;
//   category: CategoryType;
//   subcategory: string;
//   badge: string;
//   is_active: boolean;
//   is_featured: boolean;
// }

// const Admin = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [uploadingImage, setUploadingImage] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const initialFormState: FormState = {
//     name: "",
//     price: "",
//     description: "",
//     image_url: "",
//     category: "posters",
//     subcategory: "",
//     badge: "",
//     is_active: true,
//     is_featured: false,
//   };

//   const [form, setForm] = useState<FormState>(initialFormState);

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
//       toast({ title: "Products load nahi ho paye", variant: "destructive" });
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
//       fetchProducts();
//       setCheckingAuth(false);
//     });
//     return () => unsubscribe();
//   }, [navigate, fetchProducts]);

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploadingImage(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "imprinto_customs");

//     try {
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/dyjj0t5gk/image/upload`,
//         { method: "POST", body: formData },
//       );
//       const data = (await res.json()) as { secure_url: string };
//       if (data.secure_url) {
//         setForm((prev) => ({ ...prev, image_url: data.secure_url }));
//         toast({ title: "Photo upload ho gayi" });
//       }
//     } catch (err) {
//       toast({ title: "Upload fail ho gaya", variant: "destructive" });
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleEdit = (p: Product) => {
//     setEditingId(p.id);
//     setForm({ ...p, price: String(p.price) });
//     setShowForm(true);
//   };

//   const handleSave = async () => {
//     if (!form.name || !form.price || !form.image_url) {
//       toast({ title: "Zaroori details bhariye", variant: "destructive" });
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
//         toast({ title: "Product update ho gaya" });
//       } else {
//         await addDoc(collection(db, "products"), {
//           ...payload,
//           createdAt: Timestamp.now(),
//         });
//         toast({ title: "Product add ho gaya" });
//       }
//       resetForm();
//       fetchProducts();
//     } catch (err) {
//       toast({ title: "Process fail ho gaya", variant: "destructive" });
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
//             className="text-gray-500 hover:text-white transition-colors"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <div className="h-8 w-[1px] bg-white/10" />
//           <h1 className="text-xl font-bold uppercase tracking-tight">
//             Admin Dashboard
//           </h1>
//         </div>

//         <div className="flex gap-4">
//           <Button
//             onClick={() => setShowForm(true)}
//             className="bg-primary text-black font-bold uppercase rounded-none px-6 text-[10px] h-10 hover:bg-white transition-all"
//           >
//             Add New Product
//           </Button>
//           <Button
//             variant="outline"
//             className="border-white/10 rounded-none h-10 w-10 hover:bg-red-500/10"
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
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
//             {products.map((p) => (
//               <div
//                 key={p.id}
//                 className="bg-[#080808] border border-white/5 flex flex-col group transition-all hover:border-primary/40"
//               >
//                 <div className="aspect-[3/4] overflow-hidden bg-black relative">
//                   <img
//                     src={p.image_url}
//                     className="w-full h-full object-cover transition-all duration-700"
//                     alt={p.name}
//                   />
//                   {!p.is_active && (
//                     <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
//                       <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 border border-red-500/30 px-2 py-1">
//                         Inactive
//                       </span>
//                     </div>
//                   )}
//                   {p.is_featured && (
//                     <div className="absolute top-4 left-4 bg-primary text-black p-1.5">
//                       <Star size={12} fill="currentColor" />
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-6 flex flex-col flex-1">
//                   <div className="mb-4">
//                     <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">
//                       {p.category} / {p.subcategory}
//                     </p>
//                     <h3 className="font-bold uppercase text-[12px] tracking-widest truncate">
//                       {p.name}
//                     </h3>
//                   </div>
//                   <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
//                     <p className="text-primary font-bold text-xl">₹{p.price}</p>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(p)}
//                         className="p-2 border border-white/10 hover:bg-white hover:text-black transition-all"
//                       >
//                         <Edit size={14} />
//                       </button>
//                       <button
//                         onClick={() => {
//                           if (
//                             confirm(
//                               "Kya aap is product ko delete karna chahte hain?",
//                             )
//                           )
//                             deleteDoc(doc(db, "products", p.id)).then(
//                               fetchProducts,
//                             );
//                         }}
//                         className="p-2 border border-white/10 hover:bg-red-500 transition-all"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {showForm && (
//         <div className="fixed inset-0 bg-black/98 backdrop-blur-xl flex justify-center items-center z-[100] p-4 overflow-y-auto">
//           <div className="bg-[#080808] border border-white/10 p-10 w-full max-w-4xl relative">
//             <button
//               onClick={resetForm}
//               className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
//             >
//               <X size={24} />
//             </button>
//             <h2 className="text-3xl font-bold uppercase tracking-tight mb-10 border-b border-white/10 pb-6">
//               {editingId ? "Edit Product Details" : "Add New Product"}
//             </h2>

//             <div className="grid md:grid-cols-2 gap-12">
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-1">
//                     <label className="text-[10px] font-bold text-gray-500 uppercase">
//                       Category
//                     </label>
//                     <select
//                       value={form.category}
//                       onChange={(e) =>
//                         setForm({
//                           ...form,
//                           category: e.target.value as CategoryType,
//                         })
//                       }
//                       className="w-full bg-black border border-white/10 h-12 text-[11px] px-4 text-white outline-none focus:border-primary"
//                     >
//                       <option value="posters">Posters</option>
//                       <option value="stickers">Stickers</option>
//                       <option value="combo">Combo Pack</option>
//                     </select>
//                   </div>
//                   <div className="space-y-1">
//                     <label className="text-[10px] font-bold text-gray-500 uppercase">
//                       Sub-Category
//                     </label>
//                     <Input
//                       placeholder="e.g. Anime, Cars"
//                       value={form.subcategory}
//                       onChange={(e) =>
//                         setForm({
//                           ...form,
//                           subcategory: e.target.value.toLowerCase(),
//                         })
//                       }
//                       className="bg-black border-white/10 h-12 text-[11px] uppercase"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-[10px] font-bold text-gray-500 uppercase">
//                     Product Name
//                   </label>
//                   <Input
//                     placeholder="Enter name"
//                     value={form.name}
//                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                     className="bg-black border-white/10 h-12 text-[11px] uppercase"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-[10px] font-bold text-gray-500 uppercase">
//                     Price (INR)
//                   </label>
//                   <Input
//                     type="number"
//                     placeholder="Enter price"
//                     value={form.price}
//                     onChange={(e) =>
//                       setForm({ ...form, price: e.target.value })
//                     }
//                     className="bg-black border-white/10 h-12 text-[11px]"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-[10px] font-bold text-gray-500 uppercase">
//                     Description
//                   </label>
//                   <Textarea
//                     placeholder="Product details here..."
//                     value={form.description}
//                     onChange={(e) =>
//                       setForm({ ...form, description: e.target.value })
//                     }
//                     className="bg-black border-white/10 min-h-[100px] text-[11px] p-4"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 pt-4">
//                   <label className="flex items-center gap-3 p-3 border border-white/5 bg-black/40 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={form.is_active}
//                       onChange={(e) =>
//                         setForm({ ...form, is_active: e.target.checked })
//                       }
//                       className="accent-primary h-4 w-4"
//                     />
//                     <span className="text-[10px] font-bold uppercase text-gray-500">
//                       Active
//                     </span>
//                   </label>
//                   <label className="flex items-center gap-3 p-3 border border-white/5 bg-black/40 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={form.is_featured}
//                       onChange={(e) =>
//                         setForm({ ...form, is_featured: e.target.checked })
//                       }
//                       className="accent-primary h-4 w-4"
//                     />
//                     <span className="text-[10px] font-bold uppercase text-gray-500">
//                       Featured
//                     </span>
//                   </label>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <label className="text-[10px] font-bold text-gray-500 uppercase text-center block">
//                   Product Image
//                 </label>
//                 <div className="aspect-[3/4] bg-black border border-white/5 relative group cursor-pointer overflow-hidden max-w-[300px] mx-auto">
//                   {form.image_url ? (
//                     <img
//                       src={form.image_url}
//                       className="w-full h-full object-contain"
//                       alt="Preview"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex flex-col items-center justify-center text-gray-700">
//                       <ImageIcon size={40} />
//                       <p className="text-[10px] mt-4 font-bold uppercase tracking-widest">
//                         No Image Selected
//                       </p>
//                     </div>
//                   )}
//                   <div className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <input
//                       type="file"
//                       onChange={handleImageUpload}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                     />
//                     {uploadingImage ? (
//                       <Loader2 className="animate-spin text-black" />
//                     ) : (
//                       <Upload size={24} className="text-black" />
//                     )}
//                     <p className="text-[11px] font-bold mt-2 text-black uppercase">
//                       Upload Photo
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
//               <Button
//                 onClick={handleSave}
//                 disabled={uploadingImage}
//                 className="flex-[3] bg-primary text-black font-bold uppercase rounded-none h-16 text-[12px] hover:bg-white transition-all shadow-xl"
//               >
//                 {editingId ? "Update Product" : "Save Product"}
//               </Button>
//               <Button
//                 onClick={resetForm}
//                 variant="outline"
//                 className="flex-1 border-white/10 rounded-none h-16 text-[11px] font-bold uppercase hover:bg-white hover:text-black transition-all"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
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
import axios from "axios";
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
  Plus,
  ArrowLeft,
  UploadCloud,
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
type OrderStatus = "pending" | "shipped" | "delivered";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: CategoryType;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  items: string;
  totalAmount: number;
  status: OrderStatus;
  trackingId?: string;
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
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category: "posters" as CategoryType,
  });

  const [orderForm, setOrderForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    items: "",
    totalAmount: "",
    status: "pending" as OrderStatus,
    trackingId: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "imprinto_preset");
    formData.append("cloud_name", "dqr9vxc1z");

    try {
      setIsUploading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dqr9vxc1z/image/upload`,
        formData,
      );
      setForm((prev) => ({ ...prev, image_url: res.data.secure_url }));
      toast({ title: "Visual Assets Secured" });
    } catch (err) {
      toast({ title: "Upload Failed", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (view === "products") {
        const q = query(collection(db, "products"), orderBy("name", "asc"));
        const snapshot = await getDocs(q);
        setProducts(
          snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Product),
        );
      } else {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setOrders(
          snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Order),
        );
      }
    } catch (err) {
      toast({ title: "Sync Error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [view, toast]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: FirebaseUser | null) => {
        if (!user || user.email !== "support.imprinto@gmail.com") {
          navigate("/");
          return;
        }
        setCheckingAuth(false);
        fetchData();
      },
    );
    return () => unsubscribe();
  }, [navigate, fetchData]);

  const saveProduct = async () => {
    if (!form.name || !form.price || !form.image_url) {
      toast({ title: "Fields Incomplete" });
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
        await updateDoc(doc(db, "products", editingId), payload);
      } else {
        await addDoc(collection(db, "products"), {
          ...payload,
          createdAt: Timestamp.now(),
        });
      }
      toast({ title: "Registry Updated" });
      resetForm();
      fetchData();
    } catch (err) {
      toast({ title: "Action Failed" });
    } finally {
      setLoading(false);
    }
  };

  const saveOrder = async () => {
    if (!orderForm.customerName || !orderForm.totalAmount) {
      toast({ title: "Order Details Incomplete" });
      return;
    }
    const payload = {
      ...orderForm,
      totalAmount: Number(orderForm.totalAmount),
      updatedAt: Timestamp.now(),
    };
    try {
      setLoading(true);
      if (editingId) {
        await updateDoc(doc(db, "orders", editingId), payload);
      } else {
        await addDoc(collection(db, "orders"), {
          ...payload,
          createdAt: Timestamp.now(),
        });
      }
      toast({ title: "Order Logged" });
      resetForm();
      fetchData();
    } catch (err) {
      toast({ title: "Order Save Failed" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({
      name: "",
      price: "",
      description: "",
      image_url: "",
      category: "posters",
    });
    setOrderForm({
      customerName: "",
      email: "",
      phone: "",
      items: "",
      totalAmount: "",
      status: "pending",
      trackingId: "",
    });
  };

  const sendWhatsApp = (order: Order) => {
    const msg = `Hello ${order.customerName}, your order from Imprinto for ${order.items} is ${order.status}. Tracking ID: ${order.trackingId || "N/A"}.`;
    window.open(
      `https://wa.me/${order.phone}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  const sendEmail = (order: Order) => {
    const subject = `Update regarding your order ${order.id}`;
    const body = `Hi ${order.customerName},\n\nYour order is now ${order.status}.\nTracking details: ${order.trackingId || "Pending"}\n\nTeam Imprinto`;
    window.open(
      `mailto:${order.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
  };

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen bg-[#020202] text-white font-bricolage selection:bg-white selection:text-black">
      <Navbar />

      {!showForm ? (
        <>
          <div className="pt-24 pb-8 px-6 md:px-12 border-b border-white/5 bg-black/60 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-[95rem] mx-auto flex items-center justify-between gap-6">
              <div className="space-y-1">
                <h1 className="text-2xl font-black uppercase tracking-tighter italic">
                  Manage <span className="text-white/20">{view}</span>
                </h1>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex bg-white/5 p-1 border border-white/10 rounded-full">
                  <button
                    onClick={() => setView("products")}
                    className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${view === "products" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
                  >
                    <Package size={12} className="inline mr-2" /> Inventory
                  </button>
                  <button
                    onClick={() => setView("orders")}
                    className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${view === "orders" ? "bg-white text-black" : "text-gray-400 hover:text-white"}`}
                  >
                    <ShoppingCart size={12} className="inline mr-2" /> Orders
                  </button>
                </div>

                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="p-3.5 bg-primary text-black rounded-full hover:scale-110 transition-all shadow-xl shadow-primary/20"
                >
                  <Plus size={20} strokeWidth={3} />
                </button>

                <button
                  onClick={() => signOut(auth)}
                  className="p-3 border border-white/10 rounded-full text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>

          <main className="p-6 md:p-12 max-w-[95rem] mx-auto">
            {loading ? (
              <div className="py-40 flex flex-col items-center gap-6">
                <div className="w-8 h-8 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
              </div>
            ) : view === "products" ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-x-6 gap-y-10">
                {products.map((p) => (
                  <div key={p.id} className="group relative">
                    <div className="aspect-[3/4] bg-white/5 overflow-hidden rounded-2xl border border-white/5 relative">
                      <img
                        src={p.image_url}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        alt={p.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <div className="flex gap-2 w-full">
                          <button
                            onClick={() => {
                              setEditingId(p.id);
                              setForm({ ...p, price: String(p.price) });
                              setShowForm(true);
                            }}
                            className="flex-1 bg-white text-black py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest"
                          >
                            Edit
                          </button>
                          <button
                            onClick={async () => {
                              if (window.confirm("Purge Product?")) {
                                await deleteDoc(doc(db, "products", p.id));
                                fetchData();
                              }
                            }}
                            className="px-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 px-1 flex justify-between items-start">
                      <div className="flex flex-col min-w-0">
                        <span className="text-[8px] font-black uppercase text-gray-500 tracking-wider truncate">
                          {p.category}
                        </span>
                        <h3 className="text-[10px] font-black uppercase tracking-wide truncate group-hover:text-primary transition-colors">
                          {p.name}
                        </h3>
                      </div>
                      <p className="font-mono text-[10px] font-bold text-primary italic">
                        ₹{p.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 max-w-6xl mx-auto">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <span
                          className={`text-[8px] px-3 py-1 rounded-full font-black uppercase ${o.status === "delivered" ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"}`}
                        >
                          {o.status}
                        </span>
                        <span className="text-[9px] text-white/20 font-mono">
                          {o.id}
                        </span>
                      </div>
                      <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none">
                        {o.customerName}
                      </h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate max-w-md">
                        {o.items}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                      <p className="text-3xl font-black italic">
                        ₹{o.totalAmount}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(o.id);
                            setOrderForm({
                              customerName: o.customerName,
                              email: o.email,
                              phone: o.phone,
                              items: o.items,
                              totalAmount: String(o.totalAmount),
                              status: o.status,
                              trackingId: o.trackingId || "",
                            });
                            setShowForm(true);
                          }}
                          className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm("Purge Order?")) {
                              await deleteDoc(doc(db, "orders", o.id));
                              fetchData();
                            }
                          }}
                          className="p-3 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          onClick={() => sendWhatsApp(o)}
                          className="p-3 bg-white/5 rounded-full hover:bg-green-500 hover:text-black text-green-500 transition-all"
                        >
                          <MessageCircle size={16} />
                        </button>
                        <button
                          onClick={() => sendEmail(o)}
                          className="p-3 bg-white/5 rounded-full hover:bg-blue-500 hover:text-black text-blue-500 transition-all"
                        >
                          <Mail size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </>
      ) : (
        <div className="min-h-screen pt-24 pb-20 px-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={resetForm}
              className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-all"
            >
              <ArrowLeft size={14} />{" "}
              <span className="text-[9px] font-black uppercase tracking-widest">
                Back to Dashboard
              </span>
            </button>

            <h2 className="text-5xl font-black uppercase tracking-tighter italic mb-10">
              {editingId ? "Modify" : "Insert"}{" "}
              <span className="text-primary">
                {view === "products" ? "Artifact" : "Order"}
              </span>
            </h2>

            {view === "products" ? (
              <div className="grid md:grid-cols-2 gap-12">
                <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center bg-white/[0.02] relative overflow-hidden group">
                  {form.image_url ? (
                    <>
                      <img
                        src={form.image_url}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() =>
                          setForm((p) => ({ ...p, image_url: "" }))
                        }
                        className="absolute top-4 right-4 p-3 bg-red-500 rounded-xl"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  ) : (
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      {isUploading ? (
                        <Loader2 className="animate-spin text-primary" />
                      ) : (
                        <UploadCloud size={32} className="text-gray-500" />
                      )}
                      <span className="text-[8px] font-black uppercase mt-2 text-gray-500">
                        Select Image
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <div className="space-y-8">
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-transparent border-0 border-b border-white/10 rounded-none h-14 text-2xl font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                    placeholder="Artifact Name"
                  />
                  <div className="grid grid-cols-2 gap-8">
                    <Input
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      className="bg-transparent border-0 border-b border-white/10 rounded-none h-14 text-2xl font-black px-0 focus-visible:ring-0 focus-visible:border-primary"
                      placeholder="Price"
                    />
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          category: e.target.value as CategoryType,
                        })
                      }
                      className="bg-transparent border-0 border-b border-white/10 h-14 text-sm font-black uppercase focus:outline-none px-0 cursor-pointer"
                    >
                      <option className="bg-black" value="posters">
                        Posters
                      </option>
                      <option className="bg-black" value="stickers">
                        Stickers
                      </option>
                      <option className="bg-black" value="combo">
                        Combo
                      </option>
                    </select>
                  </div>
                  <Textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="bg-white/[0.03] border-white/10 rounded-2xl min-h-[120px] p-6 text-sm"
                    placeholder="Description..."
                  />
                  <Button
                    onClick={saveProduct}
                    disabled={isUploading || loading}
                    className="w-full bg-white text-black font-black uppercase h-16 rounded-2xl text-sm hover:bg-primary transition-all"
                  >
                    Save Identity
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-10 bg-white/[0.02] border border-white/5 p-10 rounded-3xl">
                <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      Customer
                    </label>
                    <Input
                      value={orderForm.customerName}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          customerName: e.target.value,
                        })
                      }
                      className="bg-transparent border-0 border-b border-white/10 rounded-none h-10 text-xl font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      Status
                    </label>
                    <div className="flex bg-black/40 p-1 rounded-full border border-white/10">
                      {(
                        ["pending", "shipped", "delivered"] as OrderStatus[]
                      ).map((s) => (
                        <button
                          key={s}
                          onClick={() =>
                            setOrderForm({ ...orderForm, status: s })
                          }
                          className={`flex-1 py-2 rounded-full text-[8px] font-black uppercase transition-all ${orderForm.status === s ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      Phone
                    </label>
                    <Input
                      value={orderForm.phone}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, phone: e.target.value })
                      }
                      className="bg-transparent border-0 border-b border-white/10 rounded-none h-10 text-xl font-black px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      Email
                    </label>
                    <Input
                      value={orderForm.email}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, email: e.target.value })
                      }
                      className="bg-transparent border-0 border-b border-white/10 rounded-none h-10 text-xl font-black px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      Artifacts (Separate with commas for multiple)
                    </label>
                    <Input
                      value={orderForm.items}
                      onChange={(e) =>
                        setOrderForm({ ...orderForm, items: e.target.value })
                      }
                      placeholder="e.g. Porsche 911 Poster, Supra Sticker, RX7 Combo"
                      className="bg-transparent border-0 border-b border-white/10 rounded-none h-10 text-xl font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      Total Valuation (INR)
                    </label>
                    <Input
                      type="number"
                      value={orderForm.totalAmount}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          totalAmount: e.target.value,
                        })
                      }
                      className="bg-transparent border-0 border-b border-white/10 rounded-none h-10 text-xl font-black px-0 focus-visible:ring-0 focus-visible:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                      Tracking Details
                    </label>
                    <Input
                      value={orderForm.trackingId}
                      onChange={(e) =>
                        setOrderForm({
                          ...orderForm,
                          trackingId: e.target.value,
                        })
                      }
                      className="bg-transparent border-0 border-b border-white/10 rounded-none h-10 text-lg font-black px-0 focus-visible:ring-0 focus-visible:border-primary"
                      placeholder="Carrier ID..."
                    />
                  </div>
                </div>
                <Button
                  onClick={saveOrder}
                  disabled={loading}
                  className="w-full bg-white text-black font-black uppercase h-16 rounded-2xl text-sm hover:bg-primary transition-all"
                >
                  Execute Order
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;