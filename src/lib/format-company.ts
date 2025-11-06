import type { Company } from "@/types/company";


export function formatLocation(
  location: Company["location"],
  options?: {
    includeAddress?: boolean;
    includeZipCode?: boolean;
    fallback?: string;
  },
): string {
  const { includeAddress = false, includeZipCode = false, fallback = "N/A" } = options || {};

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
