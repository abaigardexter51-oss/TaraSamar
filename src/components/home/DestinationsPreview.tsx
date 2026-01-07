import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import beachCove from "@/assets/beach-cove.jpg";
import waterfall from "@/assets/waterfall.jpg";
import caveLagoon from "@/assets/cave-lagoon.jpg";
import biriImage from "@/assets/Resorts Images/Biri.jpg";
import bangonImage from "@/assets/Resorts Images/Bangon.webp";
import sohotonImage from "@/assets/Resorts Images/Sohoton.JPG";

const destinations = [
  {
    id: 1,
    name: "Biri Island Rock Formations",
    location: "Biri, Northern Samar",
    image: biriImage,
    category: "Island",
    description: "Marvel at nature's masterpiece with unique limestone formations shaped by wind and waves.",
  },
  {
    id: 2,
    name: "Bangon Falls",
    location: "Calbayog City",
    image: bangonImage,
    category: "Waterfall",
    description: "A majestic multi-tiered waterfall hidden in the heart of the jungle.",
  },
  {
    id: 3,
    name: "Sohoton Natural Bridge",
    location: "Basey, Samar",
    image: sohotonImage,
    category: "Cave",
    description: "Explore mystical caves and swim in crystal-clear underground rivers.",
  },
];

export function DestinationsPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-ocean font-medium text-sm uppercase tracking-wider">
              Popular Destinations
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
              Discover Hidden Gems
            </h2>
          </div>
          <Button variant="ocean" asChild>
            <Link to="/destinations">
              View All Destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Link
              key={destination.id}
              to={`/destinations/${destination.id}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-card" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-cream/20 backdrop-blur-sm text-cream text-xs font-medium">
                  {destination.category}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                <div className="flex items-center gap-1 text-cream/70 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {destination.location}
                </div>
                <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-coral transition-colors">
                  {destination.name}
                </h3>
                <p className="text-cream/80 text-sm line-clamp-2">
                  {destination.description}
                </p>

                {/* Arrow */}
                <div className="mt-4 flex items-center gap-2 text-coral font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
