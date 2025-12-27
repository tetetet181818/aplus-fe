import { AcceptedWithdrawal } from '@/types';

import { axiosInstance } from '@/utils/apiConfig';

export const dashboardService = {
  getOverview: async () => {
    const { data } = await axiosInstance.get('/dashboard/overview');
    return data;
  },

  getAllUsers: async (params: {
    page: number;
    limit: number;
    fullName: string;
    university: string;
    emailFilter: string;
  }) => {
    const { data } = await axiosInstance.get('/dashboard/users', { params });
    return data;
  },

  getUsersStats: async () => {
    const { data } = await axiosInstance.get('/dashboard/users/stats');
    return data;
  },

  deleteUser: async (id: string) => {
    const { data } = await axiosInstance.delete(`/dashboard/users/${id}`);
    return data;
  },

  getAllNotes: async (params: {
    page: number;
    limit: number;
    title: string;
    university: string;
    collage: string;
    year: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }) => {
    const { data } = await axiosInstance.get('/dashboard/notes', { params });
    return data;
  },

  getNotesStats: async () => {
    const { data } = await axiosInstance.get('/dashboard/notes/stats');
    return data;
  },

  makeNotePublish: async (id: string) => {
    const { data } = await axiosInstance.patch(
      `/dashboard/notes/${id}/publish`
    );
    return data;
  },

  makeNoteUnpublish: async (id: string) => {
    const { data } = await axiosInstance.patch(
      `/dashboard/notes/${id}/unpublish`
    );
    return data;
  },

  getAllSales: async (params: {
    page: number;
    limit: number;
    status: string;
    id: string;
    invoiceId: string;
  }) => {
    const { data } = await axiosInstance.get('/dashboard/sales', { params });
    return data;
  },

  getSalesStats: async () => {
    const { data } = await axiosInstance.get('/dashboard/sales/stats');
    return data;
  },

  getAllWithdrawals: async (params: {
    page: number;
    limit: number;
    status: string;
    iban: string;
    startDate: string;
    endDate: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
  }) => {
    const { data } = await axiosInstance.get('/dashboard/withdrawals', {
      params,
    });
    return data;
  },

  getWithdrawalStats: async () => {
    const { data } = await axiosInstance.get('/dashboard/withdrawals/stats');
    return data;
  },

  getWithdrawalStatuses: async () => {
    const { data } = await axiosInstance.get('/dashboard/withdrawals/statuses');
    return data;
  },

  acceptedWithdrawal: async (id: string) => {
    const { data } = await axiosInstance.patch(
      `/dashboard/withdrawals/${id}/accept`
    );
    return data;
  },

  rejectedWithdrawal: async (id: string) => {
    const { data } = await axiosInstance.patch(
      `/dashboard/withdrawals/${id}/reject`
    );
    return data;
  },

  completedWithdrawal: async (
    id: string,
    withdrawalData: AcceptedWithdrawal
  ) => {
    const { data } = await axiosInstance.patch(
      `/dashboard/withdrawals/${id}/complete`,
      withdrawalData
    );
    return data;
  },

  addAdminNote: async (
    withdrawalId: string,
    updateData: { adminNotes: string }
  ) => {
    const { data } = await axiosInstance.patch(
      `/dashboard/withdrawals/${withdrawalId}/admin-note`,
      updateData
    );
    return data;
  },

  getSingleWithdrawal: async (id: string) => {
    const { data } = await axiosInstance.get(`/dashboard/withdrawals/${id}`);
    return data;
  },
};
