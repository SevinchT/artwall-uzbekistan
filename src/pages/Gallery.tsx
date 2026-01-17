import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";
import { artworks, categories } from "@/data/mockData";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  LayoutList,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const styles = [
  "Abstract",
  "Realism",
  "Modern",
  "Traditional Uzbek",
  "Minimalist",
  "Impressionist",
];

const sizes = [
  { id: "small", label: "Small (<50cm)" },
  { id: "medium", label: "Medium (50-100cm)" },
  { id: "large", label: "Large (>100cm)" },
];

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedStyles([]);
    setPriceRange([0, 50000000]);
    setSearchQuery("");
  };

  // Filter artworks
  const filteredArtworks = artworks.filter((artwork) => {
    const matchesSearch =
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(artwork.category);
    const matchesStyle =
      selectedStyles.length === 0 || selectedStyles.includes(artwork.style);
    const matchesPrice =
      artwork.price >= priceRange[0] && artwork.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesStyle && matchesPrice;
  });

  // Sort artworks
  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "popular":
        return b.favorites - a.favorites;
      default:
        return b.year - a.year;
    }
  });

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedStyles.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 50000000;

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Categories
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => toggleCategory(category.name)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {category.name}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                ({category.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Price Range (UZS)
        </h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={50000000}
          step={1000000}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{(priceRange[0] / 1000000).toFixed(0)}M</span>
          <span>{(priceRange[1] / 1000000).toFixed(0)}M</span>
        </div>
      </div>

      {/* Styles */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Style
        </h3>
        <div className="space-y-3">
          {styles.map((style) => (
            <label
              key={style}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Checkbox
                checked={selectedStyles.includes(style)}
                onCheckedChange={() => toggleStyle(style)}
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {style}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          className="w-full"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Art Gallery
            </h1>
            <p className="text-muted-foreground mt-2">
              Discover {artworks.length}+ authentic artworks from Uzbekistan
            </p>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search artworks, artists, styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger */}
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {selectedCategories.length + selectedStyles.length}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <h2 className="font-heading text-xl font-bold mb-6">Filters</h2>
                  <FilterContent />
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] bg-card">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="hidden sm:flex items-center border border-border rounded-lg p-1 bg-card">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28 bg-card rounded-xl p-6 shadow-soft">
                <h2 className="font-heading text-lg font-semibold mb-6">
                  Filters
                </h2>
                <FilterContent />
              </div>
            </aside>

            {/* Artworks Grid */}
            <div className="flex-1">
              {sortedArtworks.length > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground mb-6">
                    Showing {sortedArtworks.length} results
                  </p>
                  <div
                    className={cn(
                      "grid gap-6",
                      viewMode === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                        : "grid-cols-1"
                    )}
                  >
                    {sortedArtworks.map((artwork) => (
                      <ArtworkCard key={artwork.id} artwork={artwork} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                    <Search className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    No artworks found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
