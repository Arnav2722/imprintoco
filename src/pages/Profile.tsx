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
// import { signOut, updateProfile } from "firebase/auth";
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

//   const fetchUser = async () => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) {
//       navigate("/auth");
//       return;
//     }

//     try {
//       const docRef = doc(db, "users", currentUser.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const data = docSnap.data() as UserProfile;
//         setUserData(data);
//         setEditForm({
//           displayName: data.displayName || currentUser.displayName || "",
//           phone: data.phone || "",
//         });
//       } else {
//         const initialData: UserProfile = {
//           displayName: currentUser.displayName,
//           email: currentUser.email,
//           photoURL: currentUser.photoURL,
//         };
//         setUserData(initialData);
//         setEditForm({
//           displayName: currentUser.displayName || "",
//           phone: "",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
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
//       fetchUser();
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

//   const handleLogout = async () => {
//     await signOut(auth);
//     navigate("/");
//   };

//   if (loading && !userData) {
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
//           {/* PROFILE HEADER */}
//           <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 relative overflow-hidden mb-12 rounded-sm">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

//             <div className="relative z-10 flex flex-col items-start gap-6">
//               {!isEditing ? (
//                 <>
//                   <div className="space-y-2">
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
//                 <div className="w-full max-w-sm space-y-6">
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

//           {/* CORE INFO & MEMBER ACCESS */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
//             <div className="space-y-4">
//               <h2 className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase">
//                 Core Info
//               </h2>
//               <div className="bg-[#0a0a0a] border border-white/5 p-8 space-y-8 rounded-sm">
//                 <div className="space-y-2">
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
//                 <div className="space-y-2">
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
//               <h2 className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase">
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
//     className={`w-full flex items-center justify-between p-5 transition-all group rounded-sm ${
//       highlight
//         ? "bg-primary text-black shadow-[0_0_20px_rgba(250,255,0,0.15)] border-transparent"
//         : "bg-[#0a0a0a] border border-white/5 hover:border-primary/50 text-white"
//     }`}
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
} from "lucide-react";
import { signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserProfile {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  phone?: string;
  role?: string;
}

interface ProfileLinkProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  highlight?: boolean;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: "",
    phone: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      toast({ title: "Logout failed", variant: "destructive" });
    }
  };

  const fetchUserManually = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data() as UserProfile);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        navigate("/auth");
        return;
      }

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfile;
          setUserData(data);
          setEditForm({
            displayName: data.displayName || currentUser.displayName || "",
            phone: data.phone || "",
          });
        } else {
          const initialData: UserProfile = {
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
          };
          setUserData(initialData);
          setEditForm({
            displayName: currentUser.displayName || "",
            phone: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUpdate = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    try {
      setLoading(true);
      await updateProfile(currentUser, {
        displayName: editForm.displayName,
      });

      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        displayName: editForm.displayName,
        phone: editForm.phone,
        updatedAt: new Date(),
      });

      toast({
        title: "Profile Updated",
        description: "Identity sync complete.",
      });
      setIsEditing(false);
      fetchUserManually();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error updating profile";
      toast({
        title: "Update Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-bricolage uppercase tracking-widest">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p>Syncing Identity...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage">
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 relative overflow-hidden mb-12 rounded-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col items-start gap-6 text-left">
              {!isEditing ? (
                <>
                  <div className="space-y-2 text-left">
                    <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                      {userData?.displayName || "The Obsessed"}
                    </h1>
                    <p className="text-gray-500 text-[12px] font-bold tracking-[0.3em] uppercase">
                      {userData?.email}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="mt-4 rounded-none border-white/10 hover:bg-primary hover:text-black uppercase font-black tracking-widest text-[10px] h-10 px-6 transition-all"
                  >
                    <Edit3 size={14} className="mr-2" /> Modify Profile
                  </Button>
                </>
              ) : (
                <div className="w-full max-w-sm space-y-6 text-left">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                      Public Identity
                    </label>
                    <Input
                      value={editForm.displayName}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          displayName: e.target.value,
                        })
                      }
                      className="bg-transparent border-white/10 rounded-none h-12 focus:border-primary uppercase font-bold text-white placeholder:text-gray-800"
                      placeholder="ENTER NAME"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleUpdate}
                      className="flex-1 bg-primary text-black font-black uppercase tracking-widest rounded-none h-12 transition-all hover:bg-white"
                    >
                      <Save size={16} className="mr-2" /> Save Changes
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="flex-1 border-white/10 rounded-none h-12 uppercase font-bold"
                    >
                      <X size={16} className="mr-2" /> Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase text-left">
                Core Info
              </h2>
              <div className="bg-[#0a0a0a] border border-white/5 p-8 space-y-8 rounded-sm">
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Phone size={12} className="text-primary" /> Mobile Sync
                  </span>
                  {isEditing ? (
                    <Input
                      placeholder="ENTER NUMBER"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm({ ...editForm, phone: e.target.value })
                      }
                      className="bg-transparent border-white/10 rounded-none h-12 text-white placeholder:text-gray-800 font-bold"
                    />
                  ) : (
                    <p className="text-xl font-black uppercase text-white tracking-tight">
                      {userData?.phone || "NOT LINKED"}
                    </p>
                  )}
                </div>
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Mail size={12} className="text-primary" /> Core Email
                  </span>
                  <p className="text-xl font-black uppercase opacity-40 text-white tracking-tight">
                    {userData?.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-gray-600 tracking-[0.4em] uppercase text-left">
                Member Access
              </h2>
              <div className="space-y-3">
                <ProfileLink
                  icon={<Package size={18} />}
                  label="All Orders"
                  onClick={() => navigate("/orders")}
                />
                <ProfileLink
                  icon={<Headset size={18} />}
                  label="Support Center"
                  onClick={() => navigate("/contact")}
                />
                {userData?.role === "admin" && (
                  <ProfileLink
                    icon={<User size={18} />}
                    label="Admin Inventory"
                    onClick={() => navigate("/admin")}
                    highlight
                  />
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-5 bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-black transition-all group mt-4 rounded-sm"
                >
                  <div className="flex items-center gap-4 font-black uppercase text-[11px] tracking-[0.2em]">
                    <LogOut size={18} /> Terminate Session
                  </div>
                </button>
              </div>
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
    className={`w-full flex items-center justify-between p-5 transition-all group rounded-sm ${highlight ? "bg-primary text-black shadow-[0_0_20px_rgba(250,255,0,0.15)] border-transparent" : "bg-[#0a0a0a] border border-white/5 hover:border-primary/50 text-white"}`}
  >
    <div className="flex items-center gap-4 font-black uppercase text-[11px] tracking-[0.2em]">
      {icon} {label}
    </div>
    <ChevronRight
      size={16}
      className="group-hover:translate-x-1 transition-transform"
    />
  </button>
);

export default Profile;