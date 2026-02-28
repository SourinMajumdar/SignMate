import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Signature, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/builder",   label: "Builder"   },
  { to: "/templates", label: "Templates" },
  { to: "/docs",      label: "Docs"      },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const isActive = (path) => location.pathname === path;

  /* Close menu on route change */
  useEffect(() => { setOpen(false); }, [location.pathname]);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <div ref={menuRef} className="pointer-events-auto w-full max-w-fit">
        {/* Pill */}
        <div className="flex items-center gap-1 bg-surface/30 backdrop-blur-sm border border-border-base rounded-full px-3 py-2.5 shadow-sm whitespace-nowrap">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 px-3 py-1.5 mr-1">
            <Signature size={17} className="text-primary" />
            <span className="font-extrabold text-text-base tracking-tight">SignMate</span>
          </Link>

          {/* Desktop nav links */}
          <div className="w-px h-4 bg-border-base mx-1 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="sm:hidden ml-1 p-2 rounded-full text-text-muted hover:bg-border-base/50 hover:text-text-base transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="sm:hidden mt-2 bg-surface/95 backdrop-blur-sm border border-border-base rounded-2xl shadow-md overflow-hidden">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center px-5 py-3.5 text-sm font-semibold transition-colors ${
                  isActive(to)
                    ? "bg-primary-light text-primary"
                    : "text-text-muted hover:bg-border-base/40 hover:text-text-base"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
