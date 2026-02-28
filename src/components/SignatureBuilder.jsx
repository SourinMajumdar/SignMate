import { useState } from "react";
import SignatureForm from "./SignatureForm";
import SignaturePreview from "./SignaturePreview";
import { generateSignatureHTML } from "../utils/generateSignatureHTML";
import { Copy, Check, Pipette, Trash2, Code, Eye } from "lucide-react";

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
      <div className="flex flex-wrap gap-3">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            title={color}
            className="w-10 h-10 rounded-xl transition-all hover:scale-110"
            style={{
              backgroundColor: color,
              boxShadow: value === color ? `0 0 0 2px #fff, 0 0 0 4px ${color}` : "none",
            }}
          />
        ))}
        <label
          title="Custom color"
          className="w-10 h-10 rounded-xl border-2 border-dashed border-border-base flex items-center justify-center cursor-pointer hover:border-text-muted transition-colors relative overflow-hidden"
          style={isCustom ? { backgroundColor: value, borderColor: value } : {}}
        >
          <Pipette size={16} className={isCustom ? "text-white" : "text-text-muted"} />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl border border-border-base shrink-0" style={{ backgroundColor: value }} />
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

  const html = generateSignatureHTML(data, template, primaryColor);

  function copyToClipboard() {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex gap-6 h-full">

      {/* ── LEFT PANEL ── */}
      <div className="w-96 shrink-0 h-full overflow-y-auto scrollbar-hidden bg-surface rounded-2xl border border-border-base flex flex-col">
        <div className="p-7 space-y-7 flex-1">

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
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 h-full flex flex-col bg-bg-base rounded-2xl border border-border-base overflow-hidden">

        {/* Top bar */}
        <div className="px-8 pt-6 pb-5 flex items-center justify-between border-b border-border-base bg-surface">
          <p className="text-sm font-bold text-text-base">
            {view === "preview" ? "Live Preview" : "HTML Output"}
          </p>

          {/* Preview / HTML toggle */}
          <div className="flex items-center gap-1 bg-bg-base rounded-xl p-1 border border-border-base">
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                view === "preview"
                  ? "bg-surface text-text-base shadow-sm"
                  : "text-text-muted hover:text-text-base"
              }`}
            >
              <Eye size={15} />
              Preview
            </button>
            <button
              onClick={() => setView("html")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                view === "html"
                  ? "bg-surface text-text-base shadow-sm"
                  : "text-text-muted hover:text-text-base"
              }`}
            >
              <Code size={15} />
              HTML
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="flex flex-col gap-4">
            {view === "preview" ? (
              <div className="bg-surface rounded-xl border border-border-base p-8">
                <SignaturePreview data={data} template={template} color={primaryColor} />
              </div>
            ) : (
              <pre className="bg-text-base text-green-400 rounded-xl p-6 text-sm font-mono leading-relaxed overflow-auto whitespace-pre-wrap break-all">
                {html}
              </pre>
            )}

            {/* Copy button — sits right under the box */}
            <div className="flex items-center justify-between">
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
