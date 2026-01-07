import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Maria Santos",
    location: "Manila, Philippines",
    avatar: "MS",
    rating: 5,
    text: "Western Samar exceeded all my expectations! The beaches are pristine, and the locals are incredibly welcoming. Already planning my next trip!",
  },
  {
    id: 2,
    name: "John Anderson",
    location: "Sydney, Australia",
    avatar: "JA",
    rating: 5,
    text: "The island hopping tour was the highlight of our trip. Crystal clear waters, amazing marine life, and our guide knew all the best spots.",
  },
  {
    id: 3,
    name: "Kim Lee",
    location: "Seoul, South Korea",
    avatar: "KL",
    rating: 5,
    text: "Sohoton Natural Bridge is absolutely magical! The cave system and underground river were breathtaking. A must-visit destination.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-ocean font-medium text-sm uppercase tracking-wider">
            Traveler Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
            What Visitors Say
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-up relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-ocean/20 absolute top-6 right-6" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-sunset text-sunset" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean to-ocean-light flex items-center justify-center text-cream font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-muted-foreground text-sm">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
