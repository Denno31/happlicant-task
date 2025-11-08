import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { CompanyFormValues } from "./company-form-schema";

interface LocationSectionProps {
  form: UseFormReturn<CompanyFormValues>;
}

export function LocationSection({ form }: LocationSectionProps) {
  return (
    <div className="space-y-4 rounded-lg bg-gradient-to-r from-blue-50/50 to-cyan-50/50 p-4">
      <div className="flex items-center gap-2 border-b-2 border-blue-200 pb-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-blue-600">
          <MapPin className="h-3.5 w-3.5 text-white" />
        </div>
        <h3 className="text-sm font-bold text-gray-800">Location</h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                City
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., Redmond" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                Country
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., USA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
