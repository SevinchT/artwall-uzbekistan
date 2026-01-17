import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { artists, artworks } from "@/data/mockData";
import {
  BadgeCheck,
  MapPin,
  Users,
  Image as ImageIcon,
  ShoppingBag,
  MessageCircle,
  Share2,
  Star,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ArtistProfile = () => {
  const { id } = useParams();
  const artist = artists.find((a) => a.id === id) || artists[0];
  const [isFollowing, setIsFollowing] = useState(false);

  const artistArtworks = artworks.filter((a) => a.artist.id === artist.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Cover Banner */}
        <div className="h-48 md:h-64 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          {/* Profile Header */}
          <div className="relative -mt-20 mb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-background shadow-elevated"
                />
                {artist.isVerified && (
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                    {artist.name}
                  </h1>
                  {artist.isVerified && (
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Verified Artist
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>{artist.location}, Uzbekistan</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant={isFollowing ? "outline" : "gold"}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-8 py-6 border-y border-border">
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-foreground">
                  {artist.artworksCount}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" /> Artworks
                </p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-foreground">
                  {artist.soldCount}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <ShoppingBag className="h-4 w-4" /> Sold
                </p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-foreground">
                  {artist.followersCount}
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="h-4 w-4" /> Followers
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="artworks" className="pb-20">
            <TabsList className="w-full justify-start border-b border-border rounded-none h-auto p-0 bg-transparent mb-8">
              <TabsTrigger
                value="artworks"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Artworks
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="artworks" className="mt-0">
              {artistArtworks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {artistArtworks.map((artwork) => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">
                    No artworks available yet.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="about" className="mt-0">
              <div className="max-w-3xl space-y-8">
                <div className="bg-card rounded-xl p-8 shadow-soft">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                    About
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {artist.bio}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Drawing inspiration from the rich cultural heritage of
                    Uzbekistan, my work explores the intersection of traditional
                    craftsmanship and contemporary artistic expression. Each
                    piece tells a story of our ancestors while speaking to
                    modern audiences worldwide.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-8 shadow-soft">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                    Artistic Statement
                  </h3>
                  <p className="text-muted-foreground leading-relaxed italic">
                    "I believe art should be a bridge between cultures, a visual
                    language that transcends borders. Through my work, I aim to
                    share the beauty of Uzbekistan with the world while
                    contributing to the global contemporary art dialogue."
                  </p>
                </div>

                <div className="bg-card rounded-xl p-8 shadow-soft">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                    Exhibitions & Awards
                  </h3>
                  <ul className="space-y-3">
                    {[
                      {
                        year: 2024,
                        title: "Central Asian Art Biennale",
                        location: "Tashkent",
                      },
                      {
                        year: 2023,
                        title: "Silk Road Contemporary",
                        location: "Istanbul",
                      },
                      {
                        year: 2023,
                        title: "Best Emerging Artist Award",
                        location: "Samarkand Arts Festival",
                      },
                      {
                        year: 2022,
                        title: "Solo Exhibition: Echoes of the Steppe",
                        location: "Tashkent Gallery",
                      },
                    ].map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-4 text-muted-foreground"
                      >
                        <span className="text-primary font-medium">
                          {item.year}
                        </span>
                        <span>
                          {item.title} — <em>{item.location}</em>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div className="max-w-3xl space-y-6">
                {[
                  {
                    author: "Sarah M.",
                    avatar:
                      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=50&h=50&fit=crop",
                    rating: 5,
                    date: "2 weeks ago",
                    text: "Absolutely stunning work! The attention to detail and the vibrant colors exceeded my expectations. Shipping was fast and the artwork was perfectly packaged.",
                  },
                  {
                    author: "James C.",
                    avatar:
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
                    rating: 5,
                    date: "1 month ago",
                    text: "I purchased a piece for my office and it has become a conversation starter. The artist was very responsive and even provided care instructions. Highly recommend!",
                  },
                  {
                    author: "Maria L.",
                    avatar:
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
                    rating: 4,
                    date: "2 months ago",
                    text: "Beautiful artwork with authentic Uzbek cultural elements. The only reason for 4 stars is shipping took a bit longer than expected, but the quality makes up for it.",
                  },
                ].map((review, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 shadow-soft">
                    <div className="flex items-start gap-4">
                      <img
                        src={review.avatar}
                        alt={review.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground">
                            {review.author}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating
                                  ? "fill-primary text-primary"
                                  : "text-muted"
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistProfile;
