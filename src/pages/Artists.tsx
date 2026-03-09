import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtistCard } from "@/components/artist/ArtistCard";
import { artists } from "@/data/mockData";

export default function Artists() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-body text-xs tracking-[0.25em] uppercase mb-3">Curated Talent</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              Our Artists
            </h1>
            <div className="section-divider mt-6" />
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto font-body leading-relaxed">
              Discover talented Uzbek artists and explore their unique collections.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
