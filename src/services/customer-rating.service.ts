import { axiosInstance } from '@/utils/apiConfig';

export const customerRatingService = {
  getAllCustomerRating: async () => {
    const { data } = await axiosInstance.get('/customer-rating');
    return data;
  },

  createCustomerRating: async (values: { rating: number; comment: string }) => {
    const { data } = await axiosInstance.post('/customer-rating', values);
    return data;
  },

  deleteCustomerRating: async (id: string) => {
    const { data } = await axiosInstance.delete(`/customer-rating/${id}`);
    return data;
  },

  publishCustomerRate: async (id: string) => {
    const { data } = await axiosInstance.patch(
      `/customer-rating/${id}/publish`
    );
    return data;
  },

  unPublishCustomerRate: async (id: string) => {
    const { data } = await axiosInstance.patch(
      `/customer-rating/${id}/unpublish`
    );
    return data;
  },

  getRatingDashboard: async () => {
    const { data } = await axiosInstance.get('/customer-rating/dashboard');
    return data;
  },

  userRatedBefore: async () => {
    const { data } = await axiosInstance.get(
      '/customer-rating/user-rated-before'
    );
    return data;
  },
};
