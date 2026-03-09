import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { artworks } from "@/data/mockData";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/stores/i18nStore";

const Liked = () => {
  const { favoriteIds } = useFavoritesStore();
  const likedArtworks = artworks.filter((a) => favoriteIds.includes(a.id));
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
              <Heart className="h-8 w-8 text-destructive fill-current" />
              {t("liked.title")}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t("liked.count", { count: likedArtworks.length })}
            </p>
          </div>

          {likedArtworks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {likedArtworks.map((art) => (
                <ArtworkCard key={art.id} artwork={art} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
                {t("liked.empty")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t("liked.emptyDesc")}
              </p>
              <Button variant="gold" asChild>
                <Link to="/gallery">{t("liked.browse")}</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Liked;