import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, Heart, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/artists", label: "Artists" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isHome = location.pathname === "/";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHome
          ? "bg-transparent"
          : "bg-card/95 backdrop-blur-md border-b border-border/50"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "font-heading text-2xl font-bold tracking-tight transition-colors",
              isHome ? "text-card" : "text-foreground"
            )}
          >
            Art<span className="text-primary">Wall</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === link.href
                    ? "text-primary"
                    : isHome
                    ? "text-card/80"
                    : "text-foreground/70"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hidden sm:flex",
                isHome ? "text-card hover:bg-card/10" : "text-foreground"
              )}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hidden sm:flex",
                isHome ? "text-card hover:bg-card/10" : "text-foreground"
              )}
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                isHome ? "text-card hover:bg-card/10" : "text-foreground"
              )}
            >
              <ShoppingBag className="h-5 w-5" />
            </Button>
            <Button
              variant={isHome ? "heroOutline" : "outline"}
              size="sm"
              className={cn(
                "hidden sm:flex ml-2",
                isHome && "border-card/60 text-card hover:bg-card/10"
              )}
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "md:hidden",
                    isHome ? "text-card hover:bg-card/10" : "text-foreground"
                  )}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        location.pathname === link.href
                          ? "text-primary"
                          : "text-foreground/70"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-border pt-6 mt-4">
                    <Button variant="gold" className="w-full">
                      Sign In
                    </Button>
                    <Button variant="outline" className="w-full mt-3">
                      Join as Artist
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
