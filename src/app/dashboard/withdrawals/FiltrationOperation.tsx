"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { staticWithdrawalStatuses } from "@/constants";

/**
 * Withdrawal Filtration Component
 * - Handles filtering and sorting withdrawals using dashboard states
 */
export default function FiltrationOperation({
  withdrawalStatus,
  setWithdrawalStatus,
  ibanFilter,
  setIbanFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  refetchWithdrawals,
}: {
  withdrawalStatus: string;
  setWithdrawalStatus: (value: string) => void;
  ibanFilter: string;
  setIbanFilter: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  refetchWithdrawals: () => void;
}) {
  /** Reset filters */
  const handleReset = () => {
    setWithdrawalStatus("all");
    setIbanFilter("");
    setStartDate("");
    setEndDate("");
    setSortBy("createdAt");
    setSortOrder("desc");
    refetchWithdrawals();
  };

  return (
    <div className="flex flex-col gap-6 mb-6 p-4 bg-card rounded-lg border shadow-sm">
      {/* 🔍 IBAN search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ابحث برقم الـ IBAN..."
          className="pl-10 pr-4 py-2 w-full"
          value={ibanFilter}
          onChange={(e) => setIbanFilter(e.target.value)}
        />
      </div>

      {/* 🧮 Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {/* Status filter */}
        <div className="w-full sm:w-[180px]">
          <Select
            value={withdrawalStatus}
            onValueChange={(v) => setWithdrawalStatus(v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="كل الحالات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الحالات</SelectItem>
              {staticWithdrawalStatuses?.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === "pending"
                    ? "قيد الانتظار"
                    : status === "accepted"
                    ? "مقبول"
                    : status === "rejected"
                    ? "مرفوض"
                    : status === "completed"
                    ? "مكتمل"
                    : status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date filters */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Input
            type="date"
            placeholder="من تاريخ"
            className="w-full sm:w-[150px]"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            placeholder="إلى تاريخ"
            className="w-full sm:w-[150px]"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
          />
        </div>

        {/* Sort by */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-[260px]">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v)}>
            <SelectTrigger className="w-full sm:w-[130px]">
              <SelectValue placeholder="ترتيب حسب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">تاريخ الإنشاء</SelectItem>
              <SelectItem value="amount">المبلغ</SelectItem>
              <SelectItem value="accountName">اسم الحساب</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortOrder}
            onValueChange={(v: "asc" | "desc") => setSortOrder(v)}
          >
            <SelectTrigger className="w-full sm:w-[130px]">
              <SelectValue placeholder="الترتيب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">تصاعدي</SelectItem>
              <SelectItem value="desc">تنازلي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          <Button
            onClick={refetchWithdrawals}
            className="flex-1 sm:flex-none sm:w-[120px]"
          >
            <Search className="h-4 w-4 ml-2" />
            بحث
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 sm:flex-none sm:w-[120px]"
          >
            <X className="h-4 w-4 ml-2" />
            إعادة تعيين
          </Button>
        </div>
      </div>
    </div>
  );
}
