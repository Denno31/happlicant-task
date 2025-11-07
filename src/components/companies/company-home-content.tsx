import { useCompanyUI } from "@/context/CompanyUIContext";
import { useCompaniesStorage } from "@/hooks/use-companies-storage";
import { filteredCompanies, sortedCompanies } from "@/lib/company-helpers";
import type { Company } from "@/types/company";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CompanyDialogDelete } from "./company-dialog-delete";
import CompanyDialogForm from "./company-dialog-form";
import CompanyTable from "./company-table";
import CompanyGrid from "./company-grid";
import CompanyStats from "./company-stats";
import { EmptyState } from "./empty-state";
import { HomeLoadingState } from "./home-loading-state";

export default function CompanyHomePageContent() {
  const {
    viewMode,
    searchQuery,
    sortBy,
    openDialog,
    closeDialog,
    isDialogOpen,
  } = useCompanyUI();

  const { companies, setCompanies, isLoading } = useCompaniesStorage();
  const [deletedId, setDeletedId] = useState<string | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const router = useRouter();

  const handleOpenDialog = () => {
    openDialog();
  };

  const handleSubmit = (newCompany: Omit<Company, "id">) => {
    const company: Company = {
      ...newCompany,
      id: crypto.randomUUID(),
    };
    setCompanies((prev) => [...prev, company]);
    closeDialog();
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
    openDialog();
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
    <>
      {isLoading ? (
        <HomeLoadingState viewMode={viewMode} />
      ) : companies.length === 0 ? (
        <EmptyState onAdd={handleOpenDialog} />
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
        onOpenChange={closeDialog}
        onSubmit={editingCompany ? handleEditCompany : handleSubmit}
        editingCompany={editingCompany}
      />
      <CompanyDialogDelete
        open={!!deletedId}
        onOpenChange={() => setDeletedId(null)}
        onConfirm={handleDelete}
        companyName=""
      />
    </>
  );
}
