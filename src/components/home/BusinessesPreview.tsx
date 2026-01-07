import { ArrowRight, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import tourService from "@/assets/tour-service.jpg";
import resort from "@/assets/resort.jpg";

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
    description: "Experience the best island hopping tours with local expert guides.",
  },
  {
    id: 2,
    name: "Samar Beach Resort",
    type: "Accommodation",
    image: resort,
    rating: 4.8,
    reviews: 256,
    location: "Calbayog City",
    price: "From ₱2,500/night",
    description: "Beachfront resort with traditional Filipino hospitality.",
  },
];

export function BusinessesPreview() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-ocean font-medium text-sm uppercase tracking-wider">
            Support Local
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Connect with Local Businesses
          </h2>
          <p className="text-muted-foreground">
            Discover tours, accommodations, and rental services
            offered by the warm people of Western Samar.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {businesses.map((business, index) => (
            <div
              key={business.id}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-ocean text-cream text-xs font-medium">
                    {business.type}
                  </span>
                </div>
              </div>

              {/* Content */}
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
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {business.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="font-semibold text-ocean">{business.price}</span>
                  <Button variant="ghost" size="sm" className="text-ocean" asChild>
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

        {/* CTA */}
        <div className="text-center">
          <Button variant="ocean" size="lg" asChild>
            <Link to="/businesses">
              Explore All Businesses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
