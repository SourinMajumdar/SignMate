import { motion } from "framer-motion";

function Bone({ className }) {
  return (
    <div
      className={`rounded-xl bg-border-base overflow-hidden relative ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function BuilderSkeleton() {
  return (
    <div className="flex gap-6 h-full">
      {/* Left skeleton */}
      <div className="w-96 shrink-0 h-full bg-surface rounded-2xl border border-border-base p-7 flex flex-col gap-7">
        {/* Brand color section */}
        <div className="space-y-4">
          <Bone className="h-3 w-28" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <Bone key={i} className="w-10 h-10 rounded-xl" />
            ))}
          </div>
          <div className="flex gap-3">
            <Bone className="w-10 h-10 rounded-xl" />
            <Bone className="flex-1 h-10" />
          </div>
        </div>

        <div className="h-px bg-border-base" />

        {/* Template section */}
        <div className="space-y-4">
          <Bone className="h-3 w-20" />
          <div className="flex flex-wrap gap-2">
            {["w-20", "w-24", "w-20", "w-16", "w-14"].map((w, i) => (
              <Bone key={i} className={`h-9 ${w}`} />
            ))}
          </div>
        </div>

        <div className="h-px bg-border-base" />

        {/* Form section */}
        <div className="space-y-4 flex-1">
          <Bone className="h-3 w-24" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Bone key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>

      {/* Right skeleton */}
      <div className="flex-1 h-full flex flex-col bg-bg-base rounded-2xl border border-border-base overflow-hidden">
        {/* Top bar */}
        <div className="px-8 pt-6 pb-5 flex items-center justify-between border-b border-border-base bg-surface">
          <Bone className="h-4 w-28" />
          <Bone className="h-10 w-44 rounded-xl" />
        </div>

        {/* Preview area */}
        <div className="flex-1 p-8 flex flex-col gap-4">
          <Bone className="w-full flex-1 rounded-xl" />
          <div className="flex items-center justify-between">
            <Bone className="h-4 w-56" />
            <Bone className="h-11 w-52 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
