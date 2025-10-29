"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Info,
  CreditCard,
  Calendar,
  Zap,
  Shield,
  Coins,
  Edit,
  Trash2,
} from "lucide-react";
import formatArabicDate from "@/utils/formateTime";
import {
  paymentProcessingPercent,
  platformFeePercent,
  safeValue,
  statusLabelMap,
  statusVariantMap,
} from "@/constants";
import { Withdrawal } from "@/types";
import { Button } from "@/components/ui/button";
import EditWithdrawalDialog from "@/components/molecules/dialogs/EditWithdrawalDialog";
import { useState } from "react";

/**
 * Props for FinanceDashboard component
 */
interface EarningsInfoProps {
  availableBalance: number;
  meWithdrawals: Withdrawal[];
  loading: boolean;
  handelDeleteWithdrawal: (withdrawalId: string) => void;
  deleteWithdrawalLoading: boolean;
}

/**
 * FinanceDashboard displays user's balance, withdrawal history, and fees.
 */
export default function FinanceDashboard({
  availableBalance,
  meWithdrawals,
  handelDeleteWithdrawal,
  deleteWithdrawalLoading,
}: EarningsInfoProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectWithdrawal, SetSelectWithdrawal] = useState<Withdrawal | null>(
    null
  );

  const formatCurrency = (amount: number) =>
    amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

  const getStatusBadge = (status: string) => {
    return (
      <Badge
        variant={
          statusVariantMap[status as keyof typeof statusVariantMap] || "default"
        }
      >
        {statusLabelMap[status as keyof typeof statusLabelMap] ||
          safeValue(status)}
      </Badge>
    );
  };

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <header className="flex items-center gap-2">
          <div className="p-2 bg-primary rounded-lg">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            لوحة التحكم المالية
          </h1>
        </header>

        {/* Balance Card */}
        <section>
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white border-0 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-full">
                  <DollarSign className="size-5" />
                </div>
                الرصيد المتاح للسحب
              </CardTitle>
              <CardDescription className="text-primary-foreground/80">
                المبلغ القابل للسحب بعد خصم رسوم المنصة
              </CardDescription>
            </CardHeader>

            <CardContent className="relative z-10">
              <p className="text-4xl font-bold tracking-tight">
                {formatCurrency(availableBalance)}{" "}
                <span className="text-xl font-medium">ريال</span>
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Fees and Info */}
        <section>
          <Card className="shadow-xl border-0">
            <CardHeader className="bg-slate-50 border-b">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                تفاصيل الرسوم والخصومات
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    شروط ومعلومات السحب
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {[
                      "تساعد هذه الرسوم في الحفاظ على جودة الخدمات والتطوير المستمر",
                      "يتم احتساب الرسوم تلقائياً عند كل عملية بيع",
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                        <span>{text}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <span>
                        الحد الأدنى للسحب{" "}
                        <strong className="text-gray-900 dark:text-gray-100">
                          100 ريال سعودي
                        </strong>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Coins className="h-5 w-5 text-emerald-500" />
                    خصومات ورسوم الدفع
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground rounded-xl p-4">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <span>
                        تطبق رسوم المنصة بنسبة {platformFeePercent}% على
                        المعاملات
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <span>
                        رسوم معالجة بنسبة{" "}
                        <strong className="text-gray-900 dark:text-gray-100">
                          {paymentProcessingPercent}%
                        </strong>{" "}
                        تطبق تلقائيًا على كل سحب.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                      <span>2 ريال رسوم إضافية ثابتة</span>
                    </li>
                  </ul>
                  <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                    <Info className="h-4 w-4 text-amber-500 mt-0.5" />
                    <span>
                      يتم خصم رسوم المعالجة تلقائيًا من كل عملية شراء.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Withdrawal Table */}
        {meWithdrawals?.length > 0 && (
          <section>
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-slate-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  سجل التحويلات البنكية
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-lg border">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 text-start">
                      <tr>
                        {[
                          "اسم الحساب",
                          "اسم البنك",
                          "رقم IBAN",
                          "رقم التحويل",
                          "المبلغ",
                          "الحالة",
                          "ملاحظات المشرف",
                          "تاريخ التحويل",
                          "تاريخ الإنشاء",
                          "الإجراءات",
                        ].map((h, i) => (
                          <th
                            key={i}
                            className="px-4 py-3 text-start font-medium text-gray-700"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {meWithdrawals.map((w, i) => (
                        <tr
                          key={i}
                          className="hover:bg-slate-50 transition-colors text-gray-700"
                        >
                          <td className="px-4 py-3 font-medium">
                            {w.accountName}
                          </td>
                          <td className="px-4 py-3">{w.bankName}</td>
                          <td className="px-4 py-3">{w.iban}</td>
                          <td className="px-4 py-3">
                            {w.routingNumber || "-"}
                          </td>
                          <td className="px-4 py-3 font-medium">
                            {formatCurrency(w.amount)} ر.س
                          </td>
                          <td className="px-4 py-3">
                            {getStatusBadge(w.status)}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {w.adminNotes || "لا يوجد ملاحظات"}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {w.routingDate
                              ? formatArabicDate(w.routingDate)
                              : "—"}
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {formatArabicDate(w.createdAt || "")}
                          </td>
                          <td className="flex gap-1 justify-center items-center mt-2 mx-2">
                            <Button
                              onClick={() => handelDeleteWithdrawal(w._id)}
                              disabled={
                                deleteWithdrawalLoading ||
                                w.status === "completed"
                              }
                              variant="destructive"
                              size="sm"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                            <Button
                              onClick={() => {
                                SetSelectWithdrawal(w);
                                setOpenEditDialog(true);
                              }}
                              variant="outline"
                              size="sm"
                              disabled={w.status === "completed"}
                            >
                              <Edit className="size-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {meWithdrawals.map((w, i) => (
                    <div
                      key={i}
                      className="border rounded-lg p-4 shadow-sm bg-white space-y-2"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-primary">
                          {w.accountName}
                        </h3>
                        {getStatusBadge(w.status)}
                      </div>
                      <p className="text-sm text-gray-600">
                        البنك: {w.bankName}
                      </p>
                      <p className="text-sm text-gray-600">IBAN: {w.iban}</p>
                      <p className="text-sm text-gray-600">
                        المبلغ: {formatCurrency(w.amount)} ر.س
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatArabicDate(w.createdAt || "")}
                      </p>
                      <div className="flex gap-2 justify-end">
                        <Button
                          onClick={() => {
                            setOpenEditDialog(true);
                            SetSelectWithdrawal(w);
                          }}
                          variant="outline"
                          size="sm"
                          disabled={w.status === "completed"}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          onClick={() => handelDeleteWithdrawal(w._id)}
                          variant="destructive"
                          size="sm"
                          disabled={w.status === "completed"}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
      {selectWithdrawal && (
        <EditWithdrawalDialog
          open={openEditDialog}
          onOpenChange={setOpenEditDialog}
          selectWithdrawal={selectWithdrawal}
        />
      )}
    </>
  );
}
