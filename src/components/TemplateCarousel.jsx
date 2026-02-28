import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    label: "Traditional & bold",
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
        <div style={{ height: 1, background: color + "30", margin: "8px 0" }} />
        <div style={{ color: "#64748b" }}>📞 +1 (555) 234‑5678</div>
        <div style={{ color: "#64748b" }}>✉️ sarah@acmecorp.com</div>
        <div style={{ color }}>🌐 acmecorp.com</div>
      </div>
    ),
  },
  {
    id: "compact",
    name: "Compact",
    label: "All in one row",
    color: "#16a34a",
    preview: (color) => (
      <div style={{ fontFamily: "Arial", fontSize: 13, lineHeight: 1.7 }}>
        <div>
          <strong style={{ color }}>Sarah Chen</strong>
          <span style={{ color: "#64748b" }}> · Senior Designer · Acme</span>
        </div>
        <div style={{ color: "#64748b" }}>
          📞 +1 (555) 234‑5678 | ✉️ sarah@acmecorp.com
        </div>
        <div style={{ color }}>🌐 acmecorp.com</div>
      </div>
    ),
  },
  {
    id: "minimal",
    name: "Minimal",
    label: "Clean & simple",
    color: "#9333ea",
    preview: (color) => (
      <div style={{ fontFamily: "Arial", fontSize: 13, lineHeight: 1.7 }}>
        <strong style={{ color, display: "block", fontSize: 15 }}>
          Sarah Chen
        </strong>
        <span style={{ color: "#64748b", display: "block" }}>
          Senior Designer — Acme Corporation
        </span>
        <div style={{ color: "#64748b", marginTop: 6 }}>
          ✉️ sarah@acmecorp.com | 🌐 acmecorp.com
        </div>
      </div>
    ),
  },
  {
    id: "inline",
    name: "Inline",
    label: "Horizontal flow",
    color: "#ea580c",
    preview: (color) => (
      <div style={{ fontFamily: "Arial", fontSize: 13, lineHeight: 1.7 }}>
        <div style={{ color: "#64748b" }}>
          <strong style={{ color }}>Sarah Chen</strong>
          {" | Senior Designer | Acme Corp"}
        </div>
        <div style={{ color: "#64748b" }}>
          {"📞 +1 (555) 234‑5678 | ✉️ sarah@acmecorp.com"}
        </div>
      </div>
    ),
  },
  {
    id: "card",
    name: "Card",
    label: "Boxed with border",
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
            <td style={{ color: "#64748b" }}>
              📞 +1 (555) 234‑5678 | ✉️ sarah@acmecorp.com
            </td>
          </tr>
        </tbody>
      </table>
    ),
  },
];

const GAP = 24; // px — matches gap-6

export default function TemplateCarousel() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const maxIndex = TEMPLATES.length - visibleCount;

  /* Measure card width and visible count on mount and resize */
  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const cw = containerRef.current.offsetWidth;
    const vCount = cw < 640 ? 1 : cw < 1024 ? 2 : 3;
    setVisibleCount(vCount);
    setCardWidth((cw - GAP * (vCount - 1)) / vCount);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* Auto-advance */
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, 3500);
  }, [maxIndex]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  /* Clamp index when visibleCount changes */
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const go = (dir) => {
    setIndex((i) => {
      const next = i + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
    startTimer();
  };

  const translateX = cardWidth ? -index * (cardWidth + GAP) : 0;

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header — centered */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-base mb-3 tracking-tight">
            Choose Your Template
          </h2>
          <p className="text-base sm:text-lg text-text-muted">
            5 professional designs, ready to customize with your brand.
          </p>
        </div>

        {/* Carousel track */}
        <div ref={containerRef} className="overflow-hidden">
          <motion.div
            className="flex"
            style={{ gap: GAP }}
            animate={{ x: translateX }}
            transition={{ type: "spring", stiffness: 280, damping: 32, mass: 0.8 }}
          >
            {TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                style={{ minWidth: cardWidth || "calc(33.333% - 16px)", flexShrink: 0 }}
                className="bg-bg-base rounded-2xl border border-border-base p-7 flex flex-col gap-5"
              >
                <div>
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                    {tpl.label}
                  </span>
                  <h3 className="text-lg font-bold text-text-base mt-1">
                    {tpl.name}
                  </h3>
                </div>

                <div className="bg-surface rounded-xl border border-border-base p-5 flex-1 min-h-28">
                  {tpl.preview(tpl.color)}
                </div>

                <button
                  onClick={() => navigate(`/builder?template=${tpl.id}`)}
                  className="w-full flex items-center justify-center gap-2 text-white font-semibold rounded-xl py-2.5 text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: tpl.color }}
                >
                  Use This Template
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots + arrows row */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go(-1)}
            aria-label="Previous template"
            className="w-9 h-9 rounded-full border border-border-base bg-surface hover:bg-bg-base flex items-center justify-center transition-colors text-text-muted hover:text-text-base"
          >
            <ChevronLeft size={17} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setIndex(i); startTimer(); }}
                aria-label={`Go to slide ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? 28 : 6,
                  backgroundColor: i === index ? "#2563eb" : "#e2e8f0",
                }}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next template"
            className="w-9 h-9 rounded-full border border-border-base bg-surface hover:bg-bg-base flex items-center justify-center transition-colors text-text-muted hover:text-text-base"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
