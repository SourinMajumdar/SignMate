import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Layers, Palette, Code2 } from "lucide-react";

const STAGES = [
  { name: "Sarah Chen", color: "#2563eb", template: "Classic", social: false, label: "Name entered..." },
  { name: "Sarah Chen", color: "#16a34a", template: "Classic", social: false, label: "Brand color changed..." },
  { name: "Sarah Chen", color: "#9333ea", template: "Compact", social: false, label: "Template switched..." },
  { name: "Sarah Chen", color: "#ea580c", template: "Compact", social: true,  label: "Social link added..." },
];

const BULLETS = [
  { icon: Zap,    label: "Live Preview",            desc: "See every change reflected instantly as you type." },
  { icon: Layers, label: "Multiple Templates",       desc: "5 professional layouts for any style or brand." },
  { icon: Palette,label: "Brand Color Customization",desc: "Pick any color to perfectly match your identity." },
  { icon: Code2,  label: "One-Click HTML Export",   desc: "Clean HTML you can paste directly into Gmail or Outlook." },
];

function MiniPreview({ name, color, template, social }) {
  if (template === "Compact") {
    return (
      <div style={{ fontFamily: "Arial", fontSize: 12, lineHeight: 1.5 }}>
        <div>
          <strong style={{ color }}>{name}</strong>
          <span style={{ color: "#64748b" }}> · Senior Designer · Acme</span>
        </div>
        <div style={{ color: "#64748b", marginTop: 3 }}>✉️ sarah@acmecorp.com</div>
        <AnimatePresence>
          {social && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0 }}
              style={{ color, fontSize: 11, marginTop: 3 }}
            >
              linkedin.com/in/sarahchen
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
  return (
    <div style={{ fontFamily: "Arial", fontSize: 12, lineHeight: 1.6 }}>
      <strong style={{ color, display: "block", fontSize: 14 }}>{name}</strong>
      <span style={{ color: "#64748b", display: "block" }}>Senior Designer</span>
      <span style={{ color: "#64748b", display: "block" }}>Acme Corporation</span>
      <div style={{ height: 1, background: color + "33", margin: "6px 0" }} />
      <div style={{ color: "#64748b" }}>📞 +1 (555) 234‑5678</div>
      <div style={{ color: "#64748b" }}>✉️ sarah@acmecorp.com</div>
    </div>
  );
}

export default function WhatItDoes() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 3000);
    return () => clearInterval(id);
  }, []);

  const cur = STAGES[stage];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-base mb-4 sm:mb-5 tracking-tight">
            See It In Action
          </h2>
          <p className="text-base sm:text-lg text-text-muted max-w-sm mx-auto">
            Watch the builder craft a professional signature in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Feature bullets */}
          <div className="space-y-6 sm:space-y-8">
            {BULLETS.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-text-base text-base sm:text-lg">{label}</p>
                  <p className="text-text-muted mt-0.5 leading-relaxed text-sm sm:text-base">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Animated builder demo */}
          <div>
            <div className="bg-bg-base rounded-2xl border border-border-base overflow-hidden shadow-sm">
              {/* Window chrome */}
              <div className="bg-surface border-b border-border-base px-4 py-3 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-text-muted font-medium">SignMate — Builder</span>
              </div>

              <div className="p-4 sm:p-5 grid grid-cols-2 gap-4">
                {/* Controls */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-text-muted font-semibold block mb-1">Full Name</label>
                    <div className="bg-surface border border-border-base rounded-lg px-3 py-2 text-sm text-text-base font-medium">
                      <AnimatePresence mode="wait">
                        <motion.span key={cur.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          {cur.name}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-text-muted font-semibold block mb-2">Brand Color</label>
                    <div className="flex items-center gap-2">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={cur.color}
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 1 }}
                          exit={{ scale: 0.7, opacity: 0 }}
                          className="w-6 h-6 rounded-full ring-2 ring-offset-1"
                          style={{ backgroundColor: cur.color, ringColor: cur.color }}
                        />
                      </AnimatePresence>
                      <div className="w-5 h-5 rounded-full opacity-30" style={{ backgroundColor: cur.color }} />
                      <div className="w-4 h-4 rounded-full opacity-15" style={{ backgroundColor: cur.color }} />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-text-muted font-semibold block mb-1.5">Template</label>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={cur.template}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="text-xs font-bold px-3 py-1 rounded-full text-white inline-block"
                        style={{ backgroundColor: cur.color }}
                      >
                        {cur.template}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Live preview */}
                <div className="bg-surface rounded-xl border border-border-base p-3 flex flex-col">
                  <p className="text-xs text-text-muted font-semibold mb-3">Preview</p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${cur.template}-${cur.color}-${cur.social}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <MiniPreview {...cur} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Status bar */}
              <div className="border-t border-border-base px-4 py-2.5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={cur.label}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    className="text-xs text-text-muted"
                  >
                    {cur.label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Stage dots */}
            <div className="flex justify-center gap-2 mt-5">
              {STAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStage(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === stage ? 24 : 6,
                    backgroundColor: i === stage ? "#2563eb" : "#e2e8f0",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
