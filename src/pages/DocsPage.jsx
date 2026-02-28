import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STEPS = [
  { step: "01", title: "Open the Builder", desc: "Head to the Builder page. No account or login needed — it's ready instantly." },
  { step: "02", title: "Enter Your Details", desc: "Fill in your name, job title, company, phone, email, and website in the form." },
  { step: "03", title: "Pick a Template & Color", desc: "Choose from 5 layouts and pick a brand color using the color picker." },
  { step: "04", title: "Copy Your HTML", desc: 'Click "Copy Signature HTML" to get the clean HTML and paste it into Gmail, Outlook, or any email client.' },
];

const TEMPLATES = [
  { id: "classic", name: "Classic", desc: "Full name, title, company, contacts on separate rows. Traditional and universally readable." },
  { id: "compact", name: "Compact", desc: "Name + title in one line, contacts on the next. Great for shorter signatures." },
  { id: "minimal", name: "Minimal", desc: "Just name, role, and email/website. Best for mobile-first email clients." },
  { id: "inline",  name: "Inline",  desc: "Everything on a single horizontal line. Ultra-condensed and modern." },
  { id: "card",    name: "Card",    desc: "Bordered table card with structured layout. Great for standing out." },
];

const CLIENTS = [
  { name: "Gmail", steps: ["Open Settings → See all settings", "Go to the Signature tab", "Create a new signature, paste the HTML using Ctrl+Shift+V"] },
  { name: "Outlook", steps: ["Go to File → Options → Mail → Signatures", "Create a new signature", "Paste HTML in the editor"] },
  { name: "Apple Mail", steps: ["Preferences → Signatures", "Add a new signature", "Paste HTML directly into the editor"] },
];

const TIPS = [
  "Keep signatures concise — include only the most important contact info.",
  "Use your brand's primary color to keep signatures on-brand.",
  "Test your signature by sending a test email to yourself.",
  "Use Paste as Plain Text (Ctrl+Shift+V) when pasting into email clients to avoid formatting issues.",
  "The Minimal or Compact templates work best for mobile email clients.",
];

const FAQS = [
  { q: "Is SignMate free?", a: "Yes, completely free. No account, no subscription, no credit card." },
  { q: "Will the signature work in all email clients?", a: "The generated HTML uses table-based layout which works in Gmail, Outlook, Apple Mail, and most other clients." },
  { q: "Can I add my own social links?", a: "Currently social links appear as plain text links. More social link options are coming soon." },
  { q: "Is my data stored anywhere?", a: "No. Everything stays in your browser — nothing is sent to a server." },
];

const NAV_ITEMS = [
  { href: "#getting-started", label: "Getting Started" },
  { href: "#templates",       label: "Templates" },
  { href: "#email-clients",   label: "Email Clients" },
  { href: "#tips",            label: "Tips & Best Practices" },
  { href: "#faq",             label: "FAQ" },
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="mb-20 scroll-mt-28">
      <h2 className="text-3xl font-extrabold text-text-base mb-8 pb-4 border-b border-border-base tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DocsPage() {
  const [activeId, setActiveId] = useState("getting-started");

  useEffect(() => {
    const ids = NAV_ITEMS.map(({ href }) => href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-bg-base">
      <Navbar />
      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
        {/* Page header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-primary-light text-primary text-sm font-bold px-4 py-2 rounded-full mb-6">
            Documentation
          </div>
          <h1 className="text-6xl font-extrabold text-text-base tracking-tight mb-5 leading-tight">
            How to Use SignMate
          </h1>
          <p className="text-xl text-text-muted leading-relaxed max-w-2xl">
            Everything you need to create, customize, and export your professional email signature.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-12 items-start">

          {/* Sticky sidebar TOC */}
          <aside className="w-56 shrink-0 sticky top-28 hidden lg:block">
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">On this page</p>
            <nav className="space-y-1">
              {NAV_ITEMS.map(({ href, label }) => {
                const id = href.slice(1);
                const active = activeId === id;
                return (
                  <a
                    key={href}
                    href={href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                      active
                        ? "bg-primary-light text-primary font-semibold"
                        : "text-text-muted hover:text-text-base hover:bg-border-base/50"
                    }`}
                  >
                    {active && <span className="w-1 h-1 rounded-full bg-primary shrink-0" />}
                    {label}
                  </a>
                );
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-border-base">
              <Link
                to="/builder"
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-3 rounded-xl text-sm transition-colors"
              >
                Open Builder <ArrowRight size={14} />
              </Link>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Getting Started */}
            <Section id="getting-started" title="Getting Started">
              <div className="space-y-4">
                {STEPS.map(({ step, title, desc }) => (
                  <div key={step} className="bg-surface rounded-2xl border border-border-base p-7 flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                      <span className="text-sm font-extrabold text-primary">{step}</span>
                    </div>
                    <div>
                      <p className="font-bold text-text-base text-lg mb-1.5">{title}</p>
                      <p className="text-text-muted leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 lg:hidden">
                <Link to="/builder" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                  Open the Builder <ArrowRight size={15} />
                </Link>
              </div>
            </Section>

            {/* Templates */}
            <Section id="templates" title="Available Templates">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TEMPLATES.map(({ id, name, desc }) => (
                  <div key={id} className="bg-surface rounded-2xl border border-border-base p-6 flex gap-4 items-start">
                    <CheckCircle size={20} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-text-base mb-1">{name}</p>
                      <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Email Clients */}
            <Section id="email-clients" title="Adding to Email Clients">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {CLIENTS.map(({ name, steps }) => (
                  <div key={name} className="bg-surface rounded-2xl border border-border-base p-7">
                    <h3 className="font-extrabold text-text-base text-lg mb-5">{name}</h3>
                    <ol className="space-y-3">
                      {steps.map((s, i) => (
                        <li key={i} className="flex gap-3 text-text-muted leading-relaxed">
                          <span className="font-bold text-primary shrink-0">{i + 1}.</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </Section>

            {/* Tips */}
            <Section id="tips" title="Tips & Best Practices">
              <div className="bg-surface rounded-2xl border border-border-base p-8 space-y-5">
                {TIPS.map((tip, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-text-muted leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* FAQ */}
            <Section id="faq" title="FAQ">
              <div className="space-y-4">
                {FAQS.map(({ q, a }) => (
                  <div key={q} className="bg-surface rounded-2xl border border-border-base p-7">
                    <p className="font-bold text-text-base text-lg mb-2">{q}</p>
                    <p className="text-text-muted leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </Section>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
