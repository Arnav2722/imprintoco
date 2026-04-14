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
//   LayoutDashboard,
// } from "lucide-react";
// import {
//   signOut,
//   updateProfile,
//   onAuthStateChanged,
//   User as FirebaseUser,
// } from "firebase/auth";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// // ✅ Strict Interfaces
// interface UserProfile {
//   name: string | null;
//   email: string | null;
//   photoURL?: string | null;
//   mobile?: string;
//   role?: string;
//   createdAt?: Date;
// }

// interface ProfileLinkProps {
//   icon: React.ReactNode;
//   label: string;
//   onClick: () => void;
//   highlight?: boolean;
//   variant?: "default" | "danger";
// }

// const Profile = () => {
//   const [userData, setUserData] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editForm, setEditForm] = useState({
//     name: "",
//     mobile: "",
//   });

//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate("/");
//     } catch (error: unknown) {
//       toast({ title: "Logout failed", variant: "destructive" });
//     }
//   };

//   const fetchUserData = async (user: FirebaseUser) => {
//     try {
//       const docRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const data = docSnap.data() as UserProfile;
//         setUserData(data);
//         setEditForm({
//           name: data.name || user.displayName || "",
//           mobile: data.mobile || "",
//         });
//       } else {
//         // Fallback agar Firestore document na ho
//         const fallback: UserProfile = {
//           name: user.displayName,
//           email: user.email,
//         };
//         setUserData(fallback);
//         setEditForm({ name: user.displayName || "", mobile: "" });
//       }
//     } catch (err: unknown) {
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (!currentUser) {
//         navigate("/auth");
//         return;
//       }
//       fetchUserData(currentUser);
//     });
//     return () => unsubscribe();
//   }, [navigate]);

//   const handleUpdate = async () => {
//     const currentUser = auth.currentUser;
//     if (!currentUser) return;

//     try {
//       setLoading(true);
//       await updateProfile(currentUser, { displayName: editForm.name });

//       const userRef = doc(db, "users", currentUser.uid);
//       await updateDoc(userRef, {
//         name: editForm.name,
//         mobile: editForm.mobile, // ✅ "phone" ko replace kiya "mobile" se
//         updatedAt: new Date(),
//       });

//       toast({
//         title: "Identity Updated",
//         description: "Your profile is now in sync.",
//       });
//       setIsEditing(false);
//       fetchUserData(currentUser);
//     } catch (error: unknown) {
//       const msg = error instanceof Error ? error.message : "Update failed";
//       toast({ title: "Error", description: msg, variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white font-bricolage tracking-[0.3em] uppercase">
//         <Loader2 className="animate-spin text-primary mb-4" size={40} />
//         <p className="text-[10px] font-black">Decrypting Identity...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#050505] text-white font-bricolage selection:bg-primary selection:text-black">
//       <Navbar />

//       <main className="pt-32 pb-20 px-6">
//         <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
//           {/* Left Column: Profile Card */}
//           <div className="lg:col-span-5 space-y-6">
//             <div className="bg-[#080808] border border-white/5 p-10 relative overflow-hidden group">
//               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] group-hover:bg-primary/10 transition-all" />

//               {!isEditing ? (
//                 <div className="space-y-8">
//                   <div className="space-y-4">
//                     <div className="h-20 w-20 bg-primary flex items-center justify-center text-black font-black text-3xl">
//                       {userData?.name?.charAt(0) || "U"}
//                     </div>
//                     <div>
//                       <h1 className="text-4xl font-black uppercase tracking-tighter leading-tight break-words">
//                         {userData?.name || "Anonymous"}
//                       </h1>
//                       {/* ✅ Long Email fix using break-all */}
//                       <p className="text-primary text-[10px] font-bold tracking-widest uppercase mt-2 break-all opacity-80">
//                         {userData?.email}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="pt-6 border-t border-white/5 space-y-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
//                         Mobile Link
//                       </span>
//                       <span className="text-[11px] font-bold">
//                         {userData?.mobile || "Not Set"}
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
//                         Status
//                       </span>
//                       <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 font-bold uppercase">
//                         Active Member
//                       </span>
//                     </div>
//                   </div>

//                   <Button
//                     onClick={() => setIsEditing(true)}
//                     className="w-full bg-white text-black rounded-none h-12 font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all"
//                   >
//                     <Edit3 size={14} className="mr-2" /> Modify Profile
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="space-y-6 animate-in fade-in duration-500">
//                   <h2 className="text-xl font-black uppercase italic tracking-tighter">
//                     Edit Identity
//                   </h2>
//                   <div className="space-y-4">
//                     <div className="space-y-1">
//                       <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
//                         Full Name
//                       </label>
//                       <Input
//                         value={editForm.name}
//                         onChange={(e) =>
//                           setEditForm({ ...editForm, name: e.target.value })
//                         }
//                         className="bg-black border-white/10 rounded-none h-12 uppercase font-bold focus:border-primary"
//                       />
//                     </div>
//                     <div className="space-y-1">
//                       <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
//                         Mobile Number
//                       </label>
//                       <Input
//                         value={editForm.mobile}
//                         onChange={(e) =>
//                           setEditForm({ ...editForm, mobile: e.target.value })
//                         }
//                         className="bg-black border-white/10 rounded-none h-12 font-bold focus:border-primary"
//                         placeholder="ENTER 10 DIGIT NUMBER"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button
//                       onClick={handleUpdate}
//                       className="flex-1 bg-primary text-black rounded-none h-12 font-black uppercase text-[10px]"
//                     >
//                       <Save size={14} className="mr-2" /> Save
//                     </Button>
//                     <Button
//                       onClick={() => setIsEditing(false)}
//                       variant="outline"
//                       className="flex-1 border-white/10 rounded-none h-12 font-black uppercase text-[10px]"
//                     >
//                       <X size={14} className="mr-2" /> Cancel
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column: Links & Actions */}
//           <div className="lg:col-span-7 space-y-4">
//             <p className="text-[10px] font-black text-gray-600 tracking-[0.5em] uppercase mb-6 ml-2">
//               Access Portal
//             </p>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <ProfileLink
//                 icon={<Package size={20} />}
//                 label="My Orders"
//                 onClick={() => navigate("/orders")}
//               />
//               <ProfileLink
//                 icon={<Headset size={20} />}
//                 label="Support"
//                 onClick={() => navigate("/contact")}
//               />
//               {userData?.role === "admin" && (
//                 <div className="sm:col-span-2">
//                   <ProfileLink
//                     icon={<LayoutDashboard size={20} />}
//                     label="Command Center (Admin)"
//                     onClick={() => navigate("/admin")}
//                     highlight
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="pt-10">
//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center justify-between p-6 bg-red-500/5 border border-red-500/10 hover:bg-red-600 text-red-500 hover:text-white transition-all group"
//               >
//                 <div className="flex items-center gap-4 font-black uppercase text-[11px] tracking-[0.3em]">
//                   <LogOut size={20} /> Terminate Session
//                 </div>
//                 <ChevronRight
//                   size={18}
//                   className="group-hover:translate-x-1 transition-transform"
//                 />
//               </button>
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
//     className={`flex items-center justify-between p-6 transition-all group border ${
//       highlight
//         ? "bg-primary text-black border-transparent shadow-[0_0_30px_rgba(250,255,0,0.1)]"
//         : "bg-[#080808] border-white/5 hover:border-primary/40 text-white"
//     }`}
//   >
//     <div className="flex items-center gap-4 font-black uppercase text-[11px] tracking-[0.2em]">
//       {icon}
//       <span>{label}</span>
//     </div>
//     <ChevronRight
//       size={18}
//       className="group-hover:translate-x-1 transition-transform opacity-50 group-hover:opacity-100"
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
  Zap,
  ShieldCheck,
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
import { motion, AnimatePresence } from "framer-motion";

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
        mobile: editForm.mobile,
        updatedAt: new Date(),
      });

      toast({
        title: "IDENTITY UPDATED",
        description: "Your core credentials are now in sync.",
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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground font-display tracking-[0.3em] uppercase">
        <Loader2
          className="animate-spin text-primary mb-4"
          size={48}
          strokeWidth={3}
        />
        <p className="text-xs font-black">Syncing Core...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary selection:text-black">
      <Navbar />

      <main className="pt-40 pb-32 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Identity Block */}
          <div className="lg:col-span-5 space-y-10">
            <div className="bg-white border-4 border-foreground p-10 relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Zap size={120} />
              </div>

              {!isEditing ? (
                <div className="space-y-10">
                  <div className="space-y-6">
                    <div className="h-24 w-24 bg-primary border-4 border-foreground flex items-center justify-center text-foreground font-black text-4xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                      {userData?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h1 className="font-display text-5xl font-black uppercase tracking-tighter leading-[0.8] mb-4">
                        {userData?.name || "Member"}
                      </h1>
                      <div className="inline-flex items-center gap-2 bg-accent-lime border-2 border-foreground px-3 py-1">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Verified Identity
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t-4 border-foreground/5 space-y-5">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-foreground/40 font-black uppercase tracking-widest mb-1">
                        Secure Email
                      </span>
                      <span className="text-sm font-black break-all">
                        {userData?.email}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-foreground/40 font-black uppercase tracking-widest mb-1">
                        Mobile Link
                      </span>
                      <span className="text-sm font-black">
                        {userData?.mobile || "NOT LINKED"}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-foreground text-background rounded-none h-16 font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-foreground transition-all shadow-[6px_6px_0px_0px_rgba(255,46,99,1)] hover:shadow-none group"
                  >
                    MODIFIED CREDENTIALS{" "}
                    <Edit3
                      size={18}
                      className="ml-3 group-hover:rotate-12 transition-transform"
                    />
                  </Button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <h2 className="font-display text-3xl font-black uppercase italic tracking-tighter">
                    MODIFY{" "}
                    <span className="text-primary not-italic">CORE.</span>
                  </h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest ml-1">
                        Legal Name
                      </label>
                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="bg-muted border-b-4 border-foreground border-x-0 border-t-0 rounded-none h-14 uppercase font-black focus-visible:ring-0 text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest ml-1">
                        Phone Protocol
                      </label>
                      <Input
                        value={editForm.mobile}
                        onChange={(e) =>
                          setEditForm({ ...editForm, mobile: e.target.value })
                        }
                        className="bg-muted border-b-4 border-foreground border-x-0 border-t-0 rounded-none h-14 font-black focus-visible:ring-0 text-lg"
                        placeholder="+91 0000000000"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={handleUpdate}
                      className="flex-1 bg-foreground text-background rounded-none h-14 font-black uppercase text-xs hover:bg-primary transition-all"
                    >
                      <Save size={16} className="mr-2" /> Commit
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="flex-1 border-4 border-foreground rounded-none h-14 font-black uppercase text-xs hover:bg-accent hover:text-white transition-all"
                    >
                      <X size={16} className="mr-2" /> Abort
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Portal Access */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 mb-6 ml-2">
              <Zap size={14} className="text-primary fill-primary" />
              <p className="text-[11px] font-black text-foreground/40 tracking-[0.5em] uppercase">
                SYSTEM PORTALS
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileLink
                icon={<Package size={24} strokeWidth={3} />}
                label="Orders Archive"
                onClick={() => navigate("/orders")}
              />
              <ProfileLink
                icon={<Headset size={24} strokeWidth={3} />}
                label="Support Base"
                onClick={() => navigate("/contact")}
              />
              {userData?.role === "admin" && (
                <div className="sm:col-span-2">
                  <ProfileLink
                    icon={<LayoutDashboard size={24} strokeWidth={3} />}
                    label="Command Center"
                    onClick={() => navigate("/admin")}
                    highlight
                  />
                </div>
              )}
            </div>

            <div className="pt-12">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-8 bg-white border-4 border-accent hover:bg-accent text-accent hover:text-white transition-all group shadow-[10px_10px_0px_0px_rgba(255,46,99,0.1)] hover:shadow-none"
              >
                <div className="flex items-center gap-6 font-black uppercase text-sm tracking-[0.3em]">
                  <LogOut size={24} strokeWidth={3} /> TERMINATE SESSION
                </div>
                <ChevronRight
                  size={24}
                  strokeWidth={3}
                  className="group-hover:translate-x-2 transition-transform"
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
    className={`flex items-center justify-between p-8 transition-all group border-4 ${
      highlight
        ? "bg-foreground text-background border-foreground shadow-[12px_12px_0px_0px_rgba(0,212,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
        : "bg-white border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] hover:border-primary hover:shadow-[10px_10px_0px_0px_rgba(0,212,255,1)]"
    }`}
  >
    <div className="flex items-center gap-6 font-black uppercase text-sm tracking-tighter italic">
      <span
        className={
          highlight
            ? "text-primary"
            : "group-hover:text-primary transition-colors"
        }
      >
        {icon}
      </span>
      <span>{label}</span>
    </div>
    <ChevronRight
      size={20}
      strokeWidth={3}
      className="group-hover:translate-x-2 transition-transform opacity-20 group-hover:opacity-100"
    />
  </button>
);

export default Profile;