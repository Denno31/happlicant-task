import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CompanyDetailsLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-24" />
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <Skeleton className="h-24 w-24 rounded-lg" />
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-6 w-32 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <Skeleton className="mb-4 h-6 w-48" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <Skeleton className="mb-4 h-6 w-32" />
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-px w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <Skeleton className="mb-4 h-6 w-40" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-24 rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
