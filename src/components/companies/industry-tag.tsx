import type { Company } from "@/types/company";
import { formatIndustry } from "@/lib/format-company";

interface IndustryTagProps {
  industry: Company["industry"];
}

export default function IndustryTag({ industry }: IndustryTagProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
      {formatIndustry(industry)}
    </span>
  );
}
