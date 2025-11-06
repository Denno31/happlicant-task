import {
  Building2,
  Calendar,
  ExternalLink,
  MapPin,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import type { Company } from "@/types/company";
import IndustryTag from "./industry-tag";

interface CompanyCardProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

function formatLocation(location: Company["location"]): string {
  if (!location) return "Location not specified";
  if (typeof location === "string") return location;
  const parts = [location.city, location.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "Location not specified";
}

export default function CompanyCard({
  company,
  onEdit,
  onDelete,
}: CompanyCardProps) {
  return (
    <Card className="group relative overflow-hidden border-gray-200 py-0 transition-all hover:border-pink-200 hover:shadow-md">
      <CardContent className="p-5">
        <div className="relative mb-4 flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            {company.logo_url ? (
              <div className="flex-shrink-0">
                <img
                  src={company.logo_url}
                  alt={company.name}
                  className="h-12 w-12 rounded-lg border border-gray-200 object-contain p-2"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100">
                <Building2 className="h-6 w-6 text-pink-600" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-base leading-snug font-semibold text-gray-900">
                {company.name}
              </h3>
              {company.industry && (
                <div className="mt-1.5">
                  <IndustryTag industry={company.industry} />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                title="Visit website"
              >
                <ExternalLink className="h-4 w-4 text-gray-500" />
              </a>
            )}
            <button
              onClick={() => onEdit(company)}
              className="rounded-lg p-2 transition-colors hover:bg-pink-50"
              title="Edit company"
            >
              <Pencil className="h-4 w-4 text-gray-500 hover:text-pink-600" />
            </button>
            <button
              onClick={() => onDelete(company.id)}
              className="rounded-lg p-2 transition-colors hover:bg-pink-50"
              title="Delete company"
            >
              <Trash2 className="h-4 w-4 text-gray-500 hover:text-pink-600" />
            </button>
          </div>
        </div>
        {company.description && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
            {company.description}
          </p>
        )}
        <div className="space-y-2.5 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-pink-50">
              <MapPin className="h-3.5 w-3.5 text-pink-600" />
            </div>
            <span className="truncate text-sm text-gray-700">
              {formatLocation(company.location)}
            </span>
          </div>

          {company.employee_count && (
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-pink-50">
                <Users className="h-3.5 w-3.5 text-pink-600" />
              </div>
              <span className="text-sm text-gray-700">
                {company.employee_count.toLocaleString()} employees
              </span>
            </div>
          )}
          {company.founded && (
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-pink-50">
                <Calendar className="h-3.5 w-3.5 text-pink-600" />
              </div>
              <span className="text-sm text-gray-700">
                Founded {company.founded}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
