import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, ArrowRight, Phone, Globe, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import tourService from "@/assets/tour-service.jpg";
import resort from "@/assets/resort.jpg";
import handicrafts from "@/assets/handicrafts.jpg";

const businessTypes = ["All", "Tours", "Accommodations", "Rentals", "Restaurants"];

const businesses = [
  {
    id: 1,
    name: "Island Hopping Adventures",
    type: "Tours",
    image: tourService,
    rating: 4.9,
    reviews: 128,
    location: "Catbalogan City",
    price: "From ₱1,500",
    description: "Experience the best island hopping tours with local expert guides. Visit hidden coves, pristine beaches, and stunning rock formations.",
    phone: "+63 917 123 4567",
    website: "islandhoppingadventures.ph",
    verified: true,
    googleMapsUrl: "https://www.google.com/maps?q=Island+Hopping+Adventures+Catbalogan+City",
  },
  {
    id: 2,
    name: "Samar Beach Resort",
    type: "Accommodations",
    image: resort,
    rating: 4.8,
    reviews: 256,
    location: "Calbayog City",
    price: "From ₱2,500/night",
    description: "Beachfront resort with traditional Filipino hospitality. Wake up to stunning ocean views and enjoy world-class amenities.",
    phone: "+63 917 234 5678",
    website: "samarbeachresort.ph",
    verified: true,
    googleMapsUrl: "https://www.google.com/maps?q=Samar+Beach+Resort+Calbayog+City",
  },
  {
    id: 4,
    name: "Kuya Rey's Motorcycle Rental",
    type: "Rentals",
    image: tourService,
    rating: 4.6,
    reviews: 67,
    location: "Catbalogan City",
    price: "From ₱500/day",
    description: "Reliable motorcycle rentals for exploring Western Samar at your own pace. Well-maintained bikes and helmets included.",
    phone: "+63 917 456 7890",
    googleMapsUrl: "https://www.google.com/maps?q=Kuya+Rey%27s+Motorcycle+Rental+Catbalogan+City",
  },
  {
    id: 5,
    name: "Seaside Grill & Restaurant",
    type: "Restaurants",
    image: resort,
    rating: 4.8,
    reviews: 192,
    location: "Calbayog City",
    price: "₱200-500 per person",
    description: "Fresh seafood and traditional Filipino cuisine with stunning ocean views. Try our famous grilled blue marlin!",
    phone: "+63 917 567 8901",
    verified: true,
    googleMapsUrl: "https://www.google.com/maps?q=Seaside+Grill+%26+Restaurant+Calbayog+City",
  },
  {
    id: 6,
    name: "Sohoton Cave Tours",
    type: "Tours",
    image: tourService,
    rating: 4.9,
    reviews: 234,
    location: "Basey, Samar",
    price: "From ₱2,000",
    description: "Official guided tours to Sohoton Natural Bridge National Park. Experience caves, natural pools, and unique wildlife.",
    phone: "+63 917 678 9012",
    website: "sohotontours.ph",
    verified: true,
    googleMapsUrl: "https://www.google.com/maps?q=Sohoton+Cave+Tours+Basey+Samar",
  },
];

const Businesses = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBusinesses = businesses.filter((biz) => {
    const matchesType = selectedType === "All" || biz.type === selectedType;
    const matchesSearch = biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biz.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-up">
            Local Businesses
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-up delay-100">
            Connect with trusted local entrepreneurs offering tours, accommodations, and rentals
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur-md z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search businesses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              {businessTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === type
                      ? "bg-ocean text-cream"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Businesses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map((business, index) => (
              <div
                key={business.id}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 group animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={business.image}
                    alt={business.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-ocean text-cream text-xs font-medium">
                      {business.type}
                    </span>
                    {business.verified && (
                      <span className="px-3 py-1 rounded-full bg-green-500 text-cream text-xs font-medium">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-sunset text-sunset" />
                    <span className="font-medium text-foreground">{business.rating}</span>
                    <span className="text-muted-foreground text-sm">({business.reviews} reviews)</span>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-ocean transition-colors">
                    {business.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    {business.location}
                  </div>
                  <div className="mb-3">
                    <a
                      href={business.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-ocean transition-colors underline underline-offset-2"
                    >
                      View on Google Maps
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {business.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span className="truncate">{business.phone}</span>
                    </div>
                    {business.website && (
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span className="truncate">{business.website}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="font-semibold text-ocean">{business.price}</span>
                    <Button variant="ocean" size="sm" asChild>
                      <Link to={`/businesses/${business.id}`}>
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No businesses found matching your search.</p>
              <Button
                variant="ocean"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA for Business Owners */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Own a Local Business?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join our platform and connect with thousands of tourists looking for authentic Western Samar experiences.
          </p>
          <Button variant="sunset" size="lg">
            Register Your Business
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Businesses;
