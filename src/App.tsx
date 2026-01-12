import { useState } from "react";
import MultiStepForm from "@/components/MultiStepForm";
import Navbar from "@/components/Navbar";

const App = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {showNavbar && <Navbar />}
      <MultiStepForm onPreviewModeChange={(isPreview) => setShowNavbar(!isPreview)} />
    </div>
  );
}

export default App