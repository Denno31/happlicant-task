import type { Company } from "@/types/company";
import { Building2, MapPin, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface CompanyStatsProps {
    companies: Company[];
}

function getColorClasses(color: string) {
    switch (color) {
        case "pink":
            return "border-pink-600 bg-pink-50 text-pink-600";
        case "blue":
            return "border-blue-600 bg-blue-50 text-blue-600";
        case "purple":
            return "border-purple-600 bg-purple-50 text-purple-600";
        case "green":
            return "border-green-600 bg-green-50 text-green-600";
        default:
            return "border-gray-600 bg-gray-50 text-gray-600";
    }
}
export default function CompanyStats({ companies }: CompanyStatsProps) {
  const totalCompanies = companies.length;
  const totalEmployees = companies.reduce((acc, company) => acc + (company?.employee_count || 0), 0);
  const uniqueIndustries = new Set(companies.map((company) => company.industry)).size;
  const uniqueLocations = new Set(companies.map((company) => company.location)).size;
  const stats = [
    {
      label: "Total Companies",
      value: totalCompanies.toLocaleString(),
      icon: Building2,
      color: "pink",
    },
    {
      label: "Total Employees",
      value: totalEmployees.toLocaleString(),
      icon: Users,
      color: "blue",
    },
    {
      label: "Industries",
      value: uniqueIndustries.toLocaleString(),
      icon: TrendingUp,
      color: "purple",
    },
    {
      label: "Locations",
      value: uniqueLocations.toLocaleString(),
      icon: MapPin,
      color: "green",
    },
  ];
   return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className="transition-all hover:shadow-md border-gray-200 py-0"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg border ${getColorClasses(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}