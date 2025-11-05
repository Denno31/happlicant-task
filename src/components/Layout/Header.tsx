import { Building2 } from "lucide-react";
import Logo from "../common/Logo";

export default function Header() {
  return (
    <div className="sticky top-0 z-30 bg-white shadow-md border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-6 mb-6">
      <div className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <Logo size="md" /> 
          </div>

        
      </div>
    </div>
    </div>
  );
}
