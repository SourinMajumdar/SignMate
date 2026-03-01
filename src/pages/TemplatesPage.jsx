import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";


const TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    label: "Traditional & bold",
    desc: "The standard professional look. Name prominent at the top with clearly separated contact rows.",
    color: "#2563eb",
    preview: (color) => (
      <div style={{ fontFamily: "Arial", fontSize: 13, lineHeight: 1.7 }}>
        <strong style={{ color, display: "block", fontSize: 15 }}>
          Sarah Chen
        </strong>
        <span style={{ color: "#64748b", display: "block" }}>
          Senior Designer
        </span>
        <span style={{ color: "#64748b", display: "block" }}>
          Acme Corporation
        </span>
        <div
          style={{ height: 1, background: color + "30", margin: "8px 0" }}
        />
        <div style={{ color: "#64748b" }}>📞 +1 (555) 234‑5678</div>
        <div style={{ color }}>🌐 acmecorp.com</div>
      </div>
    ),
  },
  {
    id: "compact",
    name: "Compact",
    label: "All in one row",
    desc: "Efficient and concise. Fits everything on a couple of clean lines.",
    color: "#16a34a",
    preview: (color) => (
      <div style={{ fontFamily: "Arial", fontSize: 13, lineHeight: 1.7 }}>
        <div>
          <strong style={{ color }}>Sarah Chen</strong>
          <span style={{ color: "#64748b" }}> · Senior Designer · Acme</span>
        </div>
        <div style={{ color: "#64748b" }}>📞 +1 (555) 234‑5678</div>
        <div style={{ color }}>🌐 acmecorp.com</div>
      </div>
    ),
  },
  {
    id: "minimal",
    name: "Minimal",
    label: "Clean & simple",
    desc: "Maximum whitespace, minimal content. Best for design‑forward professionals.",
    color: "#9333ea",
    preview: (color) => (
      <div style={{ fontFamily: "Arial", fontSize: 13, lineHeight: 1.7 }}>
        <strong style={{ color, display: "block", fontSize: 15 }}>
          Sarah Chen
        </strong>
        <span style={{ color: "#64748b", display: "block" }}>
          Senior Designer — Acme Corporation
        </span>
        <div style={{ color, marginTop: 6 }}>🌐 acmecorp.com</div>
      </div>
    ),
  },
  {
    id: "inline",
    name: "Inline",
    label: "Horizontal flow",
    desc: "Everything on a single line. Ultra‑compact for short signature requirements.",
    color: "#ea580c",
    preview: (color) => (
      <div style={{ fontFamily: "Arial", fontSize: 13, lineHeight: 1.7 }}>
        <div style={{ color: "#64748b" }}>
          <strong style={{ color }}>Sarah Chen</strong>
          {" | Senior Designer | Acme Corp"}
        </div>
        <div style={{ color: "#64748b" }}>
          {"📞 +1 (555) 234‑5678 | 🌐 acmecorp.com"}
        </div>
      </div>
    ),
  },
  {
    id: "card",
    name: "Card",
    label: "Boxed with border",
    desc: "Visually distinct bordered card layout. Stands out in any inbox.",
    color: "#0891b2",
    preview: (color) => (
      <table
        cellPadding="5"
        cellSpacing="0"
        style={{
          fontFamily: "Arial",
          fontSize: 13,
          border: "1px solid #e2e8f0",
          width: "100%",
        }}
      >
        <tbody>
          <tr>
            <td>
              <strong style={{ color, fontSize: 15 }}>Sarah Chen</strong>
            </td>
          </tr>
          <tr>
            <td style={{ color: "#64748b" }}>Senior Designer</td>
          </tr>
          <tr>
            <td style={{ color: "#64748b" }}>Acme Corporation</td>
          </tr>
          <tr>
            <td style={{ color: "#64748b" }}>📞 +1 (555) 234‑5678</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "modern",
    name: "Modern",
    label: "Photo + social icons",
    desc: "Side-by-side photo and info with LinkedIn & Instagram icon links. Polished and email-safe.",
    color: "#7c3aed",
    preview: (color) => (
      <div style={{ fontFamily: "Arial", fontSize: 13, lineHeight: 1.6, display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${color}, ${color}cc)`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: 16 }}>SC</div>
        <div>
          <strong style={{ color, display: "block", fontSize: 14 }}>Sarah Chen</strong>
          <span style={{ color: "#64748b", display: "block" }}>Senior Designer · Acme</span>
          <div style={{ color: "#64748b", marginTop: 3 }}>📞 +1 (555) 234‑5678</div>
          <div style={{ marginTop: 4, display: "flex", gap: 6 }}>
            <span style={{ fontSize: 11, color: "#0077b5", fontWeight: 600 }}>in</span>
            <span style={{ fontSize: 11, color: "#e1306c", fontWeight: 600 }}>ig</span>
            <span style={{ fontSize: 11, color, fontWeight: 600 }}>🌐</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function TemplatesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      <div className="pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary text-sm font-bold px-5 py-2.5 rounded-full mb-5 sm:mb-6">
              6 templates available
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-text-base tracking-tight mb-4 sm:mb-5">
              Template Gallery
            </h1>
            <p className="text-base sm:text-xl text-text-muted max-w-xl mx-auto leading-relaxed">
              Choose a starting point and customize colors, info, and social
              links in the builder.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
            {TEMPLATES.map(({ id, name, label, desc, color, preview }, i) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-surface rounded-2xl border border-border-base p-6 sm:p-8 flex flex-col gap-5 sm:gap-6"
              >
                <div>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest">
                    {label}
                  </span>
                  <h2 className="text-2xl font-extrabold text-text-base mt-2 mb-2">
                    {name}
                  </h2>
                  <p className="text-text-muted leading-relaxed">
                    {desc}
                  </p>
                </div>

                {/* Preview */}
                <div className="bg-bg-base rounded-xl border border-border-base p-6 flex-1">
                  {preview(color)}
                </div>

                <button
                  onClick={() => navigate(`/builder?template=${id}`)}
                  className="w-full flex items-center justify-center gap-2 font-semibold text-white rounded-xl py-3.5 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: color }}
                >
                  Use This Template
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}
