"use client";

import {
  useCreateWithdrawalMutation,
  useGetAllWithdrawalsQuery,
} from "@/store/api/withdrawal.api";
import { withdrawalData } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useWithdrawals() {
  const router = useRouter();
  let token: string | null = null;
  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("access_token");
  }

  const { data: withdrawals, isLoading: withdrawalsLoading } =
    useGetAllWithdrawalsQuery({ token: token! });

  const [createWithdrawal, { isLoading: createWithdrawalLoading }] =
    useCreateWithdrawalMutation();

  const handleCreateWithdrawal = async (withdrawalData: withdrawalData) => {
    try {
      const res = await createWithdrawal({ token: token!, withdrawalData });
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
    createWithdrawalLoading,
    handleCreateWithdrawal,
  };
}
