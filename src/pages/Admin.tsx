// import { useEffect, useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import Navbar from "@/components/Navbar";
// import axios, { AxiosError } from "axios";
// import {
//   Trash2,
//   LogOut,
//   Loader2,
//   Edit,
//   Package,
//   ShoppingCart,
//   Plus,
//   ArrowLeft,
//   UploadCloud,
//   CheckCircle2,
//   Star,
// } from "lucide-react";
// import { auth, db } from "@/lib/firebase";
// import {
//   onAuthStateChanged,
//   signOut,
//   User as FirebaseUser,
// } from "firebase/auth";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   Timestamp,
//   query,
//   orderBy,
//   DocumentData,
// } from "firebase/firestore";

// type CategoryType = "stickers" | "posters" | "combo";
// type OrderStatus = "pending" | "shipped" | "delivered";

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
//   items: string;
//   totalAmount: number;
//   status: OrderStatus;
//   trackingId?: string;
//   createdAt: Timestamp;
// }

// interface CloudinaryResponse {
//   secure_url: string;
// }

// interface CloudinaryError {
//   error: {
//     message: string;
//   };
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
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [isUploading, setIsUploading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image_url: "",
//     category: "posters" as CategoryType,
//     subcategory: "",
//     badge: "",
//     is_active: true,
//     is_featured: false,
//   });

//   const [orderForm, setOrderForm] = useState({
//     customerName: "",
//     email: "",
//     phone: "",
//     items: "",
//     totalAmount: "",
//     status: "pending" as OrderStatus,
//     trackingId: "",
//   });

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "admin_uploads");

//     try {
//       setIsUploading(true);
//       const res = await axios.post<CloudinaryResponse>(
//         `https://api.cloudinary.com/v1_1/dyjj0t5gk/image/upload`,
//         formData,
//       );

//       if (res.data.secure_url) {
//         setForm((prev) => ({ ...prev, image_url: res.data.secure_url }));
//         toast({ title: "Visual Assets Secured" });
//       }
//     } catch (err) {
//       const axiosError = err as AxiosError<CloudinaryError>;
//       console.error(
//         "Cloudinary Error:",
//         axiosError.response?.data || axiosError.message,
//       );
//       toast({
//         title: "Upload Failed",
//         description:
//           axiosError.response?.data?.error?.message ||
//           "Check your preset settings",
//         variant: "destructive",
//       });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       if (view === "products") {
//         const q = query(collection(db, "products"), orderBy("name", "asc"));
//         const snapshot = await getDocs(q);
//         setProducts(
//           snapshot.docs.map(
//             (d) => ({ id: d.id, ...(d.data() as DocumentData) }) as Product,
//           ),
//         );
//       } else {
//         const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
//         const snapshot = await getDocs(q);
//         setOrders(
//           snapshot.docs.map(
//             (d) => ({ id: d.id, ...(d.data() as DocumentData) }) as Order,
//           ),
//         );
//       }
//     } catch (err) {
//       console.error("Firebase Sync Error:", err);
//       toast({ title: "Sync Error", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   }, [view, toast]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (user: FirebaseUser | null) => {
//         if (!user || user.email !== "support.imprinto@gmail.com") {
//           navigate("/");
//           return;
//         }
//         setCheckingAuth(false);
//         fetchData();
//       },
//     );
//     return () => unsubscribe();
//   }, [navigate, fetchData]);

//   const saveProduct = async () => {
//     if (!form.name || !form.price || !form.image_url) {
//       toast({ title: "Fields Incomplete" });
//       return;
//     }
//     const payload = {
//       ...form,
//       price: Number(form.price),
//       updatedAt: Timestamp.now(),
//     };
//     try {
//       setLoading(true);
//       if (editingId) {
//         await updateDoc(doc(db, "products", editingId), payload);
//       } else {
//         await addDoc(collection(db, "products"), {
//           ...payload,
//           createdAt: Timestamp.now(),
//         });
//       }
//       toast({ title: "Registry Updated" });
//       resetForm();
//       fetchData();
//     } catch (err) {
//       toast({ title: "Action Failed" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveOrder = async () => {
//     if (!orderForm.customerName || !orderForm.totalAmount) {
//       toast({ title: "Order Details Incomplete" });
//       return;
//     }
//     const payload = {
//       ...orderForm,
//       totalAmount: Number(orderForm.totalAmount),
//       updatedAt: Timestamp.now(),
//     };
//     try {
//       setLoading(true);
//       if (editingId) {
//         await updateDoc(doc(db, "orders", editingId), payload);
//       } else {
//         await addDoc(collection(db, "orders"), {
//           ...payload,
//           createdAt: Timestamp.now(),
//         });
//       }
//       toast({ title: "Order Logged" });
//       resetForm();
//       fetchData();
//     } catch (err) {
//       toast({ title: "Order Save Failed" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setForm({
//       name: "",
//       price: "",
//       description: "",
//       image_url: "",
//       category: "posters",
//       subcategory: "",
//       badge: "",
//       is_active: true,
//       is_featured: false,
//     });
//     setOrderForm({
//       customerName: "",
//       email: "",
//       phone: "",
//       items: "",
//       totalAmount: "",
//       status: "pending",
//       trackingId: "",
//     });
//   };

//   if (checkingAuth) return null;

//   return (
//     <div className="min-h-screen bg-[#020202] text-white font-bricolage transition-colors duration-500">
//       <Navbar />

//       {!showForm ? (
//         <>
//           <div className="pt-24 pb-8 px-6 md:px-12 border-b border-white/5 bg-black/60 backdrop-blur-md sticky top-0 z-50">
//             <div className="max-w-[95rem] mx-auto flex items-center justify-between gap-6">
//               <h1 className="text-2xl font-black uppercase tracking-tighter italic">
//                 Manage <span className="text-white/20">{view}</span>
//               </h1>

//               <div className="flex items-center gap-5">
//                 <div className="flex bg-white/5 p-1 border border-white/10 rounded-full">
//                   <button
//                     onClick={() => setView("products")}
//                     className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
//                       view === "products"
//                         ? "bg-white text-black"
//                         : "text-gray-400 hover:text-white"
//                     }`}
//                   >
//                     <Package size={12} className="inline mr-2" /> Inventory
//                   </button>
//                   <button
//                     onClick={() => setView("orders")}
//                     className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
//                       view === "orders"
//                         ? "bg-white text-black"
//                         : "text-gray-400 hover:text-white"
//                     }`}
//                   >
//                     <ShoppingCart size={12} className="inline mr-2" /> Orders
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => {
//                     resetForm();
//                     setShowForm(true);
//                   }}
//                   className="p-3.5 bg-primary text-black rounded-full hover:scale-110 transition-all"
//                 >
//                   <Plus size={20} strokeWidth={3} />
//                 </button>
//                 <button
//                   onClick={() => signOut(auth)}
//                   className="p-3 border border-white/10 rounded-full text-red-500 hover:bg-red-500/10 transition-colors"
//                 >
//                   <LogOut size={16} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <main className="p-6 md:p-12 max-w-[95rem] mx-auto">
//             {loading ? (
//               <div className="py-40 flex flex-col items-center gap-6">
//                 <div className="w-8 h-8 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
//               </div>
//             ) : view === "products" ? (
//               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-10">
//                 {products.map((p) => (
//                   <div key={p.id} className="group relative">
//                     <div className="aspect-[3/4] bg-white/5 overflow-hidden rounded-2xl border border-white/5 relative">
//                       <img
//                         src={p.image_url}
//                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                         alt={p.name}
//                       />
//                       {p.is_featured && (
//                         <div className="absolute top-3 left-3 bg-primary text-black p-1.5 rounded-full">
//                           <Star size={12} fill="currentColor" />
//                         </div>
//                       )}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
//                         <div className="flex gap-2 w-full">
//                           <button
//                             onClick={() => {
//                               setEditingId(p.id);
//                               setForm({
//                                 ...p,
//                                 price: String(p.price),
//                                 subcategory: p.subcategory || "",
//                                 badge: p.badge || "",
//                                 is_active: p.is_active ?? true,
//                                 is_featured: p.is_featured ?? false,
//                               });
//                               setShowForm(true);
//                             }}
//                             className="flex-1 bg-white text-black py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={async () => {
//                               if (window.confirm("Purge Product?")) {
//                                 await deleteDoc(doc(db, "products", p.id));
//                                 fetchData();
//                               }
//                             }}
//                             className="px-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 transition-colors"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-3 px-1 flex justify-between items-start">
//                       <div className="flex flex-col min-w-0">
//                         <span className="text-[8px] font-black uppercase text-gray-500 tracking-wider truncate">
//                           {p.category} {p.subcategory && `• ${p.subcategory}`}
//                         </span>
//                         <h3 className="text-[10px] font-black uppercase tracking-wide truncate">
//                           {p.name}
//                         </h3>
//                       </div>
//                       <p className="font-mono text-[10px] font-bold text-primary italic">
//                         ₹{p.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="space-y-4 max-w-6xl mx-auto">
//                 {orders.map((o) => (
//                   <div
//                     key={o.id}
//                     className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center hover:bg-white/[0.04] transition-colors"
//                   >
//                     <div className="flex-1 space-y-2">
//                       <div className="flex gap-2">
//                         <span
//                           className={`text-[8px] px-3 py-1 rounded-full font-black uppercase ${
//                             o.status === "delivered"
//                               ? "bg-green-500/20 text-green-500"
//                               : "bg-primary/20 text-primary"
//                           }`}
//                         >
//                           {o.status}
//                         </span>
//                         <span className="text-[9px] text-white/20 font-mono">
//                           {o.id}
//                         </span>
//                       </div>
//                       <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none">
//                         {o.customerName}
//                       </h3>
//                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate max-w-md">
//                         {o.items}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <p className="text-3xl font-black italic">
//                         ₹{o.totalAmount}
//                       </p>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => {
//                             setEditingId(o.id);
//                             setOrderForm({
//                               customerName: o.customerName,
//                               email: o.email,
//                               phone: o.phone,
//                               items: o.items,
//                               totalAmount: String(o.totalAmount),
//                               status: o.status,
//                               trackingId: o.trackingId || "",
//                             });
//                             setShowForm(true);
//                           }}
//                           className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all"
//                         >
//                           <Edit size={16} />
//                         </button>
//                         <button
//                           onClick={async () => {
//                             if (window.confirm("Purge Order?")) {
//                               await deleteDoc(doc(db, "orders", o.id));
//                               fetchData();
//                             }
//                           }}
//                           className="p-3 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 transition-all"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </main>
//         </>
//       ) : (
//         <div className="min-h-screen pt-24 pb-20 px-6">
//           <div className="max-w-5xl mx-auto">
//             <button
//               onClick={resetForm}
//               className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-all"
//             >
//               <ArrowLeft size={14} />{" "}
//               <span className="text-[9px] font-black uppercase tracking-widest">
//                 Back to Dashboard
//               </span>
//             </button>
//             <h2 className="text-5xl font-black uppercase tracking-tighter italic mb-10 leading-none">
//               {editingId ? "Modify" : "Insert"}{" "}
//               <span className="text-primary">
//                 {view === "products" ? "Artifact" : "Order"}
//               </span>
//             </h2>

//             <div className="grid md:grid-cols-2 gap-12">
//               <div className="aspect-[3/4] rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center bg-white/[0.02] relative overflow-hidden group">
//                 {form.image_url ? (
//                   <>
//                     <img
//                       src={form.image_url}
//                       className="w-full h-full object-cover"
//                       alt="Preview"
//                     />
//                     <button
//                       onClick={() => setForm((p) => ({ ...p, image_url: "" }))}
//                       className="absolute top-4 right-4 p-3 bg-red-500 rounded-xl"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </>
//                 ) : (
//                   <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
//                     {isUploading ? (
//                       <Loader2 className="animate-spin text-primary" />
//                     ) : (
//                       <UploadCloud size={32} className="text-gray-500" />
//                     )}
//                     <span className="text-[8px] font-black uppercase mt-2 text-gray-500">
//                       Select Image
//                     </span>
//                     <input
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                     />
//                   </label>
//                 )}
//               </div>
//               <div className="space-y-6">
//                 <Input
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   className="bg-transparent border-0 border-b border-white/10 rounded-none h-14 text-2xl font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
//                   placeholder="Artifact Name"
//                 />

//                 <div className="grid grid-cols-2 gap-8">
//                   <Input
//                     type="number"
//                     value={form.price}
//                     onChange={(e) =>
//                       setForm({ ...form, price: e.target.value })
//                     }
//                     className="bg-transparent border-0 border-b border-white/10 rounded-none h-14 text-2xl font-black px-0 focus-visible:ring-0 focus-visible:border-primary"
//                     placeholder="Price"
//                   />
//                   <select
//                     value={form.category}
//                     onChange={(e) =>
//                       setForm({
//                         ...form,
//                         category: e.target.value as CategoryType,
//                       })
//                     }
//                     className="bg-transparent border-0 border-b border-white/10 h-14 text-sm font-black uppercase focus:outline-none px-0 cursor-pointer"
//                   >
//                     <option className="bg-black" value="posters">
//                       Posters
//                     </option>
//                     <option className="bg-black" value="stickers">
//                       Stickers
//                     </option>
//                     <option className="bg-black" value="combo">
//                       Combo
//                     </option>
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-8">
//                   <Input
//                     value={form.subcategory}
//                     onChange={(e) =>
//                       setForm({ ...form, subcategory: e.target.value })
//                     }
//                     className="bg-transparent border-0 border-b border-white/10 rounded-none h-12 text-sm font-bold uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
//                     placeholder="Subcategory (e.g. Cars)"
//                   />
//                   <Input
//                     value={form.badge}
//                     onChange={(e) =>
//                       setForm({ ...form, badge: e.target.value })
//                     }
//                     className="bg-transparent border-0 border-b border-white/10 rounded-none h-12 text-sm font-bold uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
//                     placeholder="Badge (e.g. Best Seller)"
//                   />
//                 </div>

//                 <div className="flex gap-6 py-4">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="active"
//                       checked={form.is_active}
//                       onCheckedChange={(checked) =>
//                         setForm({ ...form, is_active: checked as boolean })
//                       }
//                     />
//                     <label
//                       htmlFor="active"
//                       className="text-[10px] font-black uppercase tracking-widest cursor-pointer"
//                     >
//                       Active
//                     </label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="featured"
//                       checked={form.is_featured}
//                       onCheckedChange={(checked) =>
//                         setForm({ ...form, is_featured: checked as boolean })
//                       }
//                     />
//                     <label
//                       htmlFor="featured"
//                       className="text-[10px] font-black uppercase tracking-widest cursor-pointer"
//                     >
//                       Featured
//                     </label>
//                   </div>
//                 </div>

//                 <Textarea
//                   value={form.description}
//                   onChange={(e) =>
//                     setForm({ ...form, description: e.target.value })
//                   }
//                   className="bg-white/[0.03] border-white/10 rounded-2xl min-h-[100px] p-6 text-sm"
//                   placeholder="Description..."
//                 />

//                 <Button
//                   onClick={view === "products" ? saveProduct : saveOrder}
//                   disabled={isUploading || loading}
//                   className="w-full bg-white text-black font-black uppercase h-16 rounded-2xl text-sm hover:bg-primary transition-all"
//                 >
//                   Save Identity
//                 </Button>
//               </div>
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
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import axios, { AxiosError } from "axios";
import {
  Trash2,
  LogOut,
  Loader2,
  Edit,
  Package,
  ShoppingCart,
  Plus,
  ArrowLeft,
  UploadCloud,
  Star,
  Zap,
  MapPin,
  User,
  CreditCard,
  AtSign,
  Phone,
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
  DocumentData,
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
  address: string;
  city: string;
  pincode: string;
  state: string;
  items: string;
  totalAmount: number;
  status: OrderStatus;
  trackingId?: string;
  createdAt: Timestamp;
}

interface CloudinaryResponse {
  secure_url: string;
}

interface CloudinaryError {
  error: {
    message: string;
  };
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
    subcategory: "",
    badge: "",
    is_active: true,
    is_featured: false,
  });

  const [orderForm, setOrderForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
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
    formData.append("upload_preset", "admin_uploads");
    try {
      setIsUploading(true);
      const res = await axios.post<CloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/dyjj0t5gk/image/upload`,
        formData,
      );
      if (res.data.secure_url) {
        setForm((prev) => ({ ...prev, image_url: res.data.secure_url }));
        toast({ title: "Visual Assets Secured" });
      }
    } catch (err) {
      const axiosError = err as AxiosError<CloudinaryError>;
      toast({
        title: "Upload Failed",
        description:
          axiosError.response?.data?.error?.message || "Check settings",
        variant: "destructive",
      });
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
          snapshot.docs.map(
            (d) => ({ id: d.id, ...(d.data() as DocumentData) }) as Product,
          ),
        );
      } else {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setOrders(
          snapshot.docs.map(
            (d) => ({ id: d.id, ...(d.data() as DocumentData) }) as Order,
          ),
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
      subcategory: "",
      badge: "",
      is_active: true,
      is_featured: false,
    });
    setOrderForm({
      customerName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      state: "",
      items: "",
      totalAmount: "",
      status: "pending",
      trackingId: "",
    });
  };

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-display selection:bg-primary">
      <Navbar />

      {!showForm ? (
        <>
          <div className="pt-28 pb-10 px-6 md:px-12 bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b-4 border-foreground">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary border-2 border-foreground flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Zap size={20} className="fill-foreground" />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter italic leading-none">
                  ADMIN <span className="text-foreground/20">{view}</span>
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex bg-foreground/5 p-1.5 border-2 border-foreground">
                  <button
                    onClick={() => setView("products")}
                    className={`px-8 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all ${view === "products" ? "bg-foreground text-background" : "text-foreground/40 hover:text-foreground"}`}
                  >
                    <Package size={14} className="inline mr-2" /> Inventory
                  </button>
                  <button
                    onClick={() => setView("orders")}
                    className={`px-8 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all ${view === "orders" ? "bg-foreground text-background" : "text-foreground/40 hover:text-foreground"}`}
                  >
                    <ShoppingCart size={14} className="inline mr-2" /> Orders
                  </button>
                </div>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="w-14 h-14 bg-accent-lime border-4 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all flex items-center justify-center"
                >
                  <Plus size={28} strokeWidth={4} />
                </button>
                <button
                  onClick={() => signOut(auth)}
                  className="w-14 h-14 border-4 border-foreground hover:bg-accent hover:text-white transition-all flex items-center justify-center"
                >
                  <LogOut size={24} />
                </button>
              </div>
            </div>
          </div>

          <main className="p-8 md:p-12 max-w-[1400px] mx-auto">
            {loading ? (
              <div className="py-40 flex justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : view === "products" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="group border-4 border-foreground bg-white hover:shadow-[12px_12px_0px_0px_rgba(0,212,255,1)] transition-all overflow-hidden"
                  >
                    <div className="aspect-[3/4] border-b-4 border-foreground relative bg-muted">
                      <img
                        src={p.image_url}
                        className="w-full h-full object-cover"
                        alt={p.name}
                      />
                      {p.is_featured && (
                        <div className="absolute top-4 left-4 bg-accent-lime border-2 border-foreground p-1.5">
                          <Star size={14} className="fill-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <button
                          onClick={() => {
                            setEditingId(p.id);
                            setForm({
                              ...p,
                              price: String(p.price),
                              subcategory: p.subcategory || "",
                              badge: p.badge || "",
                              is_active: p.is_active ?? true,
                              is_featured: p.is_featured ?? false,
                            });
                            setShowForm(true);
                          }}
                          className="w-12 h-12 bg-white border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-white"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm("Purge Product?")) {
                              await deleteDoc(doc(db, "products", p.id));
                              fetchData();
                            }
                          }}
                          className="w-12 h-12 bg-accent border-2 border-foreground flex items-center justify-center text-white hover:bg-foreground"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="p-5 flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-black uppercase text-foreground/40 tracking-widest">
                          {p.category}
                        </span>
                        <h3 className="text-sm font-black uppercase tracking-tight truncate max-w-[120px]">
                          {p.name}
                        </h3>
                      </div>
                      <p className="text-lg font-black text-primary italic">
                        ₹{p.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((o) => (
                  <div
                    key={o.id}
                    className="bg-white border-4 border-foreground p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex-1">
                      <div className="flex gap-3 mb-3">
                        <span
                          className={`px-4 py-1 border-2 border-foreground text-[10px] font-black uppercase ${o.status === "delivered" ? "bg-accent-lime" : "bg-primary"}`}
                        >
                          {o.status}
                        </span>
                        <span className="text-[10px] font-black text-foreground/20 uppercase">
                          ID: {o.id.slice(0, 8)}
                        </span>
                      </div>
                      <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none mb-2">
                        {o.customerName}
                      </h3>
                      <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                        {o.items}
                      </p>
                    </div>
                    <div className="flex items-center gap-8">
                      <p className="text-4xl font-black italic">
                        ₹{o.totalAmount}
                      </p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            setEditingId(o.id);
                            setOrderForm({
                              customerName: o.customerName,
                              email: o.email,
                              phone: o.phone,
                              address: o.address || "",
                              city: o.city || "",
                              pincode: o.pincode || "",
                              state: o.state || "",
                              items: o.items,
                              totalAmount: String(o.totalAmount),
                              status: o.status,
                              trackingId: o.trackingId || "",
                            });
                            setShowForm(true);
                          }}
                          className="w-12 h-12 border-2 border-foreground flex items-center justify-center hover:bg-primary"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm("Purge Order?")) {
                              await deleteDoc(doc(db, "orders", o.id));
                              fetchData();
                            }
                          }}
                          className="w-12 h-12 border-2 border-foreground flex items-center justify-center text-accent hover:bg-accent hover:text-white"
                        >
                          <Trash2 size={18} />
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
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
          <button
            onClick={resetForm}
            className="flex items-center gap-3 text-foreground/40 hover:text-foreground mb-12 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-[11px] font-black uppercase tracking-[0.4em]">
              Back to Dashboard
            </span>
          </button>
          <h2 className="text-7xl font-black uppercase tracking-tighter italic mb-16 leading-none">
            {editingId ? "Modify" : "Create"}{" "}
            <span className="text-primary">
              {view === "products" ? "Artifact" : "Order"}
            </span>
          </h2>

          {view === "products" ? (
            <div className="grid md:grid-cols-2 gap-16">
              <div className="aspect-[3/4] border-4 border-foreground border-dashed flex items-center justify-center bg-muted relative group overflow-hidden">
                {form.image_url ? (
                  <>
                    <img
                      src={form.image_url}
                      className="w-full h-full object-cover"
                      alt="P"
                    />
                    <button
                      onClick={() => setForm((p) => ({ ...p, image_url: "" }))}
                      className="absolute top-6 right-6 w-12 h-12 bg-accent text-white border-2 border-foreground flex items-center justify-center"
                    >
                      <Trash2 size={20} />
                    </button>
                  </>
                ) : (
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-foreground/5">
                    {isUploading ? (
                      <Loader2 className="animate-spin text-primary w-10 h-10" />
                    ) : (
                      <UploadCloud size={48} className="text-foreground/20" />
                    )}
                    <span className="text-[10px] font-black uppercase mt-4 tracking-widest">
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
              <div className="flex flex-col gap-8">
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-16 text-3xl font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                  placeholder="Name"
                />
                <div className="grid grid-cols-2 gap-10">
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-16 text-3xl font-black px-0 focus-visible:ring-0 focus-visible:border-primary"
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
                    className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground h-16 text-sm font-black uppercase focus:outline-none px-0 cursor-pointer"
                  >
                    <option value="posters">Posters</option>
                    <option value="stickers">Stickers</option>
                    <option value="combo">Combo</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <Input
                    value={form.subcategory}
                    onChange={(e) =>
                      setForm({ ...form, subcategory: e.target.value })
                    }
                    className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-12 text-sm font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                    placeholder="Subcategory"
                  />
                  <Input
                    value={form.badge}
                    onChange={(e) =>
                      setForm({ ...form, badge: e.target.value })
                    }
                    className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-12 text-sm font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                    placeholder="Badge"
                  />
                </div>
                <div className="flex gap-10 py-2">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="active"
                      checked={form.is_active}
                      onCheckedChange={(c) =>
                        setForm({ ...form, is_active: c as boolean })
                      }
                      className="w-6 h-6 border-2 border-foreground"
                    />
                    <label
                      htmlFor="active"
                      className="text-[11px] font-black uppercase tracking-widest cursor-pointer"
                    >
                      Live
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="featured"
                      checked={form.is_featured}
                      onCheckedChange={(c) =>
                        setForm({ ...form, is_featured: c as boolean })
                      }
                      className="w-6 h-6 border-2 border-foreground"
                    />
                    <label
                      htmlFor="featured"
                      className="text-[11px] font-black uppercase tracking-widest cursor-pointer"
                    >
                      Spotlight
                    </label>
                  </div>
                </div>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="bg-foreground/5 border-2 border-foreground rounded-none min-h-[120px] p-6 text-sm font-bold"
                  placeholder="Details..."
                />
                <Button
                  onClick={saveProduct}
                  disabled={isUploading || loading}
                  className="w-full bg-foreground text-background font-black uppercase h-20 text-lg hover:bg-primary hover:text-foreground shadow-[8px_8px_0px_0px_rgba(0,212,255,1)] hover:shadow-none"
                >
                  Commit Product
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-foreground/30 flex items-center gap-2">
                    <User size={12} /> Customer Name
                  </span>
                  <Input
                    value={orderForm.customerName}
                    onChange={(e) =>
                      setOrderForm({
                        ...orderForm,
                        customerName: e.target.value,
                      })
                    }
                    className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-16 text-2xl font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-foreground/30 flex items-center gap-2">
                    <CreditCard size={12} /> Total Amount
                  </span>
                  <Input
                    type="number"
                    value={orderForm.totalAmount}
                    onChange={(e) =>
                      setOrderForm({
                        ...orderForm,
                        totalAmount: e.target.value,
                      })
                    }
                    className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-16 text-2xl font-black px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-foreground/30 flex items-center gap-2">
                    <AtSign size={12} /> Email
                  </span>
                  <Input
                    value={orderForm.email}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, email: e.target.value })
                    }
                    className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-14 text-sm font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-foreground/30 flex items-center gap-2">
                    <Phone size={12} /> Phone
                  </span>
                  <Input
                    value={orderForm.phone}
                    onChange={(e) =>
                      setOrderForm({ ...orderForm, phone: e.target.value })
                    }
                    className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-14 text-sm font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-foreground/30 flex items-center gap-2">
                  <MapPin size={12} /> Full Address
                </span>
                <Textarea
                  value={orderForm.address}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, address: e.target.value })
                  }
                  className="bg-foreground/5 border-2 border-foreground rounded-none min-h-[100px] p-6 text-sm font-bold"
                  placeholder="House No, Street, Area..."
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Input
                  value={orderForm.city}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, city: e.target.value })
                  }
                  className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-12 text-sm font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                  placeholder="City"
                />
                <Input
                  value={orderForm.state}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, state: e.target.value })
                  }
                  className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-12 text-sm font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                  placeholder="State"
                />
                <Input
                  value={orderForm.pincode}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, pincode: e.target.value })
                  }
                  className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-12 text-sm font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                  placeholder="Pincode"
                />
                <select
                  value={orderForm.status}
                  onChange={(e) =>
                    setOrderForm({
                      ...orderForm,
                      status: e.target.value as OrderStatus,
                    })
                  }
                  className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground h-12 text-sm font-black uppercase focus:outline-none cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <Input
                  value={orderForm.items}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, items: e.target.value })
                  }
                  className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-12 text-sm font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                  placeholder="Items List"
                />
                <Input
                  value={orderForm.trackingId}
                  onChange={(e) =>
                    setOrderForm({ ...orderForm, trackingId: e.target.value })
                  }
                  className="bg-transparent border-x-0 border-t-0 border-b-4 border-foreground rounded-none h-12 text-sm font-black uppercase px-0 focus-visible:ring-0 focus-visible:border-primary"
                  placeholder="Tracking ID"
                />
              </div>
              <Button
                onClick={saveOrder}
                disabled={loading}
                className="w-full bg-foreground text-background font-black uppercase h-20 text-lg hover:bg-primary shadow-[8px_8px_0px_0px_rgba(0,212,255,1)] hover:shadow-none"
              >
                Commit Order
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;