import { motion } from "framer-motion";
import { Palette, LayoutGrid, Download } from "lucide-react";

const FEATURES = [
  {
    icon: Palette,
    title: "Customizable Design",
    desc: "Pick any brand color and watch your signature update live.",
    accent: "#2563eb",
  },
  {
    icon: LayoutGrid,
    title: "Multiple Templates",
    desc: "5 professionally crafted templates — classic, compact, minimal, inline, and card.",
    accent: "#9333ea",
  },
  {
    icon: Download,
    title: "One-Click Export",
    desc: "Copy clean, email-client–compatible HTML instantly and paste anywhere.",
    accent: "#16a34a",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-32 bg-bg-base">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-text-base mb-5 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-lg text-text-muted max-w-sm mx-auto">
            A focused, minimal set of tools to get the perfect signature fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, accent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-surface rounded-2xl border border-border-base p-10 cursor-default group"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-7"
                style={{ backgroundColor: accent + "18" }}
              >
                <Icon size={26} style={{ color: accent }} />
              </div>
              <h3 className="text-xl font-bold text-text-base mb-3">{title}</h3>
              <p className="text-text-muted leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
