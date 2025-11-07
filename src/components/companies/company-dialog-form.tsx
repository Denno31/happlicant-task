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
  Calendar,
  FileText,
  Globe,
  MapPin,
  Plus,
  Save,
  Sparkles,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

interface CompanyDialogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCompany?: Company | null;
  onSubmit: (company: Omit<Company, "id">) => void;
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
  sectors: z.string().optional(),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

export default function CompanyDialogForm({
  open,
  onOpenChange,
  editingCompany,
  onSubmit,
}: CompanyDialogFormProps) {
  const [sectors, setSectors] = useState<string[]>([]);
  const [sectorInput, setSectorInput] = useState("");

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
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
      sectors: "",
    },
  });

  const handleFormSubmit = (values: CompanyFormValues) => {
    const company: Omit<Company, "id"> = {
      name: values.name,
      description: values.description || undefined,
      logo_url: values.logo_url || undefined,
      website: values.website || undefined,
      location:
        values.city || values.country
          ? {
              city: values.city || undefined,
              country: values.country || undefined,
            }
          : undefined,
      industry:
        values.industry && sectors.length > 0
          ? {
              primary: values.industry,
              sectors: sectors,
            }
          : values.industry || undefined,
      employee_count: values.employee_count
        ? parseInt(values.employee_count, 10)
        : undefined,
      founded: values.founded ? parseInt(values.founded, 10) : undefined,
      ceo: values.ceo_name || undefined,
    };
    onSubmit(company);
    form.reset();
    setSectors([]);
    setSectorInput("");
    onOpenChange(false);
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
      const industryData =
        typeof editingCompany.industry === "object"
          ? editingCompany.industry
          : null;

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
        sectors: "",
      });
      setSectors(industryData?.sectors || []);
      setSectorInput("");
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
        sectors: "",
      });
      setSectors([]);
      setSectorInput("");
    }
  }, [editingCompany, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
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
            <div className="space-y-4 rounded-lg bg-gradient-to-r from-pink-50/50 to-purple-50/50 p-4">
              <div className="flex items-center gap-2 border-b-2 border-pink-200 pb-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-pink-500 to-pink-600">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-800">
                  Basic Information
                </h3>
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
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (
                            sectorInput.trim() &&
                            !sectors.includes(sectorInput.trim())
                          ) {
                            setSectors([...sectors, sectorInput.trim()]);
                            setSectorInput("");
                          }
                        }
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (
                          sectorInput.trim() &&
                          !sectors.includes(sectorInput.trim())
                        ) {
                          setSectors([...sectors, sectorInput.trim()]);
                          setSectorInput("");
                        }
                      }}
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
                            onClick={() =>
                              setSectors(sectors.filter((_, i) => i !== index))
                            }
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
            <div className="space-y-4 rounded-lg bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-4">
              <div className="flex items-center gap-2 border-b-2 border-purple-200 pb-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-purple-600">
                  <Users className="h-3.5 w-3.5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-gray-800">
                  Additional Details
                </h3>
              </div>

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
                        <Sparkles className="h-4 w-4 text-pink-600" />
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
                className="group h-9 gap-2 rounded-lg bg-gradient-to-r from-pink-600 to-pink-500 font-semibold text-white shadow-md shadow-pink-500/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30"
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
