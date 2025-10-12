"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import formatArabicDate from "@/utils/formateTime";
import Link from "next/link";
import {
  Copy,
  Calendar,
  User,
  CreditCard,
  FileText,
  MessageSquare,
  Mail,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCallback } from "react";
import useAuth from "@/hooks/useAuth";
import { useGetSingleSaleQuery } from "@/store/api/sales.api";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  open: boolean;
  onClose: () => void;
  salesId: string | null;
}

const statusVariantMap: Record<
  string,
  "default" | "secondary" | "destructive"
> = {
  completed: "default",
  pending: "secondary",
  failed: "destructive",
};

const statusLabelMap: Record<string, string> = {
  completed: "مكتمل",
  pending: "قيد الانتظار",
  failed: "فاشلة",
};

const paymentMethodMap: Record<string, string> = {
  bank: "تحويل بنكي",
  card: "بطاقة ائتمان",
  wallet: "محفظة إلكترونية",
};

const paymentMethodIcons: Record<string, LucideIcon> = {
  bank: CreditCard,
  card: CreditCard,
  wallet: CreditCard,
};

export default function SalesDetailsDialog({ open, onClose, salesId }: Props) {
  const { token } = useAuth();
  const { data, isLoading } = useGetSingleSaleQuery({
    token: token || "",
    saleId: salesId || "",
  });

  const saleData = data?.data?.sale;
  const sellerData = data?.data?.seller;
  const buyerData = data?.data?.buyer;

  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`تم نسخ ${label} بنجاح`);
  }, []);

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    copyable,
    isLink,
    href,
  }: {
    icon?: LucideIcon;
    label: string;
    value?: string | number | null;
    copyable?: boolean;
    isLink?: boolean;
    href?: string;
  }) => {
    if (!value) return null;
    const content = (
      <div className="flex items-start gap-2">
        {Icon && <Icon className="h-4 w-4 mt-1 text-muted-foreground" />}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold break-words">{value}</span>
            {copyable && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-accent/20"
                onClick={() => handleCopy(String(value), label)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );

    return isLink ? (
      <Link
        href={href || "#"}
        className="block hover:bg-accent/5 rounded-lg p-2 -m-2"
      >
        {content}
      </Link>
    ) : (
      <div className="p-2 -m-2">{content}</div>
    );
  };

  /** Skeleton while loading */
  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl p-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>

          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </DialogContent>
      </Dialog>
    );
  }

  if (!saleData)
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <p className="text-center text-muted-foreground py-6">
            لا توجد بيانات متاحة
          </p>
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header with gradient background and rounded corners */}
        <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-gray-800">
            {/* Icon with circular background */}
            <div className="p-2 bg-blue-100 rounded-full">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            تفاصيل المعاملة
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Amount & Status Card with decorative shapes */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-200 overflow-hidden">
            {/* Decorative circles in background */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-indigo-200 rounded-full opacity-30"></div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="text-center sm:text-left">
                <p className="text-sm text-blue-600 font-medium mb-2">المبلغ</p>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">
                    {saleData.amount} ر.س
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-blue-600 font-medium mb-2">الحالة</p>
                <div className="flex justify-center sm:justify-end">
                  <Badge
                    variant={statusVariantMap[saleData.status] || "secondary"}
                    className={cn(
                      "text-sm px-4 py-2 rounded-full font-semibold shadow-sm",
                      saleData.status === "completed" &&
                        "bg-green-100 text-green-800 border-green-200",
                      saleData.status === "pending" &&
                        "bg-yellow-100 text-yellow-800 border-yellow-200",
                      saleData.status === "failed" &&
                        "bg-red-100 text-red-800 border-red-200"
                    )}
                  >
                    {/* Status indicator dot */}
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mr-2",
                        saleData.status === "completed" && "bg-green-500",
                        saleData.status === "pending" && "bg-yellow-500",
                        saleData.status === "failed" && "bg-red-500"
                      )}
                    ></div>
                    {statusLabelMap[saleData.status] || saleData.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info Section */}
          <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold border-b pb-3 flex items-center gap-2 text-gray-700">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              معلومات الدفع
            </h3>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem
                  icon={paymentMethodIcons[saleData.payment_method]}
                  label="طريقة الدفع"
                  value={paymentMethodMap[saleData.payment_method]}
                />
                <DetailItem
                  icon={CreditCard}
                  label="رسوم المنصة"
                  value={`${saleData.platform_fee} ر.س`}
                />
              </div>
              <DetailItem
                icon={FileText}
                label="رقم الفاتورة"
                value={saleData.invoice_id}
                copyable
              />
            </div>
          </section>

          {/* Note Info Section */}
          <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold border-b pb-3 flex items-center gap-2 text-gray-700">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              معلومات الملاحظة
            </h3>
            <div className="mt-4 space-y-4">
              <DetailItem
                label="رقم الملاحظة"
                value={saleData.note_id}
                isLink
                href={`/notes/${saleData.note_id}`}
                copyable
              />
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                <DetailItem
                  label="عنوان الملاحظة"
                  value={saleData.note_title}
                />
              </div>
            </div>
          </section>

          {/* Seller Info Section */}
          {sellerData && (
            <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold border-b pb-3 flex items-center gap-2 text-gray-700">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                بيانات البائع
              </h3>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailItem
                    icon={User}
                    label="اسم البائع"
                    value={sellerData.fullName}
                  />
                  <DetailItem
                    icon={Mail}
                    label="البريد"
                    value={sellerData.email}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailItem
                    icon={Phone}
                    label="الهاتف"
                    value={sellerData.phone}
                  />
                  <DetailItem
                    label="معرف البائع"
                    value={sellerData._id}
                    isLink
                    href={`/seller/${sellerData._id}`}
                    copyable
                  />
                </div>
              </div>
            </section>
          )}

          {/* Buyer Info Section */}
          {buyerData && (
            <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold border-b pb-3 flex items-center gap-2 text-gray-700">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
                بيانات المشتري
              </h3>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailItem
                    icon={User}
                    label="اسم المشتري"
                    value={buyerData.fullName}
                  />
                  <DetailItem
                    icon={Mail}
                    label="البريد"
                    value={buyerData.email}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailItem
                    icon={Phone}
                    label="الهاتف"
                    value={buyerData.phone}
                  />
                  <DetailItem
                    label="معرف المشتري"
                    value={buyerData._id}
                    isLink
                    href={`/seller/${buyerData._id}`}
                    copyable
                  />
                </div>
              </div>
            </section>
          )}

          {/* Dates Section */}
          <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <h3 className="text-lg font-semibold border-b pb-3 flex items-center gap-2 text-gray-700">
              <div className="p-2 bg-red-100 rounded-lg">
                <Calendar className="h-5 w-5 text-red-600" />
              </div>
              التواريخ
            </h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem
                icon={Calendar}
                label="تاريخ الإنشاء"
                value={
                  saleData.createdAt
                    ? formatArabicDate(saleData.createdAt, { hijri: true })
                    : "غير متوفر"
                }
              />
              <DetailItem
                icon={Calendar}
                label="تاريخ التحديث"
                value={
                  saleData.updatedAt
                    ? formatArabicDate(saleData.updatedAt, { hijri: true })
                    : "غير متوفر"
                }
              />
            </div>
          </section>

          {/* Message Section */}
          {saleData.message && (
            <section className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="text-lg font-semibold border-b pb-3 flex items-center gap-2 text-gray-700">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-teal-600" />
                </div>
                الرسالة
              </h3>
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-5 rounded-xl border border-teal-200 mt-4">
                <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                  {saleData.message}
                </p>
              </div>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
