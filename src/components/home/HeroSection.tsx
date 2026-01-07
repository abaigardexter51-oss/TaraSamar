import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/waterfall.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Beautiful waterfall in Western Samar"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-navy/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="max-w-3xl mx-auto text-center text-cream">
          <span className="inline-block px-4 py-2 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 text-sm font-medium mb-6 animate-fade-up">
            🌴 Discover Paradise in the Philippines
          </span>
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up delay-100 leading-tight">
            Tara na sa{" "}
            <span className="text-gradient-sunset">Western Samar!</span>
          </h1>
          
          <p className="text-lg md:text-xl text-cream/80 mb-8 animate-fade-up delay-200 max-w-2xl mx-auto">
            Pristine beaches, hidden waterfalls, and unforgettable adventures await.
            Connect with local communities and explore the untouched beauty of Samar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-300">
            <Button variant="sunset" size="xl" asChild>
              <Link to="/destinations">
                Explore Destinations
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="glass" size="xl">
              <Play className="w-5 h-5" />
              Watch Video
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-cream/20 animate-fade-up delay-400">
            <div>
              <div className="font-display text-4xl font-bold text-coral">50+</div>
              <div className="text-cream/70 text-sm mt-1">Destinations</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-coral">100+</div>
              <div className="text-cream/70 text-sm mt-1">Local Businesses</div>
            </div>
            <div>
              <div className="font-display text-4xl font-bold text-coral">10K+</div>
              <div className="text-cream/70 text-sm mt-1">Happy Tourists</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-cream/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-cream/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
