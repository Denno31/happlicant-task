"use client";
import { MainLayout } from "@/components/layout/MainLayout";
import CompanyHomePageContent from "@/components/companies/company-home-content";

export default function HomePage() {
  return (
    <MainLayout isHomePage={true}>
      <CompanyHomePageContent />
    </MainLayout>
  );
}
