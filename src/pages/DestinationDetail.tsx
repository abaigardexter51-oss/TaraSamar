import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, Star, ArrowRight, ArrowLeft, Calendar, Users, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import beachCove from "@/assets/beach-cove.jpg";
import waterfall from "@/assets/waterfall.jpg";
import caveLagoon from "@/assets/cave-lagoon.jpg";
import heroBeach from "@/assets/hero-beach.jpg";
import tourService from "@/assets/tour-service.jpg";
import resort from "@/assets/resort.jpg";
import biriImage from "@/assets/Resorts Images/Biri.jpg";
import bangonImage from "@/assets/Resorts Images/Bangon.webp";
import sohotonImage from "@/assets/Resorts Images/Sohoton.JPG";
import zipLineImage from "@/assets/Resorts Images/zip line.jpg";

const destinations = [
  {
    id: "1",
    name: "Biri Island Rock Formations",
    location: "Biri, Samar",
    category: "Islands",
    description: "Marvel at nature's masterpiece with unique limestone formations shaped by wind and waves over thousands of years. Biri Island is home to some of the most spectacular rock formations in the Philippines, each with its own unique shape and local legend.",
    longDescription: "The Biri Rock Formations are a collection of stunning geological wonders located on the northern tip of Biri Island. These magnificent limestone formations have been sculpted by the relentless pounding of waves and wind over millions of years, creating otherworldly shapes that seem to defy gravity. Each formation has been given a name by locals based on its appearance - from Magasang Rock that resembles a giant mushroom to Caranas Rock with its dramatic overhangs.",
    images: [biriImage, bangonImage, sohotonImage, zipLineImage],
    duration: "Full day recommended",
    bestTime: "November to May (dry season)",
    activities: ["Rock climbing", "Photography", "Swimming", "Camping", "Sunset viewing"],
    tips: ["Wear comfortable shoes for rock climbing", "Bring sun protection", "Best visited during low tide", "Hire a local guide for safety"],
    coordinates: { lat: 12.6833, lng: 124.3833 },
    googleMapsUrl: "https://www.google.com/maps?q=12.6833,124.3833",
  },
  {
    id: "2",
    name: "Bangon Falls",
    location: "Calbayog City",
    category: "Waterfalls",
    description: "A majestic multi-tiered waterfall hidden in the heart of the jungle, perfect for adventure seekers.",
    longDescription: "Bangon Falls is one of the most impressive waterfalls in Western Samar, featuring multiple cascading tiers that plunge into crystal-clear natural pools. The journey to the falls takes you through lush tropical rainforest, crossing streams and navigating jungle trails. The main falls drops approximately 40 meters into a deep pool perfect for swimming. The surrounding area is rich in biodiversity, home to various bird species and endemic flora.",
    images: [bangonImage, biriImage, sohotonImage, zipLineImage],
    duration: "Half day (3-4 hours)",
    bestTime: "Year-round, best after light rain",
    activities: ["Swimming", "Trekking", "Bird watching", "Picnicking", "Photography"],
    tips: ["Wear water shoes", "Bring insect repellent", "Start early to avoid crowds", "Pack lunch and water"],
    coordinates: { lat: 12.0667, lng: 124.6000 },
    googleMapsUrl: "https://www.google.com/maps?q=12.0667,124.6000",
  },
  {
    id: "3",
    name: "Sohoton Natural Bridge",
    location: "Basey, Samar",
    category: "Caves",
    description: "Explore mystical caves and swim in crystal-clear underground rivers in this natural wonder.",
    longDescription: "Sohoton Natural Bridge National Park is a protected area featuring a stunning natural stone bridge, underground rivers, and an intricate cave system. The park is accessible only by boat, adding to its mystique. Inside, you'll discover cathedral-like cave chambers adorned with stalactites and stalagmites, crystal-clear lagoons, and the famous natural bridge that spans 50 meters. The park is also home to the endangered golden-crowned flying fox and various species of swiftlets.",
    images: [sohotonImage, biriImage, bangonImage, zipLineImage],
    duration: "Full day (6-8 hours)",
    bestTime: "March to June (dry season)",
    activities: ["Cave exploration", "Kayaking", "Swimming", "Wildlife spotting", "Cliff diving"],
    tips: ["Book a licensed tour operator", "Wear life jacket at all times", "Waterproof your belongings", "Respect the protected area rules"],
    coordinates: { lat: 11.2833, lng: 125.0667 },
    googleMapsUrl: "https://www.google.com/maps?q=11.2833,125.0667",
  },
  {
    id: "4",
    name: "Lobo Beach",
    location: "Calbayog City",
    category: "Beaches",
    description: "A pristine white sand beach with crystal clear waters, perfect for swimming and snorkeling.",
    longDescription: "Lobo Beach is a hidden gem tucked away in Calbayog City, offering pristine white sand and crystal-clear turquoise waters. Unlike more commercialized beaches, Lobo maintains its natural beauty with minimal development. The gentle waves make it perfect for swimming, while the nearby coral reefs provide excellent snorkeling opportunities. Local fishermen can take you on boat rides to nearby sandbars and smaller islands.",
    images: [heroBeach, beachCove, waterfall, caveLagoon],
    duration: "Half day to full day",
    bestTime: "March to May",
    activities: ["Swimming", "Snorkeling", "Beach volleyball", "Island hopping", "Sunset viewing"],
    tips: ["Bring your own snorkeling gear", "Arrive early for the best spot", "Try the fresh seafood from local vendors", "Respect the beach - no littering"],
    coordinates: { lat: 12.0500, lng: 124.5833 },
    googleMapsUrl: "https://www.google.com/maps?q=12.0500,124.5833",
  },
  {
    id: "5",
    name: "Torpedo Falls",
    location: "San Jorge, Samar",
    category: "Waterfalls",
    description: "Named for its torpedo-like shape, this powerful waterfall is surrounded by lush vegetation.",
    longDescription: "Torpedo Falls gets its name from the unique torpedo-like shape of its main cascade. This powerful waterfall is located in the municipality of San Jorge, surrounded by pristine tropical forest. The falls drop into a deep natural pool where visitors can swim in the refreshing mountain water. The trek to the falls is an adventure itself, passing through bamboo groves and crossing several streams.",
    images: [waterfall, caveLagoon, beachCove, heroBeach],
    duration: "Half day (4-5 hours)",
    bestTime: "All year, spectacular after rain",
    activities: ["Swimming", "Cliff jumping", "Trekking", "Photography", "Picnicking"],
    tips: ["Hire a local guide", "Bring waterproof bags", "Wear sturdy footwear", "Check water levels before jumping"],
    coordinates: { lat: 11.9833, lng: 124.8167 },
    googleMapsUrl: "https://www.google.com/maps?q=11.9833,124.8167",
  },
  {
    id: "6",
    name: "Calbayog Zip Line",
    location: "Calbayog City",
    category: "Historical",
    description: "Experience breathtaking views while zipping across the Calbayog river valley.",
    longDescription: "The Calbayog Zip Line offers an exhilarating way to experience the stunning landscapes of Western Samar. Spanning over 500 meters across the river valley, riders get a bird's eye view of the lush tropical forest, winding river, and distant mountains. The zip line is operated by trained professionals with top-quality safety equipment. It's a perfect activity for thrill-seekers looking to add some adventure to their Samar trip.",
    images: [zipLineImage, biriImage, bangonImage, sohotonImage],
    duration: "1-2 hours",
    bestTime: "Morning or late afternoon",
    activities: ["Zip lining", "Photography", "Nature viewing", "Picnicking"],
    tips: ["Wear comfortable clothing", "Secure all belongings", "Don't forget your camera", "Book in advance during peak season"],
    coordinates: { lat: 12.0667, lng: 124.6000 },
    googleMapsUrl: "https://www.google.com/maps?q=12.0667,124.6000",
  },
];

const nearbyBusinesses = [
  {
    id: 1,
    name: "Island Hopping Adventures",
    type: "Tours",
    image: tourService,
    rating: 4.9,
    price: "From ₱1,500",
    phone: "+63 917 123 4567",
  },
  {
    id: 2,
    name: "Samar Beach Resort",
    type: "Accommodation",
    image: resort,
    rating: 4.8,
    price: "From ₱2,500/night",
    phone: "+63 917 234 5678",
  },
];

const DestinationDetail = () => {
  const { id } = useParams();
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Destination Not Found</h1>
          <Button variant="ocean" asChild>
            <Link to="/destinations">Back to Destinations</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Gallery */}
      <section className="pt-20">
        <div className="grid grid-cols-4 gap-2 h-[60vh] min-h-[400px]">
          <div className="col-span-2 row-span-2 relative group overflow-hidden">
            <img
              src={destination.images[0]}
              alt={destination.name}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
          </div>
          {destination.images.slice(1, 5).map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden hidden md:block">
              <img
                src={img}
                alt={`${destination.name} ${idx + 2}`}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1">
              {/* Back Button */}
              <Link
                to="/destinations"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-ocean transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Destinations
              </Link>

              {/* Title */}
              <div className="mb-8">
                <span className="px-3 py-1 rounded-full bg-ocean/10 text-ocean text-sm font-medium">
                  {destination.category}
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-4 mb-2">
                  {destination.name}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-5 h-5" />
                    {destination.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    {destination.duration}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-12">
                <p className="text-foreground leading-relaxed">{destination.longDescription}</p>
              </div>

              {/* Activities */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Things to Do</h2>
                <div className="flex flex-wrap gap-2">
                  {destination.activities.map((activity) => (
                    <span
                      key={activity}
                      className="px-4 py-2 rounded-full bg-secondary text-foreground text-sm"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Travel Tips</h2>
                <ul className="space-y-3">
                  {destination.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-6 h-6 rounded-full bg-ocean/10 text-ocean flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Location */}
              <div className="mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Location</h2>
                <div className="rounded-xl bg-secondary p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-muted-foreground text-sm">
                    <MapPin className="w-5 h-5 text-ocean" />
                    <div>
                      <div className="font-semibold text-foreground">{destination.location}</div>
                      <div className="text-xs text-muted-foreground">
                        Coordinates: {destination.coordinates.lat}°N, {destination.coordinates.lng}°E
                      </div>
                    </div>
                  </div>
                  <div>
                    <a
                      href={destination.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ocean text-cream text-sm font-medium hover:bg-ocean-light transition-colors"
                    >
                      View on Google Maps
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-96">
              {/* Booking Card */}
              <Card className="sticky top-24 mb-8">
                <CardContent className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    Plan Your Visit
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5" />
                      <div>
                        <div className="font-medium text-foreground">Best Time to Visit</div>
                        <div className="text-sm">{destination.bestTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-5 h-5" />
                      <div>
                        <div className="font-medium text-foreground">Duration</div>
                        <div className="text-sm">{destination.duration}</div>
                      </div>
                    </div>
                  </div>

                  <Button variant="sunset" size="lg" className="w-full" asChild>
                    <Link to="/bookings">
                      Book a Tour
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Nearby Businesses */}
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Nearby Services
                </h3>
                <div className="space-y-4">
                  {nearbyBusinesses.map((business) => (
                    <Card key={business.id} className="overflow-hidden">
                      <div className="flex">
                        <img
                          src={business.image}
                          alt={business.name}
                          className="w-24 h-24 object-cover"
                        />
                        <CardContent className="p-4 flex-1">
                          <span className="text-xs text-ocean font-medium">{business.type}</span>
                          <h4 className="font-semibold text-foreground text-sm">{business.name}</h4>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="w-3 h-3 fill-sunset text-sunset" />
                            <span>{business.rating}</span>
                          </div>
                          <div className="text-sm text-ocean font-medium mt-1">{business.price}</div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4" asChild>
                  <Link to="/businesses">
                    View All Businesses
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DestinationDetail;
