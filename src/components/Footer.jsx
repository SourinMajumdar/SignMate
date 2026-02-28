import { Link } from "react-router-dom";
import { Signature, Github } from "lucide-react";
import { FaReact } from "react-icons/fa";
// Place kombai.png in the /public folder and it will load automatically
const kombaiLogo = "/kombai.png";

export default function Footer() {
  return (
    <footer className="bg-bg-base border-t border-border-base py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left — Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <Signature size={24} className="text-primary" />
              <span className="text-2xl font-extrabold text-text-base tracking-tight">
                SignMate
              </span>
            </Link>
            <p className="text-base text-text-muted leading-relaxed max-w-64">
              Create professional email signatures in seconds. Free, fast, and
              no signup required.
            </p>
          </div>

          {/* Middle — Links */}
          <div>
            <h4 className="text-sm font-bold text-text-base uppercase tracking-wider mb-5">
              Product
            </h4>
            <nav className="space-y-4">
              {[
                { to: "/builder", label: "Builder" },
                { to: "/templates", label: "Templates" },
                { to: "/docs", label: "Docs" },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="block text-base text-text-muted hover:text-text-base transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right — About */}
          <div>
            <h4 className="text-sm font-bold text-text-base uppercase tracking-wider mb-5">
              About
            </h4>

            {/* Built using */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-base text-text-muted">Built using</span>
              <FaReact size={18} style={{ color: "#38bdf8" }} />
              <span className="text-base font-semibold text-text-base">React</span>
              <span className="text-text-muted">&amp;</span>
              <img src={kombaiLogo} alt="Kombai" className="w-5 h-5 rounded" />
              <span className="text-base font-semibold text-text-base">Kombai</span>
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base text-text-muted hover:text-text-base transition-colors"
            >
              <Github size={16} />
              View on GitHub
            </a>
            <p className="text-sm text-text-muted mt-8">
              © 2026 SignMate. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
