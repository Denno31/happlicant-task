"use client";
import { MainLayout } from "@/components/main-layout/main-layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  Users,
  Calendar,
  ExternalLink,
  Globe,
  Briefcase,
  User,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import type { Company } from "@/types/company";
import IndustryTag from "@/components/companies/industry-tag";
import { CompanyDetailsLoading } from "@/components/companies/company-details-loading";
import { formatLocation, getFormattedCEOText } from "@/lib/company-helpers";

interface CompanyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CompanyDetailsPage({
  params,
}: CompanyDetailsPageProps) {
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedCompanies = localStorage.getItem("companies");

      if (storedCompanies) {
        const companies = JSON.parse(storedCompanies) as Company[];
        const foundCompany = companies.find((c) => c.id === id);
        setCompany(foundCompany || null);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <MainLayout isHomePage={false}>
        <CompanyDetailsLoading />
      </MainLayout>
    );
  }

  if (!company) {
    return (
      <MainLayout isHomePage={false}>
        <div className="space-y-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="group gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </Button>
          <Card className="border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Sparkles className="mb-4 h-16 w-16 text-gray-300" />
              <p className="text-lg font-semibold text-gray-900">
                Company not found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                The company you&apos;re looking for doesn&apos;t exist.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const ceoInfo = getFormattedCEOText(company.ceo);

  return (
    <MainLayout isHomePage={false}>
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="group gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </Button>
        <Card className="border-gray-200 transition-all hover:border-pink-200 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex-shrink-0">
                {company.logo_url ? (
                  <Image
                    src={company.logo_url}
                    alt={company.name}
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-lg border border-gray-200 object-contain p-3"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100">
                    <Sparkles className="h-12 w-12 text-pink-600" />
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {company.name}
                  </h1>
                  {company.industry && (
                    <div className="mt-2">
                      <IndustryTag industry={company.industry} />
                    </div>
                  )}
                </div>

                {company.description && (
                  <p className="text-base leading-relaxed text-gray-600">
                    {company.description}
                  </p>
                )}

                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-pink-600 transition-colors hover:text-pink-700"
                  >
                    <Globe className="h-4 w-4" />
                    Visit Website
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-gray-200 transition-all hover:border-pink-200 hover:shadow-md">
            <CardContent className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Briefcase className="h-5 w-5 text-pink-600" />
                Company Information
              </h2>
              <div className="space-y-4">
                {company.location && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-pink-50">
                      <MapPin className="h-4 w-4 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500">
                        Location
                      </p>
                      <p className="mt-0.5 text-sm text-gray-900">
                        {formatLocation(company.location, {
                          includeAddress: true,
                          includeZipCode: true,
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {company.employee_count && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-pink-50">
                      <Users className="h-4 w-4 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500">
                        Employees
                      </p>
                      <p className="mt-0.5 text-sm text-gray-900">
                        {company.employee_count.toLocaleString()} employees
                      </p>
                    </div>
                  </div>
                )}

                {company.founded && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-pink-50">
                      <Calendar className="h-4 w-4 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500">
                        Founded
                      </p>
                      <p className="mt-0.5 text-sm text-gray-900">
                        {company.founded}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          {ceoInfo && (
            <Card className="border-gray-200 transition-all hover:border-pink-200 hover:shadow-md">
              <CardContent className="p-6">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <User className="h-5 w-5 text-pink-600" />
                  Leadership
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-pink-50">
                      <User className="h-4 w-4 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-500">
                        Chief Executive Officer
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-gray-900">
                        {ceoInfo.name}
                      </p>
                      {ceoInfo.since && (
                        <p className="mt-0.5 text-xs text-gray-600">
                          Since {ceoInfo.since}
                        </p>
                      )}
                    </div>
                  </div>
                  {ceoInfo.bio && (
                    <>
                      <Separator className="bg-gray-100" />
                      <p className="text-sm leading-relaxed text-gray-600">
                        {ceoInfo.bio}
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        {typeof company.industry === "object" &&
          company.industry?.sectors &&
          company.industry.sectors.length > 0 && (
            <Card className="border-gray-200 transition-all hover:border-pink-200 hover:shadow-md">
              <CardContent className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Industry Sectors
                </h2>
                <div className="flex flex-wrap gap-2">
                  {company.industry.sectors.map((sector) => (
                    <Badge
                      key={sector}
                      variant="outline"
                      className="border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-pink-200 hover:bg-pink-50"
                    >
                      {sector}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </MainLayout>
  );
}
