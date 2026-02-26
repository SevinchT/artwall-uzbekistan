import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Palette,
  Upload,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  TrendingUp,
  Globe,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const artTypes = [
  "Painting",
  "Sculpture",
  "Photography",
  "Digital Art",
  "Traditional Uzbek",
  "Miniature",
  "Textile Art",
  "Ceramics",
  "Mixed Media",
  "Calligraphy",
];

const styles = [
  "Abstract",
  "Realism",
  "Modern",
  "Traditional Uzbek",
  "Minimalist",
  "Impressionist",
  "Expressionist",
  "Surrealist",
  "Contemporary",
];

const mediums = [
  "Oil on Canvas",
  "Acrylic on Canvas",
  "Watercolor",
  "Gouache",
  "Digital Print",
  "Bronze",
  "Ceramic",
  "Mixed Media",
  "Photography",
  "Textile",
];

const experienceLevels = [
  "Emerging (0–2 years)",
  "Mid-career (3–7 years)",
  "Established (8–15 years)",
  "Master (15+ years)",
];

const cities = [
  "Tashkent",
  "Samarkand",
  "Bukhara",
  "Khiva",
  "Fergana",
  "Namangan",
  "Andijan",
  "Nukus",
  "Termez",
  "Karshi",
  "Other",
];

const benefits = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Showcase your art to collectors in 50+ countries worldwide.",
  },
  {
    icon: TrendingUp,
    title: "Fair Earnings",
    description: "Keep up to 85% of every sale — one of the highest in the industry.",
  },
  {
    icon: Shield,
    title: "Verified Badge",
    description: "Get verified to build trust and credibility with buyers.",
  },
  {
    icon: Sparkles,
    title: "AR Showcase",
    description: "Let buyers visualize your work in their space with AR technology.",
  },
];

const JoinArtist = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedArtTypes, setSelectedArtTypes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    bio: "",
    experience: "",
    medium: "",
    portfolio: "",
    instagram: "",
    agreeTerms: false,
  });

  const toggleArtType = (type: string) => {
    setSelectedArtTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.city) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    if (selectedArtTypes.length === 0) {
      toast({
        title: "Select art type",
        description: "Please select at least one art type.",
        variant: "destructive",
      });
      return;
    }
    if (!formData.agreeTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      });
      return;
    }
    setStep(3);
    toast({
      title: "Application submitted!",
      description: "We'll review your application and get back to you within 3-5 business days.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Palette className="h-4 w-4" />
            Artist Application
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Share Your Art with the World
          </h1>
          <p className="text-muted-foreground text-lg mt-4 max-w-xl mx-auto">
            Join 120+ verified Uzbek artists already selling on ArtWall. Free to
            apply — start selling within days.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="p-5 rounded-2xl bg-card shadow-soft text-center"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-sm mb-1">
                  {b.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-colors ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-0.5 ${
                      step > s ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Success */}
          {step === 3 && (
            <div className="text-center py-16 px-8 rounded-3xl bg-card shadow-soft">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
                Application Submitted!
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Thank you, {formData.fullName}! Our team will review your
                application and contact you at {formData.email} within 3–5
                business days.
              </p>
              <Button variant="gold" size="lg" asChild>
                <a href="/gallery">Browse Gallery While You Wait</a>
              </Button>
            </div>
          )}

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="rounded-3xl bg-card shadow-soft p-8 lg:p-10 space-y-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Personal Information
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Tell us about yourself
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="e.g. Aziza Karimova"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="artist@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+998 90 123 45 67"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">
                    City <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.city}
                    onValueChange={(v) =>
                      setFormData({ ...formData, city: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">
                  Short Bio <span className="text-muted-foreground text-xs">(max 300 chars)</span>
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about your artistic journey and what inspires your work..."
                  className="min-h-[100px]"
                  maxLength={300}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.bio.length}/300
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="gold" size="lg" onClick={() => {
                  if (!formData.fullName || !formData.email || !formData.city) {
                    toast({
                      title: "Missing information",
                      description: "Please fill in name, email, and city.",
                      variant: "destructive",
                    });
                    return;
                  }
                  setStep(2);
                }}>
                  Next: Art Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Art Details */}
          {step === 2 && (
            <div className="rounded-3xl bg-card shadow-soft p-8 lg:p-10 space-y-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">
                  Art Details
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Help us understand your work
                </p>
              </div>

              {/* Art Types */}
              <div className="space-y-3">
                <Label>
                  Art Type <span className="text-destructive">*</span>{" "}
                  <span className="text-muted-foreground text-xs">
                    (select all that apply)
                  </span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {artTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleArtType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        selectedArtTypes.includes(type)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Styles */}
              <div className="space-y-3">
                <Label>
                  Styles{" "}
                  <span className="text-muted-foreground text-xs">
                    (select all that apply)
                  </span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {styles.map((style) => (
                    <button
                      key={style}
                      onClick={() => toggleStyle(style)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        selectedStyles.includes(style)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Primary Medium</Label>
                  <Select
                    value={formData.medium}
                    onValueChange={(v) =>
                      setFormData({ ...formData, medium: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select medium" />
                    </SelectTrigger>
                    <SelectContent>
                      {mediums.map((m) => (
                        <SelectItem key={m} value={m}>
                          {m}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select
                    value={formData.experience}
                    onValueChange={(v) =>
                      setFormData({ ...formData, experience: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((l) => (
                        <SelectItem key={l} value={l}>
                          {l}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio / Website</Label>
                  <Input
                    id="portfolio"
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolio}
                    onChange={(e) =>
                      setFormData({ ...formData, portfolio: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Handle</Label>
                  <Input
                    id="instagram"
                    placeholder="@yourusername"
                    value={formData.instagram}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Upload */}
              <div className="space-y-2">
                <Label>Sample Artworks</Label>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-foreground font-medium">
                    Drag & drop images or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload 3–5 of your best works (JPG, PNG, max 5MB each)
                  </p>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeTerms: checked === true })
                  }
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  I agree to ArtWall's{" "}
                  <a href="#" className="text-primary underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary underline">
                    Artist Agreement
                  </a>
                  . I confirm that all artworks I submit are my original work.
                </Label>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="gold" size="lg" onClick={handleSubmit}>
                  Submit Application
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinArtist;
