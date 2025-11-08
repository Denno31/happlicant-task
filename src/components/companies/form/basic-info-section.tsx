import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Globe, Plus, Sparkles, TrendingUp, X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { CompanyFormValues } from "./company-form-schema";

interface BasicInfoSectionProps {
  form: UseFormReturn<CompanyFormValues>;
  sectors: string[];
  sectorInput: string;
  setSectorInput: (value: string) => void;
  onAddSector: (sector: string) => void;
  onRemoveSector: (index: number) => void;
}

export function BasicInfoSection({
  form,
  sectors,
  sectorInput,
  setSectorInput,
  onAddSector,
  onRemoveSector,
}: BasicInfoSectionProps) {
  const handleSectorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (sectorInput.trim() && !sectors.includes(sectorInput.trim())) {
        onAddSector(sectorInput.trim());
      }
    }
  };

  const handleAddSector = () => {
    if (sectorInput.trim() && !sectors.includes(sectorInput.trim())) {
      onAddSector(sectorInput.trim());
    }
  };

  return (
    <div className="space-y-4 rounded-lg bg-gradient-to-r from-pink-50/50 to-purple-50/50 p-4">
      <div className="flex items-center gap-2 border-b-2 border-pink-200 pb-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-pink-500 to-pink-600">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
        <h3 className="text-sm font-bold text-gray-800">Basic Information</h3>
      </div>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              Company Name <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., Microsoft Corporation" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FileText className="h-3.5 w-3.5 text-gray-500" />
              Description
            </FormLabel>
            <FormControl>
              <textarea
                placeholder="Brief description..."
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <TrendingUp className="h-3.5 w-3.5 text-gray-500" />
                Industry
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., Technology" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Globe className="h-3.5 w-3.5 text-gray-500" />
                Website
              </FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-2">
        <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <TrendingUp className="h-3.5 w-3.5 text-gray-500" />
          Industry Sectors
        </FormLabel>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Add a sector (e.g., Cloud Computing)"
              value={sectorInput}
              onChange={(e) => setSectorInput(e.target.value)}
              onKeyDown={handleSectorKeyDown}
              className="flex-1"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddSector}
              className="border-pink-200 text-pink-600 hover:bg-pink-50"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {sectors.length > 0 && (
            <div className="flex flex-wrap gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
              {sectors.map((sector, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="gap-1 border-gray-300 bg-white px-2 py-1 text-sm"
                >
                  {sector}
                  <button
                    type="button"
                    onClick={() => onRemoveSector(index)}
                    className="ml-1 rounded-full hover:bg-gray-200"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <p className="text-xs text-gray-500">
            Type a sector and press Enter or click + to add
          </p>
        </div>
      </div>
    </div>
  );
}
