import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Globe, Linkedin, Twitter, Check } from "lucide-react";

const PALETTE = [
  { id: "blue",    label: "Blue",    primary: "#2563eb", dark: "#1d4ed8", light: "#eff6ff" },
  { id: "violet",  label: "Violet",  primary: "#7c3aed", dark: "#6d28d9", light: "#f5f3ff" },
  { id: "rose",    label: "Rose",    primary: "#e11d48", dark: "#be123c", light: "#fff1f2" },
  { id: "emerald", label: "Emerald", primary: "#059669", dark: "#047857", light: "#ecfdf5" },
  { id: "amber",   label: "Amber",   primary: "#d97706", dark: "#b45309", light: "#fffbeb" },
];

function applyTheme({ primary, dark, light }) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", primary);
  root.style.setProperty("--color-primary-dark", dark);
  root.style.setProperty("--color-primary-light", light);
}

function MockSignatureCard({ color }) {
  return (
    <div className="bg-surface rounded-2xl border border-border-base p-6 sm:p-8 w-full max-w-sm">
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl shrink-0"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
        >
          SC
        </div>
        <div>
          <p className="font-bold text-base sm:text-lg text-primary leading-tight">Sarah Chen</p>
          <p className="text-text-muted text-sm mt-0.5">Senior Designer</p>
          <p className="text-text-muted text-sm font-semibold">Acme Corporation</p>
        </div>
      </div>

      <div className="h-px bg-primary/20 my-4" />

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Phone size={13} className="text-primary shrink-0" />
          <span>+1 (555) 234‑5678</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Mail size={13} className="text-primary shrink-0" />
          <span>sarah@acmecorp.com</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Globe size={13} className="text-primary shrink-0" />
          <span>acmecorp.com</span>
        </div>
      </div>

      <div className="flex gap-3 mt-4 pt-4 border-t border-border-base">
        <div className="w-6 h-6 rounded-md bg-bg-base border border-border-base flex items-center justify-center">
          <Linkedin size={13} className="text-text-muted" />
        </div>
        <div className="w-6 h-6 rounded-md bg-bg-base border border-border-base flex items-center justify-center">
          <Twitter size={13} className="text-text-muted" />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [activeColor, setActiveColor] = useState(PALETTE[0]);

  const handleColorSelect = (swatch) => {
    setActiveColor(swatch);
    applyTheme(swatch);
  };

  return (
    <section className="min-h-screen bg-bg-base dot-grid flex items-center pt-24 sm:pt-28 pb-16 sm:pb-20 relative overflow-hidden">
      {/* Decorative blur blob */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${activeColor.light} 0%, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2.5 bg-primary-light text-primary text-sm font-bold px-5 py-2.5 rounded-full mb-6 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Free · No signup required
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-text-base leading-[1.08] tracking-tight mb-5">
              Create Your
              <br />
              <span className="text-primary">Email Signature</span>
              <br />
              in Seconds
            </h1>

            <p className="text-base sm:text-xl text-text-muted leading-relaxed mb-8 sm:mb-10 max-w-lg">
              Custom templates, brand colors, social links, and instant HTML export.
            </p>

            <div className="flex flex-wrap gap-3 mb-10 sm:mb-14">
              <Link
                to="/builder"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl transition-colors text-sm sm:text-base"
              >
                Start Building
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/templates"
                className="inline-flex items-center gap-2 bg-surface hover:bg-bg-base text-text-base font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-border-base transition-colors text-sm sm:text-base"
              >
                View Templates
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-text-muted text-xs font-medium">
              {["Works with Gmail", "Outlook ready", "5 templates"].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  {t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — floating card + color swatches */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center gap-10 sm:gap-14"
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* Depth layers */}
              <div className="absolute inset-0 translate-x-5 translate-y-5 bg-primary/5 rounded-2xl border border-primary/10" />
              <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 bg-primary/8 rounded-2xl border border-primary/10" />

              {/* Main floating card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <MockSignatureCard color={activeColor.primary} />
              </motion.div>

              {/* Badge: Live Preview */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute -top-4 -right-2 sm:-right-4 bg-surface rounded-xl border border-border-base shadow-sm px-3 py-2 text-xs font-semibold text-text-base flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Live Preview
              </motion.div>

              {/* Badge: HTML Export */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute -bottom-4 -left-2 sm:-left-6 bg-surface rounded-xl border border-border-base shadow-sm px-3 py-2 text-xs font-semibold text-text-base"
              >
                {"</>"} HTML Export
              </motion.div>
            </div>

            {/* Color swatches */}
            <div className="bg-surface/80 backdrop-blur-sm border border-border-base rounded-2xl px-5 py-3.5 flex items-center gap-4">
              <span className="text-sm font-semibold text-text-muted whitespace-nowrap">
                Theme color
              </span>
              <div className="flex items-center gap-2.5">
                {PALETTE.map((swatch) => (
                  <motion.button
                    key={swatch.id}
                    onClick={() => handleColorSelect(swatch)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.92 }}
                    aria-label={swatch.label}
                    title={swatch.label}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-shadow"
                    style={{
                      backgroundColor: swatch.primary,
                      boxShadow:
                        activeColor.id === swatch.id
                          ? `0 0 0 2px white, 0 0 0 4px ${swatch.primary}`
                          : "none",
                    }}
                  >
                    {activeColor.id === swatch.id && (
                      <Check size={13} className="text-white" strokeWidth={3} />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
