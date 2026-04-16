import { useState } from "react";

// ── tiny helpers ─────────────────────────────────────────────
const S = {
  // reusable inline-style snippets
  card: {
    background: "#ffffff",
    borderRadius: "1.5rem",
    padding: "32px",
    boxShadow: "0 12px 40px rgba(24,29,23,0.06)",
  },
  tag: (bg, color) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: bg,
    color,
    padding: "4px 12px",
    borderRadius: "9999px",
    fontSize: "0.72rem",
    fontWeight: "700",
  }),
};

// ── static data ───────────────────────────────────────────────
const QUESTS = [
  { icon: "📖", label: "Complete 2 Focus Sessions",  progress: 1,   total: 2, coins: 50,  done: true  },
  { icon: "✏️", label: "Journal Study Progress",      progress: 0,   total: 1, coins: 25,  done: false },
  { icon: "🤝", label: "Cheer 5 Peer Scholars",       progress: 3,   total: 5, coins: 100, done: false },
  { icon: "🧪", label: "Upload a Study Document",     progress: 0,   total: 1, coins: 30,  done: false },
];

const ARCHIVE = [
  { title: "Advanced Macroeconomics",  tags: ["42m Reading", "Economics"], emoji: "📊" },
  { title: "Organic Synthesis Lab",    tags: ["1h 15m Writing", "Science"], emoji: "🧪" },
];

const BAR_HEIGHTS = [50, 75, 65, 100, 35, 15];
const BAR_DAYS    = ["M", "T", "W", "T", "F", "S"];

export default function Dashboard() {
  // xpProgress just tracks the XP bar width visually
  const [xp] = useState(84.5);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", flexDirection: "column", gap: "32px" }}>

      {/* ── ROW 1: Hero card + Focus quick-start ── */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>

        {/* Hero — greeting + XP + badges */}
        <div style={{ ...S.card, display: "flex", alignItems: "center", gap: "32px", position: "relative", overflow: "hidden" }}>
          {/* decorative blob */}
          <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", background: "rgba(13,99,27,0.05)", borderRadius: "9999px", filter: "blur(40px)" }} />

          {/* plant avatar */}
          <div style={{ width: "120px", height: "120px", flexShrink: 0, background: "#f1f5eb", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3.5rem", border: "4px solid #ffffff", boxShadow: "inset 0 2px 8px rgba(0,0,0,0.06)", position: "relative" }}>
            🌱
            <span style={{ position: "absolute", bottom: "4px", right: "4px", background: "#0d631b", color: "#fff", fontSize: "0.55rem", fontWeight: "800", padding: "2px 8px", borderRadius: "9999px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Happy</span>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "800", color: "#181d17", margin: 0, letterSpacing: "-0.02em" }}>Good morning, Alex!</h2>
              <p style={{ color: "#40493d", margin: "4px 0 0", fontSize: "0.9rem" }}>Your study buddy "Sprout" is thriving today.</p>
            </div>

            {/* XP bar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: "700", color: "#707a6c", textTransform: "uppercase", letterSpacing: "0.08em" }}>Level 12 Scholar XP</span>
                <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#0d631b" }}>8,450 / 10,000</span>
              </div>
              <div style={{ height: "10px", background: "#ebefe5", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${xp}%`, background: "#0d631b", borderRadius: "9999px", transition: "width 1s ease" }} />
              </div>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <span style={S.tag("#f1f5eb", "#181d17")}>🔥 5 Day Streak</span>
              <span style={S.tag("#f1f5eb", "#181d17")}>✨ Top 5% Student</span>
            </div>
          </div>
        </div>

        {/* Focus quick-start card */}
        <div style={{ background: "linear-gradient(135deg, #a3f69c, #c6e9be)", borderRadius: "1.5rem", padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden", boxShadow: "0 8px 30px rgba(13,99,27,0.15)" }}>
          <div style={{ position: "absolute", bottom: "-20px", right: "-20px", fontSize: "8rem", opacity: 0.08 }}>⏱</div>
          <div>
            <h3 style={{ fontWeight: "800", color: "#002204", margin: "0 0 8px", fontSize: "1.1rem" }}>Ready for focus?</h3>
            <p style={{ color: "#2d5a32", fontSize: "0.85rem", lineHeight: "1.6", margin: "0 0 20px" }}>Lock in for a session and earn double coins for the next 2 hours.</p>
            {/* mini timer display */}
            <div style={{ background: "rgba(255,255,255,0.35)", backdropFilter: "blur(10px)", borderRadius: "1rem", padding: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div>
                <p style={{ fontSize: "0.6rem", fontWeight: "700", color: "#002204", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>Set Timer</p>
                <p style={{ fontSize: "1.8rem", fontWeight: "900", color: "#002204", margin: 0 }}>25:00</p>
              </div>
              <div style={{ width: "48px", height: "48px", borderRadius: "9999px", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", cursor: "pointer" }}>▶</div>
            </div>
          </div>
          <button style={{ width: "100%", background: "#0d631b", color: "#ffffff", border: "none", padding: "12px", borderRadius: "9999px", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
            Customize Session
          </button>
        </div>
      </div>

      {/* ── ROW 2: Daily Quests + Study Rhythm ── */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "24px" }}>

        {/* Daily Quests */}
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h3 style={{ fontWeight: "800", color: "#181d17", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
              Daily Quests
              <span style={S.tag("#c6e9be", "#002204")}>2/4 DONE</span>
            </h3>
            <button style={{ background: "none", border: "none", color: "#0d631b", fontWeight: "700", fontSize: "0.85rem", cursor: "pointer" }}>View All</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {QUESTS.map((q) => (
              <div
                key={q.label}
                style={{
                  background: "#f7fbf0",
                  borderRadius: "1rem",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  // completed quests look faded
                  opacity: q.done ? 0.7 : 1,
                }}
              >
                {/* icon circle */}
                <div style={{ width: "44px", height: "44px", flexShrink: 0, background: "#ffffff", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", boxShadow: "0 2px 8px rgba(24,29,23,0.06)" }}>
                  {q.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: "700", color: "#181d17", margin: "0 0 6px", fontSize: "0.9rem", textDecoration: q.done ? "line-through" : "none" }}>{q.label}</p>
                  {/* progress bar */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "100px", height: "5px", background: "#ebefe5", borderRadius: "9999px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(q.progress / q.total) * 100}%`, background: q.done ? "#0d631b" : "#88d982", borderRadius: "9999px" }} />
                    </div>
                    <span style={{ fontSize: "0.65rem", fontWeight: "700", color: q.done ? "#0d631b" : "#707a6c" }}>{q.progress}/{q.total}</span>
                  </div>
                </div>

                {/* reward + checkmark */}
                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: "700", color: "#707a6c", textTransform: "uppercase", letterSpacing: "0.06em" }}>Reward</span>
                  <span style={{ fontWeight: "800", color: "#476644", fontSize: "0.9rem" }}>🪙 {q.coins}</span>
                </div>
                <span style={{ fontSize: "1.2rem" }}>{q.done ? "✅" : "⭕"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Study Rhythm */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* weekly bar chart */}
          <div style={{ ...S.card, flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: "700", color: "#707a6c", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>Weekly Focus</p>
                <h4 style={{ fontSize: "2rem", fontWeight: "900", color: "#181d17", margin: "4px 0 0" }}>12.5 hrs</h4>
              </div>
              <span style={S.tag("#a3f69c", "#002204")}>↑ 14%</span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "100px" }}>
              {BAR_HEIGHTS.map((h, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
                  <div style={{ width: "100%", height: `${h}%`, background: h === 100 ? "#0d631b" : `rgba(13,99,27,${h / 130})`, borderRadius: "6px 6px 0 0", alignSelf: "flex-end" }} />
                  <span style={{ fontSize: "0.6rem", color: "#707a6c", fontWeight: "600" }}>{BAR_DAYS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* rank badge */}
          <div style={{ background: "#c6e9be", borderRadius: "1rem", padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "44px", height: "44px", background: "rgba(255,255,255,0.4)", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem" }}>🏆</div>
              <div>
                <p style={{ fontWeight: "700", color: "#002204", margin: 0, fontSize: "0.9rem" }}>Rank: Silver III</p>
                <p style={{ fontSize: "0.72rem", color: "#476644", margin: "2px 0 0" }}>Top 15 scholars this week</p>
              </div>
            </div>
            <span style={{ color: "#476644", fontSize: "1.2rem" }}>›</span>
          </div>
        </div>
      </div>

      {/* ── ROW 3: Study Archive ── */}
      <div style={{ ...S.card }}>
        <h3 style={{ fontWeight: "800", color: "#181d17", margin: "0 0 24px", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: "10px" }}>
          📖 The Study Archive
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          {ARCHIVE.map((item) => (
            <div key={item.title} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* placeholder image area */}
              <div style={{ height: "140px", background: "#f1f5eb", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                {item.emoji}
              </div>
              <h4 style={{ fontWeight: "700", color: "#181d17", margin: 0 }}>{item.title}</h4>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {item.tags.map((t) => (
                  <span key={t} style={{ background: "#ebefe5", color: "#40493d", padding: "3px 10px", borderRadius: "6px", fontSize: "0.65rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}