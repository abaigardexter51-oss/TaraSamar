import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  explore: [
    { name: "Beaches", path: "/destinations?category=beaches" },
    { name: "Waterfalls", path: "/destinations?category=waterfalls" },
    { name: "Caves", path: "/destinations?category=caves" },
    { name: "Islands", path: "/destinations?category=islands" },
  ],
  services: [
    { name: "Tours", path: "/businesses?type=tours" },
    { name: "Accommodations", path: "/businesses?type=accommodations" },
    { name: "Rentals", path: "/businesses?type=rentals" },
    { name: "Rates", path: "/bookings" },
  ],
  support: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQs", path: "/faqs" },
    { name: "Privacy Policy", path: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean to-ocean-light flex items-center justify-center">
                <span className="text-cream font-display font-bold text-lg">TS</span>
              </div>
              <span className="font-display text-xl font-bold">TaraSamar</span>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed">
              Discover the hidden paradise of Western Samar. Experience pristine beaches,
              majestic waterfalls, and the warmth of Filipino hospitality.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-ocean transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-ocean transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-ocean transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream/70 text-sm hover:text-coral transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream/70 text-sm hover:text-coral transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-cream/70 text-sm">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Catbalogan City, Western Samar, Philippines 6700</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70 text-sm">
                <Phone className="w-5 h-5" />
                <span>+63 917 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70 text-sm">
                <Mail className="w-5 h-5" />
                <span>hello@tarasamar.ph</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <p className="text-cream/50 text-sm text-center">
              © 2024 TaraSamar. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-cream/50 text-sm hover:text-cream transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-cream/50 text-sm hover:text-cream transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
          <p className="text-cream/40 text-xs text-center italic">
            This website is for booking requests only. Payments and confirmations are handled directly by the resort.
          </p>
        </div>
      </div>
    </footer>
  );
}
