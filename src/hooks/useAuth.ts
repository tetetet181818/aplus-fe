'use client';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';

import { authService } from '@/services/auth.service';
import { LoginCredentials, RegisterCredentials, UpdateUserInfo } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [currentUsersLimit, setCurrentUsersLimit] = useState(5);
  const [filterFullName, setFilterFullName] = useState('');

  const { data: authData, isLoading: isCheckAuthLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: authService.checkAuth,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const { mutateAsync: login, isPending: isLoginLoading } = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const { mutateAsync: register, isPending: isRegisterLoading } = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const { mutateAsync: deleteAccount, isPending: deleteAccountLoading } =
    useMutation({
      mutationFn: authService.deleteAccount,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth'] });
      },
    });

  const { mutateAsync: updateUserInfo, isPending: updateUserInfoLoading } =
    useMutation({
      mutationFn: authService.updateUserInfo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['auth'] });
      },
    });

  const { mutateAsync: forgetPassword, isPending: forgetPasswordLoading } =
    useMutation({
      mutationFn: (email: string) => authService.forgetPassword(email),
    });

  const { mutateAsync: resetPassword, isPending: resetPasswordLoading } =
    useMutation({
      mutationFn: authService.resetPassword,
    });

  const { mutateAsync: logout, isPending: isLogoutLoading } = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const {
    data: allUsers,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ['users', currentPageUser, currentUsersLimit, filterFullName],
    queryFn: () =>
      authService.getAllUsers({
        page: currentPageUser,
        limit: currentUsersLimit,
        fullName: filterFullName,
      }),
  });

  const { data: getBestSellerUsers, isLoading: getBestSellerUsersLoading } =
    useQuery({
      queryKey: ['bestSellerUsers'],
      queryFn: authService.getBestSellerUsers,
    });

  const totalUsers = allUsers?.total || 0;
  const totalPages = Math.ceil(totalUsers / currentUsersLimit) || 1;

  const handleNextPage = () => {
    if (currentPageUser < totalPages) {
      setCurrentPageUser(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageUser > 1) {
      setCurrentPageUser(prev => prev - 1);
    }
  };

  const registerUser = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        const response = await register(credentials);
        toast.success(response?.message);
        return response;
      } catch (error) {
        console.log('Register Error:', error);
        toast.error(
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || 'حدث خطأ أثناء التسجيل'
        );
      }
    },
    [register]
  );

  const loginUser = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials);
      toast.success(response?.message);
      return response;
    } catch (error) {
      toast.error(
        (error as { response?: { data: { message?: string } } })?.response?.data
          ?.message
      );
    }
  };

  const handleDeleteAccount = useCallback(async () => {
    try {
      const response = await deleteAccount();
      toast.success(response?.message);
      return response;
    } catch (error) {
      console.log('Delete Account Error:', error);
    }
  }, [deleteAccount]);

  const handleForgetPassword = useCallback(
    async ({ email }: { email: string }) => {
      try {
        const response = await forgetPassword(email);
        toast.success(response?.message);
        return response;
      } catch (error) {
        console.log('Forget Password Error:', error);
      }
    },
    [forgetPassword]
  );

  const handleUpdateUserInfo = useCallback(
    async (data: UpdateUserInfo) => {
      try {
        const response = await updateUserInfo(data);
        toast.success(response?.message);
        return response;
      } catch (error) {
        console.log('Update Info Error:', error);
      }
    },
    [updateUserInfo]
  );

  const handleResetPassword = useCallback(
    async ({
      userId,
      resetPasswordToken,
      newPassword,
    }: {
      userId: string;
      resetPasswordToken: string;
      newPassword: string;
    }) => {
      try {
        const response = await resetPassword({
          userId,
          resetPasswordToken,
          newPassword,
        });
        toast.success(response?.message);
        if (response?.data) {
          router.push('/');
          return response?.data;
        }
      } catch (error) {
        console.log('Reset Password Error:', error);
      }
    },
    [resetPassword, router]
  );

  const handleLogout = async () => {
    const res = await logout();
    toast.success(res?.message);
    window.location.reload();
  };

  const loading =
    isCheckAuthLoading ||
    isLoginLoading ||
    isRegisterLoading ||
    deleteAccountLoading ||
    updateUserInfoLoading ||
    isLogoutLoading;

  return {
    user: authData?.data,
    isAuthenticated: !!authData?.data,
    isCheckAuthLoading,
    loading,

    allUsers: allUsers?.data?.data,
    getBestSellerUsers: getBestSellerUsers?.data,
    getBestSellerUsersLoading,
    usersLoading,
    currentPageUser,
    setCurrentPageUser,
    currentUsersLimit,
    setCurrentUsersLimit,
    totalUsers,
    totalPages,
    filterFullName,
    setFilterFullName,
    handleNextPage,
    handlePrevPage,
    refetchUsers,

    registerUser,
    loginUser,
    handleDeleteAccount,
    handleForgetPassword,
    handleUpdateUserInfo,
    handleResetPassword,
    forgetPasswordLoading,
    resetPasswordLoading,
    handleLogout,
  };
}
