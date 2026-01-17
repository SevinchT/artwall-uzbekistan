import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { artworks, formatPrice } from "@/data/mockData";
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  Expand,
  BadgeCheck,
  MapPin,
  Ruler,
  Calendar,
  Palette,
  Frame,
} from "lucide-react";
import { cn } from "@/lib/utils";

const frameOptions = [
  { id: "none", name: "No Frame", price: 0 },
  { id: "classic", name: "Classic Wood", price: 1500000 },
  { id: "modern", name: "Modern Black", price: 2000000 },
  { id: "gold", name: "Gold Ornate", price: 3500000 },
];

const ArtworkDetail = () => {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.id === id) || artworks[0];
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState("none");
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const moreFromArtist = artworks
    .filter((a) => a.artist.id === artwork.artist.id && a.id !== artwork.id)
    .slice(0, 4);

  const similarArtworks = artworks
    .filter(
      (a) =>
        a.id !== artwork.id &&
        (a.category === artwork.category || a.style === artwork.style)
    )
    .slice(0, 4);

  const selectedFrameOption = frameOptions.find((f) => f.id === selectedFrame);
  const totalPrice = artwork.price + (selectedFrameOption?.price || 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/gallery" className="hover:text-primary transition-colors">
              Gallery
            </Link>
            <span>/</span>
            <span className="text-foreground">{artwork.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted cursor-zoom-in group"
                onClick={() => setIsImageExpanded(true)}
              >
                <img
                  src={artwork.images[currentImage]}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-4 right-4 p-3 rounded-full bg-card/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <Expand className="h-5 w-5" />
                </button>

                {artwork.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImage((prev) =>
                          prev === 0 ? artwork.images.length - 1 : prev - 1
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImage((prev) =>
                          prev === artwork.images.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {artwork.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {artwork.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={cn(
                        "w-20 h-20 rounded-lg overflow-hidden border-2 transition-all",
                        index === currentImage
                          ? "border-primary"
                          : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <img
                        src={image}
                        alt={`${artwork.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Panel */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="space-y-6">
                {/* Title & Artist */}
                <div>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                    {artwork.title}
                  </h1>
                  <Link
                    to={`/artist/${artwork.artist.id}`}
                    className="flex items-center gap-3 mt-4 group"
                  >
                    <img
                      src={artwork.artist.avatar}
                      alt={artwork.artist.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {artwork.artist.name}
                        </span>
                        {artwork.artist.isVerified && (
                          <BadgeCheck className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {artwork.artist.location}, Uzbekistan
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Price */}
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="font-heading text-3xl font-bold text-primary">
                    {formatPrice(totalPrice)}{" "}
                    <span className="text-lg font-normal text-muted-foreground">
                      UZS
                    </span>
                  </p>
                  {selectedFrame !== "none" && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Includes {selectedFrameOption?.name} (+
                      {formatPrice(selectedFrameOption?.price || 0)} UZS)
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="gold" size="lg" className="flex-1">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsLiked(!isLiked)}
                    className={cn(isLiked && "text-destructive border-destructive")}
                  >
                    <Heart
                      className={cn("h-5 w-5", isLiked && "fill-current")}
                    />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <Button variant="subtle" size="lg" className="w-full">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Message Artist
                </Button>

                {/* Artwork Details */}
                <div className="bg-card rounded-xl p-6 shadow-soft space-y-4">
                  <h3 className="font-heading font-semibold text-foreground">
                    Artwork Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Ruler className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Dimensions
                        </p>
                        <p className="text-sm font-medium">
                          {artwork.width} × {artwork.height} cm
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Palette className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Medium</p>
                        <p className="text-sm font-medium">{artwork.medium}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Year</p>
                        <p className="text-sm font-medium">{artwork.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Frame className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Edition</p>
                        <p className="text-sm font-medium">
                          {artwork.isOriginal ? "Original" : "Limited Edition"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Framing Options */}
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Framing Options
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {frameOptions.map((frame) => (
                      <button
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame.id)}
                        className={cn(
                          "p-4 rounded-lg border-2 text-left transition-all",
                          selectedFrame === frame.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <p className="font-medium text-sm">{frame.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {frame.price > 0
                            ? `+${formatPrice(frame.price)} UZS`
                            : "Included"}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h3 className="font-heading font-semibold text-foreground mb-3">
                    Description
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {artwork.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* More from Artist */}
          {moreFromArtist.length > 0 && (
            <section className="mt-20">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    More from {artwork.artist.name}
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    Explore more works by this artist
                  </p>
                </div>
                <Button variant="outline" asChild>
                  <Link to={`/artist/${artwork.artist.id}`}>View Profile</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {moreFromArtist.map((art) => (
                  <ArtworkCard key={art.id} artwork={art} />
                ))}
              </div>
            </section>
          )}

          {/* Similar Artworks */}
          {similarArtworks.length > 0 && (
            <section className="mt-20">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
                Similar Artworks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarArtworks.map((art) => (
                  <ArtworkCard key={art.id} artwork={art} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {isImageExpanded && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
          onClick={() => setIsImageExpanded(false)}
        >
          <button
            className="absolute top-6 right-6 p-3 rounded-full bg-card/10 text-card hover:bg-card/20 transition-colors"
            onClick={() => setIsImageExpanded(false)}
          >
            <span className="sr-only">Close</span>
            ✕
          </button>
          <img
            src={artwork.images[currentImage]}
            alt={artwork.title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ArtworkDetail;
