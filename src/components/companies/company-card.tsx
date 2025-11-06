import {
  Building2,
  Calendar,
  ExternalLink,
  MapPin,
  MoreVertical,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import type { Company } from "@/types/company";
import IndustryTag from "./industry-tag";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <Card
      onMouseLeave={() => setDropdownOpen(false)}
      className="group relative overflow-hidden border-gray-200 py-0 transition-all hover:border-pink-200 hover:shadow-md"
    >
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

          <div className="opacity-0 transition-opacity group-hover:opacity-100">
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                  title="More options"
                  onMouseEnter={() => setDropdownOpen(true)}
                >
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 border-gray-200 bg-white"
              >
                {company.website && (
                  <>
                    <DropdownMenuItem asChild>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex cursor-pointer items-center gap-2 text-gray-700 hover:bg-gray-100"
                      >
                        <ExternalLink className="h-4 w-4 text-gray-600" />
                        Visit Website
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                  </>
                )}
                <DropdownMenuItem
                  onClick={() => onEdit(company)}
                  className="flex cursor-pointer items-center gap-2 text-gray-700 hover:bg-gray-100"
                >
                  <Pencil className="h-4 w-4 text-gray-600" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(company.id)}
                  className="flex cursor-pointer items-center gap-2 text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {company.description && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
            {company.description}
          </p>
        )}

        {typeof company.industry === "object" &&
          company.industry?.sectors &&
          company.industry.sectors.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              {company.industry.sectors.slice(0, 3).map((sector) => (
                <span
                  key={sector}
                  className="inline-flex items-center rounded-md border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                >
                  {sector}
                </span>
              ))}
              {company.industry.sectors.length > 3 && (
                <span className="text-xs font-medium text-gray-500">
                  +{company.industry.sectors.length - 3} more
                </span>
              )}
            </div>
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
