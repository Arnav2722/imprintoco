// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "@/integrations/supabase/client";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   useEffect(() => {
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
//       if (session) navigate("/");
//     });
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (session) navigate("/");
//     });
//     return () => subscription.unsubscribe();
//   }, [navigate]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (isLogin) {
//         const { error } = await supabase.auth.signInWithPassword({ email, password });
//         if (error) throw error;
//         toast({ title: "Welcome back!" });
//       } else {
//         const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
//         if (error) throw error;
//         toast({ title: "Account created!", description: "Check your email to confirm your account." });
//       }
//     } catch (error: any) {
//       toast({ title: "Error", description: error.message, variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
//         <div className="w-full max-w-md px-6">
//           <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">
//             {isLogin ? "LOGIN" : "SIGN UP"}
//           </h1>
//           <p className="text-muted-foreground font-body text-sm mb-8">
//             {isLogin ? "Welcome back to the underground." : "Join the underground."}
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="w-full bg-surface-highest text-foreground text-sm font-body px-4 py-3 outline-none border border-foreground/5 focus:border-primary transition-colors"
//                 placeholder="you@email.com"
//               />
//             </div>
//             <div>
//               <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 minLength={6}
//                 className="w-full bg-surface-highest text-foreground text-sm font-body px-4 py-3 outline-none border border-foreground/5 focus:border-primary transition-colors"
//                 placeholder="••••••••"
//               />
//             </div>
//             <Button variant="cta" size="xl" className="w-full" type="submit" disabled={loading}>
//               {loading ? "LOADING..." : isLogin ? "LOGIN" : "CREATE ACCOUNT"}
//             </Button>
//           </form>

//           <p className="text-center mt-6 text-muted-foreground font-body text-sm">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-primary hover:underline font-display text-xs tracking-wider uppercase"
//             >
//               {isLogin ? "Sign Up" : "Login"}
//             </button>
//           </p>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Auth;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveUser } from "@/lib/user";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔴 Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const res: UserCredential = await signInWithPopup(auth, googleProvider);

      // ✅ Save user in Firestore
      await saveUser(res.user);

      toast({ title: "Logged in with Google" });
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

  // 🔐 Password validation
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{12,}$/;
    return regex.test(password);
  };

  // 📩 Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!isLogin) {
        // ✅ Signup validations
        if (!validatePassword(form.password)) {
          throw new Error(
            "Password must be 12+ chars with uppercase, lowercase & special character",
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

        // ✅ Save user
        await saveUser(res.user);

        toast({ title: "Account created successfully!" });
      } else {
        const res: UserCredential = await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password,
        );

        // ✅ Ensure user exists in DB
        await saveUser(res.user);

        toast({ title: "Welcome back!" });
      }

      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex items-center justify-center min-h-screen px-4 pt-24 pb-20">
        <div className="w-full max-w-md bg-surface-highest p-8 rounded-2xl border border-white/10 shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-2">
            {isLogin ? "Login" : "Sign Up"}
          </h1>

          <p className="text-sm text-muted-foreground text-center mb-6">
            {isLogin ? "Welcome back" : "Create your account"}
          </p>

          {/* GOOGLE */}
          <Button
            className="w-full mb-4"
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            Continue with Google
          </Button>

          <div className="flex items-center gap-2 mb-4">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <input
                  name="firstName"
                  placeholder="First Name *"
                  onChange={handleChange}
                  required
                  className="input"
                />
                <input
                  name="lastName"
                  placeholder="Last Name *"
                  onChange={handleChange}
                  required
                  className="input"
                />
                <input
                  name="phone"
                  placeholder="Phone Number *"
                  onChange={handleChange}
                  required
                  className="input"
                />
              </>
            )}

            <input
              name="email"
              type="email"
              placeholder="Email *"
              onChange={handleChange}
              required
              className="input"
            />

            <input
              name="password"
              type="password"
              placeholder="Password *"
              onChange={handleChange}
              required
              className="input"
            />

            {!isLogin && (
              <>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password *"
                  onChange={handleChange}
                  required
                  className="input"
                />

                <div>
                  <p className="text-xs mb-1">
                    Captcha:{" "}
                    <span className="font-bold">{generatedCaptcha}</span>
                  </p>
                  <input
                    name="captcha"
                    placeholder="Enter captcha *"
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>
              </>
            )}

            <Button className="w-full" type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Create Account"}
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            {isLogin ? "No account?" : "Already have one?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-primary hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;