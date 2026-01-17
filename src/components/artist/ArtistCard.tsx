import { Link } from "react-router-dom";
import { BadgeCheck, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Artist } from "@/data/mockData";

interface ArtistCardProps {
  artist: Artist;
  className?: string;
}

export function ArtistCard({ artist, className }: ArtistCardProps) {
  return (
    <Link
      to={`/artist/${artist.id}`}
      className={cn(
        "group block bg-card rounded-xl p-6 shadow-soft transition-all duration-300",
        "hover:shadow-card hover:-translate-y-1",
        className
      )}
    >
      {/* Avatar */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <img
          src={artist.avatar}
          alt={artist.name}
          className="w-full h-full rounded-full object-cover ring-4 ring-background group-hover:ring-primary/20 transition-all duration-300"
        />
        {artist.isVerified && (
          <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
            <BadgeCheck className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
          {artist.name}
        </h3>
        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
          <MapPin className="h-3 w-3" />
          <span>{artist.location}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
          {artist.bio}
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm">
          <span className="text-muted-foreground">
            <strong className="text-foreground">{artist.artworksCount}</strong> works
          </span>
          <span className="text-muted-foreground">
            <strong className="text-foreground">{artist.followersCount}</strong> followers
          </span>
        </div>
      </div>
    </Link>
  );
}
