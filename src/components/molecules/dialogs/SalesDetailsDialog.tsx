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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useCallback } from "react";
import { useGetSalesByIdQuery } from "@/store/api/dashboard.api";
import useAuth from "@/hooks/useAuth";

interface Props {
  open: boolean;
  onClose: () => void;
  sale: string | null;
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

export default function SalesDetailsDialog({ open, onClose, sale }: Props) {
  const { token } = useAuth();
  const { data } = useGetSalesByIdQuery({
    token: token || "",
    id: sale || "",
  });
  const saleData = data?.data;
  const handleCopyToClipboard = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`تم نسخ ${label} بنجاح`);
  }, []);

  const isValidId = (id: string) =>
    id && typeof id === "string" && id.trim().length > 0;

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    isLink = false,
    href,
    copyable = false,
    className,
    validateLink = true,
  }: {
    icon?: LucideIcon;
    label: string;
    value: string | number | null | undefined;
    isLink?: boolean;
    href?: string;
    copyable?: boolean;
    className?: string;
    validateLink?: boolean;
  }) => {
    if (!value) return null;

    const shouldRenderAsLink =
      isLink && (!validateLink || isValidId(String(value)));

    const content = (
      <div className={cn("flex items-start gap-2", className)}>
        {Icon && (
          <Icon className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {label}
          </p>
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "text-base font-semibold text-foreground break-words",
                shouldRenderAsLink && "hover:text-primary transition-colors"
              )}
            >
              {value}
            </p>
            {copyable && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-accent/20"
                onClick={() => handleCopyToClipboard(String(value), label)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );

    return shouldRenderAsLink ? (
      <Link
        href={href || "#"}
        className="block hover:bg-accent/5 rounded-lg p-2 -m-2 transition-colors"
      >
        {content}
      </Link>
    ) : (
      <div className="rounded-lg p-2 -m-2">{content}</div>
    );
  };

  if (!sale) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <p className="text-center text-muted-foreground py-6">
            لا توجد بيانات متاحة
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto sm:max-w-2xl p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-right text-xl font-bold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            تفاصيل المعاملة
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-xl">
            <div>
              <p className="text-sm text-muted-foreground">المبلغ</p>
              <p className="text-2xl font-bold text-primary">
                {saleData.amount} ر.س
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الحالة</p>
              <Badge
                variant={statusVariantMap[saleData.status] || "secondary"}
                className="text-sm px-3 py-1 rounded-full"
              >
                {statusLabelMap[saleData.status] || saleData.status}
              </Badge>
            </div>
          </div>

          {/* Payment */}
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> معلومات الدفع
            </h3>
            <div className="space-y-3 mt-3">
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
              <DetailItem
                icon={FileText}
                label="رقم الفاتورة"
                value={saleData.invoice_id}
                copyable
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <FileText className="h-5 w-5" /> معلومات الملاحظة
            </h3>
            <div className="space-y-3 mt-3">
              <DetailItem
                icon={FileText}
                label="رقم الملاحظة"
                value={saleData.note_id}
                isLink
                href={`/notes/${saleData.note_id}`}
                copyable
                validateLink={false}
              />
              <DetailItem
                icon={FileText}
                label="عنوان الملاحظة"
                value={saleData.note_title}
                className="bg-muted/30 p-3 rounded-lg"
              />
            </div>
          </div>

          {/* User */}
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <User className="h-5 w-5" /> معلومات المستخدم
            </h3>
            <div className="space-y-3 mt-3">
              <DetailItem
                label="معرف المشتري"
                icon={User}
                value={saleData.user_id}
                isLink
                href={`/seller/${saleData.user_id}`}
                copyable
              />
              <DetailItem
                label="معرف البائع"
                icon={User}
                value={saleData.buyerId}
                isLink
                href={`/seller/${saleData.buyerId}`}
                copyable
              />
            </div>
          </div>

          {/* Dates */}
          <div>
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <Calendar className="h-5 w-5" /> التواريخ
            </h3>
            <div className="space-y-3 mt-3">
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
          </div>

          {/* Message */}
          {saleData.message && (
            <div>
              <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> الرسالة
              </h3>
              <div className="bg-muted/30 p-4 rounded-lg mt-3">
                <p className="text-foreground whitespace-pre-wrap">
                  {saleData.message}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
