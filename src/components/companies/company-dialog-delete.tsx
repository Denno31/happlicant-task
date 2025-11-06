"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface CompanyDialogDeleteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  companyName?: string;
}

export function CompanyDialogDelete({
  open,
  onOpenChange,
  onConfirm,
  companyName,
}: CompanyDialogDeleteProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-200 bg-red-50">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-gray-900">
                Delete Company
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm leading-relaxed text-gray-700">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">
              {companyName || "this company"}
            </span>
            ? This will permanently remove it from your portfolio.
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="h-9 gap-2 bg-red-600 font-medium hover:bg-red-700"
          >
            <AlertTriangle className="h-4 w-4" />
            Delete Company
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
