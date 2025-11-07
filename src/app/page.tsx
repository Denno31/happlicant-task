"use client";
import { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import CompanyStats from "@/components/companies/company-stats";
import type { Company } from "@/types/company";
import { EmptyState } from "@/components/companies/empty-state";
import CompanyGrid from "@/components/companies/company-grid";
import CompanyTable from "@/components/companies/company-table";
import CompanyDialogForm from "@/components/companies/company-dialog-form";
import { CompanyDialogDelete } from "@/components/companies/company-dialog-delete";
import { useRouter, useSearchParams } from "next/navigation";
import { HomeLoadingState } from "@/components/companies/home-loading-state";
import { MainLayout } from "@/components/layout/MainLayout";
import { useCompaniesStorage } from "@/hooks/use-companies-storage";
import { filteredCompanies, sortedCompanies } from "@/lib/company-helpers";

export default function HomePage() {
  const { companies, setCompanies, isLoading } = useCompaniesStorage();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

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

  const handleEditCompany = (updatedCompany: Omit<Company, "id">) => {
    if (editingCompany) {
      setCompanies(
        companies.map((c) =>
          c.id === editingCompany.id
            ? { ...updatedCompany, id: editingCompany.id }
            : c,
        ),
      );
      setEditingCompany(null);
    }
  };

  const handleDelete = () => {
    if (deletedId) {
      setCompanies((prev) =>
        prev.filter((company) => company.id !== deletedId),
      );
      setDeletedId(null);
    }
  };

  const handleOpenEdit = (company: Company) => {
    setEditingCompany(company);
    setIsDialogOpen(true);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (searchQuery) {
        params.set("q", searchQuery);
      } else {
        params.delete("q");
      }
      router.replace(`?${params.toString()}`);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery, router]);

  useEffect(() => {
    if (!isLoading)
      localStorage.setItem("companies", JSON.stringify(companies));
  }, [companies, isLoading]);

  const filteredAndSortedCompanies = useMemo(() => {
    const filtered = filteredCompanies(companies, searchQuery);
    const sorted = sortedCompanies(filtered, sortBy);
    return sorted;
  }, [companies, searchQuery, sortBy]);

  return (
    <MainLayout
      isHomePage={true}
      viewMode={viewMode}
      handleViewChange={handleViewChange}
      handleOpenDialog={handleOpenDialog}
      handleSearchChange={handleSearchChange}
      setSortBy={setSortBy}
      searchQuery={searchQuery}
      sortBy={sortBy}
    >
      {isLoading ? (
        <HomeLoadingState viewMode={viewMode} />
      ) : companies.length === 0 ? (
        <EmptyState onAdd={() => {}} />
      ) : (
        <>
          <CompanyStats companies={companies} />{" "}
          {viewMode === "grid" ? (
            <CompanyGrid
              companies={filteredAndSortedCompanies}
              onDelete={(id) => setDeletedId(id)}
              onEdit={handleOpenEdit}
            />
          ) : (
            <CompanyTable
              companies={filteredAndSortedCompanies}
              onDelete={(id) => setDeletedId(id)}
              onEdit={handleOpenEdit}
            />
          )}
        </>
      )}

      <CompanyDialogForm
        open={isDialogOpen}
        onOpenChange={() => setIsDialogOpen(false)}
        onSubmit={editingCompany ? handleEditCompany : handleSubmit}
        editingCompany={editingCompany}
      />
      <CompanyDialogDelete
        open={!!deletedId}
        onOpenChange={() => setDeletedId(null)}
        onConfirm={handleDelete}
        companyName=""
      />
    </MainLayout>
  );
}
