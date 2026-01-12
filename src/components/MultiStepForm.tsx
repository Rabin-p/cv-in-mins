import { useState, useCallback, useEffect } from "react";
import PersonalInfoForm from "@/components/forms/PersonalInfo";
import SkillsForm from "@/components/forms/Skills";
import Education from "@/components/forms/Education";
import Experience from "@/components/forms/Experience";
import Others from "@/components/forms/Others";
import CVPreview from "@/components/CVPreview";
import ProgressTracker, { type Step } from "@/components/ProgressTracker";

const steps: Step[] = [
  { id: 1, label: "Personal" },
  { id: 2, label: "Skills" },
  { id: 3, label: "Experience" },
  { id: 4, label: "Education" },
  { id: 5, label: "Others" },
];

interface MultiStepFormProps {
  onPreviewModeChange?: (isPreview: boolean) => void;
}

const MultiStepForm = ({ onPreviewModeChange }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

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
        return <Others onComplete={handleComplete} onBack={handleBack} />;
      default:
        return null;
    }
  };

  if (isComplete) {
    return <CVPreview onBack={handleBackToEdit} />;
  }

  return (
    <div className="py-4 px-3 sm:py-6 sm:px-4 md:py-10">
      <div className="max-w-3xl mx-auto">
        <ProgressTracker steps={steps} currentStep={currentStep} />
        {renderStep()}
      </div>
    </div>
  );
};

export default MultiStepForm;
