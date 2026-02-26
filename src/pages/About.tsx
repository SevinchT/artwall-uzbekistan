import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Heart,
  Shield,
  Globe,
  Sparkles,
  Palette,
  Eye,
  ShoppingBag,
  ArrowRight,
  Users,
  Award,
  Handshake,
} from "lucide-react";

const mission = {
  title: "Bridging Uzbek Art with the World",
  description:
    "ArtWall was born from a simple belief: extraordinary Uzbek art deserves a global stage. We connect talented local artists with collectors, designers, and art lovers worldwide — making authentic Central Asian art accessible to everyone.",
};

const principles = [
  {
    icon: Heart,
    title: "Artist-First",
    description:
      "Artists keep the majority of every sale. We exist to empower creators, not exploit them.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description:
      "Every artist is verified and every artwork is authenticated before it reaches our gallery.",
  },
  {
    icon: Globe,
    title: "Cultural Preservation",
    description:
      "We champion traditional Uzbek art forms — from miniature painting to suzani embroidery — ensuring they thrive in the modern world.",
  },
  {
    icon: Sparkles,
    title: "Innovation Meets Tradition",
    description:
      "Our AR visualization and digital tools bring centuries-old craftsmanship into the 21st century buying experience.",
  },
];

const steps = [
  {
    icon: Palette,
    title: "Discover",
    description:
      "Browse a curated collection of paintings, sculptures, photography, and traditional Uzbek crafts.",
  },
  {
    icon: Eye,
    title: "Visualize",
    description:
      "Use our AR feature to see exactly how an artwork will look on your wall before purchasing.",
  },
  {
    icon: ShoppingBag,
    title: "Own",
    description:
      "Securely purchase with local and international payment options. We handle worldwide shipping.",
  },
];

const stats = [
  { value: "500+", label: "Artworks Listed" },
  { value: "120+", label: "Verified Artists" },
  { value: "50+", label: "Countries Reached" },
  { value: "98%", label: "Satisfaction Rate" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <span className="inline-block text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-4">
            About ArtWall
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {mission.title}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl mt-6 leading-relaxed">
            {mission.description}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center p-6 rounded-2xl bg-card shadow-soft"
              >
                <p className="font-heading text-3xl md:text-4xl font-bold text-primary">
                  {s.value}
                </p>
                <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Our Principles
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              The values that guide every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p) => (
              <div
                key={p.title}
                className="p-8 rounded-2xl bg-background/60 shadow-soft text-center"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <p.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Three simple steps from discovery to your doorstep
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center font-heading font-bold text-xs">
                  {i + 1}
                </div>
                <div className="pt-6 p-8 rounded-2xl bg-card shadow-soft">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Collector Card */}
            <div className="relative rounded-3xl overflow-hidden bg-foreground p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-card mb-3">
                  Start Collecting
                </h3>
                <p className="text-card/70 leading-relaxed mb-8 max-w-md">
                  Create a free account to browse, favorite, and purchase
                  authentic Uzbek artworks shipped worldwide.
                </p>
              </div>
              <Button variant="hero" size="lg" asChild>
                <Link to="/gallery">
                  Browse Gallery
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Artist Card */}
            <div className="relative rounded-3xl overflow-hidden bg-primary p-10 lg:p-14 flex flex-col justify-between">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mb-6">
                  <Palette className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                  Join as Artist
                </h3>
                <p className="text-primary-foreground/80 leading-relaxed mb-8 max-w-md">
                  Showcase your work to a global audience, manage sales, and
                  grow your art career — all from one platform.
                </p>
              </div>
              <Button
                size="lg"
                className="relative bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-fit"
                asChild
              >
                <Link to="/join-artist">
                  Apply Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
