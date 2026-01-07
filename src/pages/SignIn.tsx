import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";
import heroBeach from "@/assets/hero-beach.jpg";

const ADMIN_EMAIL = "TaraSamar@gmail.com";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error || !data.user) {
        toast({
          title: "Unable to sign in",
          description: error?.message ?? "Unable to sign in with those credentials.",
          variant: "destructive",
        });
        return;
      }

      // Log sign-in activity (non-blocking for the user)
      const { error: logError } = await supabase.from("activity_logs").insert({
        user_id: data.user.id,
        email: data.user.email,
        event_type: "signin",
        description: "User signed in.",
        metadata: { source: "web", page: "SignIn" },
      });
      if (logError) {
        // eslint-disable-next-line no-console
        console.error("Failed to log sign-in activity", logError);
      }

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });

      // Redirect admin to the dashboard, others to home
      const email = data.user.email ?? "";
      if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error occurred.";
      toast({
        title: "Something went wrong",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroBeach} alt="Sign In" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        <div className="relative z-10 text-center text-cream container mx-auto px-4">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 animate-fade-up">
            Sign In
          </h1>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto animate-fade-up delay-100">
            Welcome back! Sign in to your account
          </p>
        </div>
      </section>

      {/* Sign In Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-ocean transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <Card>
              <CardHeader>
                <CardTitle className="font-display text-2xl font-bold text-center">
                  Sign In to Your Account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-foreground mb-1 block">
                      Email or Username
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email or username"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="text-sm font-medium text-foreground mb-1 block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input" />
                      <span className="text-muted-foreground">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-ocean hover:underline">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="sunset"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-ocean hover:underline font-medium">
                      Sign up
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SignIn;

