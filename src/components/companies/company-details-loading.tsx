import { Card, CardContent } from "@/components/ui/card";

export function CompanyDetailsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-200" />
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="h-24 w-24 animate-pulse rounded-lg bg-gray-200" />
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
                <div className="h-6 w-32 animate-pulse rounded-full bg-gray-200" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="mb-4 h-6 w-32 animate-pulse rounded bg-gray-200" />
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
              <div className="h-px w-full animate-pulse bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 animate-pulse rounded-md bg-gray-200"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
