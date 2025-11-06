"use client";
import { useState } from "react";
import { useEffect } from "react";
import Header from "@/components/layout/header";
import CompanyStats from "@/components/companies/company-stats";
import type { Company } from "@/types/company";
import dummyData from "@/../dummyData.json";
import { EmptyState } from "@/components/companies/empty-state";
import CompanyGrid from "@/components/companies/company-grid";
import CompanyTable from "@/components/companies/company-table";
import CompanyDialogForm from "@/components/companies/company-dialog-form";
import { CompanyDialogDelete } from "@/components/companies/company-dialog-delete";

export default function HomePage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);

  useEffect(() => {
    const storedCompanies = localStorage.getItem("companies");
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    } else {
      setCompanies(dummyData as Company[]);
      localStorage.setItem("companies", JSON.stringify(dummyData));
    }
    setIsLoading(false);
  }, []);

  const handleViewChange = (mode: "grid" | "table") => {
    setViewMode(mode);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = (newCompany: Omit<Company, "id">) => {
    const company: Company = {
      ...newCompany,
      id: crypto.randomUUID(),
    };
    setCompanies((prev) => [...prev, company]);
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    if (deletedId) {
      setCompanies((prev) =>
        prev.filter((company) => company.id !== deletedId),
      );
      setDeletedId(null);
    }
  };

  useEffect(() => {
    if (!isLoading)
      localStorage.setItem("companies", JSON.stringify(companies));
  }, [companies, isLoading]);

  if (isLoading) {
    return <div>loading..</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header
          viewMode={viewMode}
          onViewChange={handleViewChange}
          onAdd={handleOpenDialog}
          onSearchChange={() => {}}
          onSortChange={() => {}}
          searchQuery=""
          sortBy=""
        />
        {companies.length === 0 ? (
          <EmptyState onAdd={() => {}} />
        ) : (
          <>
            <CompanyStats companies={companies} />{" "}
            {viewMode === "grid" ? (
              <CompanyGrid
                companies={companies}
                onDelete={(id) => setDeletedId(id)}
                onEdit={() => {}}
              />
            ) : (
              <CompanyTable
                companies={companies}
                onDelete={(id) => setDeletedId(id)}
                onEdit={() => {}}
              />
            )}
          </>
        )}
      </div>
      <CompanyDialogForm
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
      />
      <CompanyDialogDelete
        open={!!deletedId}
        onOpenChange={() => setDeletedId(null)}
        onConfirm={handleDelete}
        companyName=""
      />
    </main>
  );
}
