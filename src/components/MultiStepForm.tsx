import { useState, useCallback, useEffect, useMemo } from "react";
import PersonalInfoForm from "@/components/forms/PersonalInfo";
import SkillsForm from "@/components/forms/Skills";
import Education from "@/components/forms/Education";
import Experience from "@/components/forms/Experience";
import Others from "@/components/forms/Others";
import CoverLetter from "@/components/forms/CoverLetter";
import CVPreview from "@/components/CVPreview";
import ProgressTracker, { type Step } from "@/components/ProgressTracker";
import MinimalistTemplate from "@/components/cv-templates/MinimalistTemplate";
import ModernTemplate from "@/components/cv-templates/ModernTemplate";
import { useCvStore } from "@/store/useCvStore";
import { Button } from "@/components/ui/button";
import AnalyticsPanel from "@/components/AnalyticsPanel";
import { type TemplateId } from "@/types/userInfoTypes";
import {
  Eye,
  EyeOff,
  Palette,
  Sparkles,
  Briefcase,
  GraduationCap,
  Layers,
  UserRound,
  FilePenLine,
} from "lucide-react";

const steps: Step[] = [
  {
    id: 1,
    label: "Personal",
    description: "Your identity, contact, and photo.",
    icon: <UserRound className="w-4 h-4" />,
  },
  {
    id: 2,
    label: "Skills",
    description: "Highlight your strengths quickly.",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: 3,
    label: "Experience",
    description: "Showcase recent work impact.",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    id: 4,
    label: "Education",
    description: "Degrees and learning milestones.",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    id: 5,
    label: "Others",
    description: "Awards, languages, extras.",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: 6,
    label: "Cover Letter",
    description: "Write a tailored note to the recruiter.",
    icon: <FilePenLine className="w-4 h-4" />,
  },
];

const templates = {
  minimalist: MinimalistTemplate,
  modern: ModernTemplate,
} as const;

const accentPalettes = [
  { id: "cobalt", color: "#2563eb", name: "Cobalt" },
  { id: "graphite", color: "#0f172a", name: "Graphite" },
  { id: "forest", color: "#15803d", name: "Forest" },
  { id: "purple", color: "#9333ea", name: "Purple" },
  { id: "teal", color: "#0d9488", name: "Teal" },
  { id: "amber", color: "#d97706", name: "Amber" },
  { id: "crimson", color: "#dc2626", name: "Crimson" },
  { id: "indigo", color: "#4f46e5", name: "Indigo" },
  { id: "rose", color: "#e11d48", name: "Rose" },
  { id: "emerald", color: "#10b981", name: "Emerald" },
];

interface MultiStepFormProps {
  onPreviewModeChange?: (isPreview: boolean) => void;
}

const MultiStepForm = ({ onPreviewModeChange }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { cvData, updateSettings } = useCvStore();

  const selectedTemplate = cvData.settings?.template || "minimalist";
  const selectedColor = cvData.settings?.accentColor || accentPalettes[0].color;
  const TemplateComponent = templates[selectedTemplate];

  const completionStats = useMemo(() => {
    const personal = cvData.personal;
    const personalReady = [
      personal.name,
      personal.email,
      personal.address,
      personal.phone,
    ].every((value) => Boolean(value && value.trim()));
    const skillsReady = cvData.skills.length > 0;
    const experienceReady = cvData.exp.length > 0;
    const educationReady = cvData.edu.length > 0;
    const requiredCompleted = [
      personalReady,
      skillsReady,
      experienceReady,
      educationReady,
    ].filter(Boolean).length;
    const completionPercent = Math.round((requiredCompleted / 4) * 100);

    return {
      personalReady,
      skillsReady,
      experienceReady,
      educationReady,
      requiredCompleted,
      completionPercent,
      optionalCount: cvData.others?.length ?? 0,
    };
  }, [cvData]);

  useEffect(() => {
    onPreviewModeChange?.(isComplete);
  }, [isComplete, onPreviewModeChange]);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
  }, []);

  const handleBackToEdit = useCallback(() => {
    setIsComplete(false);
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm onNext={handleNext} />;
      case 2:
        return <SkillsForm onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Experience onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Education onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <Others onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <CoverLetter onComplete={handleComplete} onBack={handleBack} />;
      default:
        return null;
    }
  };

  if (isComplete) {
    return <CVPreview onBack={handleBackToEdit} />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div className="max-w-7xl mx-auto space-y-6">
        <section className="relative overflow-hidden rounded-3xl border bg-white/85 p-6 md:p-8 shadow-sm backdrop-blur">
          <div className="absolute -top-20 -right-10 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                CV Builder
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight heading-display">
                Build a sharp CV in minutes.
              </h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2">
                Focus on the essentials, let the layout handle the polish.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-xs font-medium">
                  {completionStats.requiredCompleted}/4 core sections done
                </span>
                <span className="inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-xs font-medium">
                  Optional sections: {completionStats.optionalCount}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button
                type="button"
                variant="outline"
                className="lg:hidden"
                onClick={() => setShowPreview((prev) => !prev)}
              >
                {showPreview ? (
                  <EyeOff className="w-4 h-4 mr-2" />
                ) : (
                  <Eye className="w-4 h-4 mr-2" />
                )}
                {showPreview ? "Hide preview" : "Show preview"}
              </Button>
              <div className="flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1.5">
                <Palette className="w-4 h-4 text-muted-foreground" />
                <div className="flex gap-1.5">
                  {accentPalettes.map((palette) => (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() =>
                        updateSettings({ accentColor: palette.color })
                      }
                      className={`h-5 w-5 rounded-full border-2 transition-transform hover:scale-110 ${
                        selectedColor === palette.color
                          ? "border-slate-900 scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: palette.color }}
                      aria-label={`${palette.name} accent`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-6">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
              <span>Progress</span>
              <span>{completionStats.completionPercent}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-muted/40 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${completionStats.completionPercent}%`,
                  backgroundColor: selectedColor,
                }}
              />
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-[240px,1fr,360px] gap-6">
          <aside className="hidden lg:block">
            <div className="rounded-2xl border bg-white/80 p-4 shadow-sm backdrop-blur sticky top-24">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Steps
              </p>
              <ProgressTracker
                steps={steps}
                currentStep={currentStep}
                onStepChange={(stepId) => setCurrentStep(stepId)}
                orientation="vertical"
              />
            </div>
          </aside>

          <main className="space-y-6">
            <div className="lg:hidden">
              <AnalyticsPanel data={cvData} accentColor={selectedColor} />
            </div>
            <div className="lg:hidden">
              <ProgressTracker
                steps={steps}
                currentStep={currentStep}
                onStepChange={(stepId) => setCurrentStep(stepId)}
              />
            </div>
            <div className="animate-rise">{renderStep()}</div>
          </main>

          <aside className="hidden lg:block">
            <div className="space-y-4 sticky top-24">
              <AnalyticsPanel data={cvData} accentColor={selectedColor} />
              <div className="rounded-2xl border bg-white/85 p-4 shadow-sm backdrop-blur">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      Live preview
                    </p>
                    <p className="text-sm font-semibold">
                      {selectedTemplate === "minimalist"
                        ? "Minimalist"
                        : "Modern"}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {Object.keys(templates).map((templateId) => (
                      <button
                        key={templateId}
                        type="button"
                        onClick={() =>
                          updateSettings({
                            template: templateId as TemplateId,
                          })
                        }
                        className={`px-2.5 py-1 rounded-full text-[11px] border transition-colors ${
                          selectedTemplate === templateId
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-white hover:bg-muted/40"
                        }`}
                      >
                        {templateId}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border bg-white overflow-hidden">
                  <div className="relative h-90">
                    <div className="absolute top-0 left-0 origin-top-left scale-[0.32] pointer-events-none">
                      <TemplateComponent
                        data={cvData}
                        accentColor={selectedColor}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  This is a live thumbnail. Open preview for full size.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {showPreview && (
          <div className="lg:hidden rounded-2xl border bg-white/85 p-4 shadow-sm backdrop-blur animate-rise">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold">Live preview</p>
              <div className="flex gap-1">
                {Object.keys(templates).map((templateId) => (
                  <button
                    key={templateId}
                    type="button"
                    onClick={() =>
                      updateSettings({
                        template: templateId as TemplateId,
                      })
                    }
                    className={`px-2.5 py-1 rounded-full text-[11px] border transition-colors ${
                      selectedTemplate === templateId
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-white hover:bg-muted/40"
                    }`}
                  >
                    {templateId}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-xl border bg-white overflow-hidden">
              <div className="relative h-80">
                <div className="absolute top-0 left-0 origin-top-left scale-[0.28] pointer-events-none">
                  <TemplateComponent
                    data={cvData}
                    accentColor={selectedColor}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
