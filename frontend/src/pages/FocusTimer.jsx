import { useState, useEffect, useRef } from "react";

// useEffect  — runs code in response to something changing.
//   useEffect(() => { /* code */ }, [dependency])
//   The code runs whenever "dependency" changes.
//   If dependency is [], it runs ONCE when the component first loads.
//
// useRef     — like useState but changing it does NOT redraw the screen.
//   We use it here to hold the setInterval ID so we can cancel it later.

const PRESETS = [
  { label: "Pomodoro",   minutes: 25 },
  { label: "Short Break", minutes: 5  },
  { label: "Long Break",  minutes: 15 },
  { label: "Deep Work",   minutes: 50 },
];

const SOUNDS = [
  { id: "rain",   label: "Summer Rain", emoji: "🌧" },
  { id: "zen",    label: "Zen Garden",  emoji: "🌿" },
  { id: "cafe",   label: "Cafe Study",  emoji: "☕" },
  { id: "river",  label: "River Flow",  emoji: "🌊" },
];

const SESSION_HISTORY = [
  { subject: "Organic Chemistry", duration: "45 min", ago: "2h ago",   coins: 15, color: "#a3f69c",  textColor: "#002204" },
  { subject: "Art History",       duration: "25 min", ago: "Yesterday", coins: 8,  color: "#ffd9e2",  textColor: "#923357" },
  { subject: "Calculus III",      duration: "60 min", ago: "Yesterday", coins: 25, color: "#a3f69c",  textColor: "#002204" },
];

// Converts a total number of seconds into "MM:SS" format
// Math.floor(90 / 60) = 1   →  "1"
// 90 % 60 = 30              →  "30"
// padStart(2, "0") adds a leading zero so "5" becomes "05"
function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function FocusTimer() {
  const [preset, setPreset]         = useState(PRESETS[0]);      // which timer preset is selected
  const [seconds, setSeconds]       = useState(25 * 60);         // current countdown in seconds
  const [isRunning, setIsRunning]   = useState(false);           // is the timer ticking?
  const [activeSound, setActiveSound] = useState("zen");         // which ambient sound is "on"
  const [task, setTask]             = useState("Analyzing Mitochondrial RNA Patterns");

  // useRef holds the interval ID. We need it to call clearInterval() later.
  // It's a ref (not state) because we never need to RE-RENDER when it changes.
  const intervalRef = useRef(null);

  // Total seconds for the selected preset — used to calculate the ring's progress
  const totalSeconds = preset.minutes * 60;

  // ── timer tick logic ─────────────────────────────────────────
  // useEffect runs this code whenever "isRunning" changes.
  useEffect(() => {
    if (isRunning) {
      // setInterval calls the function every 1000ms (1 second)
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;  // count down by 1 each tick
        });
      }, 1000);
    } else {
      // if not running, cancel whatever interval might be active
      clearInterval(intervalRef.current);
    }

    // Cleanup function — React calls this before re-running the effect
    // or when the component is removed. Always clean up intervals!
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handlePreset = (p) => {
    setPreset(p);
    setSeconds(p.minutes * 60);
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(preset.minutes * 60);
  };

  // ── SVG ring math ─────────────────────────────────────────────
  // The circular progress ring is an SVG <circle> with a dashed stroke.
  // strokeDasharray = the full circumference (2 * π * radius)
  // strokeDashoffset = how much of that circumference to "hide"
  // As seconds count down, the offset increases → ring shrinks
  const RADIUS = 130;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;  // ≈ 816.8
  const progress      = seconds / totalSeconds; // 1.0 = full, 0.0 = empty
  const dashOffset    = CIRCUMFERENCE * (1 - progress);

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", gap: "24px", height: "calc(100vh - 120px)" }}>

      {/* ── LEFT PANEL: Session History ── */}
      <div style={{ width: "260px", flexShrink: 0, background: "#f1f5eb", borderRadius: "1.5rem", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", overflow: "hidden" }}>
        <h3 style={{ fontWeight: "800", color: "#40493d", margin: 0, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: "8px" }}>
          🕐 Session History
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, overflowY: "auto" }}>
          {SESSION_HISTORY.map((s, i) => (
            <div key={i} style={{ background: "#ffffff", borderRadius: "1rem", padding: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ background: s.color, color: s.textColor, padding: "2px 10px", borderRadius: "9999px", fontSize: "0.65rem", fontWeight: "700" }}>{s.subject}</span>
                <span style={{ fontSize: "0.65rem", color: "#707a6c" }}>{s.ago}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "700", color: "#181d17", fontSize: "0.85rem" }}>{s.duration}</span>
                <span style={{ fontWeight: "700", color: "#476644", fontSize: "0.8rem" }}>🪙 +{s.coins}</span>
              </div>
            </div>
          ))}
        </div>

        <button style={{ width: "100%", padding: "12px", borderRadius: "9999px", border: "1.5px solid rgba(13,99,27,0.2)", background: "transparent", color: "#0d631b", fontWeight: "700", fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit" }}>
          View Analytics
        </button>
      </div>

      {/* ── CENTER PANEL: The Timer ── */}
      <div style={{ flex: 1, background: "#ffffff", borderRadius: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", boxShadow: "0 12px 40px rgba(24,29,23,0.06)" }}>

        {/* subtle green glow at the bottom */}
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "400px", height: "200px", background: "rgba(13,99,27,0.05)", filter: "blur(60px)", borderRadius: "9999px" }} />

        {/* Preset tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "48px", background: "#f7fbf0", padding: "6px", borderRadius: "9999px" }}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => handlePreset(p)}
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                border: "none",
                fontFamily: "inherit",
                fontWeight: "700",
                fontSize: "0.78rem",
                cursor: "pointer",
                background: preset.label === p.label ? "#0d631b" : "transparent",
                color:      preset.label === p.label ? "#ffffff" : "#707a6c",
                transition: "all 0.15s",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* SVG ring */}
        <div style={{ position: "relative", width: "300px", height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
          >
            {/* background track */}
            <circle cx="150" cy="150" r={RADIUS} fill="none" stroke="#ebefe5" strokeWidth="12" />
            {/* progress arc — strokeDashoffset changes as time passes */}
            <circle
              cx="150" cy="150" r={RADIUS}
              fill="none"
              stroke="#0d631b"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>

          {/* center text */}
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <p style={{ fontSize: "0.6rem", fontWeight: "700", color: "#707a6c", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 8px" }}>Session Progress</p>
            <p style={{ fontSize: "3.5rem", fontWeight: "900", color: "#181d17", margin: 0, letterSpacing: "-0.03em", lineHeight: 1 }}>
              {formatTime(seconds)}
            </p>
            <p style={{ fontSize: "0.8rem", color: "#0d631b", fontWeight: "700", margin: "10px 0 0" }}>🌿 The Oasis Fern is Growing</p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "40px" }}>
          {/* reset */}
          <button
            onClick={handleReset}
            style={{ width: "56px", height: "56px", borderRadius: "9999px", background: "#f1f5eb", border: "none", fontSize: "1.3rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.1s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            🔄
          </button>

          {/* play / pause */}
          <button
            onClick={() => setIsRunning((r) => !r)}
            style={{ width: "88px", height: "88px", borderRadius: "9999px", background: "#0d631b", border: "none", fontSize: "2.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px rgba(13,99,27,0.35)", transition: "transform 0.1s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {/* ternary: if running show pause icon, else play */}
            {isRunning ? "⏸" : "▶"}
          </button>

          {/* settings */}
          <button
            style={{ width: "56px", height: "56px", borderRadius: "9999px", background: "#f1f5eb", border: "none", fontSize: "1.3rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.1s" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.08)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            ⚙️
          </button>
        </div>

        {/* Task badge — editable */}
        <div style={{ marginTop: "32px", background: "rgba(198,233,190,0.4)", padding: "10px 24px", borderRadius: "9999px", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.85rem" }}>✏️</span>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{ background: "transparent", border: "none", outline: "none", fontWeight: "700", fontSize: "0.85rem", color: "#002204", fontFamily: "inherit", width: "300px" }}
          />
        </div>
      </div>

      {/* ── RIGHT PANEL: Rewards + Sounds ── */}
      <div style={{ width: "260px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Session rewards */}
        <div style={{ background: "#f1f5eb", borderRadius: "1.5rem", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontWeight: "800", color: "#40493d", margin: 0, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>🎁 Session Rewards</h3>

          {[
            { emoji: "🪙", label: "Earn Potential", value: "+12 Coins" },
            { emoji: "⬆️", label: "XP Boost",       value: "150 XP"   },
          ].map((r) => (
            <div key={r.label} style={{ background: "#ffffff", borderRadius: "1rem", padding: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", background: "#a3f69c", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{r.emoji}</div>
              <div>
                <p style={{ fontSize: "0.65rem", color: "#707a6c", margin: 0 }}>{r.label}</p>
                <p style={{ fontWeight: "800", color: "#181d17", margin: "2px 0 0", fontSize: "1rem" }}>{r.value}</p>
              </div>
            </div>
          ))}

          {/* milestone progress */}
          <div style={{ background: "#c6e9be", borderRadius: "1rem", padding: "14px" }}>
            <p style={{ fontSize: "0.6rem", fontWeight: "700", color: "#002204", opacity: 0.8, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Milestone Progress</p>
            <div style={{ height: "6px", background: "rgba(0,34,4,0.15)", borderRadius: "9999px", overflow: "hidden", marginBottom: "8px" }}>
              <div style={{ width: "75%", height: "100%", background: "#0d631b", borderRadius: "9999px" }} />
            </div>
            <p style={{ fontSize: "0.68rem", color: "#002204", margin: 0, lineHeight: 1.5 }}>
              Reach 3 hours of Deep Work today to unlock the <strong>"Golden Lotus"</strong> emblem.
            </p>
          </div>
        </div>

        {/* Oasis sounds */}
        <div style={{ background: "#f1f5eb", borderRadius: "1.5rem", padding: "24px", flex: 1 }}>
          <h3 style={{ fontWeight: "800", color: "#40493d", margin: "0 0 16px", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>🎵 Oasis Sounds</h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {SOUNDS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSound(s.id)}
                style={{
                  padding: "12px 8px",
                  borderRadius: "1rem",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  background: activeSound === s.id ? "#0d631b" : "#ffffff",
                  color:      activeSound === s.id ? "#ffffff" : "#0d631b",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>{s.emoji}</span>
                <span style={{ fontSize: "0.62rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</span>
              </button>
            ))}
          </div>

          {/* volume slider */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px" }}>
            <span style={{ fontSize: "0.9rem" }}>🔉</span>
            <input type="range" defaultValue={65} style={{ flex: 1, accentColor: "#0d631b" }} />
            <span style={{ fontSize: "0.9rem" }}>🔊</span>
          </div>
        </div>
      </div>

    </div>
  );
}