import { useState, useRef, useCallback, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Eye, Save, ShoppingBag, Move, Scaling, Frame, GripVertical } from "lucide-react";
import { artworks, formatPrice } from "@/data/mockData";
import { cn } from "@/lib/utils";

import roomModern from "@/assets/room-modern.jpg";
import roomScandinavian from "@/assets/room-scandinavian.jpg";
import roomStudy from "@/assets/room-study.jpg";

const rooms = [
  { id: "modern", label: "Modern Living", image: roomModern },
  { id: "scandinavian", label: "Scandinavian Bedroom", image: roomScandinavian },
  { id: "study", label: "Elegant Study", image: roomStudy },
];

const frames = [
  { id: "none", label: "No Frame", border: "none", shadow: "0 4px 20px rgba(0,0,0,0.3)" },
  { id: "thin-black", label: "Thin Black", border: "3px solid hsl(0,0%,10%)", shadow: "0 6px 30px rgba(0,0,0,0.4)" },
  { id: "thin-white", label: "Thin White", border: "4px solid hsl(0,0%,95%)", shadow: "0 6px 30px rgba(0,0,0,0.35)" },
  { id: "classic-wood", label: "Classic Wood", border: "8px solid hsl(25,40%,35%)", shadow: "0 8px 35px rgba(0,0,0,0.45), inset 0 0 0 2px hsl(25,30%,25%)" },
  { id: "ornate-gold", label: "Ornate Gold", border: "10px solid hsl(36,49%,62%)", shadow: "0 8px 40px rgba(0,0,0,0.45), inset 0 0 0 3px hsl(40,55%,50%)" },
];

const wallArtworks = artworks.slice(0, 8);

const TryOnWall = () => {
  const { toast } = useToast();
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artworks[0] | null>(null);
  const [artworkScale, setArtworkScale] = useState(70);
  const [selectedFrame, setSelectedFrame] = useState(frames[0]);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  // Drag state (percentage-based position)
  const [position, setPosition] = useState({ x: 50, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const roomRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const handleSelectArtwork = (artwork: typeof artworks[0]) => {
    setSelectedArtwork(artwork);
    setFadeKey((k) => k + 1);
    setPosition({ x: 50, y: 35 });
  };

  const handleSaveLook = () => {
    toast({
      title: "Look Saved!",
      description: selectedArtwork
        ? `"${selectedArtwork.title}" in ${selectedRoom.label} has been saved to your collection.`
        : "Room view saved to your collection.",
    });
  };

  // Drag handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, posX: position.x, posY: position.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [position]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !roomRef.current) return;
    const rect = roomRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragStart.current.x) / rect.width) * 100;
    const dy = ((e.clientY - dragStart.current.y) / rect.height) * 100;
    setPosition({
      x: Math.max(5, Math.min(95, dragStart.current.posX + dx)),
      y: Math.max(5, Math.min(85, dragStart.current.posY + dy)),
    });
  }, [isDragging]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const scaleFactor = artworkScale / 100;

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
              <div
                ref={roomRef}
                className="relative rounded-2xl overflow-hidden bg-foreground border border-card/10 aspect-square lg:aspect-auto lg:flex-1 select-none"
              >
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.label}
                  className="w-full h-full object-cover pointer-events-none"
                />

                {/* Artwork on Wall */}
                {selectedArtwork && (
                  <div
                    key={fadeKey}
                    className="absolute animate-fade-in"
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: `translate(-50%, -50%) scale(${scaleFactor})`,
                      cursor: isDragging ? "grabbing" : "grab",
                      transition: isDragging ? "none" : "transform 0.4s ease-out",
                      zIndex: 10,
                    }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                  >
                    <div
                      className="transition-all duration-300 ease-out"
                      style={{
                        border: selectedFrame.border,
                        boxShadow: selectedFrame.shadow,
                        borderRadius: selectedFrame.id === "ornate-gold" ? "2px" : "1px",
                      }}
                    >
                      <img
                        src={selectedArtwork.images[0]}
                        alt={selectedArtwork.title}
                        className="block max-w-[280px] lg:max-w-[360px] max-h-[220px] lg:max-h-[300px] object-contain"
                        draggable={false}
                      />
                    </div>
                    {/* Floating drag hint */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-foreground/80 backdrop-blur-sm rounded-full px-3 py-1 opacity-60 pointer-events-none">
                      <Move className="h-3 w-3 text-card/70" />
                      <span className="text-[10px] text-card/70">Drag to move</span>
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

              {/* Size Slider */}
              {selectedArtwork && (
                <div className="flex items-center gap-4 px-2">
                  <div className="flex items-center gap-2 text-card/60">
                    <Scaling className="h-4 w-4" />
                    <span className="text-xs font-medium w-7">Size</span>
                  </div>
                  <Slider
                    value={[artworkScale]}
                    onValueChange={(v) => setArtworkScale(v[0])}
                    min={30}
                    max={120}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-xs text-card/40 w-10 text-right">{artworkScale}%</span>
                </div>
              )}

              {/* Frame Selector */}
              {selectedArtwork && (
                <div className="flex items-center gap-3 px-2">
                  <div className="flex items-center gap-2 text-card/60">
                    <Frame className="h-4 w-4" />
                    <span className="text-xs font-medium">Frame</span>
                  </div>
                  <div className="flex gap-2">
                    {frames.map((frame) => (
                      <button
                        key={frame.id}
                        onClick={() => setSelectedFrame(frame)}
                        className={cn(
                          "relative w-10 h-10 rounded-lg border-2 transition-all duration-200 flex items-center justify-center",
                          selectedFrame.id === frame.id
                            ? "border-primary ring-1 ring-primary scale-110"
                            : "border-card/15 hover:border-card/40"
                        )}
                        title={frame.label}
                      >
                        {/* Frame preview swatch */}
                        {frame.id === "none" && (
                          <div className="w-5 h-5 rounded-sm bg-card/10 border border-dashed border-card/30" />
                        )}
                        {frame.id === "thin-black" && (
                          <div className="w-5 h-5 rounded-sm border-2" style={{ borderColor: "hsl(0,0%,10%)" }} />
                        )}
                        {frame.id === "thin-white" && (
                          <div className="w-5 h-5 rounded-sm border-2" style={{ borderColor: "hsl(0,0%,95%)" }} />
                        )}
                        {frame.id === "classic-wood" && (
                          <div className="w-5 h-5 rounded-sm border-[3px]" style={{ borderColor: "hsl(25,40%,35%)" }} />
                        )}
                        {frame.id === "ornate-gold" && (
                          <div className="w-5 h-5 rounded-sm border-[3px]" style={{ borderColor: "hsl(36,49%,62%)" }} />
                        )}
                        <span className="sr-only">{frame.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Controls Row */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Room Switcher */}
                <div className="flex gap-2">
                  {rooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => {
                        setSelectedRoom(room);
                        setPosition({ x: 50, y: 35 });
                      }}
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
