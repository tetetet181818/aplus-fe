"use client";

import {
  useCreateWithdrawalMutation,
  useGetAllWithdrawalsQuery,
  useGetMeWithdrawalsQuery,
} from "@/store/api/withdrawal.api";
import { withdrawalData } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

/**
 * Custom hook for managing withdrawals:
 * - Fetch user and admin withdrawals
 * - Create new withdrawal requests
 */
export default function useWithdrawals() {
  const router = useRouter();

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
        router.push("/");
      }
      return res?.data;
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ ");
    }
  };

  return {
    withdrawals: withdrawals?.data,
    withdrawalsLoading,
    meWithdrawals: meWithdrawals?.data,
    meWithdrawalsLoading,
    createWithdrawalLoading,
    handleCreateWithdrawal,
  };
}
