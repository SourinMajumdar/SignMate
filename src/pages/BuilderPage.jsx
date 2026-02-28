import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import SignatureBuilder from "../components/SignatureBuilder";
import BuilderSkeleton from "../components/BuilderSkeleton";

export default function BuilderPage() {
  const [searchParams] = useSearchParams();
  const defaultTemplate = searchParams.get("template") || "classic";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      <div className="pt-24 h-screen flex flex-col">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 w-full">
          <h1 className="text-3xl font-extrabold text-text-base tracking-tight">
            Signature Builder
          </h1>
          <p className="text-text-muted mt-1">
            Customize your signature and copy the HTML in one click.
          </p>
        </div>

        <div className="flex-1 overflow-hidden max-w-7xl mx-auto px-6 pb-6 w-full relative">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="skeleton"
                className="absolute inset-0 px-0 pb-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <BuilderSkeleton />
              </motion.div>
            ) : (
              <motion.div
                key="builder"
                className="h-full"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <SignatureBuilder defaultTemplate={defaultTemplate} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
