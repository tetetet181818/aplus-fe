"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DollarSign,
  Info,
  CreditCard,
  Calendar,
  Zap,
  Shield,
  Coins,
} from "lucide-react";
import formatArabicDate from "@/utils/formateTime";
import { paymentProcessingPercent, platformFeePercent } from "@/constants";
import { Withdrawal } from "@/types";

/**
 * Props for FinanceDashboard component.
 */
interface EarningsInfoProps {
  availableBalance: number;
  meWithdrawals: Withdrawal[];
  loading: boolean;
}

/**
 * FinanceDashboard displays user's available balance,
 * withdrawal history, and applied fees.
 */
const FinanceDashboard = ({
  availableBalance,
  meWithdrawals,
  loading,
}: EarningsInfoProps) => {
  /** Formats a numeric amount into readable currency form. */
  const formatCurrency = (amount: number) =>
    amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");

  /** Returns a styled badge based on withdrawal status. */
  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      مكتمل: "default",
      "قيد المعالجة": "default",
      ملغى: "destructive",
      pending: "secondary",
      accepted: "default",
      rejected: "destructive",
      completed: "default",
    };
    const variant = variants[status] || "secondary";
    return (
      <Badge variant={variant} className="text-xs">
        {status}
      </Badge>
    );
  };

  /** Skeleton placeholders for loading state. */
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-2 mb-8">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary rounded-lg">
          <CreditCard className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          لوحة التحكم المالية
        </h1>
      </div>

      {/* Available Balance */}
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
            هذا هو المبلغ الذي يمكنك سحبه حاليًا بعد خصم رسوم المنصة
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          <p className="text-4xl font-bold tracking-tight">
            {formatCurrency(availableBalance)}{" "}
            <span className="text-xl font-medium">ريال</span>
          </p>
        </CardContent>
      </Card>

      {/* Fees and Notes */}
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
                    الحد الأدنى للسحب هو{" "}
                    <strong className="text-gray-900 dark:text-gray-100">
                      50 ريال سعودي
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
                    تطبق رسوم منصة بنسبة {platformFeePercent}% على جميع
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
                  يتم خصم رسوم المعالجة تلقائيًا من كل عملية شراء أو سحب.
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawals History Table */}
      {meWithdrawals?.length > 0 && (
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              سجل التحويلات البنكية
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto rounded-lg border">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-start">
                  <tr>
                    <th className="px-4 py-3 text-start font-medium">
                      اسم الحساب
                    </th>
                    <th className="px-4 py-3 text-start font-medium">
                      اسم البنك
                    </th>
                    <th className="px-4 py-3 text-start font-medium">
                      رقم IBAN
                    </th>
                    <th className="px-4 py-3 text-start font-medium">
                      رقم التوجيه (Routing)
                    </th>
                    <th className="px-4 py-3 text-start font-medium">المبلغ</th>
                    <th className="px-4 py-3 text-start font-medium">الحالة</th>
                    <th className="px-4 py-3 text-start font-medium">
                      ملاحظات المشرف
                    </th>
                    <th className="px-4 py-3 text-start font-medium">
                      تاريخ التحويل
                    </th>
                    <th className="px-4 py-3 text-start font-medium">
                      تاريخ الإنشاء
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {meWithdrawals.map((w, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium">{w.accountName}</td>
                      <td className="px-4 py-3">{w.bankName}</td>
                      <td className="px-4 py-3">{w.iban}</td>
                      <td className="px-4 py-3">{w.routingNumber || "-"}</td>
                      <td className="px-4 py-3 font-medium">
                        {formatCurrency(w.amount)} ر.س
                      </td>
                      <td className="px-4 py-3">{getStatusBadge(w.status)}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {w.adminNotes || "لا يوجد ملاحظات"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {w.routingDate ? formatArabicDate(w.routingDate) : "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatArabicDate(w.createdAt || "")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinanceDashboard;
