"use client";
import { MainLayout } from "@/components/layout/MainLayout";

interface CompanyDetailsPageProps {
  params: {
    id: string;
  };
}

export default function companyDetailsPage({
  params,
}: CompanyDetailsPageProps) {
  return (
    <MainLayout
      isHomePage={false}
      viewMode={"table"}
      handleViewChange={() => {}}
      handleOpenDialog={() => {}}
      handleSearchChange={() => {}}
      setSortBy={() => {}}
      searchQuery={""}
      sortBy={""}
    >
      {params.id}
    </MainLayout>
  );
}
