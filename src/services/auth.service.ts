import { LoginCredentials, RegisterCredentials, UpdateUserInfo } from '@/types';

import { axiosInstance } from '@/utils/apiConfig';

export const authService = {
  checkAuth: async () => {
    const { data } = await axiosInstance.get('/auth/check-auth');
    return data;
  },

  login: async (credentials: LoginCredentials) => {
    const { data } = await axiosInstance.post('/auth/login', credentials);
    return data;
  },

  register: async (credentials: RegisterCredentials) => {
    const { data } = await axiosInstance.post('/auth/register', credentials);
    return data;
  },

  logout: async () => {
    const { data } = await axiosInstance.post('/auth/logout');
    return data;
  },

  deleteAccount: async () => {
    const { data } = await axiosInstance.delete('/auth/account');
    return data;
  },

  updateUserInfo: async (userInfo: UpdateUserInfo) => {
    const { data } = await axiosInstance.put('/auth/user', userInfo);
    return data;
  },

  forgetPassword: async (email: string) => {
    const { data } = await axiosInstance.post('/auth/forget-password', {
      email,
    });
    return data;
  },

  resetPassword: async (payload: {
    userId: string;
    resetPasswordToken: string;
    newPassword: string;
  }) => {
    const { data } = await axiosInstance.post('/auth/reset-password', payload);
    return data;
  },

  getAllUsers: async (params: {
    page: number;
    limit: number;
    fullName: string;
  }) => {
    const { data } = await axiosInstance.get('/users', { params });
    return data;
  },

  getBestSellerUsers: async () => {
    const { data } = await axiosInstance.get('/users/best-sellers');
    return data;
  },

  getUserById: async (id: string) => {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  },

  verify: async (token: string) => {
    const { data } = await axiosInstance.post('/auth/verify', { token });
    return data;
  },
};
