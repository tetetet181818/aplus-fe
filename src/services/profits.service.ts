import { axiosInstance } from '@/utils/apiConfig';

export const profitsService = {
  getProfits: async (params: {
    page: number;
    limit: number;
    fullName: string;
    email: string;
  }) => {
    const { data } = await axiosInstance.get('/profits', { params });
    return data;
  },
};
