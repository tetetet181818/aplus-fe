'use client';

import { useCallback } from 'react';

import Link from 'next/link';

import { useGetSingleSaleQuery } from '@/store/api/sales.api';
import {
  Calendar,
  Copy,
  CreditCard,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  User,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

import formatArabicDate from '@/utils/formateTime';

interface Props {
  open: boolean;
  onClose: () => void;
  salesId: string | null;
}

const statusVariantMap: Record<
  string,
  'default' | 'secondary' | 'destructive'
> = {
  completed: 'default',
  pending: 'secondary',
  failed: 'destructive',
};

const statusLabelMap: Record<string, string> = {
  completed: 'مكتمل',
  pending: 'قيد الانتظار',
  failed: 'فاشلة',
};

const paymentMethodMap: Record<string, string> = {
  bank: 'تحويل بنكي',
  card: 'بطاقة ائتمان',
  wallet: 'محفظة إلكترونية',
};

const paymentMethodIcons: Record<string, LucideIcon> = {
  bank: CreditCard,
  card: CreditCard,
  wallet: CreditCard,
};

export default function SalesDetailsDialog({ open, onClose, salesId }: Props) {
  const { data, isLoading } = useGetSingleSaleQuery({
    saleId: salesId || '',
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
        {Icon && (
          <Icon className="text-muted-foreground mt-1 h-4 w-4 flex-shrink-0" />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground mb-1 text-xs sm:text-sm">
            {label}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold break-words break-all sm:text-base">
              {value}
            </span>
            {copyable && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/20 h-6 w-6 flex-shrink-0"
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
        href={href || '#'}
        className="hover:bg-accent/10 -m-2 block rounded-lg p-2 transition-colors"
      >
        {content}
      </Link>
    ) : (
      <div className="-m-2 p-2">{content}</div>
    );
  };

  /** Skeleton while loading */
  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl space-y-4 p-4 sm:space-y-6 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>

          <Skeleton className="h-24 w-full rounded-xl sm:h-32" />
          <Skeleton className="h-32 w-full rounded-xl sm:h-40" />
          <Skeleton className="h-32 w-full rounded-xl sm:h-40" />
          <Skeleton className="h-32 w-full rounded-xl sm:h-40" />
          <Skeleton className="h-16 w-full rounded-xl sm:h-20" />
        </DialogContent>
      </Dialog>
    );
  }

  if (!saleData)
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <p className="text-muted-foreground py-6 text-center">
            لا توجد بيانات متاحة
          </p>
        </DialogContent>
      </Dialog>
    );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
        {/* Header with gradient background */}
        <DialogHeader className="rounded-t-lg border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 sm:px-6 sm:py-4 dark:from-blue-950/50 dark:to-indigo-950/50">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-gray-800 sm:text-xl dark:text-gray-100">
            {/* Icon with circular background */}
            <div className="rounded-full bg-blue-100 p-1.5 sm:p-2 dark:bg-blue-900/50">
              <FileText className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5 dark:text-blue-400" />
            </div>
            تفاصيل المعاملة
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
          {/* Amount & Status Card */}
          <div className="relative overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:rounded-2xl sm:p-6 dark:border-blue-800 dark:from-blue-950/30 dark:to-indigo-950/30">
            {/* Decorative circles */}
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-blue-200 opacity-20 sm:h-20 sm:w-20 dark:bg-blue-800"></div>
            <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-indigo-200 opacity-30 sm:h-16 sm:w-16 dark:bg-indigo-800"></div>

            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="text-center sm:text-left">
                <p className="mb-2 text-right text-xs font-medium text-blue-600 sm:text-sm dark:text-blue-400">
                  المبلغ
                </p>
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <div className="rounded-lg bg-white p-1.5 shadow-sm sm:p-2 dark:bg-gray-800">
                    <CreditCard className="h-4 w-4 text-blue-500 sm:h-5 sm:w-5 dark:text-blue-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-gray-100">
                    {saleData.amount} ر.س
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="mb-2 text-left text-xs font-medium text-blue-600 sm:text-sm dark:text-blue-400">
                  الحالة
                </p>
                <div className="flex justify-center sm:justify-end">
                  <Badge
                    variant={statusVariantMap[saleData.status] || 'secondary'}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm sm:px-4 sm:py-2 sm:text-sm',
                      saleData.status === 'completed' &&
                        'border-green-200 bg-green-100 text-green-800 dark:border-green-800 dark:bg-green-900/50 dark:text-green-300',
                      saleData.status === 'pending' &&
                        'border-yellow-200 bg-yellow-100 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
                      saleData.status === 'failed' &&
                        'border-red-200 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-900/50 dark:text-red-300'
                    )}
                  >
                    {/* Status indicator dot */}
                    <div
                      className={cn(
                        'mr-2 h-2 w-2 rounded-full',
                        saleData.status === 'completed' &&
                          'bg-green-500 dark:bg-green-400',
                        saleData.status === 'pending' &&
                          'bg-yellow-500 dark:bg-yellow-400',
                        saleData.status === 'failed' &&
                          'bg-red-500 dark:bg-red-400'
                      )}
                    ></div>
                    {statusLabelMap[saleData.status] || saleData.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info Section */}
          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="flex items-center gap-2 border-b border-gray-200 pb-2 text-base font-semibold text-gray-700 sm:pb-3 sm:text-lg dark:border-gray-700 dark:text-gray-200">
              <div className="rounded-lg bg-blue-100 p-1.5 sm:p-2 dark:bg-blue-900/50">
                <CreditCard className="h-4 w-4 text-blue-600 sm:h-5 sm:w-5 dark:text-blue-400" />
              </div>
              معلومات الدفع
            </h3>
            <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
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
          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="flex items-center gap-2 border-b border-gray-200 pb-2 text-base font-semibold text-gray-700 sm:pb-3 sm:text-lg dark:border-gray-700 dark:text-gray-200">
              <div className="rounded-lg bg-green-100 p-1.5 sm:p-2 dark:bg-green-900/50">
                <FileText className="h-4 w-4 text-green-600 sm:h-5 sm:w-5 dark:text-green-400" />
              </div>
              معلومات الملاحظة
            </h3>
            <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
              <DetailItem
                label="رقم الملاحظة"
                value={saleData.note_id}
                isLink
                href={`/notes/${saleData.note_id}`}
                copyable
              />
              <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 dark:border-green-800 dark:from-green-950/30 dark:to-emerald-950/30">
                <DetailItem
                  label="عنوان الملاحظة"
                  value={saleData.note_title}
                />
              </div>
            </div>
          </section>

          {/* Seller Info Section */}
          {sellerData && (
            <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="flex items-center gap-2 border-b border-gray-200 pb-2 text-base font-semibold text-gray-700 sm:pb-3 sm:text-lg dark:border-gray-700 dark:text-gray-200">
                <div className="rounded-lg bg-purple-100 p-1.5 sm:p-2 dark:bg-purple-900/50">
                  <User className="h-4 w-4 text-purple-600 sm:h-5 sm:w-5 dark:text-purple-400" />
                </div>
                بيانات البائع
              </h3>
              <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
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
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
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
            <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="flex items-center gap-2 border-b border-gray-200 pb-2 text-base font-semibold text-gray-700 sm:pb-3 sm:text-lg dark:border-gray-700 dark:text-gray-200">
                <div className="rounded-lg bg-orange-100 p-1.5 sm:p-2 dark:bg-orange-900/50">
                  <User className="h-4 w-4 text-orange-600 sm:h-5 sm:w-5 dark:text-orange-400" />
                </div>
                بيانات المشتري
              </h3>
              <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
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
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
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
          <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5 dark:border-gray-700 dark:bg-gray-900">
            <h3 className="flex items-center gap-2 border-b border-gray-200 pb-2 text-base font-semibold text-gray-700 sm:pb-3 sm:text-lg dark:border-gray-700 dark:text-gray-200">
              <div className="rounded-lg bg-red-100 p-1.5 sm:p-2 dark:bg-red-900/50">
                <Calendar className="h-4 w-4 text-red-600 sm:h-5 sm:w-5 dark:text-red-400" />
              </div>
              التواريخ
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:gap-4 md:grid-cols-2">
              <DetailItem
                icon={Calendar}
                label="تاريخ الإنشاء"
                value={
                  saleData.createdAt
                    ? formatArabicDate(saleData.createdAt, { time: false })
                    : 'غير متوفر'
                }
              />
              <DetailItem
                icon={Calendar}
                label="تاريخ التحديث"
                value={
                  saleData.updatedAt
                    ? formatArabicDate(saleData.updatedAt, { time: false })
                    : 'غير متوفر'
                }
              />
            </div>
          </section>

          {/* Message Section */}
          {saleData.message && (
            <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-5 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="flex items-center gap-2 border-b border-gray-200 pb-2 text-base font-semibold text-gray-700 sm:pb-3 sm:text-lg dark:border-gray-700 dark:text-gray-200">
                <div className="rounded-lg bg-teal-100 p-1.5 sm:p-2 dark:bg-teal-900/50">
                  <MessageSquare className="h-4 w-4 text-teal-600 sm:h-5 sm:w-5 dark:text-teal-400" />
                </div>
                الرسالة
              </h3>
              <div className="mt-3 rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-4 sm:mt-4 sm:p-5 dark:border-teal-800 dark:from-teal-950/30 dark:to-cyan-950/30">
                <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700 sm:text-base dark:text-gray-300">
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
