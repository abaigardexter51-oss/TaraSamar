import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Filter, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import beachCove from "@/assets/beach-cove.jpg";
import waterfall from "@/assets/waterfall.jpg";
import caveLagoon from "@/assets/cave-lagoon.jpg";
import heroBeach from "@/assets/hero-beach.jpg";
import biriImage from "@/assets/Resorts Images/Biri.jpg";
import bangonImage from "@/assets/Resorts Images/Bangon.webp";
import sohotonImage from "@/assets/Resorts Images/Sohoton.JPG";
import zipLineImage from "@/assets/Resorts Images/zip line.jpg";

const categories = ["All", "Beaches", "Waterfalls", "Caves", "Islands", "Historical"];

const destinations = [
  {
    id: 1,
    name: "Biri Island Rock Formations",
    location: "Biri, Samar",
    image: biriImage,
    category: "Islands",
    description: "Marvel at nature's masterpiece with unique limestone formations shaped by wind and waves over thousands of years.",
    featured: true,
    googleMapsUrl: "https://www.google.com/maps?q=12.6833,124.3833",
  },
  {
    id: 2,
    name: "Bangon Falls",
    location: "Calbayog City",
    image: bangonImage,
    category: "Waterfalls",
    description: "A majestic multi-tiered waterfall hidden in the heart of the jungle, perfect for adventure seekers.",
    googleMapsUrl: "https://www.google.com/maps?q=12.0667,124.6000",
  },
  {
    id: 3,
    name: "Sohoton Natural Bridge",
    location: "Basey, Samar",
    image: sohotonImage,
    category: "Caves",
    description: "Explore mystical caves and swim in crystal-clear underground rivers in this natural wonder.",
    featured: true,
    googleMapsUrl: "https://www.google.com/maps?q=11.2833,125.0667",
  },
  {
    id: 4,
    name: "Lobo Beach",
    location: "Calbayog City",
    image: heroBeach,
    category: "Beaches",
    description: "A pristine white sand beach with crystal clear waters, perfect for swimming and snorkeling.",
    googleMapsUrl: "https://www.google.com/maps?q=12.0500,124.5833",
  },
  {
    id: 5,
    name: "Torpedo Falls",
    location: "San Jorge, Samar",
    image: waterfall,
    category: "Waterfalls",
    description: "Named for its torpedo-like shape, this powerful waterfall is surrounded by lush vegetation.",
    googleMapsUrl: "https://www.google.com/maps?q=11.9833,124.8167",
  },
  {
    id: 6,
    name: "Calbayog Zip Line",
    location: "Calbayog City",
    image: zipLineImage,
    category: "Historical",
    description: "Experience breathtaking views while zipping across the Calbayog river valley.",
    googleMapsUrl: "https://www.google.com/maps?q=12.0667,124.6000",
  },
];

const Destinations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroBeach} alt="Destinations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy/60" />
        </div>
        <div className="relative z-10 text-center text-cream container mx-auto px-4">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 animate-fade-up">
            Explore Destinations
          </h1>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto animate-fade-up delay-100">
            Discover the breathtaking beaches, majestic waterfalls, and hidden gems of Western Samar
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur-md z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-ocean text-cream"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.id}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-card" />
                
                {destination.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-coral text-cream text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-cream/20 backdrop-blur-sm text-cream text-xs font-medium">
                    {destination.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                  <div className="flex items-center gap-1 text-cream/70 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {destination.location}
                  </div>
                <div className="mb-3">
                  <a
                    href={destination.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium text-cream/80 hover:text-cream transition-colors underline underline-offset-2"
                  >
                    View on Google Maps
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
                  <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-coral transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-cream/80 text-sm line-clamp-2">
                    {destination.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-coral font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No destinations found matching your search.</p>
              <Button
                variant="ocean"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Destinations;
