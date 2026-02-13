import { useState } from "react";
import MultiStepForm from "@/components/MultiStepForm";
import Navbar from "@/components/Navbar";

const App = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <div className="min-h-screen app-shell">
      <div className="app-noise" />
      <div className="relative z-10">
        {showNavbar && <Navbar />}
        <MultiStepForm
          onPreviewModeChange={(isPreview) => setShowNavbar(!isPreview)}
        />
      </div>
    </div>
  );
};

export default App;
