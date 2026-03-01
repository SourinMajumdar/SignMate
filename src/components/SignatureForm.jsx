import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, X, Crop, Circle, Square } from "lucide-react";
import PhotoCropper from "./PhotoCropper";

const BASE_FIELDS = [
  { name: "name",    placeholder: "Full Name",   type: "text" },
  { name: "title",   placeholder: "Job Title",   type: "text" },
  { name: "company", placeholder: "Company",     type: "text" },
  { name: "phone",   placeholder: "Phone",       type: "tel"  },
  { name: "website", placeholder: "Website URL", type: "url"  },
];

const SOCIAL_FIELDS = [
  { name: "linkedin",  placeholder: "LinkedIn URL",  type: "url" },
  { name: "instagram", placeholder: "Instagram URL", type: "url" },
];

const INPUT_CLASS =
  "w-full bg-bg-base border border-border-base rounded-xl px-4 py-3 text-base text-text-base placeholder:text-text-muted focus:outline-hidden focus:border-primary transition-colors";

export default function SignatureForm({ data, setData, template, primaryColor }) {
  const fileRef = useRef(null);
  const isModern = template === "modern";
  const [cropperOpen, setCropperOpen] = useState(false);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setData({ ...data, photo: base64, photoRaw: base64 });
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setData({ ...data, photo: "", photoRaw: "" });
    if (fileRef.current) fileRef.current.value = "";
  }

  function handleCropApply(croppedBase64) {
    setData({ ...data, photo: croppedBase64 });
    setCropperOpen(false);
  }

  function setShape(shape) {
    setData({ ...data, photoShape: shape });
  }

  const shape = data.photoShape || "circle";

  return (
    <>
      <div className="space-y-3">
        {BASE_FIELDS.map(({ name, placeholder, type }) => (
          <input
            key={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={data[name]}
            onChange={handleChange}
            className={INPUT_CLASS}
          />
        ))}

        <AnimatePresence>
          {isModern && (
            <motion.div
              key="modern-fields"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="space-y-3"
            >
              {/* Section divider */}
              <div className="flex items-center gap-3 pt-1">
                <div className="h-px bg-border-base flex-1" />
                <span className="text-xs font-bold text-text-muted uppercase tracking-widest whitespace-nowrap">
                  Profile &amp; Social
                </span>
                <div className="h-px bg-border-base flex-1" />
              </div>

              {/* Photo upload / preview */}
              {data.photo ? (
                <div className="p-3 bg-bg-base border border-border-base rounded-xl space-y-3">
                  {/* Thumbnail + actions */}
                  <div className="flex items-center gap-3">
                    <img
                      src={data.photo}
                      alt="Preview"
                      className="w-14 h-14 object-cover border border-border-base shrink-0"
                      style={{ borderRadius: shape === "circle" ? "50%" : "6px" }}
                    />
                    <div className="flex-1 min-w-0 space-y-1.5">
                      {/* Shape toggle */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setShape("circle")}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                            shape === "circle"
                              ? "text-white border-transparent"
                              : "text-text-muted border-border-base bg-surface hover:text-text-base"
                          }`}
                          style={shape === "circle" ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}
                        >
                          <Circle size={11} />
                          Circle
                        </button>
                        <button
                          type="button"
                          onClick={() => setShape("square")}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                            shape === "square"
                              ? "text-white border-transparent"
                              : "text-text-muted border-border-base bg-surface hover:text-text-base"
                          }`}
                          style={shape === "square" ? { backgroundColor: primaryColor, borderColor: primaryColor } : {}}
                        >
                          <Square size={11} />
                          Square
                        </button>
                      </div>

                      {/* Crop + Remove */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setCropperOpen(true)}
                          className="flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-text-base transition-colors"
                        >
                          <Crop size={12} />
                          Crop
                        </button>
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors"
                        >
                          <X size={12} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-border-base rounded-xl px-4 py-5 cursor-pointer hover:border-primary transition-colors text-center">
                  <ImageIcon size={20} className="text-text-muted" />
                  <span className="text-sm font-medium text-text-muted">Click to upload photo</span>
                  <span className="text-xs text-text-muted">Max 2MB · Square image recommended</span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}

              {/* Social URL fields */}
              {SOCIAL_FIELDS.map(({ name, placeholder, type }) => (
                <input
                  key={name}
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  value={data[name]}
                  onChange={handleChange}
                  className={INPUT_CLASS}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Crop modal */}
      {cropperOpen && (data.photoRaw || data.photo) && (
        <PhotoCropper
          imageSrc={data.photoRaw || data.photo}
          shape={shape}
          primaryColor={primaryColor}
          onApply={handleCropApply}
          onClose={() => setCropperOpen(false)}
        />
      )}
    </>
  );
}
