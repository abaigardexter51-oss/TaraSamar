import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabaseClient";
import heroBeach from "@/assets/hero-beach.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure both password fields are the same.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast({
          title: "Unable to sign up",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Log sign-up activity (may not have a user yet if email confirmation is required)
      const { error: logError } = await supabase.from("activity_logs").insert({
        user_id: data.user?.id ?? null,
        email: formData.email,
        event_type: "signup",
        description: "User created an account.",
        metadata: { source: "web", page: "SignUp" },
      });
      if (logError) {
        // eslint-disable-next-line no-console
        console.error("Failed to log sign-up activity", logError);
      }

      toast({
        title: "Check your email",
        description: "We sent you a confirmation link to complete your registration.",
      });
      navigate("/signin");
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
          <img src={heroBeach} alt="Sign Up" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        <div className="relative z-10 text-center text-cream container mx-auto px-4">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 animate-fade-up">
            Create Account
          </h1>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto animate-fade-up delay-100">
            Join TaraSamar and start exploring Western Samar with your own account.
          </p>
        </div>
      </section>

      {/* Sign Up Form */}
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
                  Create your TaraSamar account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-foreground mb-1 block">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
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
                        placeholder="Create a password"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-foreground mb-1 block"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Re-enter your password"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="sunset"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-ocean hover:underline font-medium">
                      Sign in
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

export default SignUp;


