"use client";
import {
  ArrowUpDown,
  Building2,
  LayoutGrid,
  List,
  Plus,
  Search,
} from "lucide-react";
import Logo from "../common/logo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";

interface HeaderProps {
  viewMode: "grid" | "table";
  onViewChange: (mode: "grid" | "table") => void;
  onAdd: () => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
  searchQuery: string;
  sortBy: string;
  isHomePage?: boolean;
}

const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "employees-desc", label: "Most Employees" },
  { value: "employees-asc", label: "Least Employees" },
  { value: "founded-desc", label: "Newest" },
  { value: "founded-asc", label: "Oldest" },
];

export default function Header({
  viewMode,
  onViewChange,
  onAdd,
  onSearchChange,
  onSortChange,
  searchQuery,
  sortBy,
  isHomePage,
}: HeaderProps) {
  //lets use url search params to set search query
  const searchParams = useSearchParams();

  return (
    <div className="sticky top-0 z-30 mb-6 border-b border-gray-200 bg-white shadow-md">
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <Logo size="md" />
            </div>
            <div className="flex items-center gap-3">
              {isHomePage && (
                <div className="flex rounded-lg border border-gray-200 bg-white p-1">
                  <button
                    onClick={() => onViewChange("grid")}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      viewMode === "grid"
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onViewChange("table")}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                      viewMode === "table"
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              )}
              {isHomePage && (
                <Button
                  onClick={onAdd}
                  className="h-10 gap-2 bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-pink-700 hover:shadow-md"
                >
                  <Plus className="h-4 w-4" />
                  Add Company
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isHomePage && (
        <div className="bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search companies by name, industry, or location..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="h-10 bg-white pl-10"
                />
              </div>
              <div className="flex items-center gap-2 sm:flex-shrink-0">
                <ArrowUpDown className="h-4 w-4 flex-shrink-0 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none sm:w-auto"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
