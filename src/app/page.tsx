"use client";
import { useMemo, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";

export default function HomePage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletedId, setDeletedId] = useState<string | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const filteredCompanies = companies.filter((company) => {
    return company.name
      .toLowerCase()
      .includes(searchQuery?.toLowerCase() || "");
  });

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
    const searchParams = new URLSearchParams(window.location.search);
    if (query) {
      searchParams.set("q", query);
    } else {
      searchParams.delete("q");
    }
    router.replace(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (!isLoading)
      localStorage.setItem("companies", JSON.stringify(companies));
  }, [companies, isLoading]);

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = companies.filter((company) => {
        const name = company.name.toLowerCase();
        const industry =
          typeof company.industry === "string"
            ? company.industry.toLowerCase()
            : company.industry?.primary.toLowerCase() || "";
        const location =
          typeof company.location === "string"
            ? company.location.toLowerCase()
            : `${company.location?.city || ""} ${company.location?.country || ""}`.toLowerCase();

        return (
          name.includes(query) ||
          industry.includes(query) ||
          location.includes(query)
        );
      });
    }
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "employees-asc":
          return (a.employee_count || 0) - (b.employee_count || 0);
        case "employees-desc":
          return (b.employee_count || 0) - (a.employee_count || 0);
        case "founded-asc":
          return (a.founded || 9999) - (b.founded || 9999);
        case "founded-desc":
          return (b.founded || 0) - (a.founded || 0);
        default:
          return 0;
      }
    });
    return sorted;
  }, [companies, searchQuery, sortBy]);

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
          onSearchChange={handleSearchChange}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          sortBy={sortBy}
        />
        {companies.length === 0 ? (
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
      </div>
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
    </main>
  );
}
