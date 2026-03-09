import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Shield, Globe, Sparkles, Palette, Eye, ShoppingBag, ArrowRight, Users } from "lucide-react";
import { useTranslation } from "@/stores/i18nStore";

const About = () => {
  const { t } = useTranslation();

  const principles = [
    { icon: Heart, titleKey: "about.principle1.title", descKey: "about.principle1.desc" },
    { icon: Shield, titleKey: "about.principle2.title", descKey: "about.principle2.desc" },
    { icon: Globe, titleKey: "about.principle3.title", descKey: "about.principle3.desc" },
    { icon: Sparkles, titleKey: "about.principle4.title", descKey: "about.principle4.desc" },
  ];

  const steps = [
    { icon: Palette, titleKey: "about.step1.title", descKey: "about.step1.desc" },
    { icon: Eye, titleKey: "about.step2.title", descKey: "about.step2.desc" },
    { icon: ShoppingBag, titleKey: "about.step3.title", descKey: "about.step3.desc" },
  ];

  const stats = [
    { value: "500+", labelKey: "about.stats.artworks" },
    { value: "120+", labelKey: "about.stats.artists" },
    { value: "50+", labelKey: "about.stats.countries" },
    { value: "98%", labelKey: "about.stats.satisfaction" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <span className="inline-block text-primary font-heading font-semibold text-sm tracking-widest uppercase mb-4">{t("about.overline")}</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">{t("about.title")}</h1>
          <p className="text-muted-foreground text-lg md:text-xl mt-6 leading-relaxed">{t("about.desc")}</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.labelKey} className="text-center p-6 rounded-2xl bg-card shadow-soft">
                <p className="font-heading text-3xl md:text-4xl font-bold text-primary">{s.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{t(s.labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("about.principles")}</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">{t("about.principlesDesc")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p) => (
              <div key={p.titleKey} className="p-8 rounded-2xl bg-background/60 shadow-soft text-center">
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center"><p.icon className="h-7 w-7 text-primary" /></div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t(p.titleKey)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t(p.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("about.howItWorks")}</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">{t("about.howItWorksDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.titleKey} className="relative text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground w-7 h-7 rounded-full flex items-center justify-center font-heading font-bold text-xs">{i + 1}</div>
                <div className="pt-6 p-8 rounded-2xl bg-card shadow-soft">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center"><step.icon className="h-7 w-7 text-primary" /></div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{t(step.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(step.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-3xl overflow-hidden bg-foreground p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-6"><Users className="h-6 w-6 text-primary" /></div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-card mb-3">{t("about.startCollecting")}</h3>
                <p className="text-card/70 leading-relaxed mb-8 max-w-md">{t("about.startCollectingDesc")}</p>
              </div>
              <Button variant="hero" size="lg" asChild><Link to="/gallery">{t("about.browseGallery")}<ArrowRight className="h-4 w-4 ml-2" /></Link></Button>
            </div>
            <div className="relative rounded-3xl overflow-hidden bg-primary p-10 lg:p-14 flex flex-col justify-between">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mb-6"><Palette className="h-6 w-6 text-primary-foreground" /></div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-3">{t("about.joinAsArtist")}</h3>
                <p className="text-primary-foreground/80 leading-relaxed mb-8 max-w-md">{t("about.joinAsArtistDesc")}</p>
              </div>
              <Button size="lg" className="relative bg-primary-foreground text-primary hover:bg-primary-foreground/90 w-fit" asChild><Link to="/join-artist">{t("about.applyNow")}<ArrowRight className="h-4 w-4 ml-2" /></Link></Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;