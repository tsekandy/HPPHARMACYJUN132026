import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SEOAnalysis {
  score: number;
  issues: Array<{
    type: "error" | "warning" | "info";
    message: string;
    priority: number;
  }>;
  suggestions: Array<{
    title: string;
    description: string;
    impact: "high" | "medium" | "low";
  }>;
}

async function analyzeSEO(url: string): Promise<SEOAnalysis> {
  try {
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY not configured");
    }

    // Fetch the page content
    const pageResponse = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SEOAnalyzer/1.0)",
      },
    });

    if (!pageResponse.ok) {
      throw new Error(`Failed to fetch page: ${pageResponse.status}`);
    }

    const htmlContent = await pageResponse.text();

    // Extract basic SEO data
    const titleMatch = htmlContent.match(/<title>([^<]+)<\/title>/i);
    const metaDescMatch = htmlContent.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    const h1Matches = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/gi) || [];
    const metaViewport = htmlContent.includes('name="viewport"');
    const canonicalMatch = htmlContent.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    const ogTitleMatch = htmlContent.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);

    const issues: Array<{ type: "error" | "warning" | "info"; message: string; priority: number }> = [];
    const suggestions: Array<{ title: string; description: string; impact: "high" | "medium" | "low" }> = [];
    let score = 100;

    // Check title
    const title = titleMatch?.[1] || "";
    if (!title) {
      issues.push({ type: "error", message: "Missing page title", priority: 10 });
      score -= 20;
    } else if (title.length < 30) {
      issues.push({ type: "warning", message: "Title too short (recommended 30-60 characters)", priority: 8 });
      score -= 10;
    } else if (title.length > 60) {
      issues.push({ type: "warning", message: "Title too long (recommended 30-60 characters)", priority: 8 });
      score -= 5;
    }

    // Check meta description
    const metaDesc = metaDescMatch?.[1] || "";
    if (!metaDesc) {
      issues.push({ type: "error", message: "Missing meta description", priority: 9 });
      score -= 15;
      suggestions.push({
        title: "Add Meta Description",
        description: "Create a compelling meta description (150-160 characters) to improve click-through rates from search results.",
        impact: "high",
      });
    } else if (metaDesc.length < 120) {
      issues.push({ type: "warning", message: "Meta description too short (recommended 150-160 characters)", priority: 7 });
      score -= 8;
    } else if (metaDesc.length > 160) {
      issues.push({ type: "warning", message: "Meta description too long (recommended 150-160 characters)", priority: 7 });
      score -= 5;
    }

    // Check H1 tags
    if (h1Matches.length === 0) {
      issues.push({ type: "error", message: "Missing H1 tag", priority: 9 });
      score -= 15;
      suggestions.push({
        title: "Add H1 Tag",
        description: "Every page should have exactly one H1 tag that describes the main topic. This helps search engines understand page content.",
        impact: "high",
      });
    } else if (h1Matches.length > 1) {
      issues.push({ type: "warning", message: `Multiple H1 tags found (${h1Matches.length})`, priority: 7 });
      score -= 5;
    }

    // Check viewport meta tag
    if (!metaViewport) {
      issues.push({ type: "error", message: "Missing viewport meta tag", priority: 10 });
      score -= 20;
      suggestions.push({
        title: "Add Viewport Meta Tag",
        description: "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> to ensure mobile responsiveness.",
        impact: "high",
      });
    }

    // Check canonical tag
    if (!canonicalMatch) {
      issues.push({ type: "info", message: "No canonical tag found", priority: 4 });
      score -= 3;
      suggestions.push({
        title: "Add Canonical Tag",
        description: "Add a canonical link tag to prevent duplicate content issues and consolidate link equity.",
        impact: "medium",
      });
    }

    // Check Open Graph tags
    if (!ogTitleMatch) {
      issues.push({ type: "info", message: "No Open Graph tags found", priority: 3 });
      score -= 2;
      suggestions.push({
        title: "Add Open Graph Tags",
        description: "Add og:title, og:description, og:image, and og:url tags to improve social media sharing.",
        impact: "medium",
      });
    }

    // Check structured data (JSON-LD, Schema.org)
    if (!htmlContent.includes("application/ld+json")) {
      suggestions.push({
        title: "Add Structured Data",
        description: "Implement JSON-LD structured data (Schema.org) to help search engines understand your business, services, and offers.",
        impact: "medium",
      });
    }

    // Check for alt text in images
    const imgMatches = htmlContent.match(/<img[^>]*>/gi) || [];
    const imgsWithoutAlt = imgMatches.filter((img) => !img.includes('alt=')).length;
    if (imgsWithoutAlt > 0) {
      issues.push({
        type: "warning",
        message: `${imgsWithoutAlt} image(s) missing alt text`,
        priority: 6,
      });
      score -= 5;
      suggestions.push({
        title: "Add Alt Text to Images",
        description: "Add descriptive alt text to all images for accessibility and better SEO performance.",
        impact: "medium",
      });
    }

    // Ensure score doesn't go below 0
    score = Math.max(0, score);

    return {
      score,
      issues: issues.sort((a, b) => b.priority - a.priority),
      suggestions: suggestions.slice(0, 5),
    };
  } catch (error) {
    console.error("Error analyzing SEO:", error);
    throw error;
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: "Missing url parameter" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const analysis = await analyzeSEO(url);

    return new Response(JSON.stringify({ success: true, analysis }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
