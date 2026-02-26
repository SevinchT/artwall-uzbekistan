import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import ArtworkDetail from "./pages/ArtworkDetail";
import ArtistProfile from "./pages/ArtistProfile";
import Artists from "./pages/Artists";
import About from "./pages/About";
import JoinArtist from "./pages/JoinArtist";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/join-artist" element={<JoinArtist />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
