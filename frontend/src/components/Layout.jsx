import Navbar from "./Navbar";
 
// Layout is the "shell" of the app.
// It renders the sidebar (Navbar) on the left,
// and whatever page content we pass as "children" on the right.
 
export default function Layout({ activePage, setActivePage, children }) {
  return (
    // Full screen, side-by-side flex row
    <div style={{ display: "flex", height: "100vh", background: "#f7fbf0" }}>
 
      {/* LEFT: Sidebar navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />
 
      {/* RIGHT: Main content area — renders whichever page is active */}
      <main
        style={{
          flex: 1,           // takes up all remaining space after the sidebar
          overflowY: "auto", // page content can scroll independently
          padding: "40px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
 