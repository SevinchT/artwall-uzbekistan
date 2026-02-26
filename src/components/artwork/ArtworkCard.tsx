import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Artwork, formatPrice } from "@/data/mockData";
import { useState } from "react";
import { useFavoritesStore } from "@/stores/favoritesStore";

interface ArtworkCardProps {
  artwork: Artwork;
  className?: string;
}

export function ArtworkCard({ artwork, className }: ArtworkCardProps) {
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const isLiked = favoriteIds.includes(artwork.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative bg-card rounded-xl overflow-hidden shadow-soft transition-all duration-500",
        "hover:shadow-elevated hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link to={`/artwork/${artwork.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <img
          src={artwork.images[0]}
          alt={artwork.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered && "scale-110"
          )}
        />
        
        {/* Overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-foreground/40 flex items-center justify-center transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button variant="gold" size="sm" className="animate-scale-in">
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        </div>
      </Link>

      {/* Like Button */}
      <button
        onClick={() => toggleFavorite(artwork.id)}
        className={cn(
          "absolute top-4 right-4 p-2 rounded-full transition-all duration-300",
          isLiked
            ? "bg-destructive text-destructive-foreground"
            : "bg-card/90 text-foreground hover:bg-card"
        )}
      >
        <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
      </button>

      {/* Info */}
      <div className="p-5">
        <Link to={`/artwork/${artwork.id}`}>
          <h3 className="font-heading font-semibold text-foreground truncate hover:text-primary transition-colors">
            {artwork.title}
          </h3>
        </Link>
        <Link
          to={`/artist/${artwork.artist.id}`}
          className="text-sm text-muted-foreground hover:text-primary transition-colors mt-1 block"
        >
          {artwork.artist.name}
        </Link>
        <div className="flex items-center justify-between mt-4">
          <p className="font-heading font-bold text-primary text-lg">
            {formatPrice(artwork.price)} <span className="text-xs font-normal text-muted-foreground">UZS</span>
          </p>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <Heart className="h-3 w-3" />
            <span>{artwork.favorites}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
