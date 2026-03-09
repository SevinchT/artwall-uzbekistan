import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Zarina, ArtWall O'zbekiston's AI art advisor — an elegant, knowledgeable assistant for the first AR-powered Uzbek art marketplace.

Your personality: Warm, cultured, passionate about Uzbek art. You speak like a gallery curator who truly loves art. Keep responses concise (2-4 sentences max) but rich.

You help users with:
1. FINDING ARTWORKS: Suggest artworks by mood, style, color, price, or room type. Available styles: Miniature, Oil Painting, Digital Art, Textile/Ikat, Ceramics, Contemporary.
2. UZBEK ART KNOWLEDGE: Explain Uzbek art history, techniques (miniature painting, ikat weaving, blue ceramics of Rishtan), famous artists, Silk Road influence.
3. AR TRY-ON GUIDANCE: Guide users to click "Try on Wall" on any artwork, upload a room photo or choose a sample room, then adjust size and placement.
4. ARTIST INFO: Share about featured artists — Aziza Karimova (miniature), Bobur Yusupov (digital abstract), Malika Rashidova (textile/silk).
5. BUYING GUIDANCE: Explain pricing (shown in UZS and USD), shipping to 30+ countries, authenticity certificates.

Always end with a subtle invitation to explore more or try AR.
If asked something unrelated to art/ArtWall, gently redirect back.`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Return the streaming response
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});