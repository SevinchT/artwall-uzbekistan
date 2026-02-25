import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtistCard } from "@/components/artist/ArtistCard";
import { artists } from "@/data/mockData";

export default function Artists() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Our Artists
          </h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Discover talented Uzbek artists and explore their unique collections.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
