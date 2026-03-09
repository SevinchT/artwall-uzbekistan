import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { artworks, formatPrice } from "@/data/mockData";
import { Heart, ShoppingBag, MessageCircle, Share2, ChevronLeft, ChevronRight, Expand, BadgeCheck, MapPin, Ruler, Calendar, Palette, Frame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/stores/i18nStore";

const ArtworkDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const artwork = artworks.find((a) => a.id === id) || artworks[0];
  const [currentImage, setCurrentImage] = useState(0);
  const { favoriteIds, toggleFavorite } = useFavoritesStore();
  const isLiked = favoriteIds.includes(artwork.id);
  const [selectedFrame, setSelectedFrame] = useState("none");
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const frameOptions = [
    { id: "none", name: t("artworkDetail.frameNone"), price: 0 },
    { id: "classic", name: t("artworkDetail.frameClassic"), price: 1500000 },
    { id: "modern", name: t("artworkDetail.frameModern"), price: 2000000 },
    { id: "gold", name: t("artworkDetail.frameGold"), price: 3500000 },
  ];

  const moreFromArtist = artworks.filter((a) => a.artist.id === artwork.artist.id && a.id !== artwork.id).slice(0, 4);
  const similarArtworks = artworks.filter((a) => a.id !== artwork.id && (a.category === artwork.category || a.style === artwork.style)).slice(0, 4);
  const selectedFrameOption = frameOptions.find((f) => f.id === selectedFrame);
  const totalPrice = artwork.price + (selectedFrameOption?.price || 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">{t("artworkDetail.home")}</Link>
            <span>/</span>
            <Link to="/gallery" className="hover:text-primary transition-colors">{t("artworkDetail.gallery")}</Link>
            <span>/</span>
            <span className="text-foreground">{artwork.title}</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted cursor-zoom-in group" onClick={() => setIsImageExpanded(true)}>
                <img src={artwork.images[currentImage]} alt={artwork.title} className="w-full h-full object-cover" />
                <button className="absolute top-4 right-4 p-3 rounded-full bg-card/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"><Expand className="h-5 w-5" /></button>
                {artwork.images.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentImage((prev) => prev === 0 ? artwork.images.length - 1 : prev - 1); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft className="h-5 w-5" /></button>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentImage((prev) => prev === artwork.images.length - 1 ? 0 : prev + 1); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-card/90 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="h-5 w-5" /></button>
                  </>
                )}
              </div>
              {artwork.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {artwork.images.map((image, index) => (
                    <button key={index} onClick={() => setCurrentImage(index)} className={cn("w-20 h-20 rounded-lg overflow-hidden border-2 transition-all", index === currentImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-100")}>
                      <img src={image} alt={`${artwork.title} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="space-y-6">
                <div>
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{artwork.title}</h1>
                  <Link to={`/artist/${artwork.artist.id}`} className="flex items-center gap-3 mt-4 group">
                    <img src={artwork.artist.avatar} alt={artwork.artist.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">{artwork.artist.name}</span>
                        {artwork.artist.isVerified && <BadgeCheck className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3 w-3" />{artwork.artist.location}, Uzbekistan</div>
                    </div>
                  </Link>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <p className="text-sm text-muted-foreground mb-1">{t("artworkDetail.price")}</p>
                  <p className="font-heading text-3xl font-bold text-primary">{formatPrice(totalPrice)} <span className="text-lg font-normal text-muted-foreground">UZS</span></p>
                  {selectedFrame !== "none" && <p className="text-sm text-muted-foreground mt-1">{t("artworkDetail.includes", { frame: selectedFrameOption?.name || "", price: formatPrice(selectedFrameOption?.price || 0) })}</p>}
                </div>
                <div className="flex gap-3">
                  <Button variant="gold" size="lg" className="flex-1"><ShoppingBag className="h-5 w-5 mr-2" />{t("artworkDetail.addToCart")}</Button>
                  <Button variant="outline" size="lg" onClick={() => toggleFavorite(artwork.id)} className={cn(isLiked && "text-destructive border-destructive")}><Heart className={cn("h-5 w-5", isLiked && "fill-current")} /></Button>
                  <Button variant="outline" size="lg"><Share2 className="h-5 w-5" /></Button>
                </div>
                <Button variant="subtle" size="lg" className="w-full"><MessageCircle className="h-5 w-5 mr-2" />{t("artworkDetail.messageArtist")}</Button>
                <div className="bg-card rounded-xl p-6 shadow-soft space-y-4">
                  <h3 className="font-heading font-semibold text-foreground">{t("artworkDetail.details")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Ruler, label: t("artworkDetail.dimensions"), value: `${artwork.width} × ${artwork.height} cm` },
                      { icon: Palette, label: t("artworkDetail.medium"), value: artwork.medium },
                      { icon: Calendar, label: t("artworkDetail.year"), value: String(artwork.year) },
                      { icon: Frame, label: t("artworkDetail.edition"), value: artwork.isOriginal ? t("artworkDetail.original") : t("artworkDetail.limitedEdition") },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"><item.icon className="h-5 w-5 text-muted-foreground" /></div>
                        <div><p className="text-xs text-muted-foreground">{item.label}</p><p className="text-sm font-medium">{item.value}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h3 className="font-heading font-semibold text-foreground mb-4">{t("artworkDetail.framingOptions")}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {frameOptions.map((frame) => (
                      <button key={frame.id} onClick={() => setSelectedFrame(frame.id)} className={cn("p-4 rounded-lg border-2 text-left transition-all", selectedFrame === frame.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")}>
                        <p className="font-medium text-sm">{frame.name}</p>
                        <p className="text-xs text-muted-foreground">{frame.price > 0 ? `+${formatPrice(frame.price)} UZS` : t("artworkDetail.included")}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-soft">
                  <h3 className="font-heading font-semibold text-foreground mb-3">{t("artworkDetail.description")}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{artwork.description}</p>
                </div>
              </div>
            </div>
          </div>
          {moreFromArtist.length > 0 && (
            <section className="mt-20">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-foreground">{t("artworkDetail.moreFrom", { artist: artwork.artist.name })}</h2>
                  <p className="text-muted-foreground mt-1">{t("artworkDetail.exploreMore")}</p>
                </div>
                <Button variant="outline" asChild><Link to={`/artist/${artwork.artist.id}`}>{t("artworkDetail.viewProfile")}</Link></Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{moreFromArtist.map((art) => (<ArtworkCard key={art.id} artwork={art} />))}</div>
            </section>
          )}
          {similarArtworks.length > 0 && (
            <section className="mt-20">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-8">{t("artworkDetail.similar")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">{similarArtworks.map((art) => (<ArtworkCard key={art.id} artwork={art} />))}</div>
            </section>
          )}
        </div>
      </main>
      {isImageExpanded && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4" onClick={() => setIsImageExpanded(false)}>
          <button className="absolute top-6 right-6 p-3 rounded-full bg-card/10 text-card hover:bg-card/20 transition-colors" onClick={() => setIsImageExpanded(false)}><span className="sr-only">{t("artworkDetail.close")}</span>✕</button>
          <img src={artwork.images[currentImage]} alt={artwork.title} className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ArtworkDetail;