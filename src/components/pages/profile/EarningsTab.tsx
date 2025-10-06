"use client";

import { Card, CardContent } from "@/components/ui/card";
import WithdrawalForm from "./WithdrawalForm";
import FinanceDashboard from "./EarningsInfo";
import { User } from "@/types";
import { useFormik, FormikHelpers } from "formik";
import useWithdrawals from "@/hooks/useWithdrawals";

interface EarningsTabProps {
  currentUser: User;
}

interface Withdrawal {
  amount: number;
  status: "مكتمل" | "قيد المراجعة" | "مرفوض";
  date: string;
  transactionId: string;
}

interface WithdrawalFormValues {
  accountHolderName: string;
  bankName: string;
  iban: string;
  withdrawalAmount: number;
}

const EarningsTab = ({ currentUser }: EarningsTabProps) => {
  const { handleCreateWithdrawal, createWithdrawalLoading } = useWithdrawals();

  const availableBalance = currentUser?.balance || 0;

  const withdrawalHistory: Withdrawal[] = [
    {
      amount: 250,
      status: "مكتمل",
      date: "2025-09-01",
      transactionId: "TXN-1001",
    },
    {
      amount: 500,
      status: "قيد المراجعة",
      date: "2025-09-08",
      transactionId: "TXN-1002",
    },
    {
      amount: 120,
      status: "مرفوض",
      date: "2025-09-12",
      transactionId: "TXN-1003",
    },
    {
      amount: 300,
      status: "مكتمل",
      date: "2025-09-15",
      transactionId: "TXN-1004",
    },
  ];

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
        withdrawalHistory={withdrawalHistory}
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
