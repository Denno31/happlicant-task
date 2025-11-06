"use client";

import { type Company } from "@/types/company";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, ExternalLink, Building2, Pencil } from "lucide-react";
import IndustryTag from "./industry-tag";

interface CompanyTableProps {
  companies: Company[];
  onDelete: (id: string) => void;
  onEdit: (company: Company) => void;
}

function formatLocation(location: Company["location"]): string {
  if (!location) return "—";
  if (typeof location === "string") return location;
  const parts = [location.city, location.country].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : "—";
}

const tableHeaders = [
  "Company",
  "Industry",
  "Location",
  "Employees",
  "Founded",
  "Actions",
];

export default function CompanyTable({
  companies,
  onDelete,
  onEdit,
}: CompanyTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-gray-50">
            <TableHead className="px-6 py-3 text-xs font-semibold text-gray-700">
              Company
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-semibold text-gray-700">
              Industry
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-semibold text-gray-700">
              Location
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-semibold text-gray-700">
              Employees
            </TableHead>
            <TableHead className="px-6 py-3 text-xs font-semibold text-gray-700">
              Founded
            </TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-semibold text-gray-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id} className="group">
              <TableCell className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {company.logo_url ? (
                    <img
                      src={company.logo_url}
                      alt={company.name}
                      className="h-10 w-10 rounded-lg border border-gray-200 object-contain p-1.5"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100">
                      <Building2 className="h-5 w-5 text-pink-600" />
                    </div>
                  )}
                  <div>
                    <div>
                      <Link
                        href={`/company/${company.id}`}
                        className="font-semibold text-gray-900 transition-colors hover:text-pink-600"
                      >
                        {company.name}
                      </Link>
                    </div>
                    {company.website && (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-pink-600 hover:text-pink-700"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <IndustryTag industry={company.industry} />
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-700">
                {formatLocation(company.location)}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm font-medium text-gray-900">
                {company.employee_count
                  ? company.employee_count.toLocaleString()
                  : "—"}
              </TableCell>
              <TableCell className="px-6 py-4 text-sm text-gray-700">
                {company.founded ?? "—"}
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
