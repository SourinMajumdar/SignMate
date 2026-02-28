import { useNavigate } from "react-router-dom";

export default function HeroPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f7f9",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "16px", color: "#333" }}>
        SignMate
      </h1>

      <p style={{ fontSize: "18px", maxWidth: "500px", marginBottom: "30px", color: "#555" }}>
        Create professional email signatures in seconds.
        Multiple templates. Custom colors. One-click export.
      </p>

      <button
        onClick={() => navigate("/builder")}
        style={{
          padding: "14px 28px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          background: "#2563eb",
          color: "#fff",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Start Building
      </button>
    </div>
  );
}