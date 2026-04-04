import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) navigate("/");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate("/");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!" });
      } else {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
        if (error) throw error;
        toast({ title: "Account created!", description: "Check your email to confirm your account." });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md px-6">
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-2">
            {isLogin ? "LOGIN" : "SIGN UP"}
          </h1>
          <p className="text-muted-foreground font-body text-sm mb-8">
            {isLogin ? "Welcome back to the underground." : "Join the underground."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface-highest text-foreground text-sm font-body px-4 py-3 outline-none border border-foreground/5 focus:border-primary transition-colors"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="font-display text-[10px] tracking-widest text-muted-foreground uppercase block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-surface-highest text-foreground text-sm font-body px-4 py-3 outline-none border border-foreground/5 focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
            <Button variant="cta" size="xl" className="w-full" type="submit" disabled={loading}>
              {loading ? "LOADING..." : isLogin ? "LOGIN" : "CREATE ACCOUNT"}
            </Button>
          </form>

          <p className="text-center mt-6 text-muted-foreground font-body text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-display text-xs tracking-wider uppercase"
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
