import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import type { Company } from "@/types/company";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Building2,
  Calendar,
  FileText,
  Globe,
  MapPin,
  Plus,
  Save,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useEffect } from "react";

interface CompanyDialogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCompany?: Company | null;
}

const companyFormSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  logo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  city: z.string().optional(),
  country: z.string().optional(),
  industry: z.string().optional(),
  employee_count: z.string().optional(),
  founded: z.string().optional(),
  ceo_name: z.string().optional(),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

export default function CompanyDialogForm({
  open,
  onOpenChange,
  editingCompany,
}: CompanyDialogFormProps) {
  const form = useForm<CompanyFormValues>({
    defaultValues: {
      name: "",
      description: "",
      industry: "",
      website: "",
      city: "",
      country: "",
      employee_count: "",
      founded: "",
      ceo_name: "",
      logo_url: "",
    },
  });

  const handleFormSubmit = (data: CompanyFormValues) => {
    console.log(data);
  };

  useEffect(() => {
    if (editingCompany) {
      const location =
        typeof editingCompany.location === "object"
          ? editingCompany.location
          : {};
      const ceoName =
        typeof editingCompany.ceo === "string"
          ? editingCompany.ceo
          : editingCompany.ceo?.name || "";
      form.reset({
        name: editingCompany.name || "",
        description: editingCompany.description || "",
        logo_url: editingCompany.logo_url || "",
        website: editingCompany.website || "",
        city: location.city || "",
        country: location.country || "",
        industry:
          typeof editingCompany.industry === "string"
            ? editingCompany.industry
            : editingCompany.industry?.primary || "",
        employee_count: editingCompany.employee_count?.toString() || "",
        founded: editingCompany.founded?.toString() || "",
        ceo_name: ceoName,
      });
    } else {
      form.reset({
        name: "",
        description: "",
        logo_url: "",
        website: "",
        city: "",
        country: "",
        industry: "",
        employee_count: "",
        founded: "",
        ceo_name: "",
      });
    }
  }, [editingCompany, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {editingCompany ? "Edit Company" : "Add New Company"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {editingCompany
              ? "Update the company details below."
              : "Fill in the company details below. Only name is required."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="border-b border-gray-200 pb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase">
                Basic Information
              </h3>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-pink-600" />
                      Company Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Microsoft Corporation"
                        {...field}
                      />
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
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
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
                      <FormLabel className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-600" />
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
                      <FormLabel className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-green-600" />
                        Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="border-b border-gray-200 pb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase">
                Location
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-600" />
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
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-red-600" />
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
            <div className="space-y-4">
              <h3 className="border-b border-gray-200 pb-2 text-xs font-semibold tracking-wide text-gray-700 uppercase">
                Additional Details
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="employee_count"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600" />
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
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-600" />
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
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4 text-indigo-600" />
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
                  name="logo_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-pink-600" />
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
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-9 gap-2 bg-pink-600 font-medium text-white hover:bg-pink-700"
              >
                {editingCompany ? (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Company
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
