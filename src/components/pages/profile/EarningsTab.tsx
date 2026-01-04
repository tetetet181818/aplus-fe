'use client';
import { User } from '@/types';
import { FormikHelpers, useFormik } from 'formik';

import EarningsPageSkeleton from '@/components/skeletons/EarningsPageSkeleton';
import { Card, CardContent } from '@/components/ui/card';

import useWithdrawals from '@/hooks/useWithdrawals';

import { withdrawalValidationSchema } from '@/utils/validation/withdrawalSchema';

import FinanceDashboard from './FinanceDashboard';
import WithdrawalForm from './WithdrawalForm';

/** Props for EarningsTab */
interface EarningsTabProps {
  currentUser: User;
  authLoading: boolean;
}

/** Values for withdrawal form */
interface WithdrawalFormValues {
  accountHolderName: string;
  bankName: string;
  iban: string;
  withdrawalAmount: number;
}

/** Earnings tab showing balance, withdrawals and withdrawal form */
const EarningsTab = ({ currentUser, authLoading }: EarningsTabProps) => {
  const {
    handleCreateWithdrawal,
    createWithdrawalLoading,
    meWithdrawals,
    meWithdrawalsLoading,
    handelDeleteWithdrawal,
    deleteWithdrawalLoading,
  } = useWithdrawals();

  const availableBalance = currentUser?.balance || 0;
  const currentNetEarnings = availableBalance * 0.9;

  const formik = useFormik<WithdrawalFormValues>({
    initialValues: {
      accountHolderName: '',
      bankName: '',
      iban: '',
      withdrawalAmount: 0,
    },
    validationSchema: withdrawalValidationSchema(availableBalance),
    onSubmit: async (
      values: WithdrawalFormValues,
      { resetForm }: FormikHelpers<WithdrawalFormValues>
    ) => {
      if (!formik.isValid) return; // prevent submit if errors
      const res = await handleCreateWithdrawal({
        amount: values.withdrawalAmount,
        accountName: values.accountHolderName,
        bankName: values.bankName,
        iban: values.iban,
      });
      if (res) resetForm();
    },
  });

  if (authLoading) {
    return <EarningsPageSkeleton />;
  }

  return (
    <div className="space-y-6 sm:px-0 lg:px-10">
      <FinanceDashboard
        availableBalance={availableBalance}
        meWithdrawals={meWithdrawals || []}
        loading={meWithdrawalsLoading}
        handelDeleteWithdrawal={handelDeleteWithdrawal}
        deleteWithdrawalLoading={deleteWithdrawalLoading}
      />

      <div>
        {currentUser?.withdrawalTimes > 0 ? (
          <WithdrawalForm
            formik={formik}
            loading={createWithdrawalLoading}
            netEarnings={currentNetEarnings}
            remainingWithdrawals={currentUser?.withdrawalTimes}
            maxWithdrawalsPerMonth={currentUser?.withdrawalTimes}
            isProcessingWithdrawal={createWithdrawalLoading}
          />
        ) : (
          <Card className="border-destructive/20 bg-destructive/10">
            <CardContent className="p-6 text-center">
              <p className="text-destructive font-semibold">
                لقد استهلكت كل محاولات السحب المتاحة هذا الشهر
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EarningsTab;
