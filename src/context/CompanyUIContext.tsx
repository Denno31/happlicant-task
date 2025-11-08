"use client";

import { useSearchParams } from "next/navigation";
import {
  createContext,
  useState,
  useContext,
  useCallback,
  Suspense,
  useEffect,
} from "react";

type CompanyUIContextType = {
  viewMode: "grid" | "table";
  onViewChange: (mode: "grid" | "table") => void;
  onAdd: () => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  openDialog: () => void;
  closeDialog: () => void;
  isDialogOpen: boolean;
};

const CompanyUIContext = createContext<CompanyUIContextType | null>(null);

function CompanyUIProviderContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") ?? "");
  const [sortBy, setSortBy] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("viewMode") as "grid" | "table" | null;
    if (saved) setViewMode(saved);
    setIsMounted(true);
  }, []);

  const openDialog = useCallback(() => setIsDialogOpen(true), []);
  const closeDialog = useCallback(() => setIsDialogOpen(false), []);

  const onViewChange = (mode: "grid" | "table") => {
    setViewMode(mode);
    localStorage.setItem("viewMode", mode);
  };

  const onAdd = () => {
    openDialog();
  };

  const onSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const onSortChange = (sort: string) => {
    setSortBy(sort);
  };

  if (!isMounted) return null;
  return (
    <CompanyUIContext.Provider
      value={{
        viewMode,
        onViewChange,
        onAdd,
        onSearchChange,
        onSortChange,
        searchQuery,
        setSearchQuery,
        sortBy,
        openDialog,
        closeDialog,
        isDialogOpen,
      }}
    >
      {children}
    </CompanyUIContext.Provider>
  );
}

export const CompanyUIProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Suspense fallback={null}>
      <CompanyUIProviderContent>{children}</CompanyUIProviderContent>
    </Suspense>
  );
};

export const useCompanyUI = () => {
  const context = useContext(CompanyUIContext);
  if (!context) {
    throw new Error("useCompanyUI must be used within a CompanyUIProvider");
  }
  return context;
};
