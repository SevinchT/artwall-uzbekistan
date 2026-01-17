import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Eye, ShoppingBag, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { ArtistCard } from "@/components/artist/ArtistCard";
import { artworks, artists, categories, formatPrice } from "@/data/mockData";
import heroBg from "@/assets/hero-bg.jpg";
import { useState } from "react";

const Index = () => {
  const featuredArtworks = artworks.slice(0, 8);
  const featuredArtists = artists.slice(0, 4);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "ArtWall helped me discover incredible Uzbek artists I never knew existed. The AR feature let me see exactly how the painting would look in my living room.",
      author: "Sarah Mitchell",
      role: "Art Collector, London",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    },
    {
      quote: "As an artist, ArtWall gave me a platform to share my work with the world. Sales increased by 300% in my first year.",
      author: "Dilnoza Rahimova",
      role: "Traditional Artist, Bukhara",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    {
      quote: "The quality of artworks and the seamless buying experience exceeded all my expectations. Truly world-class.",
      author: "James Chen",
      role: "Interior Designer, Singapore",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
  ];

  const howItWorks = [
    {
      icon: Palette,
      title: "Discover Art",
      description: "Browse through our curated collection of authentic Uzbek artworks from verified local artists.",
    },
    {
      icon: Eye,
      title: "Visualize on Your Wall",
      description: "Use our AR feature to see how the artwork looks in your space before you buy.",
    },
    {
      icon: ShoppingBag,
      title: "Own & Enjoy",
      description: "Secure checkout with worldwide shipping. Your artwork arrives safely at your doorstep.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Uzbek Art"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 lg:px-8 pt-20">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-card leading-tight animate-slide-up">
              Discover.{" "}
              <span className="text-primary">Visualize.</span>
              <br />
              Own Authentic Uzbek Art.
            </h1>
            <p className="text-card/80 text-lg md:text-xl mt-6 max-w-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Connect with Uzbekistan's finest artists. Experience art in your
              space with AR before you buy.
            </p>
            <div className="flex flex-wrap gap-4 mt-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/gallery">
                  Browse Gallery
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/join-artist">Join as Artist</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div>
                <p className="font-heading text-3xl font-bold text-primary">500+</p>
                <p className="text-card/60 text-sm">Artworks</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-primary">120+</p>
                <p className="text-card/60 text-sm">Artists</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-primary">50+</p>
                <p className="text-card/60 text-sm">Countries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-card/40 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-card/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Featured Artworks
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Handpicked masterpieces from our most talented artists
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link to="/gallery">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              From discovery to delivery, we make art buying effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorks.map((step, index) => (
              <div
                key={step.title}
                className="relative text-center p-8 rounded-2xl bg-background/50 shadow-soft"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-sm">
                  {index + 1}
                </div>
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Explore Categories
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Find art that speaks to your soul
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/gallery?category=${category.name}`}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-card transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <h3 className="font-heading font-semibold text-card text-lg group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-card/70 text-sm mt-1">
                    {category.count} works
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-20 lg:py-32 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Featured Artists
              </h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Meet the creative minds behind our collection
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link to="/artists">
                View All Artists
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-card mb-16">
              What Our Community Says
            </h2>

            <div className="relative">
              <div className="flex items-center justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              <blockquote className="text-card text-xl md:text-2xl font-light leading-relaxed mb-8">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-heading font-semibold text-card">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-card/60 text-sm">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() =>
                    setCurrentTestimonial((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  className="p-2 rounded-full border border-card/20 text-card/60 hover:text-card hover:border-card/40 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentTestimonial
                          ? "bg-primary w-6"
                          : "bg-card/30"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() =>
                    setCurrentTestimonial((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="p-2 rounded-full border border-card/20 text-card/60 hover:text-card hover:border-card/40 transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-primary p-12 lg:p-20 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
            <div className="relative">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Ready to Start Collecting?
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
                Join thousands of art lovers who have discovered their perfect
                pieces through ArtWall Uzbekistan.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="heroOutline" size="xl" asChild>
                  <Link to="/gallery">Explore Gallery</Link>
                </Button>
                <Button
                  size="xl"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <Link to="/join-artist">Become an Artist</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
