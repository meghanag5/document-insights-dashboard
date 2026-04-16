// Each nav item: what text to show, and what page key it maps to
const NAV_ITEMS = [
  { label: "Dashboard",    page: "dashboard"   },
  { label: "Study Lab",    page: "studylab"    },
  { label: "Focus Timer",  page: "focustimer"  },
  { label: "Calendar",     page: "calendar"    },
];

export default function Navbar({ activePage, setActivePage }) {
  return (
    <aside
      style={{
        width: "240px",
        height: "100vh",
        background: "#f1f5eb",    // surface-container-low from the design system
        display: "flex",
        flexDirection: "column",
        padding: "32px 16px",
        gap: "8px",
      }}
    >
      {/* App title */}
      <div style={{ padding: "0 16px", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0d631b", margin: 0 }}>
          Study Buddy
        </h1>
        <p style={{ fontSize: "0.75rem", color: "#707a6c", margin: "4px 0 0" }}>
          Your academic sanctuary
        </p>
      </div>

      {/* Nav buttons — one per page */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.page;

          return (
            <button
              key={item.page}
              onClick={() => setActivePage(item.page)} // ← this is the magic: switch the page
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "12px 20px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.95rem",
                fontWeight: isActive ? "700" : "500",
                // Active page gets a green highlight; inactive is transparent
                background: isActive ? "#a3f69c" : "transparent",
                color:      isActive ? "#002204" : "#40493d",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}