import { CompanyUIProvider } from "@/context/CompanyUIContext";
import Header from "./header";

interface MainLayoutProps {
  children: React.ReactNode;
  isHomePage?: boolean;
}
export function MainLayout({ children, isHomePage }: MainLayoutProps) {
  return (
    <CompanyUIProvider>
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Header isHomePage={isHomePage} />
          {children}
        </div>
      </main>
    </CompanyUIProvider>
  );
}
