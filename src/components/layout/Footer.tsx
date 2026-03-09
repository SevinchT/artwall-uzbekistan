import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";
import { useTranslation } from "@/stores/i18nStore";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              {t("footer.newsletter.title")}
            </h3>
            <p className="text-background/60 mb-8 font-body">
              {t("footer.newsletter.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/40 focus:border-primary"
              />
              <Button variant="gold" className="shrink-0">
                <Send className="h-4 w-4 mr-2" />
                {t("footer.newsletter.button")}
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
            <p className="text-background/50 mt-4 text-sm leading-relaxed font-body">
              {t("footer.brand.desc")}
            </p>
            <div className="flex gap-4 mt-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="text-background/50 hover:text-primary transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-heading font-semibold mb-4">{t("footer.explore")}</h4>
            <ul className="space-y-3">
              {[
                { label: t("nav.gallery"), href: "/gallery" },
                { label: t("nav.artists"), href: "/artists" },
                { label: t("categories.title"), href: "/gallery" },
                { label: t("nav.tryOnWall"), href: "/try-on-wall" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-background/50 hover:text-primary transition-colors text-sm font-body">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Artists */}
          <div>
            <h4 className="font-heading font-semibold mb-4">{t("footer.forArtists")}</h4>
            <ul className="space-y-3">
              {[t("nav.joinArtist")].map((item) => (
                <li key={item}>
                  <Link to="/join-artist" className="text-background/50 hover:text-primary transition-colors text-sm font-body">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold mb-4">{t("footer.support")}</h4>
            <ul className="space-y-3">
              {["Help Center", "FAQ"].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-background/50 hover:text-primary transition-colors text-sm font-body">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/40 text-sm font-body">
            {t("footer.copyright")}
          </p>
          <div className="flex gap-6 text-sm font-body">
            <Link to="#" className="text-background/40 hover:text-background transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link to="#" className="text-background/40 hover:text-background transition-colors">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
