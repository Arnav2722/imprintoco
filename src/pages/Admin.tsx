// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Plus, Trash2, ArrowLeft, LogOut } from "lucide-react";

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
// } from "firebase/firestore";

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   image_url: string;
//   category: "stickers" | "posters" | "combo";
//   subcategory: string;
//   badge: string;
//   available_sizes: string[];
//   is_active: boolean;
// };

// type ProductForm = {
//   name: string;
//   price: string;
//   description: string;
//   image_url: string;
//   category: "stickers" | "posters" | "combo";
//   subcategory: string;
//   badge: string;
//   available_sizes: string[];
//   is_active: boolean;
// };

// const emptyForm: ProductForm = {
//   name: "",
//   price: "",
//   description: "",
//   image_url: "",
//   category: "posters",
//   subcategory: "custom",
//   badge: "",
//   available_sizes: [],
//   is_active: true,
// };

// const Admin = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [form, setForm] = useState<ProductForm>(emptyForm);

//   // 🔥 FIXED AUTH FLOW
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
//       // ❌ Not logged in
//       if (!user) {
//         setCheckingAuth(false);
//         navigate("/auth");
//         return;
//       }

//       try {
//         const userRef = doc(db, "users", user.uid);
//         const userDoc = await getDoc(userRef);

//         // ❌ User doc missing
//         if (!userDoc.exists()) {
//           setCheckingAuth(false);
//           toast({
//             title: "User not found",
//             variant: "destructive",
//           });
//           await signOut(auth);
//           navigate("/auth");
//           return;
//         }

//         const userData = userDoc.data();

//         // ❌ Not admin
//         if (userData.role !== "admin") {
//           setCheckingAuth(false);
//           toast({
//             title: "Access Denied",
//             description: "Admin only",
//             variant: "destructive",
//           });
//           await signOut(auth);
//           navigate("/");
//           return;
//         }

//         // ✅ Admin verified
//         await fetchProducts();
//         setCheckingAuth(false);
//       } catch (error) {
//         setCheckingAuth(false);
//         navigate("/");
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate, toast]);

//   // 📦 FETCH PRODUCTS
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const snapshot = await getDocs(collection(db, "products"));

//       const list: Product[] = snapshot.docs.map((docSnap) => ({
//         id: docSnap.id,
//         ...(docSnap.data() as Omit<Product, "id">),
//       }));

//       setProducts(list);
//     } catch {
//       toast({ title: "Fetch failed", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ➕ SAVE PRODUCT
//   const handleSave = async () => {
//     if (!form.name || !form.price) {
//       toast({ title: "Missing fields", variant: "destructive" });
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

//       setShowForm(false);
//       setEditingId(null);
//       setForm(emptyForm);
//       fetchProducts();
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         toast({
//           title: "Save failed",
//           description: err.message,
//           variant: "destructive",
//         });
//       }
//     }
//   };

//   // ❌ DELETE
//   const handleDelete = async (id: string) => {
//     try {
//       await deleteDoc(doc(db, "products", id));
//       toast({ title: "Deleted" });
//       fetchProducts();
//     } catch {
//       toast({ title: "Delete failed", variant: "destructive" });
//     }
//   };

//   // 🚪 LOGOUT
//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/auth");
//   };

//   // ⏳ LOADING STATE
//   if (checkingAuth) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Verifying access...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* HEADER */}
//       <header className="border-b p-4 flex justify-between items-center bg-card">
//         <div className="flex items-center gap-4">
//           <ArrowLeft onClick={() => navigate("/")} className="cursor-pointer" />
//           <h1 className="font-bold">Admin Dashboard</h1>
//         </div>

//         <div className="flex gap-3">
//           <Button onClick={() => setShowForm(true)}>
//             <Plus className="mr-2 h-4 w-4" /> Add
//           </Button>
//           <Button variant="ghost" size="icon" onClick={handleLogout}>
//             <LogOut className="h-5 w-5 text-destructive" />
//           </Button>
//         </div>
//       </header>

//       {/* PRODUCTS */}
//       <main className="p-6">
//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {products.map((p) => (
//               <div key={p.id} className="border p-4 rounded-lg bg-card">
//                 <h3 className="font-bold">{p.name}</h3>
//                 <p className="text-primary font-bold">₹{p.price}</p>

//                 <div className="flex gap-2 mt-4">
//                   <Button
//                     className="flex-1"
//                     variant="outline"
//                     onClick={() => {
//                       setEditingId(p.id);
//                       setForm({ ...p, price: String(p.price) });
//                       setShowForm(true);
//                     }}
//                   >
//                     Edit
//                   </Button>

//                   <Button
//                     variant="destructive"
//                     onClick={() => handleDelete(p.id)}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* MODAL */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-card p-6 rounded-lg w-full max-w-md space-y-4">
//             <Input
//               placeholder="Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />

//             <Input
//               type="number"
//               placeholder="Price"
//               value={form.price}
//               onChange={(e) => setForm({ ...form, price: e.target.value })}
//             />

//             <Input
//               placeholder="Image URL"
//               value={form.image_url}
//               onChange={(e) => setForm({ ...form, image_url: e.target.value })}
//             />

//             <div className="flex gap-2">
//               <Button className="flex-1" onClick={handleSave}>
//                 Save
//               </Button>
//               <Button variant="outline" onClick={() => setShowForm(false)}>
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
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ArrowLeft, LogOut, Loader2 } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: "stickers" | "posters" | "combo";
  subcategory: string;
  badge: string;
  is_active: boolean;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category: "posters" as Product["category"],
    subcategory: "custom",
    badge: "",
    is_active: true,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const list = snapshot.docs.map(
        (docSnap: QueryDocumentSnapshot<DocumentData>) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }),
      ) as Product[];
      setProducts(list);
    } catch (error) {
      toast({ title: "Fetch failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user === null) {
        setCheckingAuth(false);
        navigate("/auth");
        return;
      }
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists() || userDoc.data()?.role !== "admin") {
          toast({ title: "Access Denied", variant: "destructive" });
          navigate("/");
          return;
        }
        await fetchProducts();
      } catch {
        navigate("/");
      } finally {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [navigate, fetchProducts, toast]);

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    const payload = {
      ...form,
      price: Number(form.price),
      updatedAt: Timestamp.now(),
    };
    try {
      if (editingId) {
        await updateDoc(doc(db, "products", editingId), payload);
        toast({ title: "Updated" });
      } else {
        await addDoc(collection(db, "products"), {
          ...payload,
          createdAt: Timestamp.now(),
        });
        toast({ title: "Created" });
      }
      setShowForm(false);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      toast({ title: "Save failed", variant: "destructive" });
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="uppercase tracking-widest">Verifying Vault Access...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage">
      <header className="border-b border-white/10 p-6 flex justify-between items-center bg-[#0a0a0a]">
        <div className="flex items-center gap-6">
          <ArrowLeft
            onClick={() => navigate("/")}
            className="cursor-pointer hover:text-primary transition-colors"
          />
          <h1 className="text-2xl font-black uppercase tracking-tighter">
            Inventory Vault
          </h1>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-primary text-black font-black uppercase rounded-none"
          >
            New Artifact
          </Button>
          <Button
            variant="outline"
            className="border-white/10 rounded-none"
            onClick={() => signOut(auth)}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </header>
      <main className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-[#0a0a0a] border border-white/5 p-4 group hover:border-primary/50 transition-all"
            >
              <div className="aspect-[2/3] bg-gray-900 mb-4 overflow-hidden">
                <img
                  src={p.image_url}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                />
              </div>
              <h3 className="font-bold uppercase truncate">{p.name}</h3>
              <p className="text-primary font-black text-xl mt-1">₹{p.price}</p>
              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 rounded-none border-white/10"
                  onClick={() => {
                    setEditingId(p.id);
                    setForm({ ...p, price: String(p.price) });
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  className="rounded-none"
                  onClick={() =>
                    deleteDoc(doc(db, "products", p.id)).then(fetchProducts)
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      {showForm && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 p-8 w-full max-w-lg space-y-4">
            <Input
              placeholder="NAME"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-transparent border-white/10 rounded-none text-white"
            />
            <Input
              type="number"
              placeholder="PRICE"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="bg-transparent border-white/10 rounded-none text-white"
            />
            <Input
              placeholder="IMAGE URL"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="bg-transparent border-white/10 rounded-none text-white"
            />
            <div className="flex gap-4">
              <Button
                onClick={handleSave}
                className="flex-1 bg-primary text-black font-black uppercase rounded-none"
              >
                Save
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                variant="outline"
                className="flex-1 border-white/10 rounded-none uppercase"
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