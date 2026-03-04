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
      .eq("table_name", "feedback")
      .gte("created_at", windowStart.toISOString());

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { assessment_id, rating, comment } = body;

    // Validate server-side
    if (typeof rating !== "number" || rating < 1 || rating > 10) {
      return new Response(JSON.stringify({ error: "Rating must be between 1 and 10" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (comment !== null && comment !== undefined) {
      if (typeof comment !== "string" || comment.length > 1000) {
        return new Response(JSON.stringify({ error: "Comment must be 1000 characters or less" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // Record rate limit entry
    await supabaseAdmin.from("submission_rate_limits").insert({
      client_ip: clientIp,
      table_name: "feedback",
    });

    // Insert feedback
    const { error } = await supabaseAdmin
      .from("feedback")
      .insert({
        assessment_id: assessment_id || null,
        rating,
        comment: comment || null,
      });

    if (error) {
      console.error("Insert error:", error.message);
      return new Response(
        JSON.stringify({ error: "Failed to submit feedback" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Cleanup old entries
    await supabaseAdmin.rpc("cleanup_old_rate_limits");

    return new Response(JSON.stringify({ success: true }), {
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
