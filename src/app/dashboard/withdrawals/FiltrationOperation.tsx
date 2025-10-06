"use client";

import { useState, useCallback, useMemo } from "react";
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

/** Fake static withdrawals data (for demo) */
const mockWithdrawals = [
  {
    id: "1",
    accountName: "أحمد علي",
    bankName: "الراجحي",
    iban: "SA123456789",
    amount: 500,
    status: "pending",
    date: "2025-10-01",
  },
  {
    id: "2",
    accountName: "سارة محمد",
    bankName: "الأهلي",
    iban: "SA987654321",
    amount: 1200,
    status: "approved",
    date: "2025-09-29",
  },
  {
    id: "3",
    accountName: "محمد حسن",
    bankName: "البلاد",
    iban: "SA5566778899",
    amount: 750,
    status: "rejected",
    date: "2025-09-30",
  },
  {
    id: "4",
    accountName: "منى خالد",
    bankName: "الإنماء",
    iban: "SA4433221100",
    amount: 920,
    status: "approved",
    date: "2025-10-02",
  },
];

/** Fake static status map */
const statusLabelMap: Record<string, string> = {
  pending: "قيد الانتظار",
  approved: "تمت الموافقة",
  rejected: "مرفوض",
};

export default function FiltrationOperation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filtersChanged, setFiltersChanged] = useState(false);

  /** Reset all filters */
  const handleReset = useCallback(() => {
    setSearchQuery("");
    setStatusFilter(null);
    setDateFrom("");
    setDateTo("");
    setFiltersChanged(false);
  }, []);

  /** Change filter state */
  const handleFilterChange = useCallback((setter: any, value: any) => {
    setter(value);
    setFiltersChanged(true);
  }, []);

  /** Filter static data */
  const filteredData = useMemo(() => {
    return mockWithdrawals.filter((item) => {
      const matchesSearch =
        item.accountName.includes(searchQuery) ||
        item.bankName.includes(searchQuery) ||
        item.iban.includes(searchQuery);

      const matchesStatus = statusFilter ? item.status === statusFilter : true;

      const matchesDateFrom = dateFrom ? item.date >= dateFrom : true;
      const matchesDateTo = dateTo ? item.date <= dateTo : true;

      return matchesSearch && matchesStatus && matchesDateFrom && matchesDateTo;
    });
  }, [searchQuery, statusFilter, dateFrom, dateTo]);

  return (
    <div className="flex flex-col gap-6 mb-6 p-4 bg-card rounded-lg border shadow-sm">
      {/* 🔍 Search bar */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ابحث بالاسم, البنك, IBAN..."
          className="pl-10 pr-4 py-2 w-full"
          value={searchQuery}
          onChange={(e) => handleFilterChange(setSearchQuery, e.target.value)}
        />
      </div>

      {/* 🧮 Filters row */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        {/* Status filter */}
        <div className="w-full sm:w-[180px]">
          <Select
            value={statusFilter ?? "all"}
            onValueChange={(value) =>
              handleFilterChange(
                setStatusFilter,
                value === "all" ? null : value
              )
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="حالة الطلب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              {Object.entries(statusLabelMap).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
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
            value={dateFrom}
            onChange={(e) => handleFilterChange(setDateFrom, e.target.value)}
          />
          <Input
            type="date"
            placeholder="إلى تاريخ"
            className="w-full sm:w-[150px]"
            value={dateTo}
            onChange={(e) => handleFilterChange(setDateTo, e.target.value)}
            min={dateFrom}
          />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
          <Button
            onClick={() => setFiltersChanged(false)}
            className="flex-1 sm:flex-none sm:w-[120px]"
            disabled={!filtersChanged}
          >
            <Search className="h-4 w-4 ml-2" />
            بحث
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 sm:flex-none sm:w-[120px]"
            disabled={!searchQuery && !statusFilter && !dateFrom && !dateTo}
          >
            <X className="h-4 w-4 ml-2" />
            إعادة تعيين
          </Button>
        </div>
      </div>

      {/* 🧾 Filtered Results */}
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-3 text-lg">النتائج:</h3>
        {filteredData.length > 0 ? (
          <ul className="space-y-3">
            {filteredData.map((item) => (
              <li
                key={item.id}
                className="p-3 border rounded-md bg-muted/20 hover:bg-muted/40 transition"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.accountName}</span>
                  <span className="text-sm text-muted-foreground">
                    {statusLabelMap[item.status]}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.bankName} – {item.iban}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.amount} ر.س | {item.date}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            لا توجد نتائج مطابقة للفلاتر المحددة.
          </p>
        )}
      </div>
    </div>
  );
}
