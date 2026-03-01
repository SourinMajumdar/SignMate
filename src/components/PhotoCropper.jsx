import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X, Check } from "lucide-react";

// Max output size in px — keeps base64 ~3-5KB, well within Gmail's limit
const OUTPUT_SIZE = 80;

/** Draw the crop area onto a canvas and return a base64 JPEG. */
async function getCroppedImg(imageSrc, pixelCrop) {
  const img = await new Promise((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    img,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    OUTPUT_SIZE,
    OUTPUT_SIZE
  );

  return canvas.toDataURL("image/jpeg", 0.65);
}

/**
 * @param {string}   imageSrc  - original base64 image to crop
 * @param {"circle"|"square"} shape
 * @param {function} onApply   - called with cropped base64
 * @param {function} onClose
 * @param {string}   primaryColor
 */
export default function PhotoCropper({ imageSrc, shape, onApply, onClose, primaryColor = "#2563eb" }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [applying, setApplying] = useState(false);

  const onCropComplete = useCallback((_, pixels) => {
    setCroppedAreaPixels(pixels);
  }, []);

  async function handleApply() {
    if (!croppedAreaPixels) return;
    setApplying(true);
    try {
      const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
      onApply(cropped);
    } finally {
      setApplying(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-surface rounded-2xl border border-border-base w-full max-w-sm overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-base">
          <div>
            <p className="text-sm font-bold text-text-base">Crop Photo</p>
            <p className="text-xs text-text-muted mt-0.5">
              Drag to reposition · scroll to zoom
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-base transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cropper canvas area */}
        <div className="relative bg-black" style={{ height: 300 }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape={shape === "circle" ? "round" : "rect"}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Zoom slider */}
        <div className="px-5 pt-4 pb-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">Zoom</p>
            <p className="text-xs text-text-muted">{zoom.toFixed(1)}×</p>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: primaryColor }}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-5 pb-5 pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border-base text-sm font-semibold text-text-muted hover:text-text-base transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={applying}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-1.5 transition-all hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: primaryColor }}
          >
            <Check size={14} />
            {applying ? "Applying…" : "Apply"}
          </button>
        </div>

      </div>
    </div>
  );
}
