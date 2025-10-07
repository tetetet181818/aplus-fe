"use client";

import { Card, CardContent } from "@/components/ui/card";
import WithdrawalForm from "./WithdrawalForm";
import FinanceDashboard from "./FinanceDashboard";
import { User } from "@/types";
import { useFormik, FormikHelpers } from "formik";
import useWithdrawals from "@/hooks/useWithdrawals";

interface EarningsTabProps {
  currentUser: User;
}

interface WithdrawalFormValues {
  accountHolderName: string;
  bankName: string;
  iban: string;
  withdrawalAmount: number;
}

const EarningsTab = ({ currentUser }: EarningsTabProps) => {
  const {
    handleCreateWithdrawal,
    createWithdrawalLoading,
    meWithdrawals,
    meWithdrawalsLoading,
  } = useWithdrawals();

  const availableBalance = currentUser?.balance || 0;

  const currentNetEarnings = availableBalance * 0.9;

  const formik = useFormik<WithdrawalFormValues>({
    initialValues: {
      accountHolderName: "",
      bankName: "",
      iban: "",
      withdrawalAmount: 0,
    },
    onSubmit: async (
      values: WithdrawalFormValues,
      { resetForm }: FormikHelpers<WithdrawalFormValues>
    ) => {
      const res = await handleCreateWithdrawal({
        amount: values.withdrawalAmount,
        accountName: values.accountHolderName,
        bankName: values.bankName,
        iban: values.iban,
      });

      if (res) {
        resetForm();
      }
    },
  });

  return (
    <div className="space-y-6 lg:px-10 sm:px-0">
      <FinanceDashboard
        availableBalance={availableBalance}
        meWithdrawals={meWithdrawals}
        loading={meWithdrawalsLoading}
      />

      <div>
        {currentUser.withdrawalTimes > 0 ? (
          <WithdrawalForm
            formik={formik}
            loading={createWithdrawalLoading}
            netEarnings={currentNetEarnings}
            remainingWithdrawals={currentUser.withdrawalTimes}
            maxWithdrawalsPerMonth={currentUser.withdrawalTimes}
            isProcessingWithdrawal={createWithdrawalLoading}
          />
        ) : (
          <Card className="border-destructive/20 bg-destructive/10">
            <CardContent className="p-6 text-center">
              <p className="font-semibold text-destructive">
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
