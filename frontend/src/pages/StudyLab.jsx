import { useState } from "react";

// ============================================================
// WHAT IS useState?
// ============================================================
// useState is a React "hook" — a special function that gives
// your component MEMORY. Without it, every time your page
// re-renders, all your variables reset to zero.
//
// Syntax:  const [value, setValue] = useState(startingValue)
//
//   - "value"    → the current thing being stored
//   - "setValue" → the function you call to CHANGE it
//   - useState() → where you set what it starts as
//
// Example: const [count, setCount] = useState(0)
//   count starts at 0. Call setCount(5) → count becomes 5
//   React automatically re-draws the screen whenever you call
//   a setter function. That's the magic.
// ============================================================

// Hard-coded sample documents so we have something to display.
// In a real app, these would come from a database.
const SAMPLE_DOCS = [
  { id: 1, title: "Principles of Macroeconomics", edited: "2 hours ago",  color: "#c6e9be", textColor: "#476644" },
  { id: 2, title: "Neural Networks & Deep Learning", edited: "Yesterday",   color: "#ffd9e2", textColor: "#923357" },
  { id: 3, title: "Ancient History: The Silk Road",  edited: "3 days ago",  color: "#a3f69c", textColor: "#002204" },
];

// ============================================================
// WHAT IS A COMPONENT?
// ============================================================
// A component is just a JavaScript function that returns HTML-
// looking code (called JSX). React takes that and shows it
// on screen. You can split big pages into smaller components
// to keep things organized.
// ============================================================

// Small reusable component for each document card
// Props: doc (the document object), onAction (what to do when
//        Explain / Flashcards / Quiz is clicked)
//
// WHAT ARE PROPS?
// Props are how you pass data INTO a component.
// Like a function's arguments, but for React components.
// Parent passes info down; child reads it via { propName }.
function DocCard({ doc, onAction }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "1.5rem",
        padding: "24px",
        boxShadow: "0 4px 20px rgba(24,29,23,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "transform 0.15s",
        cursor: "default",
      }}
      // onMouseEnter / onMouseLeave are event listeners —
      // they fire when your mouse enters or leaves the element.
      // e.currentTarget is the actual DOM element being hovered.
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Colored icon badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: doc.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "1.4rem" }}>📄</span>
        </div>
        <span style={{ fontSize: "0.7rem", color: "#707a6c" }}>⏱ {doc.edited}</span>
      </div>

      {/* Title */}
      <h4 style={{ fontWeight: "700", color: "#181d17", margin: 0, fontSize: "0.95rem" }}>
        {doc.title}
      </h4>

      {/* Action buttons row */}
      {/* These are the Explain / Flashcards / Quiz buttons.
          When clicked, they call onAction() which was passed in
          as a prop from the parent (StudyLab). */}
      <div style={{ display: "flex", gap: "8px" }}>
        {["✨ Explain", "🃏 Flashcards", "📝 Quiz"].map((label) => (
          <button
            key={label}
            onClick={() => onAction(doc, label)}
            style={{
              flex: 1,
              padding: "8px 4px",
              borderRadius: "9999px",
              border: "none",
              background: "#f1f5eb",
              color: "#0d631b",
              fontWeight: "700",
              fontSize: "0.65rem",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#a3f69c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f1f5eb")}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// THE MAIN PAGE COMPONENT
// ============================================================
export default function StudyLab() {

  // ---- STATE VARIABLES ----
  // Think of these as the page's "live memory" — whenever any
  // of these change, React redraws only the parts that need it.

  // Which tab is selected: "upload", "documents", or "insights"
  const [activeTab, setActiveTab] = useState("upload");

  // Is a file being dragged over the drop zone right now?
  const [isDragging, setIsDragging] = useState(false);

  // List of files the user has selected/dropped
  // useState([]) means it starts as an empty array
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // A notification message to show at the top (or null = hide it)
  const [notification, setNotification] = useState(null);

  // ---- FUNCTIONS ----

  // Called when user drags a file OVER the drop zone
  // e.preventDefault() stops the browser from opening the file
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Called when user drags OUT of the drop zone without dropping
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Called when user DROPS a file onto the drop zone
  // e.dataTransfer.files is a browser API that gives you the
  // actual file objects the user dragged in
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  // Called when user clicks "Choose Files" and picks via dialog
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    addFiles(files);
  };

  // Adds new files to our uploadedFiles list.
  // The spread operator "..." means "copy everything already in
  // uploadedFiles, then tack the new ones on at the end"
  const addFiles = (files) => {
    setUploadedFiles((prev) => [...prev, ...files]);
    showNotification(`✅ ${files.length} file(s) added!`);
    setActiveTab("documents");
  };

  // Shows a notification for 3 seconds then hides it.
  // setTimeout is a browser built-in that runs code after a delay.
  // 3000 milliseconds = 3 seconds.
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Called when user clicks Explain / Flashcards / Quiz on a doc
  const handleDocAction = (doc, action) => {
    showNotification(`🚀 "${action}" coming soon for "${doc.title}"!`);
  };

  // Combines sample docs + anything the user uploaded.
  // .map() transforms each item in an array into something new —
  // here it turns a File object into a doc-shaped object DocCard can read.
  const allDocs = [
    ...SAMPLE_DOCS,
    ...uploadedFiles.map((file, i) => ({
      id: 100 + i,
      title: file.name,
      edited: "Just now",
      color: "#ebefe5",
      textColor: "#40493d",
    })),
  ];

  // ============================================================
  // THE RETURN — THIS IS WHAT GETS SHOWN ON SCREEN
  // Everything inside return() is JSX. It looks like HTML but
  // it's actually JavaScript. Key differences:
  //   - "className" instead of "class"  (class is reserved in JS)
  //   - style={{ }} uses JS objects, not CSS strings
  //   - {variable} curly braces let you drop live JS into markup
  // ============================================================
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ---- NOTIFICATION BANNER ----
          This only shows when "notification" is not null.
          The && operator means: "if the left side is truthy,
          render the right side". Like a one-sided if statement.  */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            background: "#0d631b",
            color: "#ffffff",
            padding: "14px 24px",
            borderRadius: "9999px",
            fontWeight: "700",
            fontSize: "0.9rem",
            zIndex: 1000,
            boxShadow: "0 8px 30px rgba(13,99,27,0.3)",
          }}
        >
          {notification}
        </div>
      )}

      {/* ---- PAGE HEADER ---- */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
        <div>
          <h2 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#181d17", margin: 0, letterSpacing: "-0.02em" }}>
            Study Lab
          </h2>
          <p style={{ color: "#707a6c", marginTop: "8px", fontSize: "1rem", lineHeight: "1.6" }}>
            Upload your notes and let AI turn them into structured insights.
          </p>
        </div>

        {/* Weekly goal card */}
        <div
          style={{
            background: "#c6e9be",
            borderRadius: "1.5rem",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            minWidth: "200px",
          }}
        >
          <div>
            <p style={{ fontSize: "0.65rem", fontWeight: "700", color: "#476644", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
              Weekly Goal
            </p>
            <p style={{ fontSize: "1.4rem", fontWeight: "800", color: "#002204", margin: "4px 0 0" }}>
              12 / 15 hrs
            </p>
          </div>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "9999px",
              border: "3px solid rgba(0,34,4,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              fontSize: "0.8rem",
              color: "#002204",
            }}
          >
            80%
          </div>
        </div>
      </div>

      {/* ---- TAB BAR ----
          .map() loops over the tabs array and makes a button
          for each one — cleaner than writing 3 buttons by hand. */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
        {[
          { id: "upload",    label: "📤 Upload" },
          { id: "documents", label: "📚 Documents" },
          { id: "insights",  label: "✨ AI Insights" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 24px",
              borderRadius: "9999px",
              border: "none",
              fontFamily: "inherit",
              fontWeight: "700",
              fontSize: "0.9rem",
              cursor: "pointer",
              // Ternary: condition ? valueIfTrue : valueIfFalse
              background: activeTab === tab.id ? "#0d631b" : "#f1f5eb",
              color:      activeTab === tab.id ? "#ffffff" : "#40493d",
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ---- TAB CONTENT ---- */}

      {/* UPLOAD TAB */}
      {activeTab === "upload" && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            background: isDragging ? "#f0fdf0" : "#ffffff",
            border: `2px dashed ${isDragging ? "#0d631b" : "#bfcaba"}`,
            borderRadius: "2rem",
            padding: "80px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "20px",
            transition: "all 0.2s",
            boxShadow: isDragging ? "0 0 0 6px rgba(13,99,27,0.1)" : "0 4px 20px rgba(24,29,23,0.05)",
          }}
        >
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "9999px",
              background: "#f1f5eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.8rem",
            }}
          >
            📁
          </div>

          <div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#181d17", margin: 0 }}>
              Import Your Manuscripts
            </h3>
            <p style={{ color: "#707a6c", marginTop: "8px" }}>
              Drag and drop PDFs here, or click below to browse your files
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            {/* The real file input is hidden (display:none).
                Clicking the <label> triggers it — common trick
                because <input type="file"> is ugly by default.  */}
            <label
              style={{
                background: "#0d631b",
                color: "#ffffff",
                padding: "14px 32px",
                borderRadius: "9999px",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "0.95rem",
              }}
            >
              Choose Files
              <input
                type="file"
                multiple
                accept=".pdf,.txt,.docx"
                style={{ display: "none" }}
                onChange={handleFileInput}
              />
            </label>

            <button
              onClick={() => showNotification("Google Drive integration coming in Step 4! 🚀")}
              style={{
                background: "#f1f5eb",
                color: "#40493d",
                padding: "14px 32px",
                borderRadius: "9999px",
                border: "none",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.95rem",
              }}
            >
              📂 From Drive
            </button>
          </div>

          <p style={{ fontSize: "0.8rem", color: "#bfcaba" }}>
            Supported: PDF, TXT, DOCX
          </p>
        </div>
      )}

      {/* DOCUMENTS TAB */}
      {activeTab === "documents" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "24px" }}>
            <div>
              <h3 style={{ fontWeight: "800", color: "#181d17", margin: 0 }}>Recent Documents</h3>
              <p style={{ color: "#707a6c", margin: "4px 0 0", fontSize: "0.85rem" }}>
                {allDocs.length} document{allDocs.length !== 1 ? "s" : ""} in your archive
              </p>
            </div>
            <button
              onClick={() => setActiveTab("upload")}
              style={{
                background: "#0d631b",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: "9999px",
                border: "none",
                fontWeight: "700",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.85rem",
              }}
            >
              + Add Document
            </button>
          </div>

          {/* CSS grid — auto-fill means "put as many columns as fit",
              each column being at least 280px wide.               */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {allDocs.map((doc) => (
              <DocCard key={doc.id} doc={doc} onAction={handleDocAction} />
            ))}
          </div>
        </div>
      )}

      {/* AI INSIGHTS TAB */}
      {activeTab === "insights" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          {/* Bar chart */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: "2rem",
              padding: "32px",
              boxShadow: "0 4px 20px rgba(24,29,23,0.05)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px" }}>
              <div>
                <h3 style={{ fontWeight: "800", color: "#181d17", margin: 0 }}>Knowledge Retention</h3>
                <p style={{ color: "#707a6c", fontSize: "0.85rem", margin: "4px 0 0" }}>This week</p>
              </div>
              <span
                style={{
                  background: "#a3f69c",
                  color: "#002204",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  fontWeight: "700",
                  fontSize: "0.75rem",
                }}
              >
                +12% vs last week
              </span>
            </div>

            {/* Each bar is a div — height is set as a % via inline style */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "160px" }}>
              {[40, 65, 55, 85, 45, 70, 95].map((height, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" }}>
                  <div
                    style={{
                      width: "100%",
                      height: `${height}%`,
                      background: height === 95 ? "#0d631b" : height > 70 ? "rgba(13,99,27,0.5)" : "rgba(13,99,27,0.2)",
                      borderRadius: "8px 8px 0 0",
                      alignSelf: "flex-end",
                    }}
                  />
                  <span style={{ fontSize: "0.65rem", color: "#707a6c" }}>
                    {["M","T","W","T","F","S","S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI recommendation card */}
          <div
            style={{
              background: "linear-gradient(135deg, #0d631b, #2e7d32)",
              borderRadius: "2rem",
              padding: "32px",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div>
              <p style={{ fontSize: "1.5rem", marginBottom: "8px" }}>✨</p>
              <h4 style={{ fontWeight: "800", margin: "0 0 8px", fontSize: "1.1rem" }}>AI Recommendation</h4>
              <p style={{ opacity: 0.85, lineHeight: "1.6", margin: 0, maxWidth: "400px" }}>
                You've mastered 85% of "Macroeconomics". Try a 15-minute quiz to lock in the remaining concepts before your exam.
              </p>
            </div>
            <button
              onClick={() => showNotification("Quiz feature coming in Step 5! 📝")}
              style={{
                background: "#ffffff",
                color: "#0d631b",
                padding: "14px 28px",
                borderRadius: "9999px",
                border: "none",
                fontWeight: "800",
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                fontSize: "0.9rem",
              }}
            >
              Start Quiz →
            </button>
          </div>
        </div>
      )}

      {/* ---- FLOATING ACTION BUTTON ----
          "position: fixed" means it stays in place even when you scroll.
          bottom + right pin it to the bottom-right corner.              */}
      <button
        onClick={() => setActiveTab("upload")}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          width: "64px",
          height: "64px",
          borderRadius: "9999px",
          background: "#0d631b",
          color: "#ffffff",
          border: "none",
          fontSize: "2rem",
          cursor: "pointer",
          boxShadow: "0 8px 30px rgba(13,99,27,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          transition: "transform 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        title="Upload new document"
      >
        +
      </button>
    </div>
  );
}