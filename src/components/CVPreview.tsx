import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useCvStore } from "@/store/useCvStore";
import MinimalistTemplate from "@/components/cv-templates/MinimalistTemplate";
import ModernTemplate from "@/components/cv-templates/ModernTemplate";
import CoverLetterTemplate from "@/components/cv-templates/CoverLetterTemplate";
import { Button } from "@/components/ui/button";
import { Download, Palette, LayoutTemplate, ArrowLeft } from "lucide-react";
import { type TemplateId } from "@/types/userInfoTypes";

const templates = [
  { id: "minimalist", name: "Minimalist", component: MinimalistTemplate },
  { id: "modern", name: "Modern", component: ModernTemplate },
] as const;

const accentColors = [
  { id: "cobalt", color: "#1d4ed8", name: "Cobalt" },
  { id: "graphite", color: "#0f172a", name: "Graphite" },
  { id: "forest", color: "#15803d", name: "Forest" },
];

interface CVPreviewProps {
  onBack: () => void;
}

const CVPreview = ({ onBack }: CVPreviewProps) => {
  const { cvData, updateSettings } = useCvStore();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(
    cvData.settings?.template || "minimalist",
  );
  const [selectedColor, setSelectedColor] = useState(
    cvData.settings?.accentColor || accentColors[0].color,
  );
  const [previewMode, setPreviewMode] = useState<"resume" | "cover-letter">(
    "resume",
  );

  // Ref for the content we want to print
  const componentRef = useRef<HTMLDivElement>(null);

  // react-to-print hook
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${
      cvData?.personal?.name || "Resume"
    }_${previewMode === "cover-letter" ? "CoverLetter" : "CV"}`,
  });

  const TemplateComponent =
    templates.find((t) => t.id === selectedTemplate)?.component ||
    MinimalistTemplate;
  const PreviewComponent =
    previewMode === "cover-letter" ? CoverLetterTemplate : TemplateComponent;

  const handleTemplateChange = (templateId: TemplateId) => {
    setSelectedTemplate(templateId);
    updateSettings({ template: templateId });
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    updateSettings({ accentColor: color });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <div className="h-6 w-px bg-gray-200 hidden sm:block" />
              <h1 className="text-lg font-semibold hidden sm:block">Preview</h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="flex rounded-lg border overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setPreviewMode("resume")}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                      previewMode === "resume"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    Resume
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode("cover-letter")}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                      previewMode === "cover-letter"
                        ? "bg-primary text-primary-foreground"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    Cover Letter
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-gray-500" />
                <div className="flex rounded-lg border overflow-hidden">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateChange(template.id)}
                      className={`px-3 py-1.5 text-sm transition-colors ${
                        selectedTemplate === template.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      disabled={previewMode === "cover-letter"}
                    >
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-gray-500" />
                <div className="flex gap-1">
                  {accentColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorChange(color.color)}
                      className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${
                        selectedColor === color.color
                          ? "border-gray-900 scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.color }}
                    />
                  ))}
                </div>
              </div>

              <Button onClick={() => handlePrint()} size="sm">
                <Download className="w-4 h-4 mr-1" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Template Gallery */}
      {previewMode === "resume" && (
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {templates.map((template) => {
              const TemplatePreview = template.component;
              const isActive = selectedTemplate === template.id;

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleTemplateChange(template.id)}
                  className="text-left transition-transform hover:-translate-y-1 w-full"
                >
                  <div
                    className={`rounded-2xl border bg-white overflow-hidden shadow-sm w-full max-w-90 mx-auto ${
                      isActive ? "border-primary" : "border-muted"
                    }`}
                  >
                    <div className="relative h-52 bg-white">
                      <div className="absolute top-0 left-0 origin-top-left scale-[0.25] pointer-events-none">
                        <TemplatePreview
                          data={cvData}
                          accentColor={selectedColor}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3">
                      <span className="text-sm font-semibold">
                        {template.name}
                      </span>
                      {isActive && (
                        <span className="text-[10px] uppercase tracking-widest text-primary">
                          Selected
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* CV Preview Container */}
      <div className="py-8 flex justify-center overflow-x-hidden">
        <div className="cv-preview-wrapper bg-white shadow-2xl overflow-hidden origin-top">
          <div
            ref={componentRef}
            className="print:m-0 print:shadow-none bg-white"
          >
            <PreviewComponent data={cvData} accentColor={selectedColor} />
          </div>
        </div>
      </div>

      <style>{`
        /* Standard A4 Dimensions */
        .cv-preview-wrapper {
          width: 210mm;
          min-height: 297mm;
        }

        /* Mobile Zoom-out effect (Responsive Scaling) */
        @media (max-width: 768px) {
          .cv-preview-wrapper {
            /* Scales the 210mm width to fit smaller screens. 
               Adjust 0.45 to change zoom level on mobile.
            */
            transform: scale(0.45); 
            margin-bottom: -160mm; /* Pulls content back up due to scale whitespace */
          }
        }

        @media (max-width: 480px) {
          .cv-preview-wrapper {
            transform: scale(0.38);
            margin-bottom: -185mm;
          }
        }

        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Reset transform for printing */
          .cv-preview-wrapper {
            transform: none !important;
            margin: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CVPreview;
