import { Dialog, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import type { Company } from "@/types/company";
import { Form } from "../ui/form";
import { Loader2, Plus, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  companyFormSchema,
  defaultFormValues,
  type CompanyFormValues,
} from "./form/company-form-schema";
import { BasicInfoSection } from "./form/basic-info-section";
import { LocationSection } from "./form/location-section";
import { AdditionalDetailsSection } from "./form/addition-details-section";

interface CompanyDialogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCompany?: Company | null;
  onSubmit: (company: Omit<Company, "id">) => void;
}

export default function CompanyDialogForm({
  open,
  onOpenChange,
  editingCompany,
  onSubmit,
}: CompanyDialogFormProps) {
  const [sectors, setSectors] = useState<string[]>([]);
  const [sectorInput, setSectorInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: defaultFormValues,
  });

  const handleFormSubmit = (values: CompanyFormValues) => {
    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      const company: Omit<Company, "id"> = {
        name: values.name,
        description: values.description ?? undefined,
        logo_url: values.logo_url ?? undefined,
        website: values.website ?? undefined,
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
        ceo: values.ceo_name
          ? {
              name: values.ceo_name,
              since: values.ceo_since
                ? parseInt(values.ceo_since, 10)
                : undefined,
              bio: values.ceo_bio || undefined,
            }
          : undefined,
      };
      onSubmit(company);
      form.reset();
      setSectors([]);
      setSectorInput("");
      setIsSubmitting(false);
      onOpenChange(false);

      toast.success(
        editingCompany ? `${company.name} updated!` : `${company.name} added!`,
        {
          description: editingCompany
            ? "Your changes have been saved successfully."
            : "The company has been added to your portfolio.",
          className: "border-l-4 border-l-green-500",
          descriptionClassName: "!text-gray-900 font-medium",
          style: {
            backgroundColor: "#ffffff",
            color: "#111827",
          },
        },
      );
    }, 800);
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
        description: editingCompany.description ?? "",
        logo_url: editingCompany.logo_url ?? "",
        website: editingCompany.website ?? "",
        city: location.city ?? "",
        country: location.country ?? "",
        industry:
          typeof editingCompany.industry === "string"
            ? editingCompany.industry
            : editingCompany.industry?.primary || "",
        employee_count: editingCompany.employee_count?.toString() || "",
        founded: editingCompany.founded?.toString() || "",
        ceo_name: ceoName,
        ceo_since:
          typeof editingCompany.ceo === "object"
            ? editingCompany.ceo.since?.toString() || ""
            : "",
        ceo_bio:
          typeof editingCompany.ceo === "object"
            ? editingCompany.ceo.bio || ""
            : "",
        sectors: "",
      });
      setSectors(industryData?.sectors || []);
      setSectorInput("");
    } else {
      form.reset(defaultFormValues);
      setSectors([]);
      setSectorInput("");
    }
  }, [editingCompany, form]);

  const handleAddSector = (sector: string) => {
    setSectors([...sectors, sector]);
    setSectorInput("");
  };

  const handleRemoveSector = (index: number) => {
    setSectors(sectors.filter((_, i) => i !== index));
  };

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
            <BasicInfoSection
              form={form}
              sectors={sectors}
              sectorInput={sectorInput}
              setSectorInput={setSectorInput}
              onAddSector={handleAddSector}
              onRemoveSector={handleRemoveSector}
            />
            <LocationSection form={form} />
            <AdditionalDetailsSection form={form} />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group h-9 gap-2 rounded-lg bg-gradient-to-r from-pink-600 to-pink-500 font-semibold text-white shadow-md shadow-pink-500/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {editingCompany ? "Saving..." : "Adding..."}
                  </>
                ) : editingCompany ? (
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
