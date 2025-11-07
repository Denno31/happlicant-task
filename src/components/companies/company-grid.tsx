import type { Company } from "@/types/company";
import CompanyCard from "./company-card";

interface CompanyGridProps {
  companies: Company[];
  onDelete: (id: string) => void;
  onEdit: (company: Company) => void;
}

export default function CompanyGrid({
  companies,
  onDelete,
  onEdit,
}: CompanyGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard
          key={company.id}
          company={company}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
