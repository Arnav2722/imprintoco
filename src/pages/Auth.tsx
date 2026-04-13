// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import { saveUser } from "@/lib/user"; // Is function ko update karna padega agar ye phone accept nahi kar raha
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
//   onAuthStateChanged,
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

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         navigate("/");
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
//       // Google login mein phone humare paas nahi hota, isliye sirf user bhej rahe hain
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
//         // Validation logic
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

//         // ✅ Yahan form ka extra data (name, phone) saveUser mein bhej rahe hain
//         await saveUser(res.user, {
//           displayName: `${form.firstName} ${form.lastName}`,
//           phoneNumber: form.phone,
//         });

//         toast({ title: "Membership Activated!" });
//       } else {
//         await signInWithEmailAndPassword(auth, form.email, form.password);
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
//                     Verification:{" "}
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
//         .auth-input { width: 100%; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.1); padding: 12px 0; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; outline: none; transition: border-color 0.3s; }
//         .auth-input:focus { border-bottom-color: #FAFF00; }
//         .auth-input::placeholder { color: #333; }
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
import { saveUser } from "@/lib/user";
import { motion, AnimatePresence } from "framer-motion";
import {
  Chrome,
  ArrowRight,
  ShieldCheck,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  RefreshCw,
  Globe,
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
  countryCode: string;
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
    countryCode: "+91",
    phone: "",
    password: "",
    confirmPassword: "",
    captcha: "",
  });

  const generateCaptchaString = (): string =>
    Math.random().toString(36).slice(2, 8).toUpperCase();

  const [generatedCaptcha, setGeneratedCaptcha] = useState<string>(
    generateCaptchaString(),
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const refreshCaptcha = (): void => {
    setGeneratedCaptcha(generateCaptchaString());
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      setLoading(true);
      const res: UserCredential = await signInWithPopup(auth, googleProvider);
      await saveUser(res.user);
      toast({ title: "Successfully logged in!" });
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Login Failed",
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isLogin) {
        if (!validatePassword(form.password)) {
          throw new Error(
            "Password must be 12+ characters with uppercase, lowercase and a symbol",
          );
        }
        if (form.password !== form.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (form.captcha !== generatedCaptcha) {
          throw new Error("Wrong captcha code");
        }

        const res: UserCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password,
        );

        await saveUser(res.user, {
          displayName: `${form.firstName} ${form.lastName}`,
          phoneNumber: `${form.countryCode}${form.phone}`,
        });

        toast({ title: "Account created successfully!" });
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        toast({ title: "Welcome back!" });
      }
      navigate("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // Common input class to keep code clean
  const inputClass =
    "w-full bg-transparent border-b border-white/10 py-4 text-[13px] font-bold tracking-wider uppercase outline-none transition-all focus:border-primary text-white placeholder:text-[#2a2a2a] pl-10";

  return (
    <div className="min-h-screen bg-[#020202] text-white font-bricolage selection:bg-primary/30">
      <Navbar />

      <div className="flex items-center justify-center min-h-screen px-6 pt-32 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[480px] bg-[#0A0A0A] border border-white/5 p-10 md:p-14 relative shadow-2xl"
        >
          <div className="flex flex-col items-center mb-10">
            <img
              src="/logo.png"
              alt="Imprinto Co."
              className="h-12 w-auto mb-6"
            />
            <h2 className="text-2xl font-black uppercase tracking-tight italic text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-8">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col gap-y-8 overflow-hidden"
                >
                  <div className="flex gap-x-6">
                    <div className="relative flex-1 group">
                      <UserIcon
                        className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-primary transition-colors"
                        size={18}
                      />
                      <input
                        name="firstName"
                        placeholder="FIRST NAME"
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="relative flex-1">
                      <input
                        name="lastName"
                        placeholder="LAST NAME"
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-white/10 py-4 text-[13px] font-bold tracking-wider uppercase outline-none transition-all focus:border-primary text-white placeholder:text-[#2a2a2a] px-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-x-6 items-center">
                    <div className="relative w-28 group">
                      <Globe
                        className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-primary transition-colors"
                        size={18}
                      />
                      <select
                        name="countryCode"
                        value={form.countryCode}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+971">+971</option>
                      </select>
                    </div>
                    <div className="relative flex-1 group">
                      <Phone
                        className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-primary transition-colors"
                        size={18}
                      />
                      <input
                        name="phone"
                        type="tel"
                        placeholder="PHONE NUMBER"
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail
                className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-primary transition-colors"
                size={18}
              />
              <input
                name="email"
                type="email"
                placeholder="EMAIL ADDRESS"
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-primary transition-colors"
                size={18}
              />
              <input
                name="password"
                type="password"
                placeholder="PASSWORD"
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {!isLogin && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-y-8"
              >
                <div className="relative group">
                  <Lock
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-primary transition-colors"
                    size={18}
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="CONFIRM PASSWORD"
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={14} className="text-primary" />
                      Code:{" "}
                      <span className="text-white italic tracking-normal">
                        {generatedCaptcha}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="text-gray-500 hover:text-primary transition-colors"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>
                  <input
                    name="captcha"
                    placeholder="TYPE CODE ABOVE"
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-white/5 py-4 text-center text-[13px] font-bold tracking-[0.3em] uppercase outline-none focus:border-primary text-white placeholder:text-[#2a2a2a]"
                  />
                </div>
              </motion.div>
            )}

            <Button
              className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest rounded-none hover:bg-white transition-all flex items-center justify-center gap-2 mt-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login Now" : "Sign Up"}
              <ArrowRight size={18} />
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-y-6 text-center">
            <div className="relative flex items-center gap-4">
              <div className="h-[1px] bg-white/5 flex-1" />
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                Or
              </span>
              <div className="h-[1px] bg-white/5 flex-1" />
            </div>

            <Button
              variant="outline"
              className="w-full h-14 border-white/10 rounded-none bg-transparent hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <Chrome size={18} /> Google Account
            </Button>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-primary transition-colors block mx-auto"
            >
              {isLogin ? "No account? Register" : "Have an account? Login"}
            </button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;