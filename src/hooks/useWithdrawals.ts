"use client";

import {
  useCreateWithdrawalMutation,
  useDeleteWithdrawalMutation,
  useGetAllWithdrawalsQuery,
  useGetMeWithdrawalsQuery,
  useUpdateWithdrawalMutation,
} from "@/store/api/withdrawal.api";
import { withdrawalData } from "@/types";
import { toast } from "sonner";

/**
 * Custom hook for managing withdrawals:
 * - Fetch user and admin withdrawals
 * - Create new withdrawal requests
 */
export default function useWithdrawals() {
  /** Fetch withdrawals for the current user */
  const { data: meWithdrawals, isLoading: meWithdrawalsLoading } =
    useGetMeWithdrawalsQuery({});

  /** Fetch all withdrawals (admin use) */
  const { data: withdrawals, isLoading: withdrawalsLoading } =
    useGetAllWithdrawalsQuery({});

  const [createWithdrawal, { isLoading: createWithdrawalLoading }] =
    useCreateWithdrawalMutation();

  /** Create a new withdrawal request */
  const handleCreateWithdrawal = async (withdrawalData: withdrawalData) => {
    try {
      const res = await createWithdrawal({ withdrawalData });
      if (res?.data?.message) {
        toast.success("تم إضافة السحب بنجاح");
      }
      return res?.data;
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ");
    }
  };

  const [deleteWithdrawal, { isLoading: deleteWithdrawalLoading }] =
    useDeleteWithdrawalMutation();

  const handelDeleteWithdrawal = async (withdrawalId: string) => {
    try {
      const res = await deleteWithdrawal({ withdrawalId });
      if (res?.data?.message) {
        toast.success("تم حذف السحب بنجاح");
      }
      return res?.data;
    } catch (error) {
      console.log((error as { message: string })?.message);
      toast.error((error as { message: string })?.message);
    }
  };

  const [updateWithdrawal, { isLoading: updateWithdrawalLoading }] =
    useUpdateWithdrawalMutation();

  const handleUpdateWithdrawal = async ({
    withdrawalId,
    updateData,
  }: {
    withdrawalId: string;
    updateData: withdrawalData;
  }) => {
    try {
      const res = await updateWithdrawal({ withdrawalId, updateData }).unwrap();
      if (res?.message) {
        toast.success("تم تحديث السحب بنجاح");
      }
      return res;
    } catch (error) {
      toast.error((error as { message: string })?.message);
    }
  };

  return {
    withdrawals: withdrawals?.data,
    withdrawalsLoading,
    meWithdrawals: meWithdrawals?.data,
    meWithdrawalsLoading,
    createWithdrawalLoading,
    handleCreateWithdrawal,
    handelDeleteWithdrawal,
    deleteWithdrawalLoading,
    updateWithdrawalLoading,
    handleUpdateWithdrawal,
  };
}
