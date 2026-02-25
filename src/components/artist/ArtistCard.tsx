import { Link } from "react-router-dom";
import { BadgeCheck, MapPin, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { Artist } from "@/data/mockData";

interface ArtistCardProps {
  artist: Artist;
  className?: string;
}

// Deterministic cover gradient per artist
const coverGradients = [
  "from-primary/30 to-accent/10",
  "from-primary/20 to-primary/5",
  "from-muted to-primary/10",
  "from-accent/10 to-muted",
];

export function ArtistCard({ artist, className }: ArtistCardProps) {
  const gradientIndex = parseInt(artist.id, 10) % coverGradients.length;

  return (
    <Link
      to={`/artist/${artist.id}`}
      className={cn(
        "group block bg-card rounded-xl overflow-hidden shadow-soft transition-all duration-300",
        "hover:shadow-card hover:-translate-y-1",
        className
      )}
    >
      {/* Cover band */}
      <div
        className={cn(
          "h-24 bg-gradient-to-br",
          coverGradients[gradientIndex]
        )}
      />

      {/* Avatar – overlaps cover by half */}
      <div className="relative flex justify-center -mt-10">
        <div className="relative">
          <img
            src={artist.avatar}
            alt={artist.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-card group-hover:ring-primary/20 transition-all duration-300"
          />
          {artist.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5">
              <BadgeCheck className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="text-center px-5 pt-3 pb-5">
        <h3 className="font-heading font-semibold text-base text-foreground leading-tight group-hover:text-primary transition-colors">
          {artist.name}
        </h3>

        <div className="flex items-center justify-center gap-1 mt-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span>{artist.location}</span>
        </div>

        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
          {artist.bio}
        </p>

        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
          <span>
            <strong className="text-foreground">{artist.artworksCount}</strong> works
          </span>
          <span className="w-px h-3 bg-border" />
          <span>
            <strong className="text-foreground">{artist.followersCount}</strong> followers
          </span>
        </div>
      </div>
    </Link>
  );
}
