// import { useState, useEffect } from "react"; // ✅ Added useEffect
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { saveUser } from "@/lib/user";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Chrome,
//   ArrowRight,
//   ShieldCheck,
//   Mail,
//   Lock,
//   User as UserIcon,
//   Phone,
// } from "lucide-react";

// import {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   UserCredential,
//   onAuthStateChanged, // ✅ Added this
// } from "firebase/auth";

// import { auth, googleProvider } from "@/lib/firebase";

// type FormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
//   captcha: string;
// };

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     captcha: "",
//   });

//   const [generatedCaptcha] = useState(
//     Math.random().toString(36).slice(2, 8).toUpperCase(),
//   );

//   const navigate = useNavigate();
//   const { toast } = useToast();

//   // ✅ REDIRECT IF ALREADY LOGGED IN
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         navigate("/"); // Agar pehle se login hai toh home bhejo
//       }
//     });
//     return () => unsubscribe();
//   }, [navigate]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       setLoading(true);
//       const res: UserCredential = await signInWithPopup(auth, googleProvider);
//       await saveUser(res.user);
//       toast({ title: "Welcome to the Crew!" });
//       navigate("/");
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         toast({
//           title: "Error",
//           description: err.message,
//           variant: "destructive",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const validatePassword = (password: string): boolean => {
//     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{12,}$/;
//     return regex.test(password);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!isLogin) {
//         if (!validatePassword(form.password)) {
//           throw new Error(
//             "Password needs 12+ chars, uppercase, lowercase & symbol",
//           );
//         }
//         if (form.password !== form.confirmPassword) {
//           throw new Error("Passwords do not match");
//         }
//         if (form.captcha !== generatedCaptcha) {
//           throw new Error("Invalid captcha");
//         }

//         const res: UserCredential = await createUserWithEmailAndPassword(
//           auth,
//           form.email,
//           form.password,
//         );
//         await saveUser(res.user);
//         toast({ title: "Membership Activated!" });
//       } else {
//         const res: UserCredential = await signInWithEmailAndPassword(
//           auth,
//           form.email,
//           form.password,
//         );
//         await saveUser(res.user);
//         toast({ title: "Welcome back, Legend." });
//       }
//       navigate("/");
//     } catch (err: unknown) {
//       const message =
//         err instanceof Error ? err.message : "Authentication failed";
//       toast({ title: "Error", description: message, variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] text-white font-bricolage">
//       <Navbar />

//       <div className="flex items-center justify-center min-h-screen px-6 pt-24 pb-20">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="w-full max-w-[450px] bg-[#0a0a0a] border border-white/5 p-8 md:p-12 relative overflow-hidden"
//         >
//           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

//           <div className="mb-10 text-center">
//             <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none mb-4">
//               {isLogin ? "JOIN THE" : "CREATE"}
//               <br />
//               <span className="text-primary not-italic">
//                 {isLogin ? "VAULT." : "IDENTITY."}
//               </span>
//             </h1>
//             <p className="text-[10px] font-bold tracking-[0.4em] text-gray-500 uppercase">
//               {isLogin
//                 ? "Enter your credentials"
//                 : "Join the independent movement"}
//             </p>
//           </div>

//           <Button
//             className="w-full h-14 bg-white text-black font-black italic uppercase tracking-tighter rounded-none hover:bg-primary transition-all flex items-center justify-center gap-3 mb-8"
//             onClick={handleGoogleLogin}
//             disabled={loading}
//           >
//             <Chrome size={20} />
//             Continue with Google
//           </Button>

//           <div className="relative flex items-center gap-4 mb-8">
//             <div className="h-[1px] bg-white/10 flex-1" />
//             <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">
//               OR
//             </span>
//             <div className="h-[1px] bg-white/10 flex-1" />
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <AnimatePresence mode="wait">
//               {!isLogin && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="space-y-6 overflow-hidden"
//                 >
//                   <div className="flex gap-4">
//                     <div className="relative flex-1">
//                       <UserIcon
//                         className="absolute left-0 top-3 text-gray-600"
//                         size={16}
//                       />
//                       <input
//                         name="firstName"
//                         placeholder="FIRST NAME *"
//                         onChange={handleChange}
//                         required
//                         className="auth-input pl-6"
//                       />
//                     </div>
//                     <div className="relative flex-1">
//                       <input
//                         name="lastName"
//                         placeholder="LAST NAME *"
//                         onChange={handleChange}
//                         required
//                         className="auth-input"
//                       />
//                     </div>
//                   </div>
//                   <div className="relative">
//                     <Phone
//                       className="absolute left-0 top-3 text-gray-600"
//                       size={16}
//                     />
//                     <input
//                       name="phone"
//                       placeholder="PHONE NUMBER *"
//                       onChange={handleChange}
//                       required
//                       className="auth-input pl-6"
//                     />
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div className="relative">
//               <Mail className="absolute left-0 top-3 text-gray-600" size={16} />
//               <input
//                 name="email"
//                 type="email"
//                 placeholder="EMAIL ADDRESS *"
//                 onChange={handleChange}
//                 required
//                 className="auth-input pl-6"
//               />
//             </div>

//             <div className="relative">
//               <Lock className="absolute left-0 top-3 text-gray-600" size={16} />
//               <input
//                 name="password"
//                 type="password"
//                 placeholder="PASSWORD *"
//                 onChange={handleChange}
//                 required
//                 className="auth-input pl-6"
//               />
//             </div>

//             {!isLogin && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="space-y-6"
//               >
//                 <input
//                   name="confirmPassword"
//                   type="password"
//                   placeholder="CONFIRM PASSWORD *"
//                   onChange={handleChange}
//                   required
//                   className="auth-input"
//                 />

//                 <div className="p-4 border border-white/5 bg-white/[0.02]">
//                   <p className="text-[10px] font-black tracking-widest text-gray-600 uppercase mb-3 flex items-center gap-2">
//                     <ShieldCheck size={12} className="text-primary" />
//                     Security Verification:{" "}
//                     <span className="text-white italic">
//                       {generatedCaptcha}
//                     </span>
//                   </p>
//                   <input
//                     name="captcha"
//                     placeholder="ENTER CAPTCHA *"
//                     onChange={handleChange}
//                     required
//                     className="auth-input"
//                   />
//                 </div>
//               </motion.div>
//             )}

//             <Button
//               className="w-full h-14 bg-primary text-black font-black italic uppercase tracking-tighter rounded-none hover:bg-white transition-all group"
//               type="submit"
//               disabled={loading}
//             >
//               {loading
//                 ? "Processing..."
//                 : isLogin
//                   ? "Access Vault"
//                   : "Initialize Identity"}
//               <ArrowRight
//                 className="ml-2 group-hover:translate-x-1 transition-transform"
//                 size={18}
//               />
//             </Button>
//           </form>

//           <div className="mt-10 text-center">
//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-500 hover:text-primary transition-colors"
//             >
//               {isLogin
//                 ? "No Membership? Create One"
//                 : "Already a member? Login"}
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       <Footer />

//       <style>{`
//         .auth-input {
//           width: 100%;
//           background: transparent;
//           border: none;
//           border-bottom: 1px solid rgba(255,255,255,0.1);
//           padding: 12px 0;
//           font-size: 12px;
//           font-weight: 700;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           outline: none;
//           transition: border-color 0.3s;
//         }
//         .auth-input:focus {
//           border-bottom-color: #FAFF00;
//         }
//         .auth-input::placeholder {
//           color: #333;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Auth;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveUser } from "@/lib/user"; // Is function ko update karna padega agar ye phone accept nahi kar raha
import { motion, AnimatePresence } from "framer-motion";
import {
  Chrome,
  ArrowRight,
  ShieldCheck,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
} from "lucide-react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, googleProvider } from "@/lib/firebase";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  captcha: string;
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    captcha: "",
  });

  const [generatedCaptcha] = useState(
    Math.random().toString(36).slice(2, 8).toUpperCase(),
  );

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const res: UserCredential = await signInWithPopup(auth, googleProvider);
      // Google login mein phone humare paas nahi hota, isliye sirf user bhej rahe hain
      await saveUser(res.user);
      toast({ title: "Welcome to the Crew!" });
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{12,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isLogin) {
        // Validation logic
        if (!validatePassword(form.password)) {
          throw new Error(
            "Password needs 12+ chars, uppercase, lowercase & symbol",
          );
        }
        if (form.password !== form.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (form.captcha !== generatedCaptcha) {
          throw new Error("Invalid captcha");
        }

        const res: UserCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password,
        );

        // ✅ Yahan form ka extra data (name, phone) saveUser mein bhej rahe hain
        await saveUser(res.user, {
          displayName: `${form.firstName} ${form.lastName}`,
          phoneNumber: form.phone,
        });

        toast({ title: "Membership Activated!" });
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        toast({ title: "Welcome back, Legend." });
      }
      navigate("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Authentication failed";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-bricolage">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[450px] bg-[#0a0a0a] border border-white/5 p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none mb-4">
              {isLogin ? "JOIN THE" : "CREATE"}
              <br />
              <span className="text-primary not-italic">
                {isLogin ? "VAULT." : "IDENTITY."}
              </span>
            </h1>
          </div>

          <Button
            className="w-full h-14 bg-white text-black font-black italic uppercase tracking-tighter rounded-none hover:bg-primary transition-all flex items-center justify-center gap-3 mb-8"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <Chrome size={20} />
            Continue with Google
          </Button>

          <div className="relative flex items-center gap-4 mb-8">
            <div className="h-[1px] bg-white/10 flex-1" />
            <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest">
              OR
            </span>
            <div className="h-[1px] bg-white/10 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 overflow-hidden"
                >
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <UserIcon
                        className="absolute left-0 top-3 text-gray-600"
                        size={16}
                      />
                      <input
                        name="firstName"
                        placeholder="FIRST NAME *"
                        onChange={handleChange}
                        required
                        className="auth-input pl-6"
                      />
                    </div>
                    <div className="relative flex-1">
                      <input
                        name="lastName"
                        placeholder="LAST NAME *"
                        onChange={handleChange}
                        required
                        className="auth-input"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Phone
                      className="absolute left-0 top-3 text-gray-600"
                      size={16}
                    />
                    <input
                      name="phone"
                      placeholder="PHONE NUMBER *"
                      onChange={handleChange}
                      required
                      className="auth-input pl-6"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-0 top-3 text-gray-600" size={16} />
              <input
                name="email"
                type="email"
                placeholder="EMAIL ADDRESS *"
                onChange={handleChange}
                required
                className="auth-input pl-6"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-0 top-3 text-gray-600" size={16} />
              <input
                name="password"
                type="password"
                placeholder="PASSWORD *"
                onChange={handleChange}
                required
                className="auth-input pl-6"
              />
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="CONFIRM PASSWORD *"
                  onChange={handleChange}
                  required
                  className="auth-input"
                />
                <div className="p-4 border border-white/5 bg-white/[0.02]">
                  <p className="text-[10px] font-black tracking-widest text-gray-600 uppercase mb-3 flex items-center gap-2">
                    <ShieldCheck size={12} className="text-primary" />
                    Verification:{" "}
                    <span className="text-white italic">
                      {generatedCaptcha}
                    </span>
                  </p>
                  <input
                    name="captcha"
                    placeholder="ENTER CAPTCHA *"
                    onChange={handleChange}
                    required
                    className="auth-input"
                  />
                </div>
              </motion.div>
            )}

            <Button
              className="w-full h-14 bg-primary text-black font-black italic uppercase tracking-tighter rounded-none hover:bg-white transition-all group"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : isLogin
                  ? "Access Vault"
                  : "Initialize Identity"}
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </Button>
          </form>

          <div className="mt-10 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-500 hover:text-primary transition-colors"
            >
              {isLogin
                ? "No Membership? Create One"
                : "Already a member? Login"}
            </button>
          </div>
        </motion.div>
      </div>
      <Footer />
      <style>{`
        .auth-input { width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 12px 0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; outline: none; transition: border-color 0.3s; }
        .auth-input:focus { border-bottom-color: #FAFF00; }
        .auth-input::placeholder { color: #333; }
      `}</style>
    </div>
  );
};

export default Auth;