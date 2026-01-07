import { Calendar, Users, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function BookingCTA() {
  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-ocean rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-coral rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-cream">
          <span className="inline-block px-4 py-2 rounded-full bg-cream/10 text-sm font-medium mb-6">
            Ready for Adventure?
          </span>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Plan Your Perfect
            <span className="text-gradient-sunset"> Western Samar Trip</span>
          </h2>
          
          <p className="text-cream/70 text-lg mb-12 max-w-2xl mx-auto">
            Book tours, accommodations, and experiences from local businesses.
            Reserve your stay and plan your perfect Western Samar adventure.
          </p>

          {/* Quick Booking Form */}
          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-cream/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-cream/5 rounded-xl p-4 text-left">
                <label className="text-cream/50 text-sm mb-1 block">Destination</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-coral" />
                  <span className="font-medium">Any destination</span>
                </div>
              </div>
              <div className="bg-cream/5 rounded-xl p-4 text-left">
                <label className="text-cream/50 text-sm mb-1 block">Check In</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-coral" />
                  <span className="font-medium">Select date</span>
                </div>
              </div>
              <div className="bg-cream/5 rounded-xl p-4 text-left">
                <label className="text-cream/50 text-sm mb-1 block">Guests</label>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-coral" />
                  <span className="font-medium">2 guests</span>
                </div>
              </div>
              <Button variant="sunset" size="xl" className="h-auto" asChild>
                <Link to="/bookings">
                  Search
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <p className="text-cream/50 text-sm">
              Booking requests only. Payment and confirmation handled directly by the resort.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center">
                <span className="text-xl">⭐</span>
              </div>
              <span className="text-cream/70 text-sm">Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center">
                <span className="text-xl">🏖️</span>
              </div>
              <span className="text-cream/70 text-sm">Local Resorts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center">
                <span className="text-xl">📞</span>
              </div>
              <span className="text-cream/70 text-sm">Direct Booking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
