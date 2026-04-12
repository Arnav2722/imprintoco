// import { useEffect, useState } from "react";
// import { auth, db } from "@/lib/firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import {
//   Package,
//   Headset,
//   Phone,
//   Mail,
//   User,
//   LogOut,
//   ChevronRight,
//   Loader2,
//   Edit3,
//   Save,
//   X,
// } from "lucide-react";
// import { signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface UserProfile {
//   displayName: string | null;
//   email: string | null;
//   photoURL: string | null;
//   phone?: string;
//   role?: string;
// }

// interface ProfileLinkProps {
//   icon: React.ReactNode;
//   label: string;
//   onClick: () => void;
//   highlight?: boolean;
// }

// const Profile = () => {
//   const [userData, setUserData] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({
//     displayName: "",
//     phone: "",
//   });

//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/");
//     } catch (error) {
//       toast({ title: "Logout failed", variant: "destructive" });
//     }
//   };

//   const fetchUserManually = async () => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) return;
//     const docRef = doc(db, "users", currentUser.uid);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       setUserData(docSnap.data() as UserProfile);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (!currentUser) {
//         setLoading(false);
//         navigate("/auth");
//         return;
//       }

//       try {
//         const docRef = doc(db, "users", currentUser.uid);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const data = docSnap.data() as UserProfile;
//           setUserData(data);
//           setEditForm({
//             displayName: data.displayName || currentUser.displayName || "",
//             phone: data.phone || "",
//           });
//         } else {
//           const initialData: UserProfile = {
//             displayName: currentUser.displayName,
//             email: currentUser.email,
//             photoURL: currentUser.photoURL,
//           };
//           setUserData(initialData);
//           setEditForm({
//             displayName: currentUser.displayName || "",
//             phone: "",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       } finally {
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [navigate]);

//   const handleUpdate = async () => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) return;

//     try {
//       setLoading(true);
//       await updateProfile(currentUser, {
//         displayName: editForm.displayName,
//       });

//       const userRef = doc(db, "users", currentUser.uid);
//       await updateDoc(userRef, {
//         displayName: editForm.displayName,
//         phone: editForm.phone,
//         updatedAt: new Date(),
//       });

//       toast({
//         title: "Profile Updated",
//         description: "Identity sync complete.",
//       });
//       setIsEditing(false);
//       fetchUserManually();
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Error updating profile";
//       toast({
//         title: "Update Failed",
//         description: errorMessage,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-bricolage uppercase tracking-widest">
//         <Loader2 className="animate-spin text-primary mb-4" size={40} />
//         <p>Syncing Identity...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#050505] text-white font-bricolage">
//       <Navbar />
//       <main className="pt-32 pb-20 px-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 relative overflow-hidden mb-12 rounded-sm">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
//             <div className="relative z-10 flex flex-col items-start gap-6 text-left">
//               {!isEditing ? (
//                 <>
//                   <div className="space-y-2 text-left">
//                     <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
//                       {userData?.displayName || "The Obsessed"}
//                     </h1>
//                     <p className="text-gray-500 text-[12px] font-bold tracking-[0.3em] uppercase">
//                       {userData?.email}
//                     </p>
//                   </div>
//                   <Button
//                     variant="outline"
//                     onClick={() => setIsEditing(true)}
//                     className="mt-4 rounded-none border-white/10 hover:bg-primary hover:text-black uppercase font-black tracking-widest text-[10px] h-10 px-6 transition-all"
//                   >
//                     <Edit3 size={14} className="mr-2" /> Modify Profile
//                   </Button>
//                 </>
//               ) : (
//                 <div className="w-full max-w-sm space-y-6 text-left">
//                   <div className="space-y-2">
//                     <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
//                       Public Identity
//                     </label>
//                     <Input
//                       value={editForm.displayName}
//                       onChange={(e) =>
//                         setEditForm({
//                           ...editForm,
//                           displayName: e.target.value,
//                         })
//                       }
//                       className="bg-transparent border-white/10 rounded-none h-12 focus:border-primary uppercase font-bold text-white placeholder:text-gray-800"
//                       placeholder="ENTER NAME"
//                     />
//                   </div>
//                   <div className="flex gap-3">
//                     <Button
//                       onClick={handleUpdate}
//                       className="flex-1 bg-primary text-black font-black uppercase tracking-widest rounded-none h-12 transition-all hover:bg-white"
//                     >
//                       <Save size={16} className="mr-2" /> Save Changes
//                     </Button>
//                     <Button
//                       onClick={() => setIsEditing(false)}
//                       variant="outline"
//                       className="flex-1 border-white/10 rounded-none h-12 uppercase font-bold"
//                     >
//                       <X size={16} className="mr-2" /> Cancel
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
//             <div className="space-y-4">
//               <h2 className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase text-left">
//                 Core Info
//               </h2>
//               <div className="bg-[#0a0a0a] border border-white/5 p-8 space-y-8 rounded-sm">
//                 <div className="space-y-2 text-left">
//                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
//                     <Phone size={12} className="text-primary" /> Mobile Sync
//                   </span>
//                   {isEditing ? (
//                     <Input
//                       placeholder="ENTER NUMBER"
//                       value={editForm.phone}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, phone: e.target.value })
//                       }
//                       className="bg-transparent border-white/10 rounded-none h-12 text-white placeholder:text-gray-800 font-bold"
//                     />
//                   ) : (
//                     <p className="text-xl font-black uppercase text-white tracking-tight">
//                       {userData?.phone || "NOT LINKED"}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2 text-left">
//                   <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
//                     <Mail size={12} className="text-primary" /> Core Email
//                   </span>
//                   <p className="text-xl font-black uppercase opacity-40 text-white tracking-tight">
//                     {userData?.email}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h2 className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase text-left">
//                 Member Access
//               </h2>
//               <div className="space-y-3">
//                 <ProfileLink
//                   icon={<Package size={18} />}
//                   label="All Orders"
//                   onClick={() => navigate("/orders")}
//                 />
//                 <ProfileLink
//                   icon={<Headset size={18} />}
//                   label="Support Center"
//                   onClick={() => navigate("/contact")}
//                 />
//                 {userData?.role === "admin" && (
//                   <ProfileLink
//                     icon={<User size={18} />}
//                     label="Admin Inventory"
//                     onClick={() => navigate("/admin")}
//                     highlight
//                   />
//                 )}
//                 <button
//                   onClick={handleLogout}
//                   className="w-full flex items-center justify-between p-5 bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-black transition-all group mt-4 rounded-sm"
//                 >
//                   <div className="flex items-center gap-4 font-black uppercase text-[11px] tracking-[0.2em]">
//                     <LogOut size={18} /> Terminate Session
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// const ProfileLink = ({
//   icon,
//   label,
//   onClick,
//   highlight = false,
// }: ProfileLinkProps) => (
//   <button
//     onClick={onClick}
//     className={`w-full flex items-center justify-between p-5 transition-all group rounded-sm ${highlight ? "bg-primary text-black shadow-[0_0_20px_rgba(250,255,0,0.15)] border-transparent" : "bg-[#0a0a0a] border border-white/5 hover:border-primary/50 text-white"}`}
//   >
//     <div className="flex items-center gap-4 font-black uppercase text-[11px] tracking-[0.2em]">
//       {icon} {label}
//     </div>
//     <ChevronRight
//       size={16}
//       className="group-hover:translate-x-1 transition-transform"
//     />
//   </button>
// );

// export default Profile;

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Package,
  Headset,
  Phone,
  Mail,
  User,
  LogOut,
  ChevronRight,
  Loader2,
  Edit3,
  Save,
  X,
  LayoutDashboard,
} from "lucide-react";
import {
  signOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ✅ Strict Interfaces
interface UserProfile {
  name: string | null;
  email: string | null;
  photoURL?: string | null;
  mobile?: string;
  role?: string;
  createdAt?: Date;
}

interface ProfileLinkProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  highlight?: boolean;
  variant?: "default" | "danger";
}

const Profile = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    mobile: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error: unknown) {
      toast({ title: "Logout failed", variant: "destructive" });
    }
  };

  const fetchUserData = async (user: FirebaseUser) => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        setUserData(data);
        setEditForm({
          name: data.name || user.displayName || "",
          mobile: data.mobile || "",
        });
      } else {
        // Fallback agar Firestore document na ho
        const fallback: UserProfile = {
          name: user.displayName,
          email: user.email,
        };
        setUserData(fallback);
        setEditForm({ name: user.displayName || "", mobile: "" });
      }
    } catch (err: unknown) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/auth");
        return;
      }
      fetchUserData(currentUser);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleUpdate = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      setLoading(true);
      await updateProfile(currentUser, { displayName: editForm.name });

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        name: editForm.name,
        mobile: editForm.mobile, // ✅ "phone" ko replace kiya "mobile" se
        updatedAt: new Date(),
      });

      toast({
        title: "Identity Updated",
        description: "Your profile is now in sync.",
      });
      setIsEditing(false);
      fetchUserData(currentUser);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Update failed";
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-bricolage tracking-[0.3em] uppercase">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-[10px] font-black">Decrypting Identity...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#080808] border border-white/5 p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] group-hover:bg-primary/10 transition-all" />

              {!isEditing ? (
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="h-20 w-20 bg-primary flex items-center justify-center text-black font-black text-3xl">
                      {userData?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h1 className="text-4xl font-black uppercase tracking-tighter leading-tight break-words">
                        {userData?.name || "Anonymous"}
                      </h1>
                      {/* ✅ Long Email fix using break-all */}
                      <p className="text-primary text-[10px] font-bold tracking-widest uppercase mt-2 break-all opacity-80">
                        {userData?.email}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
                        Mobile Link
                      </span>
                      <span className="text-[11px] font-bold">
                        {userData?.mobile || "Not Set"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
                        Status
                      </span>
                      <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 font-bold uppercase">
                        Active Member
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-white text-black rounded-none h-12 font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all"
                  >
                    <Edit3 size={14} className="mr-2" /> Modify Profile
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <h2 className="text-xl font-black uppercase italic tracking-tighter">
                    Edit Identity
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                        Full Name
                      </label>
                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="bg-black border-white/10 rounded-none h-12 uppercase font-bold focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                        Mobile Number
                      </label>
                      <Input
                        value={editForm.mobile}
                        onChange={(e) =>
                          setEditForm({ ...editForm, mobile: e.target.value })
                        }
                        className="bg-black border-white/10 rounded-none h-12 font-bold focus:border-primary"
                        placeholder="ENTER 10 DIGIT NUMBER"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleUpdate}
                      className="flex-1 bg-primary text-black rounded-none h-12 font-black uppercase text-[10px]"
                    >
                      <Save size={14} className="mr-2" /> Save
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="flex-1 border-white/10 rounded-none h-12 font-black uppercase text-[10px]"
                    >
                      <X size={14} className="mr-2" /> Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Links & Actions */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-[10px] font-black text-gray-600 tracking-[0.5em] uppercase mb-6 ml-2">
              Access Portal
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileLink
                icon={<Package size={20} />}
                label="My Orders"
                onClick={() => navigate("/orders")}
              />
              <ProfileLink
                icon={<Headset size={20} />}
                label="Support"
                onClick={() => navigate("/contact")}
              />
              {userData?.role === "admin" && (
                <div className="sm:col-span-2">
                  <ProfileLink
                    icon={<LayoutDashboard size={20} />}
                    label="Command Center (Admin)"
                    onClick={() => navigate("/admin")}
                    highlight
                  />
                </div>
              )}
            </div>

            <div className="pt-10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-6 bg-red-500/5 border border-red-500/10 hover:bg-red-600 text-red-500 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-4 font-black uppercase text-[11px] tracking-[0.3em]">
                  <LogOut size={20} /> Terminate Session
                </div>
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ProfileLink = ({
  icon,
  label,
  onClick,
  highlight = false,
}: ProfileLinkProps) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between p-6 transition-all group border ${
      highlight
        ? "bg-primary text-black border-transparent shadow-[0_0_30px_rgba(250,255,0,0.1)]"
        : "bg-[#080808] border-white/5 hover:border-primary/40 text-white"
    }`}
  >
    <div className="flex items-center gap-4 font-black uppercase text-[11px] tracking-[0.2em]">
      {icon}
      <span>{label}</span>
    </div>
    <ChevronRight
      size={18}
      className="group-hover:translate-x-1 transition-transform opacity-50 group-hover:opacity-100"
    />
  </button>
);

export default Profile;