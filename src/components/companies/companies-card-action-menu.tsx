import { ExternalLink, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import type { Company } from "@/types/company";

interface CompanyCardActionMenuProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
}

export default function CompanyCardActionMenu({
  company,
  onEdit,
  onDelete,
  dropdownOpen,
  setDropdownOpen,
}: CompanyCardActionMenuProps) {
  return (
    <div className="transition-opacity md:opacity-0 md:group-hover:opacity-100">
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
  );
}
