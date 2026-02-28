import { Link, useLocation } from "react-router-dom";
import { Signature } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1 bg-surface/90 backdrop-blur-sm border border-border-base rounded-full px-4 py-2.5 shadow-sm whitespace-nowrap">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 px-4 py-2 mr-1">
          <Signature size={17} className="text-primary" />
          <span className="font-extrabold text-text-base tracking-tight">SignMate</span>
        </Link>

        <div className="w-px h-4 bg-border-base mx-1" />

        {[
          { to: "/builder",   label: "Builder"   },
          { to: "/templates", label: "Templates" },
          { to: "/docs",      label: "Docs"      },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`px-5 py-2 rounded-full font-medium transition-all ${
              isActive(to)
                ? "bg-border-base text-text-base shadow-sm"
                : "text-text-muted hover:bg-border-base/50 hover:text-text-base"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
