import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface TranslationsData {
  en: Record<string, any>;
  id: Record<string, any>;
}

function flattenTranslations(obj: any, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "string") {
        result[newKey] = value;
      } else if (typeof value === "object" && value !== null) {
        Object.assign(result, flattenTranslations(value, newKey));
      }
    }
  }

  return result;
}

async function syncTranslationsData(
  supabase: any,
  translationsData: TranslationsData,
  userId?: string
): Promise<{
  keysCreated: number;
  keysUpdated: number;
  translationsCreated: number;
  translationsUpdated: number;
}> {
  const englishFlat = flattenTranslations(translationsData.en);
  const indonesianFlat = flattenTranslations(translationsData.id);

  let keysCreated = 0;
  let keysUpdated = 0;
  let translationsCreated = 0;
  let translationsUpdated = 0;

  for (const [key, value] of Object.entries(englishFlat)) {
    const category = key.split(".")[0] || "general";

    const { data: existing } = await supabase
      .from("translation_keys")
      .select("id")
      .eq("key", key)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("translation_keys")
        .update({ english_text: value, updated_at: new Date() })
        .eq("id", existing.id);
      keysUpdated++;

      if (indonesianFlat[key]) {
        const { data: translationExists } = await supabase
          .from("translation_values")
          .select("id")
          .eq("translation_key_id", existing.id)
          .eq("language", "id")
          .maybeSingle();

        if (translationExists) {
          await supabase
            .from("translation_values")
            .update({
              translated_text: indonesianFlat[key],
              is_synced: true,
              last_synced_at: new Date(),
            })
            .eq("id", translationExists.id);
          translationsUpdated++;
        } else {
          await supabase.from("translation_values").insert({
            translation_key_id: existing.id,
            language: "id",
            translated_text: indonesianFlat[key],
            is_synced: true,
            last_synced_at: new Date(),
            created_by: userId,
          });
          translationsCreated++;
        }
      }
    } else {
      const { data: newKey } = await supabase
        .from("translation_keys")
        .insert({ key, english_text: value, category, status: "active", created_by: userId })
        .select("id")
        .single();

      if (newKey) {
        keysCreated++;

        if (indonesianFlat[key]) {
          await supabase.from("translation_values").insert({
            translation_key_id: newKey.id,
            language: "id",
            translated_text: indonesianFlat[key],
            is_synced: true,
            last_synced_at: new Date(),
            created_by: userId,
          });
          translationsCreated++;
        }
      }
    }
  }

  return {
    keysCreated,
    keysUpdated,
    translationsCreated,
    translationsUpdated,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    console.log("URL:", supabaseUrl);
    console.log("KEY:", supabaseKey);

    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ error: "Supabase configuration missing" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method === "POST") {
      const authHeader = req.headers.get("authorization");
      let userId: string | undefined;

      if (authHeader) {
        try {
          const token = authHeader.replace("Bearer ", "");
          const jwtPayload = JSON.parse(atob(token.split(".")[1]));
          userId = jwtPayload.sub;
        } catch {
          // Continue without user ID if JWT parsing fails
        }
      }

      const body = await req.json();
      const { translations } = body;

      if (!translations) {
        return new Response(
          JSON.stringify({ error: "translations data required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const result = await syncTranslationsData(supabase, translations, userId);

      return new Response(JSON.stringify({ success: true, ...result }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("translation_keys")
        .select(
          `
          id,
          key,
          english_text,
          category,
          status,
          translation_values(language, translated_text, is_synced)
        `
        )
        .eq("status", "active");

      if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
