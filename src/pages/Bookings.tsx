import { useState } from "react";
import { Calendar, Users, MapPin, Clock, ArrowRight, Star, Check, Info, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import tourService from "@/assets/tour-service.jpg";
import resort from "@/assets/resort.jpg";
import heroBeach from "@/assets/hero-beach.jpg";

const bookingTypes = ["All", "Tours", "Accommodations", "Rentals"];

const bookableItems = [
  {
    id: 1,
    type: "Tours",
    name: "Full-Day Island Hopping Adventure",
    provider: "Island Hopping Adventures",
    image: tourService,
    rating: 4.9,
    reviews: 128,
    duration: "8 hours",
    location: "Multiple islands",
    price: 1500,
    priceType: "per person",
    includes: ["Boat transportation", "Snorkeling gear", "Lunch", "Guide"],
    description: "Explore the stunning islands of Western Samar. Visit hidden beaches, snorkel in crystal-clear waters, and enjoy a fresh seafood lunch.",
  },
  {
    id: 2,
    type: "Accommodations",
    name: "Beachfront Villa Suite",
    provider: "Samar Beach Resort",
    image: resort,
    rating: 4.8,
    reviews: 256,
    duration: "Per night",
    location: "Calbayog City",
    price: 4500,
    priceType: "per night",
    includes: ["King bed", "Ocean view", "Breakfast", "Pool access", "WiFi"],
    description: "Wake up to stunning ocean views in our luxurious beachfront villa. Spacious room with traditional Filipino design elements.",
  },
  {
    id: 3,
    type: "Tours",
    name: "Sohoton Cave Exploration",
    provider: "Sohoton Cave Tours",
    image: heroBeach,
    rating: 4.9,
    reviews: 234,
    duration: "6 hours",
    location: "Basey, Samar",
    price: 2000,
    priceType: "per person",
    includes: ["Boat ride", "Cave entry", "Guide", "Life vest", "Snacks"],
    description: "Discover the magical Sohoton Natural Bridge. Kayak through underground rivers and swim in crystal-clear natural pools.",
  },
  {
    id: 4,
    type: "Rentals",
    name: "Motorcycle Rental",
    provider: "Kuya Rey's Rental",
    image: tourService,
    rating: 4.6,
    reviews: 67,
    duration: "Per day",
    location: "Catbalogan City",
    price: 500,
    priceType: "per day",
    includes: ["Helmet", "Full tank", "Basic insurance", "Map"],
    description: "Explore Western Samar at your own pace with a reliable motorcycle. Perfect for adventurous travelers.",
  },
  {
    id: 5,
    type: "Accommodations",
    name: "Native Cottage Room",
    provider: "Samar Beach Resort",
    image: resort,
    rating: 4.7,
    reviews: 189,
    duration: "Per night",
    location: "Calbayog City",
    price: 2500,
    priceType: "per night",
    includes: ["Double bed", "Fan cooling", "Breakfast", "Beach access"],
    description: "Experience authentic Filipino living in our traditional nipa hut cottage. Simple yet comfortable beachfront accommodation.",
  },
  {
    id: 6,
    type: "Tours",
    name: "Sunset Cruise",
    provider: "Island Hopping Adventures",
    image: heroBeach,
    rating: 4.8,
    reviews: 92,
    duration: "3 hours",
    location: "Catbalogan Bay",
    price: 800,
    priceType: "per person",
    includes: ["Boat cruise", "Drinks", "Snacks", "Photo opportunities"],
    description: "Watch the spectacular Western Samar sunset from the water. Includes refreshments and perfect photo opportunities.",
  },
];

const Bookings = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedPackage, setSubmittedPackage] = useState("");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [statusEmail, setStatusEmail] = useState("");
  const [statusResults, setStatusResults] = useState<any[]>([]);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const filteredItems = bookableItems.filter((item) => {
    return selectedType === "All" || item.type === selectedType;
  });

  const handleBookingFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusEmail.trim()) return;

    setIsCheckingStatus(true);
    try {
      const { data, error } = await supabase
        .from("booking_requests")
        .select("*")
        .eq("email", statusEmail.trim())
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to load booking status", error);
        setStatusResults([]);
        return;
      }

      setStatusResults(data ?? []);
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selected = bookableItems.find((item) => item.id === selectedItem);

    setSubmittedEmail(bookingForm.email);
    setSubmittedPackage(selected?.name || "your selected package");
    setShowSuccessDialog(true);

    // Persist booking request for admin review
    const { error: bookingError } = await supabase.from("booking_requests").insert({
      email: bookingForm.email,
      full_name: bookingForm.name,
      phone: bookingForm.phone,
      message: bookingForm.message || null,
      package_id: selected?.id ?? null,
      package_name: selected?.name ?? null,
      guests: Number(guests),
      selected_date: selectedDate || null,
      status: "pending",
    });

    if (bookingError) {
      // eslint-disable-next-line no-console
      console.error("Failed to create booking request", bookingError);
    } else {
      // Log booking request activity
      const { error: logError } = await supabase.from("activity_logs").insert({
        user_id: null,
        email: bookingForm.email,
        event_type: "booking_request",
        description: `Booking request submitted for ${selected?.name ?? "a package"}.`,
        metadata: {
          guests,
          selected_date: selectedDate || null,
          package_id: selected?.id ?? null,
          package_name: selected?.name ?? null,
        },
      });
      if (logError) {
        // eslint-disable-next-line no-console
        console.error("Failed to log booking activity", logError);
      }
    }

    setBookingForm({ name: "", email: "", phone: "", message: "" });
    setSelectedItem(null);
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroBeach} alt="Booking" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        <div className="relative z-10 text-center text-cream container mx-auto px-4">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 animate-fade-up">
            Book Your Adventure
          </h1>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto animate-fade-up delay-100">
            View resort rates and book tours, accommodations, and rentals from trusted local providers
          </p>
        </div>
      </section>

      {/* Booking Search */}
      <section className="py-8 border-b border-border bg-card sticky top-16 z-30 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm"
                >
                  {bookingTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Date</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">&nbsp;</label>
                <Button variant="ocean" className="w-full">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bookable Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-80 h-48 md:h-auto relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-ocean text-cream text-xs font-medium">
                      {item.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 fill-sunset text-sunset" />
                          <span className="font-medium">{item.rating}</span>
                          <span className="text-muted-foreground text-sm">({item.reviews} reviews)</span>
                        </div>
                        
                        <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                          {item.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">by {item.provider}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {item.includes.map((inc) => (
                            <span
                              key={inc}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs"
                            >
                              <Check className="w-3 h-3 text-green-500" />
                              {inc}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price and Book */}
                      <div className="lg:text-right lg:pl-6 lg:border-l border-border">
                        <div className="mb-4">
                          <span className="font-display text-3xl font-bold text-ocean">
                            ₱{item.price.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground text-sm block">
                            {item.priceType}
                          </span>
                          <span className="text-muted-foreground text-xs block mt-1 italic">
                            Resort rate - payment handled by resort
                          </span>
                        </div>
                        <Button 
                          variant="sunset" 
                          size="lg"
                          onClick={() => {
                            setSelectedItem(item.id);
                            // Scroll to booking form section
                            setTimeout(() => {
                              const bookingSection = document.getElementById('booking-form-section');
                              if (bookingSection) {
                                bookingSection.scrollIntoView({ behavior: 'smooth' });
                              }
                            }, 100);
                          }}
                        >
                          Book Now
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking-form-section" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-2xl font-bold">
                      Booking Request Form
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      {/* Selected Package/Resort */}
                      {selectedItem && (
                        <div className="p-4 bg-ocean/5 rounded-lg border border-ocean/20">
                          <p className="text-sm text-muted-foreground mb-1">Selected Package:</p>
                          <p className="font-semibold text-foreground">
                            {bookableItems.find(item => item.id === selectedItem)?.name}
                          </p>
                        </div>
                      )}

                      {/* Date Selection */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="booking-date" className="text-sm font-medium text-foreground mb-1 block">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Check-in Date
                          </label>
                          <Input
                            id="booking-date"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="booking-guests" className="text-sm font-medium text-foreground mb-1 block">
                            <Users className="w-4 h-4 inline mr-1" />
                            Number of Guests
                          </label>
                          <select
                            id="booking-guests"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm"
                            required
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>{num} {num === 1 ? 'guest' : 'guests'}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="pt-4 border-t border-border">
                        <h4 className="font-semibold text-foreground mb-4">Contact Information</h4>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="booking-name" className="text-sm font-medium text-foreground mb-1 block">
                              Full Name
                            </label>
                            <Input
                              id="booking-name"
                              name="name"
                              type="text"
                              value={bookingForm.name}
                              onChange={handleBookingFormChange}
                              required
                              placeholder="Enter your full name"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="booking-email" className="text-sm font-medium text-foreground mb-1 block">
                                Email Address
                              </label>
                              <Input
                                id="booking-email"
                                name="email"
                                type="email"
                                value={bookingForm.email}
                                onChange={handleBookingFormChange}
                                required
                                placeholder="your.email@example.com"
                              />
                            </div>

                            <div>
                              <label htmlFor="booking-phone" className="text-sm font-medium text-foreground mb-1 block">
                                Phone Number
                              </label>
                              <Input
                                id="booking-phone"
                                name="phone"
                                type="tel"
                                value={bookingForm.phone}
                                onChange={handleBookingFormChange}
                                required
                                placeholder="+63 917 123 4567"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="booking-message" className="text-sm font-medium text-foreground mb-1 block">
                              Additional Notes (Optional)
                            </label>
                            <Textarea
                              id="booking-message"
                              name="message"
                              value={bookingForm.message}
                              onChange={handleBookingFormChange}
                              rows={4}
                              placeholder="Any special requests or additional information..."
                            />
                          </div>
                        </div>
                      </div>

                      <Button type="submit" variant="sunset" size="lg" className="w-full">
                        Submit Booking Request
                        <Send className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Information */}
              <div>
                <Card className="border-ocean/20 bg-ocean/5">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center shrink-0">
                        <Info className="w-6 h-6 text-ocean" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                          Booking Information
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          This website is for booking requests only. All rates shown are resort rates provided for reference.
                        </p>
                        <p className="text-muted-foreground text-sm font-medium mb-4">
                          Payments and confirmations are handled directly by the resort. After submitting your booking request, 
                          the resort will contact you to confirm availability and arrange payment.
                        </p>
                        <p className="text-muted-foreground text-xs italic border-t border-border pt-3">
                          This website is for resort booking only. Payments and confirmations are handled directly by the resort.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Booking Status Checker */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="font-display text-lg font-semibold">
                      Check Your Booking Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleStatusCheck} className="space-y-3">
                      <div>
                        <label
                          htmlFor="status-email"
                          className="text-sm font-medium text-foreground mb-1 block"
                        >
                          Email used for booking
                        </label>
                        <Input
                          id="status-email"
                          type="email"
                          value={statusEmail}
                          onChange={(e) => setStatusEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <Button type="submit" variant="ocean" className="w-full" disabled={isCheckingStatus}>
                        {isCheckingStatus ? "Checking..." : "View Booking Status"}
                      </Button>
                    </form>

                    {statusResults.length > 0 && (
                      <div className="space-y-3 mt-2">
                        {statusResults.map((booking) => (
                          <div
                            key={booking.id}
                            className="rounded-lg border border-border bg-background p-3 text-sm space-y-1"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-medium">
                                {booking.package_name ?? "Booking request"}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  booking.status === "confirmed"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-xs">
                              Requested on{" "}
                              {new Date(booking.created_at).toLocaleString()}
                            </p>
                            {booking.selected_date && (
                              <p className="text-muted-foreground text-xs">
                                Preferred date:{" "}
                                {new Date(booking.selected_date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {!isCheckingStatus && statusEmail && statusResults.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        No booking requests found for this email yet. Please make sure you entered
                        the same email you used in the booking form.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center font-display text-2xl font-bold">
              Booking Request Submitted Successfully!
            </DialogTitle>
            <DialogDescription className="text-center pt-4">
              <p className="text-foreground mb-4">
                Thank you for your booking request for <span className="font-semibold text-ocean">{submittedPackage}</span>!
              </p>
              <div className="bg-secondary rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium text-foreground">Email:</span> {submittedEmail}
                </p>
                <p className="text-sm text-muted-foreground">
                  The resort will contact you at this email address to confirm availability and arrange payment.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Please check your email for confirmation details. We'll be in touch soon!
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={handleCloseDialog} variant="sunset" size="lg" className="w-full sm:w-auto">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
};

export default Bookings;
