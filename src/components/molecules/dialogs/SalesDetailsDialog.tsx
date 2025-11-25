'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import formatArabicDate from '@/utils/formateTime'
import Link from 'next/link'
import {
  Copy,
  Calendar,
  User,
  CreditCard,
  FileText,
  MessageSquare,
  Mail,
  Phone,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useCallback } from 'react'
import { useGetSingleSaleQuery } from '@/store/api/sales.api'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  open: boolean
  onClose: () => void
  salesId: string | null
}

const statusVariantMap: Record<
  string,
  'default' | 'secondary' | 'destructive'
> = {
  completed: 'default',
  pending: 'secondary',
  failed: 'destructive',
}

const statusLabelMap: Record<string, string> = {
  completed: 'مكتمل',
  pending: 'قيد الانتظار',
  failed: 'فاشلة',
}

const paymentMethodMap: Record<string, string> = {
  bank: 'تحويل بنكي',
  card: 'بطاقة ائتمان',
  wallet: 'محفظة إلكترونية',
}

const paymentMethodIcons: Record<string, LucideIcon> = {
  bank: CreditCard,
  card: CreditCard,
  wallet: CreditCard,
}

export default function SalesDetailsDialog({ open, onClose, salesId }: Props) {
  const { data, isLoading } = useGetSingleSaleQuery({
    saleId: salesId || '',
  })

  const saleData = data?.data?.sale
  const sellerData = data?.data?.seller
  const buyerData = data?.data?.buyer

  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`تم نسخ ${label} بنجاح`)
  }, [])

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    copyable,
    isLink,
    href,
  }: {
    icon?: LucideIcon
    label: string
    value?: string | number | null
    copyable?: boolean
    isLink?: boolean
    href?: string
  }) => {
    if (!value) return null
    const content = (
      <div className="flex items-start gap-2">
        {Icon && <Icon className="text-muted-foreground mt-1 h-4 w-4" />}
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground mb-1 text-sm">{label}</p>
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold break-words">{value}</span>
            {copyable && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/20 h-6 w-6"
                onClick={() => handleCopy(String(value), label)}
              >
                <Copy className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>
    )

    return isLink ? (
      <Link
        href={href || '#'}
        className="hover:bg-accent/5 -m-2 block rounded-lg p-2"
      >
        {content}
      </Link>
    ) : (
      <div className="-m-2 p-2">{content}</div>
    )
  }

  /** Skeleton while loading */
  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl space-y-6 p-6">
          <div className="mb-4 flex items-center gap-2">
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
    )
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
    )

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-0">
        {/* Header with gradient background and rounded corners */}
        <DialogHeader className="rounded-t-lg border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
            {/* Icon with circular background */}
            <div className="rounded-full bg-blue-100 p-2">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            تفاصيل المعاملة
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* Amount & Status Card with decorative shapes */}
          <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            {/* Decorative circles in background */}
            <div className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-blue-200 opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-indigo-200 opacity-30"></div>

            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="text-center sm:text-left">
                <p className="mb-2 text-sm font-medium text-blue-600">المبلغ</p>
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <div className="rounded-lg bg-white p-2 shadow-sm">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">
                    {saleData.amount} ر.س
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <p className="mb-2 text-sm font-medium text-blue-600">الحالة</p>
                <div className="flex justify-center sm:justify-end">
                  <Badge
                    variant={statusVariantMap[saleData.status] || 'secondary'}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-semibold shadow-sm',
                      saleData.status === 'completed' &&
                        'border-green-200 bg-green-100 text-green-800',
                      saleData.status === 'pending' &&
                        'border-yellow-200 bg-yellow-100 text-yellow-800',
                      saleData.status === 'failed' &&
                        'border-red-200 bg-red-100 text-red-800'
                    )}
                  >
                    {/* Status indicator dot */}
                    <div
                      className={cn(
                        'mr-2 h-2 w-2 rounded-full',
                        saleData.status === 'completed' && 'bg-green-500',
                        saleData.status === 'pending' && 'bg-yellow-500',
                        saleData.status === 'failed' && 'bg-red-500'
                      )}
                    ></div>
                    {statusLabelMap[saleData.status] || saleData.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info Section */}
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <h3 className="flex items-center gap-2 border-b pb-3 text-lg font-semibold text-gray-700">
              <div className="rounded-lg bg-blue-100 p-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
              معلومات الدفع
            </h3>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <h3 className="flex items-center gap-2 border-b pb-3 text-lg font-semibold text-gray-700">
              <div className="rounded-lg bg-green-100 p-2">
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
              <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                <DetailItem
                  label="عنوان الملاحظة"
                  value={saleData.note_title}
                />
              </div>
            </div>
          </section>

          {/* Seller Info Section */}
          {sellerData && (
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
              <h3 className="flex items-center gap-2 border-b pb-3 text-lg font-semibold text-gray-700">
                <div className="rounded-lg bg-purple-100 p-2">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                بيانات البائع
              </h3>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
              <h3 className="flex items-center gap-2 border-b pb-3 text-lg font-semibold text-gray-700">
                <div className="rounded-lg bg-orange-100 p-2">
                  <User className="h-5 w-5 text-orange-600" />
                </div>
                بيانات المشتري
              </h3>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <h3 className="flex items-center gap-2 border-b pb-3 text-lg font-semibold text-gray-700">
              <div className="rounded-lg bg-red-100 p-2">
                <Calendar className="h-5 w-5 text-red-600" />
              </div>
              التواريخ
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <DetailItem
                icon={Calendar}
                label="تاريخ الإنشاء"
                value={
                  saleData.createdAt
                    ? formatArabicDate(saleData.createdAt, { hijri: true })
                    : 'غير متوفر'
                }
              />
              <DetailItem
                icon={Calendar}
                label="تاريخ التحديث"
                value={
                  saleData.updatedAt
                    ? formatArabicDate(saleData.updatedAt, { hijri: true })
                    : 'غير متوفر'
                }
              />
            </div>
          </section>

          {/* Message Section */}
          {saleData.message && (
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
              <h3 className="flex items-center gap-2 border-b pb-3 text-lg font-semibold text-gray-700">
                <div className="rounded-lg bg-teal-100 p-2">
                  <MessageSquare className="h-5 w-5 text-teal-600" />
                </div>
                الرسالة
              </h3>
              <div className="mt-4 rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50 p-5">
                <p className="leading-relaxed whitespace-pre-wrap text-gray-700">
                  {saleData.message}
                </p>
              </div>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
