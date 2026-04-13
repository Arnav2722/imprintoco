// import { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Plus,
//   Trash2,
//   ArrowLeft,
//   LogOut,
//   Loader2,
//   Upload,
//   Image as ImageIcon,
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
//   getDoc,
//   Timestamp,
//   QueryDocumentSnapshot,
//   DocumentData,
// } from "firebase/firestore";

// interface Product {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   image_url: string;
//   category: "stickers" | "posters" | "combo";
//   subcategory: string;
//   badge: string;
//   is_active: boolean;
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

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image_url: "",
//     category: "posters" as Product["category"],
//     subcategory: "",
//     badge: "",
//     is_active: true,
//   });

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const snapshot = await getDocs(collection(db, "products"));
//       const list = snapshot.docs.map(
//         (docSnap: QueryDocumentSnapshot<DocumentData>) => ({
//           id: docSnap.id,
//           ...docSnap.data(),
//         }),
//       ) as Product[];
//       setProducts(list);
//     } catch (error) {
//       toast({ title: "Fetch failed", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   }, [toast]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
//       if (!user || user.email !== "support.imprinto@gmail.com") {
//         navigate("/");
//         return;
//       }
//       await fetchProducts();
//       setCheckingAuth(false);
//     });
//     return () => unsubscribe();
//   }, [navigate, fetchProducts]);

//   // ✅ Cloudinary Upload Logic
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploadingImage(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "imprinto_customs"); // Use your existing preset

//     try {
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/dyjj0t5gk/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//         },
//       );
//       const data = await res.json();
//       if (data.secure_url) {
//         setForm((prev) => ({ ...prev, image_url: data.secure_url }));
//         toast({ title: "Image Uploaded Successfully" });
//       }
//     } catch (err) {
//       toast({ title: "Upload failed", variant: "destructive" });
//     } finally {
//       setUploadingImage(false);
//     }
//   };

//   const handleSave = async () => {
//     if (!form.name || !form.price || !form.image_url) {
//       toast({ title: "Please fill required fields", variant: "destructive" });
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
//         toast({ title: "Artifact Updated" });
//       } else {
//         await addDoc(collection(db, "products"), {
//           ...payload,
//           createdAt: Timestamp.now(),
//         });
//         toast({ title: "Artifact Created" });
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
//     setForm({
//       name: "",
//       price: "",
//       description: "",
//       image_url: "",
//       category: "posters",
//       subcategory: "",
//       badge: "",
//       is_active: true,
//     });
//   };

//   if (checkingAuth) {
//     return (
//       <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-bricolage">
//         <Loader2 className="animate-spin text-primary mb-4" size={40} />
//         <p className="uppercase tracking-[0.3em] text-[10px] font-black">
//           Decrypting Vault...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#050505] text-white font-bricolage">
//       <header className="border-b border-white/5 p-8 flex justify-between items-center bg-[#080808] sticky top-0 z-40">
//         <div className="flex items-center gap-8">
//           <button
//             onClick={() => navigate("/")}
//             className="hover:text-primary transition-all"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <div>
//             <h1 className="text-2xl font-black uppercase tracking-tighter">
//               Command Center
//             </h1>
//             <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">
//               Admin Access Granted
//             </p>
//           </div>
//         </div>
//         <div className="flex gap-4">
//           <Button
//             onClick={() => setShowForm(true)}
//             className="bg-primary text-black font-black uppercase rounded-none px-8 h-12 text-[10px] tracking-widest hover:bg-white transition-all"
//           >
//             Add New Artifact
//           </Button>
//           <Button
//             variant="outline"
//             className="border-white/10 rounded-none h-12 w-12 hover:bg-red-500/10 hover:border-red-500/50"
//             onClick={() => signOut(auth)}
//           >
//             <LogOut size={18} />
//           </Button>
//         </div>
//       </header>

//       <main className="p-10">
//         {loading ? (
//           <div className="flex justify-center py-40">
//             <Loader2 className="animate-spin text-primary" size={40} />
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
//             {products.map((p) => (
//               <div
//                 key={p.id}
//                 className="bg-[#0a0a0a] border border-white/5 group hover:border-primary transition-all flex flex-col"
//               >
//                 <div className="aspect-[3/4] overflow-hidden bg-black border-b border-white/5 relative">
//                   <img
//                     src={p.image_url}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
//                   {!p.is_active && (
//                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-red-500">
//                       Inactive
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-5 flex flex-col flex-1">
//                   <h3 className="font-black uppercase text-[11px] tracking-widest truncate mb-2">
//                     {p.name}
//                   </h3>
//                   <p className="text-primary font-black text-lg">₹{p.price}</p>
//                   <div className="flex gap-2 mt-6">
//                     <Button
//                       variant="outline"
//                       className="flex-1 rounded-none border-white/5 text-[9px] font-black uppercase h-10 hover:bg-white hover:text-black"
//                       onClick={() => {
//                         setEditingId(p.id);
//                         setForm({ ...p, price: String(p.price) });
//                         setShowForm(true);
//                       }}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="destructive"
//                       className="rounded-none h-10 w-10"
//                       onClick={() => {
//                         if (confirm("Delete artifact?"))
//                           deleteDoc(doc(db, "products", p.id)).then(
//                             fetchProducts,
//                           );
//                       }}
//                     >
//                       <Trash2 size={14} />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {showForm && (
//         <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex justify-center items-center z-[100] p-6 overflow-y-auto">
//           <div className="bg-[#080808] border border-white/10 p-10 w-full max-w-2xl space-y-8 relative">
//             <h2 className="text-3xl font-black uppercase tracking-tighter border-b border-white/5 pb-6">
//               {editingId ? "Modify Artifact" : "Create Artifact"}
//             </h2>

//             <div className="grid md:grid-cols-2 gap-8">
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
//                     General Info
//                   </label>
//                   <Input
//                     placeholder="PRODUCT NAME"
//                     value={form.name}
//                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                     className="bg-black border-white/10 rounded-none h-14 text-[11px] font-black uppercase tracking-widest"
//                   />
//                   <Input
//                     type="number"
//                     placeholder="PRICE (₹)"
//                     value={form.price}
//                     onChange={(e) =>
//                       setForm({ ...form, price: e.target.value })
//                     }
//                     className="bg-black border-white/10 rounded-none h-14 text-[11px] font-black uppercase tracking-widest"
//                   />
//                   <Input
//                     placeholder="SUBCATEGORY (cars, f1, etc.)"
//                     value={form.subcategory}
//                     onChange={(e) =>
//                       setForm({
//                         ...form,
//                         subcategory: e.target.value.toLowerCase(),
//                       })
//                     }
//                     className="bg-black border-white/10 rounded-none h-14 text-[11px] font-black uppercase tracking-widest"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
//                   Visual Asset
//                 </label>
//                 <div className="aspect-square bg-black border border-white/10 relative group overflow-hidden">
//                   {form.image_url ? (
//                     <img
//                       src={form.image_url}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full flex flex-col items-center justify-center text-gray-700">
//                       <ImageIcon size={32} strokeWidth={1} />
//                       <p className="text-[8px] font-black mt-2">NO PREVIEW</p>
//                     </div>
//                   )}
//                   <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
//                     <input
//                       type="file"
//                       onChange={handleImageUpload}
//                       className="absolute inset-0 opacity-0 cursor-pointer"
//                     />
//                     {uploadingImage ? (
//                       <Loader2 className="animate-spin text-primary" />
//                     ) : (
//                       <Upload size={24} className="text-primary" />
//                     )}
//                     <p className="text-[8px] font-black mt-2 text-primary uppercase">
//                       Replace Image
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4 pt-10">
//               <Button
//                 onClick={handleSave}
//                 disabled={uploadingImage}
//                 className="flex-1 bg-primary text-black font-black uppercase rounded-none h-16 text-[11px] tracking-widest hover:bg-white transition-all"
//               >
//                 Authorize Changes
//               </Button>
//               <Button
//                 onClick={resetForm}
//                 variant="outline"
//                 className="flex-1 border-white/10 rounded-none uppercase h-16 text-[11px] tracking-widest"
//               >
//                 Abort
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;

// Experimental Code (Refactored with better structure, error handling, and UI improvements)

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Trash2,
  ArrowLeft,
  LogOut,
  Loader2,
  Upload,
  Image as ImageIcon,
  X,
  Star,
  Edit,
} from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  QueryDocumentSnapshot,
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

interface FormState {
  name: string;
  price: string;
  description: string;
  image_url: string;
  category: CategoryType;
  subcategory: string;
  badge: string;
  is_active: boolean;
  is_featured: boolean;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialFormState: FormState = {
    name: "",
    price: "",
    description: "",
    image_url: "",
    category: "posters",
    subcategory: "",
    badge: "",
    is_active: true,
    is_featured: false,
  };

  const [form, setForm] = useState<FormState>(initialFormState);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const list = snapshot.docs.map((docSnap: QueryDocumentSnapshot) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Product, "id">),
      }));
      setProducts(list);
    } catch (error) {
      toast({ title: "Products load nahi ho paye", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user || user.email !== "support.imprinto@gmail.com") {
        navigate("/");
        return;
      }
      fetchProducts();
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [navigate, fetchProducts]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "imprinto_customs");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dyjj0t5gk/image/upload`,
        { method: "POST", body: formData },
      );
      const data = (await res.json()) as { secure_url: string };
      if (data.secure_url) {
        setForm((prev) => ({ ...prev, image_url: data.secure_url }));
        toast({ title: "Photo upload ho gayi" });
      }
    } catch (err) {
      toast({ title: "Upload fail ho gaya", variant: "destructive" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({ ...p, price: String(p.price) });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image_url) {
      toast({ title: "Zaroori details bhariye", variant: "destructive" });
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      updatedAt: Timestamp.now(),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "products", editingId), payload);
        toast({ title: "Product update ho gaya" });
      } else {
        await addDoc(collection(db, "products"), {
          ...payload,
          createdAt: Timestamp.now(),
        });
        toast({ title: "Product add ho gaya" });
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      toast({ title: "Process fail ho gaya", variant: "destructive" });
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(initialFormState);
  };

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <nav className="border-b border-white/10 bg-[#080808] px-8 py-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="h-8 w-[1px] bg-white/10" />
          <h1 className="text-xl font-bold uppercase tracking-tight">
            Admin Dashboard
          </h1>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-primary text-black font-bold uppercase rounded-none px-6 text-[10px] h-10 hover:bg-white transition-all"
          >
            Add New Product
          </Button>
          <Button
            variant="outline"
            className="border-white/10 rounded-none h-10 w-10 hover:bg-red-500/10"
            onClick={() => signOut(auth)}
          >
            <LogOut size={14} />
          </Button>
        </div>
      </nav>

      <main className="p-10">
        {loading ? (
          <div className="flex justify-center py-40">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-[#080808] border border-white/5 flex flex-col group transition-all hover:border-primary/40"
              >
                <div className="aspect-[3/4] overflow-hidden bg-black relative">
                  <img
                    src={p.image_url}
                    className="w-full h-full object-cover transition-all duration-700"
                    alt={p.name}
                  />
                  {!p.is_active && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 border border-red-500/30 px-2 py-1">
                        Inactive
                      </span>
                    </div>
                  )}
                  {p.is_featured && (
                    <div className="absolute top-4 left-4 bg-primary text-black p-1.5">
                      <Star size={12} fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">
                      {p.category} / {p.subcategory}
                    </p>
                    <h3 className="font-bold uppercase text-[12px] tracking-widest truncate">
                      {p.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <p className="text-primary font-bold text-xl">₹{p.price}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-2 border border-white/10 hover:bg-white hover:text-black transition-all"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Kya aap is product ko delete karna chahte hain?",
                            )
                          )
                            deleteDoc(doc(db, "products", p.id)).then(
                              fetchProducts,
                            );
                        }}
                        className="p-2 border border-white/10 hover:bg-red-500 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showForm && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-xl flex justify-center items-center z-[100] p-4 overflow-y-auto">
          <div className="bg-[#080808] border border-white/10 p-10 w-full max-w-4xl relative">
            <button
              onClick={resetForm}
              className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold uppercase tracking-tight mb-10 border-b border-white/10 pb-6">
              {editingId ? "Edit Product Details" : "Add New Product"}
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          category: e.target.value as CategoryType,
                        })
                      }
                      className="w-full bg-black border border-white/10 h-12 text-[11px] px-4 text-white outline-none focus:border-primary"
                    >
                      <option value="posters">Posters</option>
                      <option value="stickers">Stickers</option>
                      <option value="combo">Combo Pack</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">
                      Sub-Category
                    </label>
                    <Input
                      placeholder="e.g. Anime, Cars"
                      value={form.subcategory}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          subcategory: e.target.value.toLowerCase(),
                        })
                      }
                      className="bg-black border-white/10 h-12 text-[11px] uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">
                    Product Name
                  </label>
                  <Input
                    placeholder="Enter name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-black border-white/10 h-12 text-[11px] uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">
                    Price (INR)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    className="bg-black border-white/10 h-12 text-[11px]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">
                    Description
                  </label>
                  <Textarea
                    placeholder="Product details here..."
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="bg-black border-white/10 min-h-[100px] text-[11px] p-4"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <label className="flex items-center gap-3 p-3 border border-white/5 bg-black/40 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_active}
                      onChange={(e) =>
                        setForm({ ...form, is_active: e.target.checked })
                      }
                      className="accent-primary h-4 w-4"
                    />
                    <span className="text-[10px] font-bold uppercase text-gray-500">
                      Active
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-white/5 bg-black/40 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.is_featured}
                      onChange={(e) =>
                        setForm({ ...form, is_featured: e.target.checked })
                      }
                      className="accent-primary h-4 w-4"
                    />
                    <span className="text-[10px] font-bold uppercase text-gray-500">
                      Featured
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-500 uppercase text-center block">
                  Product Image
                </label>
                <div className="aspect-[3/4] bg-black border border-white/5 relative group cursor-pointer overflow-hidden max-w-[300px] mx-auto">
                  {form.image_url ? (
                    <img
                      src={form.image_url}
                      className="w-full h-full object-contain"
                      alt="Preview"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-700">
                      <ImageIcon size={40} />
                      <p className="text-[10px] mt-4 font-bold uppercase tracking-widest">
                        No Image Selected
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {uploadingImage ? (
                      <Loader2 className="animate-spin text-black" />
                    ) : (
                      <Upload size={24} className="text-black" />
                    )}
                    <p className="text-[11px] font-bold mt-2 text-black uppercase">
                      Upload Photo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
              <Button
                onClick={handleSave}
                disabled={uploadingImage}
                className="flex-[3] bg-primary text-black font-bold uppercase rounded-none h-16 text-[12px] hover:bg-white transition-all shadow-xl"
              >
                {editingId ? "Update Product" : "Save Product"}
              </Button>
              <Button
                onClick={resetForm}
                variant="outline"
                className="flex-1 border-white/10 rounded-none h-16 text-[11px] font-bold uppercase hover:bg-white hover:text-black transition-all"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;