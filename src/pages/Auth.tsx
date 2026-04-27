import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/mercpoint-logo.jpg";

const Auth = () => {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav("/admin", { replace: true });
    });
  }, [nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast({ title: "Account created", description: "Check your email to confirm, then sign in. Ask the owner to grant admin role." });
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav("/admin");
      }
    } catch (err: any) {
      toast({ title: "Auth error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-carbon flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gunmetal border border-midnight rounded-sm p-8">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-sm overflow-hidden ring-1 ring-midnight">
            <img src={logo} alt="Mercpoint" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-display font-semibold text-chrome">Admin Access</div>
            <div className="spec text-steel mt-0.5">Mercpoint Motors</div>
          </div>
        </div>
        <form onSubmit={submit} className="mt-8 space-y-4">
          <label className="block">
            <div className="spec text-steel mb-1.5">Email</div>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full h-11 px-3 bg-carbon text-chrome border border-midnight rounded-sm focus:border-primary outline-none" />
          </label>
          <label className="block">
            <div className="spec text-steel mb-1.5">Password</div>
            <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
              className="w-full h-11 px-3 bg-carbon text-chrome border border-midnight rounded-sm focus:border-primary outline-none" />
          </label>
          <button type="submit" disabled={loading}
            className="w-full h-11 rounded-sm bg-primary text-primary-foreground font-medium shadow-cta hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-60">
            {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-sm text-steel hover:text-chrome transition-colors">
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
        <a href="/" className="mt-6 block text-center spec text-steel hover:text-primary">← Back to site</a>
      </div>
    </main>
  );
};

export default Auth;