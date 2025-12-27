'use client';

import { statusLabelMap } from '@/constants/index';
import { dashboardService } from '@/services/dashboard.service';
import { useQuery } from '@tanstack/react-query';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import formatArabicDate from '@/utils/formateTime';

interface Props {
  open: boolean;
  onClose: () => void;
  selectedWithdrawal: string | null;
}

/**
 * @component WithdrawalDetailsDialog
 * @description
 * Displays detailed information about a selected withdrawal,
 * including user details, status, and admin notes.
 */
export default function WithdrawalDetailsDialog({
  open,
  onClose,
  selectedWithdrawal,
}: Props) {
  const { data, isLoading } = useQuery({
    queryKey: ['singleWithdrawal', selectedWithdrawal],
    queryFn: () => dashboardService.getSingleWithdrawal(selectedWithdrawal!),
    enabled: !!selectedWithdrawal,
  });

  const singleWithdrawal = data?.data?.withdrawal;
  const user = data?.data?.user;

  const safeValue = (value: string): string =>
    value === null || value === undefined || value === ''
      ? 'A/N'
      : String(value);

  if (!selectedWithdrawal) return null;

  /** Withdrawal detail list */
  const withdrawalDetails = [
    { label: 'اسم الحساب', value: safeValue(singleWithdrawal?.accountName) },
    { label: 'اسم البنك', value: safeValue(singleWithdrawal?.bankName) },
    { label: 'رقم الآيبان', value: safeValue(singleWithdrawal?.iban) },
    { label: 'المبلغ', value: `${safeValue(singleWithdrawal?.amount)} ر.س` },
    {
      label: 'الحالة',
      value:
        statusLabelMap[
          singleWithdrawal?.status as keyof typeof statusLabelMap
        ] || safeValue(singleWithdrawal?.status),
    },
    {
      label: 'تاريخ الإنشاء',
      value: safeValue(formatArabicDate(singleWithdrawal?.createdAt)),
    },
    {
      label: 'تاريخ التحديث',
      value: safeValue(formatArabicDate(singleWithdrawal?.updatedAt)),
    },
    {
      label: 'ملاحظات المسؤول',
      value: safeValue(singleWithdrawal?.adminNotes || 'لا يوجد ملاحظات'),
      colSpan: 'md:col-span-2',
    },
    {
      label: 'رقم التحويل',
      value: safeValue(singleWithdrawal?.routingNumber),
    },
    {
      label: 'تاريخ التحويل',
      value: safeValue(formatArabicDate(singleWithdrawal?.routingDate)),
    },
  ];

  /** User detail list */
  const userDetails = [
    { label: 'اسم المستخدم', value: safeValue(user?.fullName) },
    { label: 'البريد الإلكتروني', value: safeValue(user?.email) },
    { label: 'الجامعة', value: safeValue(user?.university) },
    { label: 'الرصيد الحالي', value: `${safeValue(user?.balance)} ر.س` },
  ];

  /** Render skeleton or real value */
  const renderDetailValue = (value: string) =>
    isLoading ? (
      <Skeleton className="h-4 w-full" />
    ) : (
      <span className="text-sm font-semibold">{value}</span>
    );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto md:max-w-xl lg:max-w-2xl">
        <div className="space-y-6">
          {/* Header */}
          {isLoading ? (
            <Skeleton className="mx-auto h-8 w-48" />
          ) : (
            <h2 className="text-center text-xl font-bold text-gray-800 md:text-2xl dark:text-white">
              تفاصيل طلب السحب
            </h2>
          )}

          {/* Withdrawal Info */}
          <div className="space-y-4 rounded-lg bg-gray-50 p-4 md:p-6 dark:bg-gray-800">
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                معلومات السحب
              </h3>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {withdrawalDetails.map((detail, index) => (
                <div
                  key={index}
                  className={`space-y-1 ${detail.colSpan || ''}`}
                >
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {detail.label}
                  </p>
                  {renderDetailValue(detail.value)}
                </div>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div className="space-y-4 rounded-lg bg-gray-50 p-4 md:p-6 dark:bg-gray-800">
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                معلومات المستخدم
              </h3>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {userDetails.map((detail, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {detail.label}
                  </p>
                  {renderDetailValue(detail.value)}
                </div>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-2 pb-4">
            {isLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <button
                onClick={onClose}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                إغلاق
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
