import { useState } from "react";
import SignatureForm from "./SignatureForm";
import SignaturePreview from "./SignaturePreview";
import { generateSignatureHTML } from "../utils/generateSignatureHTML";
import { Copy, Check, Pipette, Trash2, Code, Eye, PenLine } from "lucide-react";

const PRESET_COLORS = [
  "#2563eb", "#7c3aed", "#e11d48", "#059669",
  "#d97706", "#0891b2", "#ea580c", "#0f172a",
];

const TEMPLATES = [
  { id: "classic", label: "Classic" },
  { id: "compact", label: "Compact" },
  { id: "minimal", label: "Minimal" },
  { id: "inline",  label: "Inline"  },
  { id: "card",    label: "Card"    },
];

const EMPTY_DATA = { name: "", title: "", company: "", phone: "", email: "", website: "" };

function ColorPicker({ value, onChange }) {
  const isCustom = !PRESET_COLORS.includes(value.toLowerCase());

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2.5">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            title={color}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all hover:scale-110"
            style={{
              backgroundColor: color,
              boxShadow: value === color ? `0 0 0 2px #fff, 0 0 0 4px ${color}` : "none",
            }}
          />
        ))}
        <label
          title="Custom color"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-dashed border-border-base flex items-center justify-center cursor-pointer hover:border-text-muted transition-colors relative overflow-hidden"
          style={isCustom ? { backgroundColor: value, borderColor: value } : {}}
        >
          <Pipette size={15} className={isCustom ? "text-white" : "text-text-muted"} />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-border-base shrink-0" style={{ backgroundColor: value }} />
        <input
          type="text"
          value={value}
          onChange={(e) => { const v = e.target.value; if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v); }}
          className="flex-1 bg-bg-base border border-border-base rounded-xl px-4 py-2.5 text-base font-mono text-text-base focus:outline-hidden focus:border-primary transition-colors"
          maxLength={7}
          spellCheck={false}
        />
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">
      {children}
    </p>
  );
}

export default function SignatureBuilder({ defaultTemplate = "classic" }) {
  const [data, setData] = useState(EMPTY_DATA);
  const [template, setTemplate] = useState(defaultTemplate);
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState("preview"); // "preview" | "html"
  const [mobileTab, setMobileTab] = useState("form"); // "form" | "preview"

  const html = generateSignatureHTML(data, template, primaryColor);

  function copyToClipboard() {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col lg:flex-row lg:gap-6 lg:h-full">

      {/* ── Mobile tab bar ── */}
      <div className="lg:hidden flex mb-3 bg-surface rounded-2xl border border-border-base overflow-hidden">
        <button
          onClick={() => setMobileTab("form")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
            mobileTab === "form"
              ? "text-white"
              : "text-text-muted hover:text-text-base"
          }`}
          style={mobileTab === "form" ? { backgroundColor: primaryColor } : {}}
        >
          <PenLine size={14} />
          Form
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
            mobileTab === "preview"
              ? "text-white"
              : "text-text-muted hover:text-text-base"
          }`}
          style={mobileTab === "preview" ? { backgroundColor: primaryColor } : {}}
        >
          <Eye size={14} />
          Preview
        </button>
      </div>

      {/* ── LEFT PANEL (Form) ── */}
      <div className={`lg:w-96 lg:shrink-0 lg:h-full lg:overflow-y-auto scrollbar-hidden bg-surface rounded-2xl border border-border-base flex flex-col ${
        mobileTab === "form" ? "block" : "hidden"
      } lg:block`}>
        <div className="p-5 sm:p-7 space-y-6 sm:space-y-7 flex-1">

          {/* Brand Color */}
          <div className="space-y-4">
            <SectionLabel>Brand Color</SectionLabel>
            <ColorPicker value={primaryColor} onChange={setPrimaryColor} />
          </div>

          <div className="h-px bg-border-base" />

          {/* Template */}
          <div className="space-y-4">
            <SectionLabel>Template</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setTemplate(id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    template === id
                      ? "text-white border-transparent"
                      : "text-text-muted border-border-base bg-bg-base hover:text-text-base"
                  }`}
                  style={template === id ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-px bg-border-base" />

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <SectionLabel>Your Details</SectionLabel>
              <button
                onClick={() => setData(EMPTY_DATA)}
                className="flex items-center gap-1.5 text-sm text-text-muted hover:text-rose-500 transition-colors"
              >
                <Trash2 size={14} />
                Clear
              </button>
            </div>
            <SignatureForm data={data} setData={setData} />
          </div>

          {/* Mobile: copy button inside form panel */}
          <div className="lg:hidden pt-2">
            <button
              onClick={() => { copyToClipboard(); setMobileTab("preview"); }}
              className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold text-white text-sm shadow-sm transition-all active:scale-95 hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Signature HTML</>}
            </button>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (Preview) ── */}
      <div className={`lg:flex-1 lg:h-full flex-col bg-bg-base rounded-2xl border border-border-base overflow-hidden ${
        mobileTab === "preview" ? "flex" : "hidden"
      } lg:flex`}>

        {/* Top bar */}
        <div className="px-5 sm:px-8 pt-5 sm:pt-6 pb-4 sm:pb-5 flex items-center justify-between border-b border-border-base bg-surface">
          <p className="text-sm font-bold text-text-base">
            {view === "preview" ? "Live Preview" : "HTML Output"}
          </p>

          {/* Preview / HTML toggle */}
          <div className="flex items-center gap-1 bg-bg-base rounded-xl p-1 border border-border-base">
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                view === "preview"
                  ? "bg-surface text-text-base shadow-sm"
                  : "text-text-muted hover:text-text-base"
              }`}
            >
              <Eye size={14} />
              Preview
            </button>
            <button
              onClick={() => setView("html")}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                view === "html"
                  ? "bg-surface text-text-base shadow-sm"
                  : "text-text-muted hover:text-text-base"
              }`}
            >
              <Code size={14} />
              HTML
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto p-5 sm:p-8">
          <div className="flex flex-col gap-4">
            {view === "preview" ? (
              <div className="bg-surface rounded-xl border border-border-base p-5 sm:p-8">
                <SignaturePreview data={data} template={template} color={primaryColor} />
              </div>
            ) : (
              <pre className="bg-text-base text-green-400 rounded-xl p-5 sm:p-6 text-sm font-mono leading-relaxed overflow-auto whitespace-pre-wrap break-all">
                {html}
              </pre>
            )}

            {/* Copy button */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-sm text-text-muted">
                {Object.values(data).some(Boolean)
                  ? "Your signature is ready to copy"
                  : "Fill in your details to generate a signature"}
              </p>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-white text-sm shadow-sm transition-all active:scale-95 hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy Signature HTML</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
