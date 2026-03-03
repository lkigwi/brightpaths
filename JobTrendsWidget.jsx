import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
//  BrightPaths · Real-Time Job Trends Widget
//  Paste this file into your Lovable project.
//  The component calls the Anthropic API to
//  generate live, Kenya-specific career insights
//  for each CBE pathway based on psychometric
//  test results.
// ─────────────────────────────────────────────

const PATHWAYS = {
  STEM: {
    label: "STEM",
    color: "#1d6fa4",
    bg: "#e8f4fd",
    icon: "🔬",
    tracks: ["Pure Sciences", "Applied Sciences", "Technical & Engineering"],
  },
  "Social Sciences": {
    label: "Social Sciences",
    color: "#2e7d32",
    bg: "#e8f5e9",
    icon: "📚",
    tracks: ["Humanities", "Business & Entrepreneurship"],
  },
  "Arts & Sports": {
    label: "Arts & Sports Science",
    color: "#e65100",
    bg: "#fff3e0",
    icon: "🎨",
    tracks: ["Performing Arts", "Visual Arts", "Sports Science"],
  },
};

// ── Anthropic API call ──────────────────────
async function fetchJobTrends(pathway, psychProfile) {
  const prompt = `You are a Kenyan career counselor with deep knowledge of the 2025/2026 CBE Senior School system and the current Kenyan job market.

A Grade 9 student has completed a psychometric assessment and scored highest for the **${pathway}** pathway.

Psychometric profile summary:
${psychProfile}

Generate a concise, data-informed career trends report for this student. Include:
1. **Top 5 in-demand careers** in Kenya right now for this pathway (with a short 1-sentence reason each is growing)
2. **Emerging roles** (2–3 jobs that didn't exist 5 years ago but are now in demand in Kenya)
3. **Kenya-specific context**: mention Vision 2030, Konza Technopolis, Big 4 Agenda, or other local drivers where relevant
4. **University/college paths** available in Kenya for top careers (mention specific Kenyan universities)
5. A short **motivational insight** (2 sentences max) personalized to this pathway

Format your response as clean JSON matching this structure exactly:
{
  "topCareers": [
    { "title": "...", "growth": "...", "salaryRange": "KES X–Y per month" }
  ],
  "emergingRoles": ["...", "...", "..."],
  "kenyaContext": "...",
  "universityPaths": [
    { "career": "...", "universities": ["...", "..."] }
  ],
  "motivationalInsight": "..."
}

Return only valid JSON, no markdown, no extra text.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  const raw = data.content.find((b) => b.type === "text")?.text || "{}";
  return JSON.parse(raw.replace(/```json|```/g, "").trim());
}

// ── Sub-components ───────────────────────────
function CareerCard({ career }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: 10,
        padding: "12px 16px",
        marginBottom: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <strong style={{ fontSize: 15, color: "#1a1a1a" }}>{career.title}</strong>
        <span
          style={{
            fontSize: 11,
            background: "#e8f5e9",
            color: "#2e7d32",
            borderRadius: 20,
            padding: "2px 10px",
            whiteSpace: "nowrap",
            marginLeft: 8,
          }}
        >
          {career.salaryRange}
        </span>
      </div>
      <p style={{ fontSize: 13, color: "#555", margin: "6px 0 0" }}>{career.growth}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#888", marginBottom: 10 }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

// ── Main Widget ──────────────────────────────
export default function JobTrendsWidget({ pathway = "STEM", psychProfile = "Strong analytical thinking, interest in technology and problem-solving, high numerical aptitude." }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPathway, setSelectedPathway] = useState(pathway);

  const config = PATHWAYS[selectedPathway] || PATHWAYS["STEM"];

  async function loadTrends() {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await fetchJobTrends(selectedPathway, psychProfile);
      setData(result);
    } catch (e) {
      setError("Could not load job trends. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTrends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPathway]);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        maxWidth: 560,
        margin: "0 auto",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        border: "1px solid #e8e8e8",
      }}
    >
      {/* Header */}
      <div style={{ background: config.color, padding: "20px 24px", color: "#fff" }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.8 }}>
          BrightPaths · Live Career Intelligence
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>
          {config.icon} {config.label} Job Trends
        </div>
        <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>
          Kenya market data · Updated in real-time
        </div>
      </div>

      {/* Pathway Switcher */}
      <div style={{ background: "#f8f9fa", padding: "12px 24px", display: "flex", gap: 8, borderBottom: "1px solid #e0e0e0" }}>
        {Object.keys(PATHWAYS).map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPathway(p)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              background: selectedPathway === p ? PATHWAYS[p].color : "#e0e0e0",
              color: selectedPathway === p ? "#fff" : "#555",
              transition: "all 0.2s",
            }}
          >
            {PATHWAYS[p].icon} {p}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 24px", background: "#fff" }}>
        {loading && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#999" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
            <div style={{ fontSize: 14 }}>Analysing Kenya job market trends…</div>
            <div style={{ fontSize: 12, marginTop: 6, color: "#bbb" }}>Powered by AI · Takes ~5 seconds</div>
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <div style={{ color: "#d32f2f", marginBottom: 12 }}>{error}</div>
            <button
              onClick={loadTrends}
              style={{ padding: "8px 20px", background: config.color, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
            >
              Try Again
            </button>
          </div>
        )}

        {data && (
          <>
            {/* Motivational insight */}
            <div
              style={{
                background: config.bg,
                borderLeft: `4px solid ${config.color}`,
                borderRadius: 8,
                padding: "12px 16px",
                marginBottom: 22,
                fontSize: 14,
                color: "#333",
                lineHeight: 1.6,
              }}
            >
              💡 {data.motivationalInsight}
            </div>

            <Section title="🚀 Top 5 In-Demand Careers in Kenya">
              {data.topCareers?.map((c, i) => <CareerCard key={i} career={c} />)}
            </Section>

            <Section title="✨ Emerging Roles (New in Kenya)">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {data.emergingRoles?.map((r, i) => (
                  <span
                    key={i}
                    style={{
                      background: config.bg,
                      color: config.color,
                      borderRadius: 20,
                      padding: "6px 14px",
                      fontSize: 13,
                      fontWeight: 600,
                      border: `1px solid ${config.color}33`,
                    }}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="🇰🇪 Kenya Context">
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>{data.kenyaContext}</p>
            </Section>

            <Section title="🎓 University Pathways in Kenya">
              {data.universityPaths?.map((u, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <strong style={{ fontSize: 13, color: "#333" }}>{u.career}:</strong>{" "}
                  <span style={{ fontSize: 13, color: "#666" }}>{u.universities?.join(", ")}</span>
                </div>
              ))}
            </Section>

            <button
              onClick={loadTrends}
              style={{
                width: "100%",
                padding: "10px",
                background: config.color,
                color: "#fff",
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                marginTop: 4,
              }}
            >
              🔄 Refresh Trends
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: "#f8f9fa", padding: "10px 24px", borderTop: "1px solid #e0e0e0", textAlign: "center" }}>
        <span style={{ fontSize: 11, color: "#aaa" }}>
          BrightPaths · KSEF 2025 Project · Data powered by Claude AI
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HOW TO USE IN LOVABLE:
//
// 1. Add this file to your Lovable project as
//    src/components/JobTrendsWidget.jsx
//
// 2. Import and use it on your results page:
//    import JobTrendsWidget from "@/components/JobTrendsWidget";
//    <JobTrendsWidget
//      pathway={studentTopPathway}   // "STEM" | "Social Sciences" | "Arts & Sports"
//      psychProfile={summaryString}  // Brief text summary of student's psych results
//    />
//
// 3. Pass the student's top-scoring pathway from
//    your psychometric test results into `pathway`
//    and a brief summary of their scores into
//    `psychProfile` for personalized AI insights.
// ─────────────────────────────────────────────
