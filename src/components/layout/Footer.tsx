import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-card">
      {/* Newsletter Section */}
      <div className="border-b border-card/10">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Stay Connected with Art
            </h3>
            <p className="text-card/70 mb-8">
              Subscribe to receive updates on new artworks, featured artists, and
              exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-card/10 border-card/20 text-card placeholder:text-card/50 focus:border-primary"
              />
              <Button variant="gold" className="shrink-0">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="font-heading text-2xl font-bold">
              Art<span className="text-primary">Wall</span>
            </Link>
            <p className="text-card/60 mt-4 text-sm leading-relaxed">
              Connecting Uzbekistan's finest artists with art lovers worldwide.
              Discover, visualize, and own authentic artworks.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-card/60 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-card/60 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-card/60 hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-card/60 hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              {["Gallery", "Artists", "Categories", "New Arrivals", "Featured"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/gallery"
                      className="text-card/60 hover:text-primary transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* For Artists */}
          <div>
            <h4 className="font-heading font-semibold mb-4">For Artists</h4>
            <ul className="space-y-3">
              {[
                "Join as Artist",
                "Artist Guidelines",
                "Pricing & Fees",
                "Success Stories",
                "Support",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-card/60 hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Shipping Info",
                "Returns & Refunds",
                "Contact Us",
                "FAQ",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-card/60 hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-card/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-card/50 text-sm">
            © 2024 ArtWall Uzbekistan. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="text-card/50 hover:text-card transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-card/50 hover:text-card transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
