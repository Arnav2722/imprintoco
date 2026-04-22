// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
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
//   RefreshCw,
//   Globe,
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
//   countryCode: string;
//   phone: string;
//   password: string;
//   confirmPassword: string;
//   captcha: string;
// };

// const Auth = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   // Determine state based on URL path
//   const isLogin = location.pathname === "/login";
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState<FormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     countryCode: "+91",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     captcha: "",
//   });

//   const generateCaptchaString = (): string =>
//     Math.random().toString(36).slice(2, 8).toUpperCase();

//   const [generatedCaptcha, setGeneratedCaptcha] = useState<string>(
//     generateCaptchaString(),
//   );

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         navigate("/");
//       }
//     });
//     return () => unsubscribe();
//   }, [navigate]);

//   // Refresh captcha whenever we switch to the register page
//   useEffect(() => {
//     if (!isLogin) {
//       setGeneratedCaptcha(generateCaptchaString());
//     }
//   }, [isLogin]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const refreshCaptcha = (): void => {
//     setGeneratedCaptcha(generateCaptchaString());
//   };

//   const handleGoogleLogin = async (): Promise<void> => {
//     try {
//       setLoading(true);
//       const res: UserCredential = await signInWithPopup(auth, googleProvider);
//       await saveUser(res.user);
//       toast({ title: "Successfully logged in!" });
//       navigate("/");
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         toast({
//           title: "Login Failed",
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

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>,
//   ): Promise<void> => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!isLogin) {
//         if (!validatePassword(form.password)) {
//           throw new Error(
//             "Password must be 12+ characters with uppercase, lowercase and a symbol",
//           );
//         }
//         if (form.password !== form.confirmPassword) {
//           throw new Error("Passwords do not match");
//         }
//         if (form.captcha !== generatedCaptcha) {
//           throw new Error("Wrong captcha code");
//         }

//         const res: UserCredential = await createUserWithEmailAndPassword(
//           auth,
//           form.email,
//           form.password,
//         );

//         await saveUser(res.user, {
//           displayName: `${form.firstName} ${form.lastName}`,
//           phoneNumber: `${form.countryCode}${form.phone}`,
//         });

//         toast({ title: "Account created successfully!" });
//       } else {
//         await signInWithEmailAndPassword(auth, form.email, form.password);
//         toast({ title: "Welcome back!" });
//       }
//       navigate("/");
//     } catch (err: unknown) {
//       const message =
//         err instanceof Error ? err.message : "Something went wrong";
//       toast({ title: "Error", description: message, variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full bg-transparent border-b-2 border-foreground/10 py-4 text-[12px] font-black tracking-widest uppercase outline-none transition-all focus:border-primary text-foreground placeholder:text-foreground/20 pl-10";

//   return (
//     <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
//       <Navbar />

//       <div className="flex items-center justify-center min-h-screen px-6 pt-32 pb-24 relative z-10">
//         <motion.div
//           key={isLogin ? "login" : "register"} // Key ensures animation re-runs on path change
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="w-full max-w-[500px] bg-white border-4 border-foreground p-10 md:p-14 relative shadow-[20px_20px_0px_0px_rgba(0,212,255,1)]"
//         >
//           <div className="flex flex-col items-center mb-12">
//             <img
//               src="/logo.png"
//               alt="Imprinto Co."
//               className="h-10 w-auto mb-6 brightness-0"
//             />
//             <h2 className="font-display text-4xl font-black uppercase tracking-tighter italic text-center">
//               {isLogin ? "JOIN THE CORE" : "CREATE IDENTITY"}
//             </h2>
//             <div className="w-12 h-1 bg-primary mt-4" />
//           </div>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
//             <AnimatePresence mode="wait">
//               {!isLogin && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className="flex flex-col gap-y-6 overflow-hidden"
//                 >
//                   <div className="flex gap-x-4">
//                     <div className="relative flex-1 group">
//                       <UserIcon
//                         className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
//                         size={18}
//                       />
//                       <input
//                         name="firstName"
//                         placeholder="First Name"
//                         onChange={handleChange}
//                         required
//                         className={inputClass}
//                       />
//                     </div>
//                     <div className="relative flex-1 group">
//                       <input
//                         name="lastName"
//                         placeholder="Last Name"
//                         onChange={handleChange}
//                         required
//                         className="w-full bg-transparent border-b-2 border-foreground/10 py-4 text-[12px] font-black tracking-widest uppercase outline-none transition-all focus:border-primary text-foreground placeholder:text-foreground/20 px-2"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex gap-x-4 items-center">
//                     <div className="relative w-24 group">
//                       <Globe
//                         className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
//                         size={18}
//                       />
//                       <select
//                         name="countryCode"
//                         value={form.countryCode}
//                         onChange={handleChange}
//                         className={`${inputClass} appearance-none cursor-pointer pr-0`}
//                       >
//                         <option value="+91">+91</option>
//                         <option value="+1">+1</option>
//                         <option value="+44">+44</option>
//                         <option value="+971">+971</option>
//                       </select>
//                     </div>
//                     <div className="relative flex-1 group">
//                       <Phone
//                         className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
//                         size={18}
//                       />
//                       <input
//                         name="phone"
//                         type="tel"
//                         placeholder="Mobile Number"
//                         onChange={handleChange}
//                         required
//                         className={inputClass}
//                       />
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <div className="relative group">
//               <Mail
//                 className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
//                 size={18}
//               />
//               <input
//                 name="email"
//                 type="email"
//                 placeholder="Email ID"
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//               />
//             </div>

//             <div className="relative group">
//               <Lock
//                 className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
//                 size={18}
//               />
//               <input
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 onChange={handleChange}
//                 required
//                 className={inputClass}
//               />
//             </div>

//             {!isLogin && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex flex-col gap-y-6"
//               >
//                 <div className="relative group">
//                   <Lock
//                     className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
//                     size={18}
//                   />
//                   <input
//                     name="confirmPassword"
//                     type="password"
//                     placeholder="Confirm Password"
//                     onChange={handleChange}
//                     required
//                     className={inputClass}
//                   />
//                 </div>

//                 <div className="p-6 bg-foreground/5 border-2 border-foreground/10 rounded-none space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2">
//                       <ShieldCheck size={14} className="text-primary" />
//                       Human Check:
//                       <span className="text-foreground italic font-black bg-white px-2 py-0.5 border border-foreground/10">
//                         {generatedCaptcha}
//                       </span>
//                     </span>
//                     <button
//                       type="button"
//                       onClick={refreshCaptcha}
//                       className="text-foreground/40 hover:text-primary transition-colors"
//                     >
//                       <RefreshCw size={16} />
//                     </button>
//                   </div>
//                   <input
//                     name="captcha"
//                     placeholder="ENTER CODE"
//                     onChange={handleChange}
//                     required
//                     className="w-full bg-white border-2 border-foreground py-3 text-center text-[12px] font-black tracking-[0.4em] uppercase outline-none focus:border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
//                   />
//                 </div>
//               </motion.div>
//             )}

//             <Button
//               className="w-full h-16 bg-foreground text-background font-black uppercase tracking-widest rounded-none hover:bg-primary hover:text-foreground transition-all flex items-center justify-center gap-3 mt-4 text-sm group"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "PROCESSING..." : isLogin ? "LOG IN" : "SIGN UP"}
//               <ArrowRight
//                 size={20}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </Button>
//           </form>

//           <div className="mt-10 pt-10 border-t-2 border-foreground/5 flex flex-col gap-y-6 text-center">
//             <div className="relative flex items-center gap-4">
//               <div className="h-[1px] bg-foreground/10 flex-1" />
//               <span className="text-[9px] font-black text-foreground/30 uppercase tracking-[0.3em]">
//                 Quick Access
//               </span>
//               <div className="h-[1px] bg-foreground/10 flex-1" />
//             </div>

//             <Button
//               variant="outline"
//               className="w-full h-14 border-2 border-foreground rounded-none bg-white hover:bg-accent-lime hover:text-foreground transition-all flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
//               onClick={handleGoogleLogin}
//               disabled={loading}
//             >
//               <Chrome size={18} /> Google Login
//             </Button>

//             <button
//               onClick={() => navigate(isLogin ? "/register" : "/login")}
//               className="text-[10px] font-black tracking-widest uppercase text-foreground/40 hover:text-primary transition-colors block mx-auto underline underline-offset-4"
//             >
//               {isLogin
//                 ? "New to Imprinto? Register"
//                 : "Already in the circle? Login"}
//             </button>
//           </div>
//         </motion.div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Auth;

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

import { auth, googleProvider, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

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
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isLogin = location.pathname === "/login";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !loading) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate, loading]);

  useEffect(() => {
    if (!isLogin) {
      setGeneratedCaptcha(generateCaptchaString());
    }
  }, [isLogin]);

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

      // FIX: Pehle check karo user exist karta hai ya nahi
      const userDoc = await getDoc(doc(db, "users", res.user.uid));

      if (!userDoc.exists()) {
        // Sirf naye user ke liye data create karo
        await saveUser(res.user);
      } else {
        // Purane user ke liye sirf login time update karo, profile data nahi
        // Isse aapka 'mobile' field safe rahega
        console.log("Existing user detected, keeping mobile number safe.");
      }

      toast({ title: "SUCCESSFULLY LOGGED IN" });
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "LOGIN FAILED",
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
            "PASSWORD MUST BE 12+ CHARACTERS WITH UPPERCASE, LOWERCASE AND A SYMBOL",
          );
        }
        if (form.password !== form.confirmPassword) {
          throw new Error("PASSWORDS DO NOT MATCH");
        }
        if (form.captcha !== generatedCaptcha) {
          throw new Error("WRONG CAPTCHA CODE");
        }

        const res: UserCredential = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password,
        );

        await saveUser(res.user, {
          name: `${form.firstName} ${form.lastName}`,
          mobile: `${form.countryCode}${form.phone}`,
        });

        toast({ title: "ACCOUNT CREATED" });
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        // Login ke waqt hum saveUser call hi nahi karenge
        // Taaki Firestore document overwrite na ho
        toast({ title: "WELCOME BACK" });
      }
      navigate("/");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "SOMETHING WENT WRONG";
      toast({ title: "ERROR", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b-2 border-foreground/10 py-4 text-[10px] md:text-[12px] font-black tracking-widest uppercase outline-none transition-all focus:border-primary text-foreground placeholder:text-foreground/20 pl-10";

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />

      <div className="flex items-center justify-center min-h-screen px-6 pt-32 pb-24 relative z-10">
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[500px] bg-white border-2 md:border-4 border-foreground p-8 md:p-14 relative shadow-[10px_10px_0px_0px_rgba(0,212,255,1)]"
        >
          <div className="flex flex-col items-center mb-10">
            <img
              src="/MainLogo.png"
              alt="Imprinto Co."
              className="h-10 md:h-12 w-auto mb-6"
            />
            <h2 className="font-display text-xl md:text-3xl font-black uppercase tracking-tighter text-center leading-tight">
              {isLogin ? "JOIN THE CORE" : "CREATE IDENTITY"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col gap-y-6 overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 group">
                      <UserIcon
                        className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
                        size={16}
                      />
                      <input
                        name="firstName"
                        placeholder="FIRST NAME"
                        onChange={handleChange}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="relative flex-1 group">
                      <input
                        name="lastName"
                        placeholder="LAST NAME"
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b-2 border-foreground/10 py-4 text-[10px] md:text-[12px] font-black tracking-widest uppercase outline-none transition-all focus:border-primary text-foreground placeholder:text-foreground/20 px-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-x-4 items-center">
                    <div className="relative w-24 group">
                      <Globe
                        className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
                        size={16}
                      />
                      <select
                        name="countryCode"
                        value={form.countryCode}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none cursor-pointer pr-0`}
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+971">+971</option>
                      </select>
                    </div>
                    <div className="relative flex-1 group">
                      <Phone
                        className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
                        size={16}
                      />
                      <input
                        name="phone"
                        type="tel"
                        placeholder="MOBILE"
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
                className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
                size={16}
              />
              <input
                name="email"
                type="email"
                placeholder="EMAIL ID"
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
                size={16}
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
                className="flex flex-col gap-y-6"
              >
                <div className="relative group">
                  <Lock
                    className="absolute left-1 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-primary transition-colors"
                    size={16}
                  />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="CONFIRM"
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="p-4 md:p-6 bg-foreground/5 border-2 border-foreground/10 rounded-none space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[7px] md:text-[9px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2">
                      <ShieldCheck size={14} className="text-primary" />
                      HUMAN CHECK:
                      <span className="text-foreground font-black bg-white px-2 py-1 border border-foreground/10">
                        {generatedCaptcha}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="text-foreground/40 hover:text-primary transition-colors"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>
                  <input
                    name="captcha"
                    placeholder="ENTER CODE"
                    onChange={handleChange}
                    required
                    className="w-full bg-white border-2 border-foreground py-3 text-center text-[10px] md:text-[12px] font-black tracking-[0.3em] uppercase outline-none focus:border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </motion.div>
            )}

            <Button
              className="w-full h-14 md:h-16 bg-foreground text-background font-black uppercase tracking-widest rounded-none hover:bg-primary hover:text-foreground transition-all flex items-center justify-center gap-3 mt-4 text-[10px] md:text-xs group shadow-[4px_4px_0px_0px_rgba(0,212,255,1)]"
              type="submit"
              disabled={loading}
            >
              {loading ? "PROCESSING" : isLogin ? "LOG IN" : "SIGN UP"}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t-2 border-foreground/5 flex flex-col gap-y-6 text-center">
            <Button
              variant="outline"
              className="w-full h-12 md:h-14 border-2 border-foreground rounded-none bg-white hover:bg-accent-lime hover:text-foreground transition-all flex items-center justify-center gap-3 text-[9px] md:text-[11px] font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <Chrome size={16} /> GOOGLE LOGIN
            </Button>

            <button
              onClick={() => navigate(isLogin ? "/register" : "/login")}
              className="text-[8px] md:text-[10px] font-black tracking-widest uppercase text-foreground/40 hover:text-primary transition-colors block mx-auto underline underline-offset-4"
            >
              {isLogin
                ? "NEW TO IMPRINTO? REGISTER"
                : "ALREADY IN THE CIRCLE? LOGIN"}
            </button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;