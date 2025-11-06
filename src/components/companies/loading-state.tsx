"use client";

import { Card, CardContent } from "@/components/ui/card";

interface LoadingStateProps {
  viewMode: "grid" | "table";
}

export function LoadingState({ viewMode }: LoadingStateProps) {
  if (viewMode === "grid") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="flex gap-2">
              <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse border-gray-200 py-0">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-3/4 rounded bg-gray-200" />
                      <div className="h-4 w-1/2 rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="mb-4 space-y-2">
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-5/6 rounded bg-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-2/3 rounded bg-gray-200" />
                    <div className="h-4 w-1/2 rounded bg-gray-200" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-32 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                {[...Array(6)].map((_, i) => (
                  <th key={i} className="px-6 py-3 text-left">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gray-200" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 rounded bg-gray-200" />
                        <div className="h-3 w-20 rounded bg-gray-200" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-28 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-16 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-12 rounded bg-gray-200" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="ml-auto h-8 w-8 rounded bg-gray-200" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
