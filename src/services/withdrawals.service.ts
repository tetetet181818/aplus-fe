import { withdrawalData } from '@/types';

import { axiosInstance } from '@/utils/apiConfig';

export interface Withdrawal {
  id: string;
  amount: number;
  status: string;
  userId: string;
  createdAt: string;
}

export interface WithdrawalsResponse {
  data: Withdrawal[];
  message?: string;
}

export interface WithdrawalResponse {
  data: Withdrawal;
  message?: string;
}

export const withdrawalService = {
  getMeWithdrawals: async (): Promise<WithdrawalsResponse> => {
    const response = await axiosInstance.get('/withdrawals/me');
    return response.data;
  },

  getAllWithdrawals: async (): Promise<WithdrawalsResponse> => {
    const response = await axiosInstance.get('/withdrawals');
    return response.data;
  },

  createWithdrawal: async (
    withdrawalData: withdrawalData
  ): Promise<WithdrawalResponse> => {
    const response = await axiosInstance.post('/withdrawals', withdrawalData);
    return response.data;
  },

  deleteWithdrawal: async (
    withdrawalId: string
  ): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/withdrawals/${withdrawalId}`);
    return response.data;
  },

  updateWithdrawal: async (
    withdrawalId: string,
    updateData: withdrawalData
  ): Promise<WithdrawalResponse> => {
    const response = await axiosInstance.patch(
      `/withdrawals/${withdrawalId}`,
      updateData
    );
    return response.data;
  },
};
