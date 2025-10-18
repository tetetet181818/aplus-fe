"use client";

import { useState } from "react";
import Head from "next/head";
import { format } from "date-fns";
import {
  MoreHorizontal,
  X,
  Check,
  Loader2,
  CheckCircle,
  Eye,
  Copy,
  Calendar as CalendarIcon,
  CirclePlus,
} from "lucide-react";
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
import { safeValue, statusLabelMap, statusVariantMap } from "@/constants/index";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import WithdrawalsPagination from "@/app/dashboard/withdrawals/WithdrawalsPagination";
import { AcceptedWithdrawal, Withdrawal } from "@/types";
import AddAdminNotesDialog from "@/components/molecules/dialogs/AddAdminNotesDialog";

/**
 * @component WithdrawalHistoryTable
 * @description Responsive withdrawals view — table on desktop, cards on mobile.
 */
export default function WithdrawalHistoryTable({
  withdrawals,
  withdrawalsLoading,
  withdrawalsPagination,
  nextWithdrawalPage,
  prevWithdrawalPage,
  handleAcceptWithdrawal,
  handleRejectWithdrawal,
  handleCompleteWithdrawal,
  loading,
  handleAddAdminNote,
  addAdminNoteLoading,
}: {
  withdrawals: Withdrawal[];
  withdrawalsLoading: boolean;
  withdrawalsPagination: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
  nextWithdrawalPage: () => void;
  prevWithdrawalPage: () => void;
  handleAcceptWithdrawal: (id: string) => void;
  handleRejectWithdrawal: (id: string) => void;
  handleCompleteWithdrawal: (id: string, data: AcceptedWithdrawal) => void;
  loading: boolean;
  handleAddAdminNote: (id: string, note: string) => void;
  addAdminNoteLoading: boolean;
}) {
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
  const [openAddAdminNotes, setOpenAddAdminNotes] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setTransferNumber("");
    setTransferDate(null);
    setActionType(null);
  };

  const handleCopyIban = (iban: string) => {
    navigator.clipboard.writeText(iban);
    setCopiedIban(iban);
    setTimeout(() => setCopiedIban(null), 1000);
  };

  const handleAction = async () => {
    if (!selectedWithdrawal || !actionType) return;
    const withdrawalId = selectedWithdrawal._id;

    try {
      if (actionType === "reject") {
        await handleRejectWithdrawal(withdrawalId);
      }
      if (actionType === "complete") {
        await handleCompleteWithdrawal(withdrawalId, {
          routingNumber: transferNumber,
          routingDate: transferDate?.toISOString() || "",
        });
      }
    } finally {
      handleDialogClose();
    }
  };

  const handleInstantAccept = async (withdrawal: Withdrawal) => {
    await handleAcceptWithdrawal(withdrawal._id);
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
      header: "ملاحظة الادمن",
      accessor: "adminNotes",
      customRender: (notes: string) => safeValue(notes),
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
  ];

  return (
    <>
      <Head>
        <title>طلبات السحب | لوحة التحكم</title>
      </Head>
      <Card>
        <CardHeader>
          <CardTitle>سجل طلبات السحب</CardTitle>
          <CardDescription>عرض وإدارة جميع طلبات السحب</CardDescription>
        </CardHeader>

        <CardContent>
          {/* Loading skeleton */}
          {withdrawalsLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-4 py-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-5 w-full" />
                ))}
              </div>
            ))
          ) : !withdrawals?.length ? (
            <p className="text-center py-8 text-muted-foreground">
              لا توجد طلبات سحب حالياً
            </p>
          ) : (
            <>
              {/*  Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((c) => (
                        <TableHead key={c.header} className="text-right">
                          {c.header}
                        </TableHead>
                      ))}
                      <TableHead>الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {withdrawals.map((w: Withdrawal) => (
                      <TableRow key={w._id}>
                        {columns.map((c) => (
                          <TableCell key={c.header}>
                            {c.customRender
                              ? c.customRender(w[c.accessor as keyof typeof w])
                              : safeValue(
                                  w[c.accessor as keyof typeof w] || ""
                                )}
                          </TableCell>
                        ))}

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="flex items-center justify-center gap-2"
                                onClick={() => {
                                  setSelectedWithdrawal(w);
                                  setOpenDetails(true);
                                }}
                              >
                                عرض التفاصيل
                                <Eye className="size-4 mr-2" />
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center justify-center gap-2"
                                onClick={() => handleInstantAccept(w)}
                              >
                                قبول
                                <Check className="size-4 mr-2 text-green-600" />
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center justify-center gap-2"
                                onClick={() => {
                                  setSelectedWithdrawal(w);
                                  setActionType("reject");
                                  setIsDialogOpen(true);
                                }}
                              >
                                رفض
                                <X className="size-4 mr-2 text-red-600" />
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center justify-center gap-2"
                                onClick={() => {
                                  setSelectedWithdrawal(w);
                                  setActionType("complete");
                                  setIsDialogOpen(true);
                                }}
                              >
                                إكمال العملية
                                <CheckCircle className="size-4 mr-2 text-green-800" />
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center justify-center gap-2"
                                onClick={() => {
                                  setSelectedWithdrawal(w);
                                  setOpenAddAdminNotes(true);
                                }}
                              >
                                إضافة ملاحظة
                                <CirclePlus className="size-4 mr-2 text-green-800" />
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* 📱 Mobile Cards (with all actions) */}
              <div className="flex flex-col gap-4 md:hidden">
                {withdrawals.map((w: Withdrawal) => (
                  <div
                    key={w._id}
                    className="p-4 border rounded-lg bg-muted/10 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-lg">
                        {w.accountName || "A/N"}
                      </span>
                      <Badge
                        variant={
                          statusVariantMap[
                            w.status as keyof typeof statusVariantMap
                          ] || "default"
                        }
                      >
                        {
                          statusLabelMap[
                            w.status as keyof typeof statusLabelMap
                          ]
                        }
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      البنك: {w.bankName || "A/N"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      IBAN: {w.iban || "A/N"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ملاحظة الادمن: {w.adminNotes || "A/N"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      المبلغ: {w.amount?.toLocaleString() || 0} ر.س
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      التاريخ:{" "}
                      {w.createdAt
                        ? new Date(w.createdAt).toLocaleDateString("ar-EG")
                        : "A/N"}
                    </p>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full flex justify-center items-center"
                        >
                          <MoreHorizontal className="mr-2 h-4 w-4" />
                          العمليات
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-full">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedWithdrawal(w);
                            setOpenDetails(true);
                          }}
                        >
                          <Eye className="size-4 mr-2" />
                          عرض التفاصيل
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleInstantAccept(w)}
                        >
                          <Check className="size-4 mr-2 text-green-600" />
                          قبول الطلب
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedWithdrawal(w);
                            setActionType("reject");
                            setIsDialogOpen(true);
                          }}
                        >
                          <X className="size-4 mr-2 text-red-600" />
                          رفض الطلب
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedWithdrawal(w);
                            setActionType("complete");
                            setIsDialogOpen(true);
                          }}
                        >
                          <CheckCircle className="size-4 mr-2 text-green-800" />
                          إكمال العملية
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedWithdrawal(w);
                            setOpenAddAdminNotes(true);
                          }}
                        >
                          <CirclePlus className="size-4 mr-2 text-green-800" />
                          إضافة ملاحظة
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pagination */}
          {/* {withdrawalsPagination?.totalItems > 10 && ( */}
          <div className="mt-4 flex justify-end">
            <WithdrawalsPagination
              pagination={withdrawalsPagination}
              onNext={nextWithdrawalPage}
              onPrev={prevWithdrawalPage}
              loading={withdrawalsLoading}
            />
          </div>
          {/* )} */}
        </CardContent>
      </Card>
      {/* Dialogs */}
      <WithdrawalDetailsDialog
        open={openDetails}
        onClose={() => setOpenDetails(false)}
        selectedWithdrawal={selectedWithdrawal?._id || ""}
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
                    selected={transferDate || new Date()}
                    onSelect={setTransferDate}
                    required
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

      <AddAdminNotesDialog
        onOpenChange={() => setOpenAddAdminNotes(false)}
        open={openAddAdminNotes}
        withdrawalId={selectedWithdrawal?._id || ""}
        handleAddAdminNote={handleAddAdminNote}
        addAdminNoteLoading={addAdminNoteLoading}
      />
    </>
  );
}
