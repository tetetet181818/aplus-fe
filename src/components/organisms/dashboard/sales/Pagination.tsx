"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
  onNext: () => void;
  onPrev: () => void;
  onLimitChange: (limit: number) => void;
  loading?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  limit,
  onNext,
  onPrev,
  onLimitChange,
  loading,
}: PaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
      {/* Items info */}
      <span className="text-sm text-muted-foreground">
        عرض {(currentPage - 1) * limit + 1}-
        {Math.min(currentPage * limit, totalItems)} من {totalItems}
      </span>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Limit Selector */}
        <Select
          value={limit.toString()}
          onValueChange={(val) => onLimitChange(parseInt(val))}
          disabled={loading}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="عدد العناصر" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num} / صفحة
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1 || loading}
            onClick={onPrev}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            الصفحة {currentPage} من {totalPages || 1}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage >= totalPages || loading}
            onClick={onNext}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
