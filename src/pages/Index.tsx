import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Eye, ShoppingBag, Star, ChevronLeft, ChevronRight, Camera, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { ArtistCard } from "@/components/artist/ArtistCard";
import { artworks, artists, categories } from "@/data/mockData";
import heroBg from "@/assets/hero-bg.jpg";
import { useState } from "react";
import { useTranslation } from "@/stores/i18nStore";

const Index = () => {
  const featuredArtworks = artworks.slice(0, 8);
  const featuredArtists = artists.slice(0, 4);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { t } = useTranslation();

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

  const howItWorksData = [
    { icon: Palette, titleKey: "howItWorks.step1.title", descKey: "howItWorks.step1.desc" },
    { icon: Eye, titleKey: "howItWorks.step2.title", descKey: "howItWorks.step2.desc" },
    { icon: ShoppingBag, titleKey: "howItWorks.step3.title", descKey: "howItWorks.step3.desc" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Uzbek craft exhibition with ikat textiles, ceramic plates and miniature paintings" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-foreground/20" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 pb-32 pt-40">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 bg-foreground/60 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-10 animate-slide-up" style={{ animationDelay: "0s" }}>
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-white/80 text-xs font-body font-medium tracking-wide">AI-Powered Art Visualization</span>
          </div>

          {/* Main Headline — left-aligned, sans-serif, heavy */}
          <h1 className="font-body font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight max-w-3xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-white">Discover Uzbek Art.</span>
            <br />
            <span className="text-primary">See It On Your Wall.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/55 font-body text-base md:text-lg mt-8 max-w-md leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
            The first AI & AR-powered marketplace
            <br className="hidden sm:block" />
            connecting Uzbek artists with
            <br className="hidden sm:block" />
            global art lovers.
          </p>

          {/* Two CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="gold" size="xl" asChild className="text-base">
              <Link to="/gallery">
                Explore Gallery
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              asChild
              className="border-white/25 text-white bg-foreground/30 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 text-base"
            >
              <Link to="/try-on-wall">
                <Camera className="h-4.5 w-4.5 mr-2" />
                Try on Your Wall
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-foreground/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-3 divide-x divide-white/10">
              {[
                { vKey: "hero.stat1.value", lKey: "hero.stat1.label" },
                { vKey: "hero.stat2.value", lKey: "hero.stat2.label" },
                { vKey: "hero.stat3.value", lKey: "hero.stat3.label" },
              ].map((stat) => (
                <div key={stat.lKey} className="py-5 md:py-6 text-center">
                  <p className="font-body text-xl md:text-2xl font-bold text-primary">{t(stat.vKey)}</p>
                  <p className="text-white/45 text-[11px] md:text-xs mt-0.5 font-body tracking-wide uppercase">{t(stat.lKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-24 lg:py-36">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <p className="text-primary font-body text-xs tracking-[0.25em] uppercase mb-3">{t("featured.overline")}</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("featured.title")}</h2>
              <p className="text-muted-foreground mt-3 max-w-lg font-body">{t("featured.desc")}</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link to="/gallery">{t("featured.viewAll")}<ArrowRight className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-36 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <p className="text-primary font-body text-xs tracking-[0.25em] uppercase mb-3">{t("howItWorks.overline")}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("howItWorks.title")}</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto font-body">{t("howItWorks.desc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
            {howItWorksData.map((step, index) => (
              <div key={step.titleKey} className="relative text-center">
                <div className="text-primary/20 font-heading text-[5rem] font-bold leading-none mb-4">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{t(step.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body max-w-xs mx-auto">{t(step.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 lg:py-36">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-body text-xs tracking-[0.25em] uppercase mb-3">{t("categories.overline")}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("categories.title")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/gallery?category=${category.name}`}
                className="group relative aspect-square rounded-xl overflow-hidden bg-card shadow-soft hover:shadow-card transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <h3 className="font-heading font-semibold text-white text-lg group-hover:text-primary transition-colors duration-300">{category.name}</h3>
                  <p className="text-white/60 text-sm mt-1 font-body">{category.count} {t("categories.works")}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-24 lg:py-36 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <p className="text-primary font-body text-xs tracking-[0.25em] uppercase mb-3">{t("artists.overline")}</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("artists.title")}</h2>
              <p className="text-muted-foreground mt-3 max-w-lg font-body">{t("artists.desc")}</p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link to="/artists">{t("artists.viewAll")}<ArrowRight className="h-4 w-4 ml-2" /></Link>
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
      <section className="py-24 lg:py-36 bg-dark-section">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-body text-xs tracking-[0.25em] uppercase mb-6">{t("testimonials.overline")}</p>
            <div className="relative">
              <div className="flex items-center justify-center gap-1 mb-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-white/90 text-xl md:text-2xl font-heading italic leading-relaxed mb-10">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <img src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].author} className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30" />
                <div className="text-left">
                  <p className="font-heading font-semibold text-white text-sm">{testimonials[currentTestimonial].author}</p>
                  <p className="text-white/40 text-xs font-body">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-12">
                <button onClick={() => setCurrentTestimonial((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)} className="p-2 rounded-full border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-colors">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button key={index} onClick={() => setCurrentTestimonial(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === currentTestimonial ? "bg-primary w-8" : "bg-white/20 w-1.5"}`} />
                  ))}
                </div>
                <button onClick={() => setCurrentTestimonial((prev) => prev === testimonials.length - 1 ? 0 : prev + 1)} className="p-2 rounded-full border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-36">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-body text-xs tracking-[0.25em] uppercase mb-4">{t("cta.overline")}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t("cta.title1")}<br /><span className="text-primary italic">{t("cta.title2")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-12 font-body">{t("cta.desc")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="gold" size="xl" asChild>
                <Link to="/gallery">{t("cta.gallery")}<ArrowRight className="h-5 w-5 ml-2" /></Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/join-artist">{t("cta.artist")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
