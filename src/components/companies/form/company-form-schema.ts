import { z } from "zod";

export const companyFormSchema = z.object({
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
  ceo_since: z.string().optional(),
  ceo_bio: z.string().optional(),
  sectors: z.string().optional(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;

export const defaultFormValues: CompanyFormValues = {
  name: "",
  description: "",
  industry: "",
  website: "",
  city: "",
  country: "",
  employee_count: "",
  founded: "",
  ceo_name: "",
  ceo_since: "",
  ceo_bio: "",
  logo_url: "",
  sectors: "",
};
