"use client";

import { useState } from "react";
import Head from "next/head";
import { format } from "date-fns";
import {
  MoreHorizontal,
  X,
  Check,
  Trash2,
  Loader2,
  CheckCircle,
  Eye,
  Copy,
  Calendar as CalendarIcon,
} from "lucide-react";
import useDashboard from "@/hooks/useDashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import WithdrawalDetailsDialog from "@/components/molecules/dialogs/WithdrawalDetailsDialog";
import { statusLabelMap, statusVariantMap } from "@/constants/index";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import WithdrawalsPagination from "@/app/dashboard/withdrawals/WithdrawalsPagination";
import { Withdrawal } from "@/types";

/**
 * @component WithdrawalHistoryTable
 * @description
 * Displays and manages withdrawal requests. Handles details, instant acceptance,
 * rejection, and completion with routing number & date.
 */
export default function WithdrawalHistoryTable() {
  const {
    withdrawals,
    withdrawalsLoading,
    withdrawalsPagination,
    nextWithdrawalPage,
    prevWithdrawalPage,
    handleAcceptWithdrawal,
    handleRejectWithdrawal,
    handleCompleteWithdrawal,
    loading,
  } = useDashboard();

  const [openDetails, setOpenDetails] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<Withdrawal | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"reject" | "complete" | null>(
    null
  );
  const [transferNumber, setTransferNumber] = useState("");
  const [transferDate, setTransferDate] = useState<Date | null>(null);
  const [copiedIban, setCopiedIban] = useState<string | null>(null);

  /** 🔹 Close dialog & reset form state */
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setTransferNumber("");
    setTransferDate(null);
    setActionType(null);
  };
  /** 🔹 Copy IBAN to clipboard */
  const handleCopyIban = (iban: string) => {
    navigator.clipboard.writeText(iban);
    setCopiedIban(iban);
    setTimeout(() => setCopiedIban(null), 1000);
  };

  /** 🔹 Handle withdrawal rejection or completion */
  const handleAction = async () => {
    if (!selectedWithdrawal || !actionType) return;
    const withdrawalId = selectedWithdrawal._id;

    try {
      if (actionType === "reject") {
        await handleRejectWithdrawal(withdrawalId);
      }
      if (actionType === "complete") {
        if (!transferNumber || !transferDate) return;
        await handleCompleteWithdrawal(withdrawalId, {
          routingNumber: transferNumber,
          routingDate: transferDate.toISOString(),
        });
      }
    } finally {
      handleDialogClose();
    }
  };

  const handleInstantAccept = async (withdrawal: Withdrawal) => {
    await handleAcceptWithdrawal(withdrawal._id);
  };

  const safeValue = (val: string): string => {
    if (val === null || val === undefined || val === "") return "A/N";
    return String(val);
  };

  const columns = [
    { header: "الطالب", accessor: "accountName" },
    { header: "البنك", accessor: "bankName" },
    {
      header: "IBAN",
      accessor: "iban",
      customRender: (iban: string) => (
        <div className="flex items-center gap-2">
          {safeValue(iban)}
          {iban && iban !== "A/N" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleCopyIban(iban)}
            >
              {copiedIban === iban ? (
                <Check className="size-4 text-green-500" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>
          )}
        </div>
      ),
    },
    {
      header: "المبلغ",
      accessor: "amount",
      customRender: (amount: number) =>
        amount ? `${amount.toLocaleString()} ر.س` : "A/N",
    },
    {
      header: "التاريخ",
      accessor: "createdAt",
      customRender: (date: string) =>
        date ? new Date(date).toLocaleDateString("ar-EG") : "A/N",
    },
    {
      header: "رقم التحويل",
      accessor: "routingNumber",
      customRender: (routingNumber: string) => safeValue(routingNumber),
    },
    {
      header: "تاريخ التحويل",
      accessor: "routingDate",
      customRender: (date: string) =>
        date ? new Date(date).toLocaleDateString("ar-EG") : "A/N",
    },
    {
      header: "الحالة",
      accessor: "status",
      customRender: (status: string) => (
        <Badge
          variant={
            statusVariantMap[status as keyof typeof statusVariantMap] ||
            "default"
          }
        >
          {statusLabelMap[status as keyof typeof statusLabelMap] ||
            safeValue(status)}
        </Badge>
      ),
    },
    {
      header: "الإجراءات",
      customRender: (_: any, withdrawal: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 shadow-lg">
            <DropdownMenuItem
              onClick={() => {
                setSelectedWithdrawal(withdrawal);
                setOpenDetails(true);
              }}
            >
              <Eye className="size-4 mr-2" /> عرض التفاصيل
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleInstantAccept(withdrawal)}
              disabled={loading}
            >
              <Check className="size-4 mr-2 text-green-600" /> قبول الطلب
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setSelectedWithdrawal(withdrawal);
                setActionType("reject");
                setIsDialogOpen(true);
              }}
            >
              <X className="size-4 mr-2 text-red-600" /> رفض الطلب
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setSelectedWithdrawal(withdrawal);
                setActionType("complete");
                setIsDialogOpen(true);
              }}
            >
              <CheckCircle className="size-4 mr-2 text-green-800" /> إكمال
              العملية
            </DropdownMenuItem>

            <DropdownMenuItem className="text-red-600">
              <Trash2 className="size-4 mr-2" /> حذف الطلب
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>طلبات السحب | لوحة التحكم</title>
      </Head>

      {/* 🧾 Withdrawals Table */}
      <Card>
        <CardHeader>
          <CardTitle>سجل طلبات السحب</CardTitle>
          <CardDescription>عرض وإدارة جميع طلبات السحب</CardDescription>
        </CardHeader>

        <CardContent>
          {withdrawalsLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-4 py-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-5 w-full" />
                ))}
              </div>
            ))
          ) : withdrawals?.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((c) => (
                    <TableHead key={c.header} className="text-right">
                      {c.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.map((withdrawal: Withdrawal) => (
                  <TableRow key={withdrawal._id}>
                    {columns.map((c) => (
                      <TableCell key={c.header}>
                        {c.customRender
                          ? c.customRender(
                              safeValue(
                                withdrawal[
                                  c.accessor as keyof typeof withdrawal
                                ]
                              ),
                              withdrawal
                            )
                          : safeValue(
                              withdrawal[c.accessor as keyof typeof withdrawal]
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              لا توجد طلبات سحب حالياً
            </p>
          )}

          {/* Pagination */}
          <div className="mt-4 flex justify-end">
            <WithdrawalsPagination
              pagination={withdrawalsPagination}
              onNext={nextWithdrawalPage}
              onPrev={prevWithdrawalPage}
              loading={withdrawalsLoading}
            />
          </div>
        </CardContent>
      </Card>

      {/* 🪪 Withdrawal Details Dialog */}
      <WithdrawalDetailsDialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        selectedWithdrawal={selectedWithdrawal?._id}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionType === "reject" ? "رفض الطلب" : "إكمال العملية"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "reject"
                ? "هل أنت متأكد أنك تريد رفض هذا الطلب؟"
                : "يرجى إدخال تفاصيل التحويل لإكمال العملية."}
            </DialogDescription>
          </DialogHeader>

          {actionType === "complete" && (
            <div className="space-y-4">
              <Input
                placeholder="رقم التحويل"
                value={transferNumber}
                onChange={(e) => setTransferNumber(e.target.value)}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !transferDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {transferDate
                      ? format(transferDate, "yyyy-MM-dd")
                      : "تاريخ التحويل"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={transferDate}
                    onSelect={setTransferDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              إلغاء
            </Button>
            <Button
              onClick={handleAction}
              disabled={
                loading ||
                (actionType === "complete" &&
                  (!transferNumber || !transferDate))
              }
            >
              {loading && <Loader2 className="animate-spin mr-2 size-4" />}
              تأكيد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
