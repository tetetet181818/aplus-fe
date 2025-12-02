'use client';

import { useState } from 'react';

import {
  paymentProcessingPercent,
  platformFeePercent,
  safeValue,
  statusLabelMap,
  statusVariantMap,
} from '@/constants';
import { Withdrawal } from '@/types';
import {
  Calendar,
  Coins,
  CreditCard,
  DollarSign,
  Edit,
  Info,
  Shield,
  Trash2,
  Zap,
} from 'lucide-react';

import EditWithdrawalDialog from '@/components/molecules/dialogs/EditWithdrawalDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import formatArabicDate from '@/utils/formateTime';

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
    amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

  const getStatusBadge = (status: string) => {
    return (
      <Badge
        variant={
          statusVariantMap[status as keyof typeof statusVariantMap] || 'default'
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
          <div className="bg-primary rounded-lg p-2">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            لوحة التحكم المالية
          </h1>
        </header>

        {/* Balance Card */}
        <section>
          <Card className="from-primary to-primary/90 relative overflow-hidden border-0 bg-gradient-to-br text-white shadow-xl">
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
            <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/10"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <div className="rounded-full bg-white/20 p-2">
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
                {formatCurrency(availableBalance)}{' '}
                <span className="text-xl font-medium">ريال</span>
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Fees and Info */}
        <section>
          <Card className="border-0 shadow-xl">
            <CardHeader className="border-b bg-slate-50">
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-primary h-5 w-5" />
                تفاصيل الرسوم والخصومات
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Zap className="h-5 w-5 text-amber-500" />
                    شروط ومعلومات السحب
                  </h3>
                  <ul className="text-muted-foreground space-y-2">
                    {[
                      'تساعد هذه الرسوم في الحفاظ على جودة الخدمات والتطوير المستمر',
                      'يتم احتساب الرسوم تلقائياً عند كل عملية بيع',
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                        <span>{text}</span>
                      </li>
                    ))}
                    <li className="flex items-start gap-2">
                      <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                      <span>
                        الحد الأدنى للسحب{' '}
                        <strong className="text-gray-900 dark:text-gray-100">
                          100 ريال سعودي
                        </strong>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <Coins className="h-5 w-5 text-emerald-500" />
                    خصومات ورسوم الدفع
                  </h3>
                  <ul className="text-muted-foreground space-y-2 rounded-xl p-4 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                      <span>
                        تطبق رسوم المنصة بنسبة {platformFeePercent}% على
                        المعاملات
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                      <span>
                        رسوم معالجة بنسبة{' '}
                        <strong className="text-gray-900 dark:text-gray-100">
                          {paymentProcessingPercent}%
                        </strong>{' '}
                        تطبق تلقائيًا على كل سحب.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-primary mt-2 h-2 w-2 rounded-full"></div>
                      <span>2 ريال رسوم إضافية ثابتة</span>
                    </li>
                  </ul>
                  <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-gray-600 dark:border-amber-800 dark:bg-amber-900/30 dark:text-gray-400">
                    <Info className="mt-0.5 h-4 w-4 text-amber-500" />
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
            <Card className="border-0 shadow-xl">
              <CardHeader className="border-b bg-slate-50">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="text-primary h-5 w-5" />
                  سجل التحويلات البنكية
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6">
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto rounded-lg border md:block">
                  <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 text-start">
                      <tr>
                        {[
                          'اسم الحساب',
                          'اسم البنك',
                          'رقم IBAN',
                          'رقم التحويل',
                          'المبلغ',
                          'الحالة',
                          'ملاحظات المشرف',
                          'تاريخ التحويل',
                          'تاريخ الإنشاء',
                          'الإجراءات',
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
                          className="text-gray-700 transition-colors hover:bg-slate-50"
                        >
                          <td className="px-4 py-3 font-medium">
                            {w.accountName}
                          </td>
                          <td className="px-4 py-3">{w.bankName}</td>
                          <td className="px-4 py-3">{w.iban}</td>
                          <td className="px-4 py-3">
                            {w.routingNumber || '-'}
                          </td>
                          <td className="px-4 py-3 font-medium">
                            {formatCurrency(w.amount)} ر.س
                          </td>
                          <td className="px-4 py-3">
                            {getStatusBadge(w.status)}
                          </td>
                          <td className="text-muted-foreground px-4 py-3">
                            {w.adminNotes || 'لا يوجد ملاحظات'}
                          </td>
                          <td className="text-muted-foreground px-4 py-3">
                            {w.routingDate
                              ? formatArabicDate(w.routingDate)
                              : '—'}
                          </td>
                          <td className="text-muted-foreground px-4 py-3">
                            {formatArabicDate(w.createdAt || '')}
                          </td>
                          <td className="mx-2 mt-2 flex items-center justify-center gap-1">
                            <Button
                              onClick={() => handelDeleteWithdrawal(w._id)}
                              disabled={
                                deleteWithdrawalLoading ||
                                w.status === 'completed'
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
                              disabled={w.status === 'completed'}
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
                <div className="space-y-4 md:hidden">
                  {meWithdrawals.map((w, i) => (
                    <div
                      key={i}
                      className="space-y-2 rounded-lg border bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-primary font-semibold">
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
                        {formatArabicDate(w.createdAt || '')}
                      </p>
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => {
                            setOpenEditDialog(true);
                            SetSelectWithdrawal(w);
                          }}
                          variant="outline"
                          size="sm"
                          disabled={w.status === 'completed'}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          onClick={() => handelDeleteWithdrawal(w._id)}
                          variant="destructive"
                          size="sm"
                          disabled={w.status === 'completed'}
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
