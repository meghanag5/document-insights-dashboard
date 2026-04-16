import { useState } from "react";

// Static events that appear on specific days of the month
// We key them by day number so the calendar grid can look them up
const EVENTS = {
  4:  { label: "Research Meth...",   color: "#c6e9be", textColor: "#002204" },
  11: { label: "Macroeconomics Quiz", color: "#0d631b", textColor: "#ffffff" },
  19: { label: "Thesis Draft Due",   color: "#923357", textColor: "#ffffff" },
  24: { label: "Study Group",        color: "#a3f69c", textColor: "#002204" },
};

// Initial task list — useState will let the user check them off
const INITIAL_TASKS = [
  { id: 1, title: "Literature Review",  detail: "Read 3 papers on Neural Networks", time: "14:00", tag: "High Priority", tagColor: "#c6e9be", tagText: "#002204", done: false },
  { id: 2, title: "Library Drop-off",   detail: "Return history of art books",       time: null,   tag: null,            tagColor: null,    tagText: null,    done: true  },
  { id: 3, title: "Data Analysis",      detail: "Export SPSS results for Ch. 4",    time: null,   tag: "Research",      tagColor: "#f1f5eb", tagText: "#0d631b", done: false },
  { id: 4, title: "Group Meeting",      detail: "Sanctuary Study Hall – Room 302",  time: null,   tag: "4 People",      tagColor: "#ffd9e2", tagText: "#923357", done: false },
];

// Days of the week header labels
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// The September 2024 grid.
// null = a day from the previous or next month (greyed out)
// We build 5 rows × 7 cols = 35 cells
const GRID = [
  [null, null, null, null, null, null, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
];

export default function Calendar() {
  // tasks is an array; setTasks lets us update it
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTask, setNewTask] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [selectedDay, setSelectedDay] = useState(11); // today = 11

  // Toggle a task's "done" status by its ID
  // .map() creates a NEW array — we never mutate state directly in React
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // Add a new task to the list
  const addTask = () => {
    if (!newTask.trim()) return; // don't add empty tasks
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title: newTask, detail: "", time: null, tag: null, tagColor: null, tagText: null, done: false },
    ]);
    setNewTask("");
    setShowInput(false);
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", gap: "24px", height: "calc(100vh - 120px)" }}>

      {/* ── LEFT: Calendar grid ── */}
      <div style={{ flex: 2, background: "#ffffff", borderRadius: "1.5rem", padding: "32px", display: "flex", flexDirection: "column", boxShadow: "0 12px 40px rgba(24,29,23,0.06)", overflow: "hidden" }}>

        {/* header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <h2 style={{ fontWeight: "800", color: "#181d17", margin: 0, fontSize: "1.5rem", letterSpacing: "-0.02em" }}>September 2024</h2>
            <p style={{ color: "#707a6c", margin: "4px 0 0", fontSize: "0.85rem" }}>3 exams and 5 deadlines this month</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "#f1f5eb", padding: "6px", borderRadius: "9999px" }}>
            <button style={{ width: "36px", height: "36px", borderRadius: "9999px", border: "none", background: "transparent", cursor: "pointer", fontSize: "1rem" }}>‹</button>
            <button style={{ padding: "6px 18px", borderRadius: "9999px", border: "none", background: "#0d631b", color: "#fff", fontWeight: "700", fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit" }}>Today</button>
            <button style={{ width: "36px", height: "36px", borderRadius: "9999px", border: "none", background: "transparent", cursor: "pointer", fontSize: "1rem" }}>›</button>
          </div>
        </div>

        {/* day-of-week header */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "2px" }}>
          {WEEK_DAYS.map((d) => (
            <div key={d} style={{ padding: "10px", textAlign: "center", fontSize: "0.65rem", fontWeight: "700", color: "#707a6c", textTransform: "uppercase", letterSpacing: "0.1em", background: "#f7fbf0", borderRadius: "6px" }}>
              {d}
            </div>
          ))}
        </div>

        {/* calendar grid — each row is a week */}
        {/* flex: 1 + overflowHidden means the grid fills remaining space */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px", overflow: "hidden" }}>
          {GRID.map((week, wi) => (
            <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", flex: 1 }}>
              {week.map((day, di) => {
                const event   = day && EVENTS[day];
                const isToday = day === selectedDay;

                return (
                  <div
                    key={di}
                    onClick={() => day && setSelectedDay(day)}
                    style={{
                      background: "#ffffff",
                      borderRadius: "8px",
                      padding: "10px",
                      cursor: day ? "pointer" : "default",
                      // "today" gets a green ring; other days just hover subtly
                      outline: isToday ? "2px solid #0d631b" : "none",
                      outlineOffset: "-2px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => { if (day) e.currentTarget.style.background = "#f7fbf0"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#ffffff"; }}
                  >
                    <span style={{ fontSize: "0.8rem", fontWeight: day ? "700" : "400", color: day ? "#181d17" : "#bfcaba" }}>
                      {day || ""}
                    </span>
                    {/* if this day has an event, render its pill */}
                    {event && (
                      <div style={{ background: event.color, color: event.textColor, fontSize: "0.6rem", fontWeight: "700", padding: "3px 6px", borderRadius: "6px", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {event.label}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT: Focus alert + Tasks ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", minWidth: 0 }}>

        {/* Focus alert */}
        <div style={{ background: "linear-gradient(135deg, #0d631b, #2e7d32)", borderRadius: "1.5rem", padding: "24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: "-20px", bottom: "-20px", fontSize: "7rem", opacity: 0.08 }}>⚠️</div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <span style={{ fontSize: "0.85rem" }}>🚨</span>
              <span style={{ fontSize: "0.6rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#a3f69c" }}>Focus Alert</span>
            </div>
            <h3 style={{ fontWeight: "800", color: "#ffffff", margin: "0 0 8px", fontSize: "1.1rem" }}>Upcoming Exam</h3>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", lineHeight: "1.6", margin: "0 0 16px" }}>
              Advanced Calculus is in 48 hours. Start the recommended review session now for a 15% mastery boost.
            </p>
            <button style={{ background: "#ffffff", color: "#0d631b", border: "none", padding: "10px 24px", borderRadius: "9999px", fontWeight: "800", fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit" }}>
              Begin Prep
            </button>
          </div>
        </div>

        {/* Task list */}
        <div style={{ flex: 1, background: "#f1f5eb", borderRadius: "1.5rem", padding: "24px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontWeight: "800", color: "#181d17", margin: 0 }}>Daily Lab</h3>
            <button
              onClick={() => setShowInput((v) => !v)}
              style={{ width: "36px", height: "36px", borderRadius: "9999px", background: "#ffffff", border: "none", fontSize: "1.3rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#0d631b" }}
            >
              +
            </button>
          </div>

          {/* new task input — only shows when showInput is true */}
          {showInput && (
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                // pressing Enter also adds the task
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="New task..."
                style={{ flex: 1, padding: "10px 14px", borderRadius: "9999px", border: "none", outline: "none", background: "#ffffff", fontFamily: "inherit", fontSize: "0.85rem" }}
                autoFocus
              />
              <button onClick={addTask} style={{ padding: "10px 18px", borderRadius: "9999px", border: "none", background: "#0d631b", color: "#fff", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem" }}>
                Add
              </button>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, overflowY: "auto" }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{ background: task.done ? "rgba(255,255,255,0.5)" : "#ffffff", borderRadius: "1rem", padding: "14px", display: "flex", alignItems: "flex-start", gap: "12px", opacity: task.done ? 0.65 : 1, transition: "opacity 0.2s" }}
              >
                {/* checkbox — clicking toggles done */}
                <button
                  onClick={() => toggleTask(task.id)}
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "9999px",
                    border: task.done ? "none" : "2px solid #bfcaba",
                    background: task.done ? "#0d631b" : "transparent",
                    cursor: "pointer",
                    flexShrink: 0,
                    marginTop: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "0.7rem",
                  }}
                >
                  {task.done ? "✓" : ""}
                </button>

                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: "700", color: "#181d17", margin: 0, fontSize: "0.88rem", textDecoration: task.done ? "line-through" : "none" }}>{task.title}</p>
                  {task.detail && <p style={{ fontSize: "0.72rem", color: "#707a6c", margin: "3px 0 0", textDecoration: task.done ? "line-through" : "none" }}>{task.detail}</p>}
                  {(task.time || task.tag) && (
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                      {task.time && <span style={{ fontSize: "0.65rem", fontWeight: "700", color: "#923357" }}>⏰ {task.time}</span>}
                      {task.tag && <span style={{ background: task.tagColor, color: task.tagText, padding: "2px 10px", borderRadius: "9999px", fontSize: "0.62rem", fontWeight: "700" }}>{task.tag}</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* smart suggestion at the bottom */}
          <div style={{ marginTop: "16px", background: "#e5eadf", borderRadius: "1rem", padding: "14px", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", background: "#a3f69c", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>✨</div>
            <div>
              <p style={{ fontWeight: "700", color: "#181d17", margin: 0, fontSize: "0.78rem" }}>Smart Suggestion</p>
              <p style={{ fontSize: "0.68rem", color: "#707a6c", margin: "2px 0 0", lineHeight: 1.4 }}>You have a free hour before lunch. Perfect for the "Literature Review" task.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}