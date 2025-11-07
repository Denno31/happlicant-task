import type { Company } from "@/types/company";


export function formatLocation(
  location: Company["location"],
  options?: {
    includeAddress?: boolean;
    includeZipCode?: boolean;
    fallback?: string;
  },
): string {
  const { includeAddress = false, includeZipCode = false, fallback = "N/A" } = options ?? {};

  if (!location) return fallback;
  if (typeof location === "string") return location;

  const parts = [
    includeAddress ? location.address : null,
    location.city,
    includeZipCode ? location.zip_code : null,
    location.country,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : fallback;
}


export function getFormattedCEOText(
  ceo: Company["ceo"],
): { name: string; since?: number; bio?: string } | null {
  if (!ceo) return null;
  if (typeof ceo === "string") return { name: ceo };
  return ceo;
}

export function formatIndustry(industry: Company["industry"]): string {
  if (!industry) return "N/A";
  if (typeof industry === "string") return industry;
  return industry.primary;
}

export function filteredCompanies(companies:Company[],searchQuery:string):Company[]{
    if(!searchQuery.trim()) return companies
      const query = searchQuery.toLowerCase();
      const filteredCompanies = companies.filter((company) => {
        const name = company.name.toLowerCase();
        const industry =
          typeof company.industry === "string"
            ? company.industry.toLowerCase()
            : company.industry?.primary.toLowerCase() ?? "";
        const location =
          typeof company.location === "string"
            ? company.location.toLowerCase()
            : `${company.location?.city ?? ""} ${company.location?.country ?? ""}`.toLowerCase();

        return (
          name.includes(query) ||
          industry.includes(query) ||
          location.includes(query)
        );
      });

      return filteredCompanies
    
}

export function sortedCompanies(companies:Company[],sortBy:string){
  return  [...companies].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "employees-asc":
          return (a.employee_count ?? 0) - (b.employee_count ?? 0);
        case "employees-desc":
          return (b.employee_count ?? 0) - (a.employee_count ?? 0);
        case "founded-asc":
          return (a.founded ?? 9999) - (b.founded ?? 9999);
        case "founded-desc":
          return (b.founded ?? 0) - (a.founded ?? 0);
        default:
          return 0;
      }
    });
}