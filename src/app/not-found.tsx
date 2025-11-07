"use client";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <MainLayout
      viewMode="grid"
      handleViewChange={() => {}}
      handleOpenDialog={() => {}}
      handleSearchChange={() => {}}
      setSortBy={() => {}}
      searchQuery=""
      sortBy=""
    >
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <Card className="w-full max-w-2xl border-gray-200 shadow-lg">
          <CardContent className="p-8 sm:p-12">
            <div className="space-y-6 text-center">
              {/* Icon */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100">
                <AlertCircle className="h-12 w-12 text-pink-600" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-6xl font-bold text-gray-900">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Page Not Found
                </h2>
                <p className="mx-auto max-w-md text-sm text-gray-600">
                  Sorry, we couldn't find the page you're looking for. It might
                  have been moved or doesn't exist.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-center">
                <Link href="/">
                  <Button className="group h-10 w-full gap-2 rounded-lg bg-gradient-to-r from-pink-600 to-pink-500 px-6 font-semibold text-white shadow-md shadow-pink-500/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 sm:w-auto">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
                <Link href="/?q=">
                  <Button
                    variant="outline"
                    className="h-10 w-full gap-2 rounded-lg border-gray-300 px-6 font-medium transition-all hover:border-pink-300 hover:bg-pink-50 sm:w-auto"
                  >
                    <Search className="h-4 w-4" />
                    Search Companies
                  </Button>
                </Link>
              </div>

              {/* Additional Help */}
              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs text-gray-500">
                  If you believe this is an error, please try refreshing the
                  page or contact support.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
