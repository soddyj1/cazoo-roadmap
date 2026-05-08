import { useState } from "react";

const EPICS = [
  {
    key: "SS-28", name: "Service Desk", jira: "SS-28",
    primaryTheme: "Dealer Value", okrs: ["O1", "O2"],
    half: "H1", quarter: "Q1-Q2",
    outcome: "RETAIN DEALERS",
    tagline: "Everything Zendesk promises, built natively in Salesforce",
    stories: 20,
    teams: ["CS"],
    highlight: "Structured cases · SLAs · CSAT · Auto-chase · Contact forms"
  },
  {
    key: "SS-83", name: "Onboarding Revamp", jira: "SS-83",
    primaryTheme: "Dealer Value", okrs: ["O1"],
    half: "H1", quarter: "Q1-Q2",
    outcome: "RETAIN DEALERS",
    tagline: "Every dealer activated within 10 business days, fully tracked",
    stories: 6,
    teams: ["Onboarding"],
    highlight: "8 case stages · SLAs · Auto-creation · Reactivating dealers"
  },
  {
    key: "SS-84", name: "Account Lifecycle & Pipeline", jira: "SS-84",
    primaryTheme: "Commercial Growth", okrs: ["O1", "O2"],
    half: "H1", quarter: "Q1-Q2",
    outcome: "GROW REVENUE",
    tagline: "Qualifying → Onboarding → Live → Lapsed → Reactivating. Fully automated.",
    stories: 11,
    teams: ["AM", "KAM", "TSNB"],
    highlight: "Lifestage automation · Health RAG · Winback pipeline · Collision prevention"
  },
  {
    key: "SS-85", name: "Opportunity Management", jira: "SS-85",
    primaryTheme: "Commercial Growth", okrs: ["O1"],
    half: "H1", quarter: "Q1-Q2",
    outcome: "GROW REVENUE",
    tagline: "If a commercial event is happening, it should look like a deal",
    stories: 16,
    teams: ["Sales", "AM"],
    highlight: "Cancellation · Suspension · GSOU · Overposting · Forecasting"
  },
  {
    key: "SS-181", name: "Lead Management", jira: "SS-181",
    primaryTheme: "Commercial Growth", okrs: ["O1"],
    half: "H1", quarter: "Q2",
    outcome: "GROW REVENUE",
    tagline: "No lead sits unworked. No rep wastes time on the wrong dealer.",
    stories: 8,
    teams: ["TSNB"],
    highlight: "8 lead stages · MC engagement · Inbound SLA · Winback routing"
  },
  {
    key: "SS-182", name: "Sales Engagement", jira: "SS-182",
    primaryTheme: "Commercial Growth", okrs: ["O1"],
    half: "H2", quarter: "Q3",
    outcome: "GROW REVENUE",
    tagline: "Cadences as a controlled, governed tool — not a free-for-all",
    stories: 3,
    teams: ["Sales", "AM"],
    highlight: "SF team creates cadences only · Governance model · Activity capture"
  },
  {
    key: "SS-86", name: "AM Optimisation", jira: "SS-86",
    primaryTheme: "Dealer Value", okrs: ["O1", "O2"],
    half: "H1", quarter: "Q2",
    outcome: "RETAIN DEALERS",
    tagline: "Lists deliver the work. You deliver the results.",
    stories: 8,
    teams: ["AM"],
    highlight: "Action Today · 6 list views · Callback model · Manager dashboard"
  },
  {
    key: "SS-87", name: "Single Source of Truth", jira: "SS-87",
    primaryTheme: "Data Quality", okrs: ["O1", "O2", "O3"],
    half: "H1", quarter: "Q1-Q2",
    outcome: "TRUST THE DATA",
    tagline: "If it's not in Salesforce, it does not exist",
    stories: 10,
    teams: ["All"],
    highlight: "TAFKAR · MAT · Dealer Centre · MC sync · Spreadsheet retirement"
  },
  {
    key: "SS-88", name: "Platform & Homepages", jira: "SS-88",
    primaryTheme: "Adoption", okrs: ["O1", "O3"],
    half: "H2", quarter: "Q3-Q4",
    outcome: "BUILD THE PLATFORM",
    tagline: "Log in and immediately know what your day looks like",
    stories: 9,
    teams: ["All"],
    highlight: "5 bespoke homepages · Console apps · Page layouts · Vonage · TimeWarped"
  },
  {
    key: "SS-108", name: "KAM & Salesforce Maps", jira: "SS-108",
    primaryTheme: "Dealer Value", okrs: ["O1"],
    half: "H2", quarter: "Q3",
    outcome: "GROW REVENUE",
    tagline: "Spend more time in front of dealers, less time planning how to get there",
    stories: 8,
    teams: ["KAM"],
    highlight: "Territory design · Route optimisation · Visit logging · Coverage gaps"
  },
  {
    key: "SS-89", name: "Einstein & Agentforce", jira: "SS-89",
    primaryTheme: "Dealer Value", okrs: ["O1", "O2"],
    half: "H2", quarter: "Q3-Q4",
    outcome: "BUILD THE PLATFORM",
    tagline: "AI on stable foundations — not on top of chaos",
    stories: 7,
    teams: ["CS", "AM"],
    highlight: "Case summaries · Prompt templates · Next Best Action · Agentforce bot"
  },
  {
    key: "SS-177", name: "Salesforce Voice", jira: "SS-177",
    primaryTheme: "Ops Efficiency", okrs: ["O1", "O2"],
    half: "H2", quarter: "Q4",
    outcome: "BUILD THE PLATFORM",
    tagline: "Every call captured, contextual, and connected — without leaving Salesforce",
    stories: 1,
    teams: ["CS", "AM", "Sales"],
    highlight: "Transcription · Sentiment analysis · Whisper coaching · Screen pop · Amazon Connect"
  },
];

const OUTCOMES = [
  {
    id: "GROW REVENUE",
    label: "Grow Revenue",
    icon: "📈",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
    desc: "New business, upsell, pipeline structure"
  },
  {
    id: "RETAIN DEALERS",
    label: "Retain Dealers",
    icon: "🤝",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    desc: "CS, onboarding, save pipeline, experience"
  },
  {
    id: "TRUST THE DATA",
    label: "Trust the Data",
    icon: "🎯",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.25)",
    desc: "Single source of truth, integrations, clean data"
  },
  {
    id: "BUILD THE PLATFORM",
    label: "Build the Platform",
    icon: "⚡",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.25)",
    desc: "Foundations that make everything else possible"
  },
];

const OKR_COLORS = {
  "O1": { bg: "#10b981", label: "O1 · Grow" },
  "O2": { bg: "#f59e0b", label: "O2 · Trust" },
  "O3": { bg: "#8b5cf6", label: "O3 · Culture" },
};

const HALF_COLORS = {
  "H1": "#FF5033",
  "H2": "#01190E",
};

export default function App() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [okrFilter, setOkrFilter] = useState("ALL");
  const [view, setView] = useState("landscape");

  const filteredEpics = EPICS.filter(e => {
    const outcomeMatch = filter === "ALL" || e.outcome === filter;
    const okrMatch = okrFilter === "ALL" || e.okrs.includes(okrFilter);
    return outcomeMatch && okrMatch;
  });

  const epicsByOutcome = OUTCOMES.map(o => ({
    ...o,
    epics: filteredEpics.filter(e => e.outcome === o.id)
  }));

  const totalStories = EPICS.reduce((s, e) => s + e.stories, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#01190E",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#fff",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #01190E 0%, #0a2a18 100%)",
        borderBottom: "1px solid rgba(131,242,151,0.15)",
        padding: "32px 40px 24px",
        position: "sticky", top: 0, zIndex: 100,
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{
                background: "#FF5033",
                borderRadius: 6,
                width: 10, height: 10,
              }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#83F297", textTransform: "uppercase" }}>
                Cazoo · Salesforce Product
              </span>
            </div>
            <h1 style={{
              fontSize: "clamp(24px, 4vw, 42px)",
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: -1,
              color: "#fff",
            }}>
              2027 Roadmap
            </h1>
            <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
              {EPICS.length} Epics · {totalStories}+ Stories · 4 Strategic Outcomes
            </p>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            {/* View toggle */}
            <div style={{
              display: "flex",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 8,
              padding: 3,
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              {["landscape", "okr"].map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: "none",
                  background: view === v ? "#FF5033" : "transparent",
                  color: view === v ? "#fff" : "rgba(255,255,255,0.5)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textTransform: "capitalize",
                }}>
                  {v === "landscape" ? "Epic Landscape" : "OKR Heat Map"}
                </button>
              ))}
            </div>

            {/* OKR filter */}
            <div style={{ display: "flex", gap: 6 }}>
              {["ALL", "O1", "O2", "O3"].map(o => (
                <button key={o} onClick={() => setOkrFilter(o)} style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  border: `1px solid ${okrFilter === o ? "#83F297" : "rgba(255,255,255,0.12)"}`,
                  background: okrFilter === o ? "rgba(131,242,151,0.12)" : "transparent",
                  color: okrFilter === o ? "#83F297" : "rgba(255,255,255,0.5)",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: 1,
                }}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Outcome filter pills */}
        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          <button onClick={() => setFilter("ALL")} style={{
            padding: "6px 16px",
            borderRadius: 20,
            border: `1px solid ${filter === "ALL" ? "#FF5033" : "rgba(255,255,255,0.1)"}`,
            background: filter === "ALL" ? "rgba(255,80,51,0.12)" : "transparent",
            color: filter === "ALL" ? "#FF5033" : "rgba(255,255,255,0.45)",
            fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5,
          }}>
            All Epics
          </button>
          {OUTCOMES.map(o => (
            <button key={o.id} onClick={() => setFilter(o.id)} style={{
              padding: "6px 16px",
              borderRadius: 20,
              border: `1px solid ${filter === o.id ? o.color : "rgba(255,255,255,0.1)"}`,
              background: filter === o.id ? o.bg : "transparent",
              color: filter === o.id ? o.color : "rgba(255,255,255,0.45)",
              fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5,
              display: "flex", alignItems: "center", gap: 5,
            }}>
              <span>{o.icon}</span> {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: "32px 40px" }}>
        {view === "landscape" ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {epicsByOutcome.filter(o => o.epics.length > 0).map(outcome => (
              <div key={outcome.id}>
                {/* Outcome header */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10,
                  marginBottom: 14,
                  paddingBottom: 12,
                  borderBottom: `2px solid ${outcome.color}`,
                }}>
                  <span style={{ fontSize: 20 }}>{outcome.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: outcome.color, textTransform: "uppercase" }}>
                      {outcome.label}
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>
                      {outcome.desc}
                    </div>
                  </div>
                  <div style={{
                    marginLeft: "auto",
                    background: outcome.bg,
                    border: `1px solid ${outcome.border}`,
                    borderRadius: 20,
                    padding: "2px 10px",
                    fontSize: 11,
                    fontWeight: 700,
                    color: outcome.color,
                  }}>
                    {outcome.epics.length}
                  </div>
                </div>

                {/* Epic cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {outcome.epics.map(epic => (
                    <div
                      key={epic.key}
                      onClick={() => setSelected(selected?.key === epic.key ? null : epic)}
                      style={{
                        background: selected?.key === epic.key
                          ? `linear-gradient(135deg, ${outcome.bg}, rgba(255,255,255,0.04))`
                          : "rgba(255,255,255,0.04)",
                        border: `1px solid ${selected?.key === epic.key ? outcome.color : "rgba(255,255,255,0.08)"}`,
                        borderRadius: 12,
                        padding: "14px 16px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={e => {
                        if (selected?.key !== epic.key) {
                          e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                        }
                      }}
                      onMouseLeave={e => {
                        if (selected?.key !== epic.key) {
                          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                        }
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                            <span style={{
                              fontSize: 10, fontWeight: 700, letterSpacing: 1,
                              color: "rgba(255,255,255,0.35)",
                              fontFamily: "monospace",
                            }}>
                              {epic.jira}
                            </span>
                            <span style={{
                              fontSize: 10, fontWeight: 700,
                              background: HALF_COLORS[epic.half],
                              color: epic.half === "H1" ? "#fff" : "#83F297",
                              borderRadius: 4,
                              padding: "1px 6px",
                            }}>
                              {epic.quarter}
                            </span>
                          </div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>
                            {epic.name}
                          </div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3, lineHeight: 1.4 }}>
                            {epic.tagline}
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                          <div style={{
                            fontSize: 11, fontWeight: 700,
                            color: outcome.color,
                            background: outcome.bg,
                            border: `1px solid ${outcome.border}`,
                            borderRadius: 6,
                            padding: "2px 8px",
                            whiteSpace: "nowrap",
                          }}>
                            {epic.stories} stories
                          </div>
                        </div>
                      </div>

                      {/* OKR badges */}
                      <div style={{ display: "flex", gap: 5, marginTop: 10, flexWrap: "wrap" }}>
                        {epic.okrs.map(o => (
                          <span key={o} style={{
                            fontSize: 9, fontWeight: 800, letterSpacing: 0.5,
                            background: OKR_COLORS[o].bg,
                            color: "#fff",
                            borderRadius: 4,
                            padding: "2px 6px",
                          }}>
                            {OKR_COLORS[o].label}
                          </span>
                        ))}
                        {epic.teams.map(t => (
                          <span key={t} style={{
                            fontSize: 9, fontWeight: 700,
                            background: "rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.5)",
                            borderRadius: 4,
                            padding: "2px 6px",
                          }}>
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Expanded detail */}
                      {selected?.key === epic.key && (
                        <div style={{
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: `1px solid ${outcome.border}`,
                        }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: outcome.color, marginBottom: 6, letterSpacing: 0.5 }}>
                            KEY DELIVERABLES
                          </div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                            {epic.highlight.split(" · ").map((h, i) => (
                              <span key={i}>
                                <span style={{ color: "#83F297", marginRight: 4 }}>→</span>
                                {h}
                                {i < epic.highlight.split(" · ").length - 1 && <br />}
                              </span>
                            ))}
                          </div>
                          <a
                            href={`https://motors-uk.atlassian.net/browse/${epic.jira}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={e => e.stopPropagation()}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              marginTop: 10,
                              fontSize: 11,
                              fontWeight: 700,
                              color: outcome.color,
                              textDecoration: "none",
                              background: outcome.bg,
                              border: `1px solid ${outcome.border}`,
                              borderRadius: 6,
                              padding: "5px 10px",
                            }}
                          >
                            Open in Jira ↗
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* OKR Heat Map view */
          <OKRHeatMap epics={filteredEpics} />
        )}
      </div>

      {/* Timeline bar */}
      <div style={{
        margin: "8px 40px 40px",
        background: "rgba(255,255,255,0.03)",
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 24px",
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>
          Delivery Timeline 2027
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {["H1", "H2"].map(half => {
            const halfEpics = EPICS.filter(e => e.half === half);
            return (
              <div key={half} style={{
                background: half === "H1" ? "rgba(255,80,51,0.06)" : "rgba(1,25,14,0.4)",
                border: `1px solid ${half === "H1" ? "rgba(255,80,51,0.2)" : "rgba(131,242,151,0.1)"}`,
                borderRadius: 8,
                padding: "12px 16px",
              }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: half === "H1" ? "#FF5033" : "#83F297", marginBottom: 8 }}>
                  {half === "H1" ? "H1 · Jan – Jun" : "H2 · Jul – Dec"}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {halfEpics.map(e => (
                    <span key={e.key} style={{
                      fontSize: 10, fontWeight: 600,
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.55)",
                      borderRadius: 4,
                      padding: "2px 8px",
                    }}>
                      {e.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OKRHeatMap({ epics }) {
  const okrs = ["O1", "O2", "O3"];
  const outcomes = OUTCOMES;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
          How each Epic maps to our three OKRs. Darker cells = stronger contribution.
          Epics that fuel all three OKRs are your highest-value investments.
        </div>
      </div>

      {/* OKR legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        {[
          { okr: "O1", label: "O1 — Grow our business by being a valued partner to dealers", color: "#10b981" },
          { okr: "O2", label: "O2 — Increase dealers' trust in the Cazoo brand", color: "#f59e0b" },
          { okr: "O3", label: "O3 — Build Cazoo's fearless & dynamic culture", color: "#8b5cf6" },
        ].map(o => (
          <div key={o.okr} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 3, background: o.color }} />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{o.label}</span>
          </div>
        ))}
      </div>

      {/* Heat map table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 4 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: 1, width: "40%" }}>
                EPIC
              </th>
              {okrs.map(o => (
                <th key={o} style={{
                  padding: "8px 12px", fontSize: 11, fontWeight: 800,
                  color: OKR_COLORS[o].bg,
                  letterSpacing: 1, textAlign: "center",
                  background: `${OKR_COLORS[o].bg}15`,
                  borderRadius: 6,
                }}>
                  {OKR_COLORS[o].label}
                </th>
              ))}
              <th style={{ textAlign: "center", padding: "8px 12px", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: 1 }}>
                OUTCOME
              </th>
            </tr>
          </thead>
          <tbody>
            {epics.map(epic => {
              const outcome = OUTCOMES.find(o => o.id === epic.outcome);
              return (
                <tr key={epic.key}>
                  <td style={{ padding: "6px 12px" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{epic.name}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>{epic.jira} · {epic.quarter}</div>
                  </td>
                  {okrs.map(o => {
                    const has = epic.okrs.includes(o);
                    return (
                      <td key={o} style={{ textAlign: "center", padding: "6px 8px" }}>
                        <div style={{
                          margin: "0 auto",
                          width: 36, height: 36,
                          borderRadius: 8,
                          background: has ? `${OKR_COLORS[o].bg}30` : "rgba(255,255,255,0.02)",
                          border: `1px solid ${has ? `${OKR_COLORS[o].bg}60` : "rgba(255,255,255,0.04)"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: has ? 16 : 12,
                        }}>
                          {has ? "●" : "·"}
                        </div>
                      </td>
                    );
                  })}
                  <td style={{ textAlign: "center", padding: "6px 8px" }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      color: outcome?.color,
                      background: outcome?.bg,
                      border: `1px solid ${outcome?.border}`,
                      borderRadius: 20, padding: "3px 10px",
                      whiteSpace: "nowrap",
                    }}>
                      {outcome?.icon} {outcome?.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* OKR summary counts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 28 }}>
        {okrs.map(o => {
          const count = epics.filter(e => e.okrs.includes(o)).length;
          return (
            <div key={o} style={{
              background: `${OKR_COLORS[o].bg}15`,
              border: `1px solid ${OKR_COLORS[o].bg}30`,
              borderRadius: 10,
              padding: "16px 20px",
            }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: OKR_COLORS[o].bg, lineHeight: 1 }}>{count}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                Epics fuelling {OKR_COLORS[o].label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
