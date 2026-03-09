import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, Heart, ShoppingBag, User, Sun, Moon, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/stores/i18nStore";
import { useI18nStore, type Locale } from "@/stores/i18nStore";

const navLinkKeys = [
  { href: "/", key: "nav.home" },
  { href: "/gallery", key: "nav.gallery" },
  { href: "/artists", key: "nav.artists" },
  { href: "/try-on-wall", key: "nav.tryOnWall" },
];

const localeLabels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  uz: "UZ",
};

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isHome = location.pathname === "/";
  const { theme, setTheme } = useTheme();
  const { t, locale } = useTranslation();
  const setLocale = useI18nStore((s) => s.setLocale);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isHome
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-md border-b border-border/50"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className={cn(
              "font-heading text-2xl font-bold tracking-tight transition-colors",
              isHome ? "text-white" : "text-foreground"
            )}
          >
            Art<span className="text-primary">Wall</span> <span className="hidden sm:inline text-xs font-body font-normal tracking-[0.15em] opacity-60 ml-1">O'zbekiston</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinkKeys.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "relative text-sm font-body font-medium tracking-wide transition-colors hover:text-primary pb-1",
                  location.pathname === link.href
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                    : isHome
                    ? "text-white/70"
                    : "text-foreground/60"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9",
                    isHome ? "text-white/70 hover:bg-white/10" : "text-foreground/60"
                  )}
                >
                  <Globe className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[100px]">
                {(["en", "ru", "uz"] as Locale[]).map((loc) => (
                  <DropdownMenuItem
                    key={loc}
                    onClick={() => setLocale(loc)}
                    className={cn(
                      "cursor-pointer text-sm",
                      locale === loc && "font-semibold text-primary"
                    )}
                  >
                    {localeLabels[loc]}
                    {loc === "en" && " — English"}
                    {loc === "ru" && " — Русский"}
                    {loc === "uz" && " — O'zbek"}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={cn(
                "h-9 w-9",
                isHome ? "text-white/70 hover:bg-white/10" : "text-foreground/60"
              )}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "hidden sm:flex h-9 w-9",
                isHome ? "text-white/70 hover:bg-white/10" : "text-foreground/60"
              )}
            >
              <Heart className="h-4 w-4" />
            </Button>

            <Button
              variant={isHome ? "heroOutline" : "outline"}
              size="sm"
              className={cn(
                "hidden sm:flex ml-1 h-9 text-xs",
                isHome && "border-white/40 text-white hover:bg-white/10"
              )}
            >
              <User className="h-3.5 w-3.5 mr-1.5" />
              {t("nav.signIn")}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "md:hidden h-9 w-9",
                    isHome ? "text-white/70 hover:bg-white/10" : "text-foreground/60"
                  )}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinkKeys.map((link) => (
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
                      {t(link.key)}
                    </Link>
                  ))}

                  {/* Mobile language switcher */}
                  <div className="flex gap-2 mt-2">
                    {(["en", "ru", "uz"] as Locale[]).map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setLocale(loc)}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-sm font-medium border transition-colors",
                          locale === loc
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {localeLabels[loc]}
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-border pt-6 mt-2">
                    <Button variant="gold" className="w-full">
                      {t("nav.signIn")}
                    </Button>
                    <Button variant="outline" className="w-full mt-3">
                      {t("nav.joinArtist")}
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
