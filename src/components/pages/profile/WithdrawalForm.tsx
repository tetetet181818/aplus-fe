"use client";

import { Banknote, AlertTriangle, Info, Loader } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormikProps } from "formik";
import { SAUDI_BANKS } from "@/constants";

export interface WithdrawalFormValues {
  accountHolderName: string;
  bankName: string;
  iban: string;
  withdrawalAmount: number;
}

interface WithdrawalFormProps {
  formik: FormikProps<WithdrawalFormValues>;
  isProcessingWithdrawal: boolean;
  netEarnings: number;
  remainingWithdrawals: number;
  maxWithdrawalsPerMonth: number;
  loading: boolean;
}

export default function WithdrawalForm({
  formik,
  isProcessingWithdrawal,
  netEarnings,
  remainingWithdrawals,
  maxWithdrawalsPerMonth,
  loading,
}: WithdrawalFormProps) {
  const disabled = isProcessingWithdrawal || loading;

  return (
    <Card className="shadow-lg border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <Banknote className="h-6 w-6 text-primary" />
          سحب الأرباح
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          أدخل معلومات حسابك البنكي والمبلغ الذي ترغب في سحبه.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={formik.handleSubmit}>
          <FormField
            label="اسم صاحب الحساب (ثلاثي)"
            id="accountHolderName"
            formik={formik}
            disabled={disabled}
            placeholder="مثال: محمد عبدالله الأحمدي"
          />

          <BankSelectField formik={formik} disabled={disabled} />

          <IbanField formik={formik} disabled={disabled} />

          <FormField
            label="مبلغ السحب (بالريال)"
            id="withdrawalAmount"
            type="number"
            formik={formik}
            disabled={disabled}
            placeholder="الحد الأدنى 100 ريال"
          />

          <WithdrawalInfo
            remainingWithdrawals={remainingWithdrawals}
            maxWithdrawalsPerMonth={maxWithdrawalsPerMonth}
          />

          <SubmitButton isProcessing={loading} disabled={disabled} />

          <FormMessages
            netEarnings={netEarnings}
            remainingWithdrawals={remainingWithdrawals}
          />
        </form>
      </CardContent>
    </Card>
  );
}

/* ----------------- Subcomponents ----------------- */

const FormField = ({
  label,
  id,
  type = "text",
  formik,
  disabled,
  placeholder,
}: {
  label: string;
  id: keyof WithdrawalFormValues;
  type?: string;
  formik: FormikProps<WithdrawalFormValues>;
  disabled: boolean;
  placeholder?: string;
}) => (
  <div className="mb-4">
    <Label htmlFor={id} className="block mb-2">
      {label}
    </Label>
    <Input
      id={id}
      name={id}
      type={type}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[id] ?? ""}
      placeholder={placeholder}
      className="h-11"
      disabled={disabled}
    />
    {formik.touched[id] && formik.errors[id] && (
      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
        {formik.errors[id]}
      </p>
    )}
  </div>
);

const BankSelectField = ({
  formik,
  disabled,
}: {
  formik: FormikProps<WithdrawalFormValues>;
  disabled: boolean;
}) => (
  <div className="mb-4">
    <Label htmlFor="bankName" className="block mb-2">
      اسم البنك
    </Label>
    <Select
      onValueChange={(value) => formik.setFieldValue("bankName", value)}
      value={formik.values.bankName || ""}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="اختر البنك" />
      </SelectTrigger>
      <SelectContent>
        {SAUDI_BANKS?.map((bank) => (
          <SelectItem key={bank.code} value={bank.name}>
            {bank.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {formik.touched.bankName && formik.errors.bankName && (
      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
        {formik.errors.bankName}
      </p>
    )}
  </div>
);

const IbanField = ({
  formik,
  disabled,
}: {
  formik: FormikProps<WithdrawalFormValues>;
  disabled: boolean;
}) => (
  <div className="mb-4">
    <Label htmlFor="iban" className="block mb-2">
      رقم الحساب (IBAN)
    </Label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
        <span className="text-gray-700 dark:text-gray-300">SA</span>
      </div>
      <Input
        id="iban"
        name="iban"
        type="text"
        onChange={(e) => {
          let value = e.target.value.toUpperCase().replace(/\s/g, "");
          if (value.startsWith("SA")) value = value.substring(2);
          formik.setFieldValue("iban", "SA" + value);
        }}
        onBlur={formik.handleBlur}
        value={(formik.values.iban || "").replace(/^SA/, "")}
        placeholder="XXXXXXXXXXXXXX"
        className="pl-12 h-11"
        maxLength={22}
        disabled={disabled}
      />
    </div>
    {formik.touched.iban && formik.errors.iban && (
      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
        {formik.errors.iban}
      </p>
    )}
  </div>
);

const WithdrawalInfo = ({
  remainingWithdrawals,
  maxWithdrawalsPerMonth,
}: {
  remainingWithdrawals: number;
  maxWithdrawalsPerMonth: number;
}) => (
  <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-md text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2 mb-4">
    <Info className="h-5 w-5 mt-0.5 shrink-0" />
    <span>
      يمكنك إجراء {maxWithdrawalsPerMonth} عمليات سحب بحد أقصى كل شهر. عدد
      عمليات السحب المتبقية لك هذا الشهر:{" "}
      <strong>{remainingWithdrawals > 0 ? remainingWithdrawals : 0}</strong>.
    </span>
  </div>
);

const SubmitButton = ({
  isProcessing,
  disabled,
}: {
  isProcessing: boolean;
  disabled: boolean;
}) => (
  <Button
    type="submit"
    className="w-full h-11 text-base bg-primary hover:bg-primary/90"
    disabled={disabled || isProcessing}
    id="moyasar-payment-button"
  >
    {isProcessing ? (
      <>
        <Loader className="mr-2 h-4 w-4 animate-spin" />
        جاري المعالجة...
      </>
    ) : (
      "تأكيد طلب السحب"
    )}
  </Button>
);

const FormMessages = ({
  netEarnings,
  remainingWithdrawals,
}: {
  netEarnings: number;
  remainingWithdrawals: number;
}) => (
  <>
    {netEarnings < 100 && (
      <p className="text-xs text-yellow-600 dark:text-yellow-400 text-center mt-2 flex items-center justify-center gap-1">
        <AlertTriangle className="h-4 w-4" />
        يجب أن يصل رصيدك إلى 100 ريال على الأقل لتتمكن من السحب.
      </p>
    )}
    {remainingWithdrawals <= 0 && netEarnings >= 100 && (
      <p className="text-xs text-orange-600 dark:text-orange-400 text-center mt-2 flex items-center justify-center gap-1">
        <Info className="h-4 w-4" />
        لقد استنفدت عمليات السحب المتاحة لهذا الشهر.
      </p>
    )}
  </>
);
