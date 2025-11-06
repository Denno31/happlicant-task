import Header from "./header";

interface MainLayoutProps {
  children: React.ReactNode;
  isHomePage?: boolean;
  viewMode: "grid" | "table";
  handleViewChange: (mode: "grid" | "table") => void;
  handleOpenDialog: () => void;
  handleSearchChange: (query: string) => void;
  setSortBy: (sortBy: string) => void;
  searchQuery: string;
  sortBy: string;
}
export function MainLayout({
  children,
  isHomePage,
  viewMode,
  handleViewChange,
  handleOpenDialog,
  handleSearchChange,
  setSortBy,
  searchQuery,
  sortBy,
}: MainLayoutProps) {
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
          isHomePage={isHomePage}
        />
        {children}
      </div>
    </main>
  );
}
