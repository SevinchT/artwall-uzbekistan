import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, Save, ShoppingBag, Maximize, Minimize, Square } from "lucide-react";
import { artworks, formatPrice } from "@/data/mockData";
import { cn } from "@/lib/utils";

import roomModern from "@/assets/room-modern.jpg";
import roomScandinavian from "@/assets/room-scandinavian.jpg";
import roomStudy from "@/assets/room-study.jpg";

const rooms = [
  {
    id: "modern",
    label: "Modern Living",
    image: roomModern,
    // artwork placement zone (percentage-based)
    artworkZone: { top: "12%", left: "30%", maxWidth: "40%", maxHeight: "45%" },
  },
  {
    id: "scandinavian",
    label: "Scandinavian Bedroom",
    image: roomScandinavian,
    artworkZone: { top: "8%", left: "25%", maxWidth: "50%", maxHeight: "45%" },
  },
  {
    id: "study",
    label: "Elegant Study",
    image: roomStudy,
    artworkZone: { top: "8%", left: "22%", maxWidth: "56%", maxHeight: "48%" },
  },
];

const sizeFactors = {
  small: 0.55,
  medium: 0.8,
  large: 1,
} as const;

const wallArtworks = artworks.slice(0, 8);

const TryOnWall = () => {
  const { toast } = useToast();
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artworks[0] | null>(null);
  const [artworkSize, setArtworkSize] = useState<"small" | "medium" | "large">("medium");
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  const handleSelectArtwork = (artwork: typeof artworks[0]) => {
    setSelectedArtwork(artwork);
    setFadeKey((k) => k + 1);
  };

  const handleSaveLook = () => {
    toast({
      title: "Look Saved!",
      description: selectedArtwork
        ? `"${selectedArtwork.title}" in ${selectedRoom.label} has been saved to your collection.`
        : "Room view saved to your collection.",
    });
  };

  const zone = selectedRoom.artworkZone;
  const scale = sizeFactors[artworkSize];

  return (
    <div className="min-h-screen bg-foreground">
      <Navbar />

      <div className="pt-20">
        {/* Header */}
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-card">
            Try on Your <span className="text-primary">Wall</span>
          </h1>
          <p className="text-card/60 mt-2">
            Visualize how artwork looks in your space before you buy
          </p>
        </div>

        {/* Split Layout */}
        <div className="container mx-auto px-4 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-[70vh]">
            {/* Left: Room Panel (3/5) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {/* Room Preview */}
              <div className="relative rounded-2xl overflow-hidden bg-foreground border border-card/10 aspect-square lg:aspect-auto lg:flex-1">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.label}
                  className="w-full h-full object-cover"
                />

                {/* Artwork on Wall */}
                {selectedArtwork && (
                  <div
                    key={fadeKey}
                    className="absolute flex items-center justify-center animate-fade-in"
                    style={{
                      top: zone.top,
                      left: zone.left,
                      maxWidth: zone.maxWidth,
                      maxHeight: zone.maxHeight,
                    }}
                  >
                    <div
                      style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
                      className="transition-transform duration-500 ease-out"
                    >
                      <div className="shadow-[0_8px_40px_rgba(0,0,0,0.45)] border-[6px] border-card/90 rounded-sm">
                        <img
                          src={selectedArtwork.images[0]}
                          alt={selectedArtwork.title}
                          className="block max-w-full max-h-[260px] lg:max-h-[340px] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Instruction overlay */}
                {!selectedArtwork && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-foreground/60 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
                      <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="text-card/80 text-sm font-medium">
                        Click an artwork to preview it here
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Room Switcher */}
                <div className="flex gap-2">
                  {rooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-xs font-medium transition-all border",
                        selectedRoom.id === room.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card/5 text-card/60 border-card/10 hover:border-card/30 hover:text-card"
                      )}
                    >
                      {room.label}
                    </button>
                  ))}
                </div>

                <div className="h-6 w-px bg-card/10 hidden sm:block" />

                {/* Size Controls */}
                <div className="flex gap-1">
                  {([
                    { key: "small", icon: Minimize, label: "S" },
                    { key: "medium", icon: Square, label: "M" },
                    { key: "large", icon: Maximize, label: "L" },
                  ] as const).map(({ key, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setArtworkSize(key)}
                      className={cn(
                        "p-2 rounded-lg transition-all border",
                        artworkSize === key
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card/5 text-card/60 border-card/10 hover:border-card/30"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>

                <div className="flex-1" />

                {/* Action Buttons */}
                <Button
                  variant="gold"
                  size="sm"
                  onClick={handleSaveLook}
                  disabled={!selectedArtwork}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save Look
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/50 text-primary hover:bg-primary/10"
                  onClick={() => setInquiryOpen(true)}
                  disabled={!selectedArtwork}
                >
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  Inquire to Buy
                </Button>
              </div>
            </div>

            {/* Right: Artwork Selection Panel (2/5) */}
            <div className="lg:col-span-2 bg-card/5 border border-card/10 rounded-2xl p-4 overflow-y-auto max-h-[75vh]">
              <h2 className="font-heading text-lg font-semibold text-card mb-4">
                Select Artwork
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {wallArtworks.map((artwork) => (
                  <button
                    key={artwork.id}
                    onClick={() => handleSelectArtwork(artwork)}
                    className={cn(
                      "group text-left rounded-xl overflow-hidden border transition-all duration-300",
                      selectedArtwork?.id === artwork.id
                        ? "border-primary ring-1 ring-primary"
                        : "border-card/10 hover:border-card/30"
                    )}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={artwork.images[0]}
                        alt={artwork.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3 bg-foreground/80">
                      <p className="text-card text-sm font-medium truncate">
                        {artwork.title}
                      </p>
                      <p className="text-card/50 text-xs truncate">
                        {artwork.artist.name}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-primary text-xs font-semibold">
                          {formatPrice(artwork.price)} UZS
                        </p>
                        <span className="text-[10px] text-card/40 uppercase tracking-wider">
                          {artwork.style}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <Dialog open={inquiryOpen} onOpenChange={setInquiryOpen}>
        <DialogContent className="bg-foreground border-card/10 text-card max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-card">
              Inquire About This Artwork
            </DialogTitle>
            <DialogDescription className="text-card/50">
              We'll connect you with the artist directly.
            </DialogDescription>
          </DialogHeader>
          {selectedArtwork && (
            <div className="space-y-4 mt-2">
              <div className="flex gap-3 p-3 rounded-lg bg-card/5 border border-card/10">
                <img
                  src={selectedArtwork.images[0]}
                  alt={selectedArtwork.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="text-card font-medium text-sm">{selectedArtwork.title}</p>
                  <p className="text-card/50 text-xs">{selectedArtwork.artist.name}</p>
                  <p className="text-primary text-sm font-semibold mt-1">
                    {formatPrice(selectedArtwork.price)} UZS
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-card/70 text-xs">Your Name</Label>
                  <Input className="bg-card/5 border-card/10 text-card mt-1" placeholder="Full name" />
                </div>
                <div>
                  <Label className="text-card/70 text-xs">Email</Label>
                  <Input className="bg-card/5 border-card/10 text-card mt-1" placeholder="your@email.com" type="email" />
                </div>
                <div>
                  <Label className="text-card/70 text-xs">Message</Label>
                  <Textarea
                    className="bg-card/5 border-card/10 text-card mt-1"
                    placeholder="I'd love to learn more about this piece..."
                    rows={3}
                  />
                </div>
              </div>
              <Button
                variant="gold"
                className="w-full"
                onClick={() => {
                  setInquiryOpen(false);
                  toast({
                    title: "Inquiry Sent!",
                    description: `Your message about "${selectedArtwork.title}" has been sent to ${selectedArtwork.artist.name}.`,
                  });
                }}
              >
                Send Inquiry
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default TryOnWall;
