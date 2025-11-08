import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar, Sparkles, User, Users } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { CompanyFormValues } from "./company-form-schema";

interface AdditionalDetailsSectionProps {
  form: UseFormReturn<CompanyFormValues>;
}

export function AdditionalDetailsSection({ form }: AdditionalDetailsSectionProps) {
  return (
    <div className="space-y-4 rounded-lg bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-4">
      <div className="flex items-center gap-2 border-b-2 border-purple-200 pb-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-purple-600">
          <Users className="h-3.5 w-3.5 text-white" />
        </div>
        <h3 className="text-sm font-bold text-gray-800">Additional Details</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="employee_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Users className="h-3.5 w-3.5 text-gray-500" />
                Employee Count
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 220000"
                  min="1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="founded"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="h-3.5 w-3.5 text-gray-500" />
                Founded Year
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 1975"
                  min="1800"
                  max={new Date().getFullYear()}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="ceo_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User className="h-3.5 w-3.5 text-gray-500" />
                CEO Name
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., Satya Nadella" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ceo_since"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Calendar className="h-3.5 w-3.5 text-gray-500" />
                CEO Since
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 2014"
                  min="1900"
                  max={new Date().getFullYear()}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="ceo_bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User className="h-3.5 w-3.5 text-gray-500" />
              CEO Bio
            </FormLabel>
            <FormControl>
              <textarea
                placeholder="Brief biography of the CEO..."
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
          name="logo_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Sparkles className="h-3.5 w-3.5 text-gray-500" />
                Logo URL
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
