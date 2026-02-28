import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-28 bg-bg-base">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-surface rounded-3xl border border-border-base p-12 text-center"
        >
          <div className="inline-flex items-center gap-2.5 bg-primary-light text-primary text-base font-bold px-6 py-3 rounded-full mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            Ready to start?
          </div>

          <h2 className="text-5xl font-extrabold text-text-base tracking-tight mb-4">
            Build Your Signature Today
          </h2>
          <p className="text-lg text-text-muted max-w-sm mx-auto mb-10">
            Free, instant, and no account needed. Just open the builder and
            start customizing.
          </p>

          <div className="flex justify-center flex-wrap gap-3">
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Start Building
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 bg-bg-base hover:bg-border-base text-text-base font-semibold px-8 py-3.5 rounded-xl border border-border-base transition-colors"
            >
              View Templates
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
