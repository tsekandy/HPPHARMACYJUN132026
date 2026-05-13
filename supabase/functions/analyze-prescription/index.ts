import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PrescriptionAnalysis {
  condition: string;
  medicines: Array<{
    name: string;
    dosage: string;
    quantity: string;
  }>;
  instructions: string;
  rawText: string;
}

async function analyzePrescriptionImage(imageBase64: string, mimeType: string): Promise<PrescriptionAnalysis> {
  try {
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY not configured");
    }

    const mediaTypeMap: Record<string, string> = {
      'image/jpeg': 'image_jpeg',
      'image/jpg': 'image_jpeg',
      'image/png': 'image_png',
      'image/webp': 'image_webp',
      'application/pdf': 'image_png',
    };

    const imageMediaType = mediaTypeMap[mimeType] || 'image_jpeg';

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4-vision",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${imageBase64}`,
                },
              },
              {
                type: "text",
                text: `Please analyze this prescription image and extract the following information in JSON format:
{
  "condition": "The medical condition/diagnosis if visible",
  "medicines": [
    {
      "name": "Medicine name",
      "dosage": "Dosage (e.g., 500mg, 2 tablets)",
      "quantity": "Total quantity required (e.g., 30 tablets, 1 bottle)"
    }
  ],
  "instructions": "Any special instructions or notes from the prescription",
  "rawText": "All readable text from the prescription"
}

If you cannot read certain information clearly, use "Not clearly visible" as the value.
Extract ALL medicines listed on the prescription.`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${error}`);
    }

    const result = await response.json();
    const content = result.choices[0].message.content;

    if (!content) {
      throw new Error("No response from OpenAI");
    }

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from response");
    }

    const analysis: PrescriptionAnalysis = JSON.parse(jsonMatch[0]);
    return analysis;
  } catch (error) {
    console.error("Error analyzing prescription:", error);
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

    const { imageBase64, mimeType } = await req.json();

    if (!imageBase64 || !mimeType) {
      return new Response(
        JSON.stringify({ error: "Missing imageBase64 or mimeType" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const analysis = await analyzePrescriptionImage(imageBase64, mimeType);

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
