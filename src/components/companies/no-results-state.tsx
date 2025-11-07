import { SearchX, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface NoResultsStateProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export function NoResultsState({
  searchQuery,
  onClearSearch,
}: NoResultsStateProps) {
  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="flex min-h-[400px] items-center justify-center p-12">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100">
            <SearchX className="h-10 w-10 text-pink-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">No results found</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
              We couldn&apos;t find any companies matching{" "}
              <span className="font-semibold text-pink-600">
                &quot;{searchQuery}&quot;
              </span>
              . Try adjusting your search terms.
            </p>
          </div>
          <Button
            onClick={onClearSearch}
            className="mt-2 h-10 gap-2 rounded-lg bg-gradient-to-r from-pink-600 to-pink-500 px-6 text-sm font-semibold text-white shadow-md shadow-pink-500/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30"
          >
            <X className="h-4 w-4" />
            Clear Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
