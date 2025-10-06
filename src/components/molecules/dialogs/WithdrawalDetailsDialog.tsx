"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import formatArabicDate from "@/utils/formateTime";
import { statusLabelMap } from "@/constants/index";
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/useAuth";
import { useGetSingleWithdrawalQuery } from "@/store/api/dashboard.api";

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
  const { token } = useAuth();

  const { data, isLoading } = useGetSingleWithdrawalQuery(
    {
      token: token || "",
      id: selectedWithdrawal || "",
    },
    { skip: !selectedWithdrawal }
  );

  const singleWithdrawal = data?.data?.withdrawal;
  const user = data?.data?.user;

  const safeValue = (value: string): string =>
    value === null || value === undefined || value === ""
      ? "A/N"
      : String(value);

  if (!selectedWithdrawal) return null;

  /** Withdrawal detail list */
  const withdrawalDetails = [
    { label: "اسم الحساب", value: safeValue(singleWithdrawal?.accountName) },
    { label: "اسم البنك", value: safeValue(singleWithdrawal?.bankName) },
    { label: "رقم الآيبان", value: safeValue(singleWithdrawal?.iban) },
    { label: "المبلغ", value: `${safeValue(singleWithdrawal?.amount)} ر.س` },
    {
      label: "الحالة",
      value:
        statusLabelMap[
          singleWithdrawal?.status as keyof typeof statusLabelMap
        ] || safeValue(singleWithdrawal?.status),
    },
    {
      label: "تاريخ الإنشاء",
      value: safeValue(formatArabicDate(singleWithdrawal?.createdAt)),
    },
    {
      label: "تاريخ التحديث",
      value: safeValue(formatArabicDate(singleWithdrawal?.updatedAt)),
    },
    {
      label: "ملاحظات المسؤول",
      value: safeValue(singleWithdrawal?.adminNotes || "لا يوجد ملاحظات"),
      colSpan: "md:col-span-2",
    },
    {
      label: "رقم التحويل",
      value: safeValue(singleWithdrawal?.routingNumber),
    },
    {
      label: "تاريخ التحويل",
      value: safeValue(formatArabicDate(singleWithdrawal?.routingDate)),
    },
  ];

  /** User detail list */
  const userDetails = [
    { label: "اسم المستخدم", value: safeValue(user?.fullName) },
    { label: "البريد الإلكتروني", value: safeValue(user?.email) },
    { label: "الجامعة", value: safeValue(user?.university) },
    { label: "الرصيد الحالي", value: `${safeValue(user?.balance)} ر.س` },
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
      <DialogContent className="max-w-md md:max-w-xl lg:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          {isLoading ? (
            <Skeleton className="h-8 w-48 mx-auto" />
          ) : (
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 dark:text-white">
              تفاصيل طلب السحب
            </h2>
          )}

          {/* Withdrawal Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-6 space-y-4">
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                معلومات السحب
              </h3>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {withdrawalDetails.map((detail, index) => (
                <div
                  key={index}
                  className={`space-y-1 ${detail.colSpan || ""}`}
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
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-6 space-y-4">
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                معلومات المستخدم
              </h3>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="px-4 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
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
