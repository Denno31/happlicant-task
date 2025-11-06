import { Building2, Plus } from "lucide-react";
import { Button } from "react-day-picker";

interface EmptyStatePros {
  onAdd: () => void;
}

export function EmptyState({ onAdd }: EmptyStatePros) {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-12">
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50 to-pink-100">
          <Building2 className="h-10 w-10 text-pink-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">No companies yet</h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
            Start building your portfolio by adding your first company.
          </p>
        </div>
        <Button
          onClick={onAdd}
          className="mt-2 h-10 gap-2 bg-pink-600 px-6 text-sm font-medium text-white hover:bg-pink-700"
        >
          <Plus className="h-4 w-4" />
          Add Your First Company
        </Button>
      </div>
    </div>
  );
}
