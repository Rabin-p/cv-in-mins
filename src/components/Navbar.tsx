import { FileText } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white/80 border-b border-white/40 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a
            href="/"
            className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-semibold tracking-tight">
              CV-in-mins
            </span>
          </a>
          <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full border bg-white/80 px-3 py-1 font-medium">
              Fast build
            </span>
            <span>Auto layout</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
