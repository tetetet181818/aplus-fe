'use client';

import { withdrawalService } from '@/services/withdrawals.service';
import { withdrawalData } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useWithdrawals() {
  const queryClient = useQueryClient();

  const { data: meWithdrawals, isLoading: meWithdrawalsLoading } = useQuery({
    queryKey: ['meWithdrawals'],
    queryFn: () => withdrawalService.getMeWithdrawals(),
  });

  const { data: withdrawals, isLoading: withdrawalsLoading } = useQuery({
    queryKey: ['withdrawals'],
    queryFn: () => withdrawalService.getAllWithdrawals(),
  });

  const { mutateAsync: createWithdrawal, isPending: createWithdrawalLoading } =
    useMutation({
      mutationFn: (withdrawalData: withdrawalData) =>
        withdrawalService.createWithdrawal(withdrawalData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['meWithdrawals'] });
        queryClient.invalidateQueries({ queryKey: ['withdrawals'] });
      },
    });

  const handleCreateWithdrawal = async (withdrawalData: withdrawalData) => {
    try {
      const res = await createWithdrawal(withdrawalData);
      if (res?.message) {
        toast.success('تم إضافة السحب بنجاح');
      }
      return res;
    } catch (error) {
      console.log(error);
      toast.error('حدث خطأ ');
    }
  };

  const { mutateAsync: deleteWithdrawal, isPending: deleteWithdrawalLoading } =
    useMutation({
      mutationFn: (withdrawalId: string) =>
        withdrawalService.deleteWithdrawal(withdrawalId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['meWithdrawals'] });
        queryClient.invalidateQueries({ queryKey: ['withdrawals'] });
      },
    });

  const handelDeleteWithdrawal = async (withdrawalId: string) => {
    try {
      const res = await deleteWithdrawal(withdrawalId);
      if (res?.message) {
        toast.success('تم حذف السحب بنجاح');
      }
      return res;
    } catch (error) {
      console.log((error as { message: string })?.message);
      toast.error((error as { message: string })?.message);
    }
  };

  const { mutateAsync: updateWithdrawal, isPending: updateWithdrawalLoading } =
    useMutation({
      mutationFn: ({
        withdrawalId,
        updateData,
      }: {
        withdrawalId: string;
        updateData: withdrawalData;
      }) => withdrawalService.updateWithdrawal(withdrawalId, updateData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['meWithdrawals'] });
        queryClient.invalidateQueries({ queryKey: ['withdrawals'] });
      },
    });

  const handleUpdateWithdrawal = async ({
    withdrawalId,
    updateData,
  }: {
    withdrawalId: string;
    updateData: withdrawalData;
  }) => {
    try {
      const res = await updateWithdrawal({ withdrawalId, updateData });
      if (res?.message) {
        toast.success('تم تحديث السحب بنجاح');
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
