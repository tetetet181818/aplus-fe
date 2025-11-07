"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Loader } from "lucide-react";
import { useFormik } from "formik";
import { SAUDI_BANKS } from "@/constants";
import { editWithdrawalValidationSchema } from "@/utils/validation/editWithdrawalValidation";
import useWithdrawals from "@/hooks/useWithdrawals";
import { Withdrawal } from "@/types";

/**
 * Type for editing withdrawal fields.
 */
export interface EditWithdrawalValues {
  accountName: string;
  bankName: string;
  iban: string;
  amount: number;
}

/**
 * Props for EditWithdrawalDialog.
 */
interface EditWithdrawalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectWithdrawal: Withdrawal;
}

/**
 * EditWithdrawalDialog — allows admin or user to edit an existing withdrawal.
 */
export default function EditWithdrawalDialog({
  open,
  onOpenChange,
  selectWithdrawal,
}: EditWithdrawalDialogProps) {
  const { updateWithdrawalLoading, handleUpdateWithdrawal } = useWithdrawals();
  const formik = useFormik<EditWithdrawalValues>({
    initialValues: {
      accountName: selectWithdrawal.accountName || "",
      bankName: selectWithdrawal.bankName || "",
      iban: selectWithdrawal.iban || "",
      amount: selectWithdrawal.amount || 0,
    },
    validationSchema: editWithdrawalValidationSchema,
    onSubmit: async (values) => {
      await handleUpdateWithdrawal({
        withdrawalId: selectWithdrawal._id,
        updateData: values,
      });
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-800">
            تعديل طلب السحب
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            يمكنك تعديل بيانات الحساب البنكي أو حالة الطلب.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4 mt-2">
          {/* Account Name */}
          <div>
            <Label htmlFor="accountName" className="block mb-2">
              اسم صاحب الحساب
            </Label>
            <Input
              id="accountName"
              name="accountName"
              type="text"
              placeholder="محمد عبدالله الأحمدي"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.accountName}
              disabled={updateWithdrawalLoading}
            />
            {formik.touched.accountName && formik.errors.accountName && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.accountName}
              </p>
            )}
          </div>

          {/* Bank Name */}
          <div>
            <Label htmlFor="bankName" className="block mb-2">
              اسم البنك
            </Label>
            <Select
              onValueChange={(v) => formik.setFieldValue("bankName", v)}
              value={formik.values.bankName}
              disabled={updateWithdrawalLoading}
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
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.bankName}
              </p>
            )}
          </div>

          {/* IBAN */}
          <div>
            <Label htmlFor="iban" className="block mb-2">
              رقم الحساب (IBAN)
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                <span className="text-gray-700">SA</span>
              </div>
              <Input
                id="iban"
                name="iban"
                type="text"
                className="pl-12"
                placeholder="XXXXXXXXXXXXXX"
                onChange={(e) => {
                  let val = e.target.value.toUpperCase().replace(/\s/g, "");
                  if (val.startsWith("SA")) val = val.slice(2);
                  formik.setFieldValue("iban", "SA" + val);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.iban.replace(/^SA/, "")}
                disabled={updateWithdrawalLoading}
                maxLength={22}
              />
            </div>
            {formik.touched.iban && formik.errors.iban && (
              <p className="text-xs text-red-500 mt-1">{formik.errors.iban}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <Label htmlFor="amount" className="block mb-2">
              مبلغ السحب (ريال)
            </Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              placeholder="100 ريال على الأقل"
              min={100}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              disabled={updateWithdrawalLoading}
            />
            {formik.touched.amount && formik.errors.amount && (
              <p className="text-xs text-red-500 mt-1">
                {formik.errors.amount}
              </p>
            )}
          </div>

          {/* Footer Buttons */}
          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateWithdrawalLoading}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={updateWithdrawalLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {updateWithdrawalLoading ? (
                <>
                  <Loader className="h-4 w-4 mr-2 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                "حفظ التغييرات"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
