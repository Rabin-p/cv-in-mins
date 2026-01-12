import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useCvStore } from "@/store/useCvStore";
import MinimalistTemplate from "@/components/cv-templates/MinimalistTemplate";
import ModernTemplate from "@/components/cv-templates/ModernTemplate";
import { Button } from "@/components/ui/button";
import { Download, Palette, LayoutTemplate, ArrowLeft } from "lucide-react";

const templates = [
  { id: "minimalist", name: "Minimalist", component: MinimalistTemplate },
  { id: "modern", name: "Modern", component: ModernTemplate },
] as const;

const accentColors = [
  { id: "blue", color: "#2563eb", name: "Blue" },
  { id: "slate", color: "#0f172a", name: "Slate" },
  { id: "emerald", color: "#059669", name: "Emerald" },
  { id: "rose", color: "#e11d48", name: "Rose" },
  { id: "violet", color: "#7c3aed", name: "Violet" },
  { id: "amber", color: "#d97706", name: "Amber" },
];

interface CVPreviewProps {
  onBack: () => void;
}

const CVPreview = ({ onBack }: CVPreviewProps) => {
  const { cvData } = useCvStore();
  const [selectedTemplate, setSelectedTemplate] = useState<"minimalist" | "modern">("minimalist");
  const [selectedColor, setSelectedColor] = useState(accentColors[0].color);
  
  // Ref for the content we want to print
  const componentRef = useRef<HTMLDivElement>(null);

  // react-to-print hook
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${cvData?.basics?.name || 'Resume'}_CV`,
  });

  const TemplateComponent = templates.find(t => t.id === selectedTemplate)?.component || MinimalistTemplate;

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
                <LayoutTemplate className="w-4 h-4 text-gray-500" />
                <div className="flex rounded-lg border overflow-hidden">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`px-3 py-1.5 text-sm transition-colors ${
                        selectedTemplate === template.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-white hover:bg-gray-50"
                      }`}
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
                      onClick={() => setSelectedColor(color.color)}
                      className={`w-5 h-5 rounded-full border-2 transition-transform hover:scale-110 ${
                        selectedColor === color.color ? "border-gray-900 scale-110" : "border-transparent"
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

      {/* CV Preview Container */}
      <div className="py-8 flex justify-center overflow-x-hidden">
        <div className="cv-preview-wrapper bg-white shadow-2xl overflow-hidden origin-top">
          <div ref={componentRef} className="print:m-0 print:shadow-none bg-white">
            <TemplateComponent data={cvData} accentColor={selectedColor} />
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