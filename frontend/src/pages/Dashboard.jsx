// Dashboard is just a React component — a function that returns JSX.
// Right now it's a placeholder so we can confirm routing works.
// We'll flesh this out in later steps.

export default function Dashboard() {
  return (
    <div>
      <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0d631b", marginBottom: "12px" }}>
        Dashboard
      </h2>
      <p style={{ color: "#40493d" }}>
        Welcome back! Your study overview will live here.
      </p>
    </div>
  );
}