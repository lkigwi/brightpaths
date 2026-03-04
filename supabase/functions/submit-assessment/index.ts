import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_HOURS = 1;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check rate limit
    const windowStart = new Date();
    windowStart.setHours(windowStart.getHours() - RATE_LIMIT_WINDOW_HOURS);

    const { count } = await supabaseAdmin
      .from("submission_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("client_ip", clientIp)
      .eq("table_name", "assessment_results")
      .gte("created_at", windowStart.toISOString());

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Derive user_id from JWT if present (don't trust request body)
    let verifiedUserId: string | null = null;
    const authHeader = req.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const { data: { user: authUser } } = await supabaseAdmin.auth.getUser(authHeader.slice(7));
      verifiedUserId = authUser?.id ?? null;
    }

    const body = await req.json();

    // Validate required fields server-side
    const { student_name, top_pathway, top_pathway_percentage, stem_percentage, social_sciences_percentage, arts_sports_percentage, confidence, recommended_subjects, recommended_careers } = body;

    if (!student_name || typeof student_name !== "string" || student_name.length < 1 || student_name.length > 100) {
      return new Response(JSON.stringify({ error: "Invalid student name" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const validPathways = ["STEM", "Social Sciences", "Arts & Sports"];
    if (!validPathways.includes(top_pathway)) {
      return new Response(JSON.stringify({ error: "Invalid pathway" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const validConfidence = ["High", "Medium", "Low"];
    if (!validConfidence.includes(confidence)) {
      return new Response(JSON.stringify({ error: "Invalid confidence" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const pcts = [stem_percentage, social_sciences_percentage, arts_sports_percentage, top_pathway_percentage];
    if (pcts.some((p: unknown) => typeof p !== "number" || p < 0 || p > 100)) {
      return new Response(JSON.stringify({ error: "Invalid percentages" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (stem_percentage + social_sciences_percentage + arts_sports_percentage !== 100) {
      return new Response(JSON.stringify({ error: "Percentages must sum to 100" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (!Array.isArray(recommended_subjects) || !Array.isArray(recommended_careers)) {
      return new Response(JSON.stringify({ error: "Invalid recommendations format" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Record rate limit entry
    await supabaseAdmin.from("submission_rate_limits").insert({
      client_ip: clientIp,
      table_name: "assessment_results",
    });

    // Insert assessment result
    const { data, error } = await supabaseAdmin
      .from("assessment_results")
      .insert({
        user_id: verifiedUserId,
        student_name,
        top_pathway,
        top_pathway_percentage,
        stem_percentage,
        social_sciences_percentage,
        arts_sports_percentage,
        confidence,
        recommended_subjects,
        recommended_careers,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Insert error:", error.message);
      return new Response(
        JSON.stringify({ error: "Failed to save assessment results" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Cleanup old rate limit entries periodically
    await supabaseAdmin.rpc("cleanup_old_rate_limits");

    return new Response(JSON.stringify({ id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
