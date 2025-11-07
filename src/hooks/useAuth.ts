"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  useCheckAuthQuery,
  useDeleteAccountMutation,
  useForgetPasswordMutation,
  useGetAllUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useUpdateUserInfoMutation,
} from "@/store/api/auth.api";
import { LoginCredentials, RegisterCredentials, UpdateUserInfo } from "@/types";
import { useRouter } from "next/navigation";

/**
 * Hook for real-time user authentication and management.
 * Reacts to token updates, syncs across tabs, and keeps user data fresh.
 */
export default function useAuth() {
  const router = useRouter();

  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [currentUsersLimit, setCurrentUsersLimit] = useState(5);
  const [filterFullName, setFilterFullName] = useState("");
  const { data: authData, isLoading: isCheckAuthLoading } = useCheckAuthQuery(
    undefined,
    {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    }
  );
  /** Mutations */
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [deleteAccount, { isLoading: deleteAccountLoading }] =
    useDeleteAccountMutation();
  const [updateUserInfo, { isLoading: updateUserInfoLoading }] =
    useUpdateUserInfoMutation();
  const [forgetPassword, { isLoading: forgetPasswordLoading }] =
    useForgetPasswordMutation();
  const [resetPassword, { isLoading: resetPasswordLoading }] =
    useResetPasswordMutation();

  /** All users list (for admins) */
  const {
    data: allUsers,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useGetAllUsersQuery({
    page: currentPageUser,
    limit: currentUsersLimit,
    fullName: filterFullName,
  });

  const totalUsers = allUsers?.total || 0;
  const totalPages = Math.ceil(totalUsers / currentUsersLimit) || 1;

  const handleNextPage = () => {
    if (currentPageUser < totalPages) {
      setCurrentPageUser((prev) => prev + 1);
      refetchUsers();
    }
  };

  const handlePrevPage = () => {
    if (currentPageUser > 1) {
      setCurrentPageUser((prev) => prev - 1);
      refetchUsers();
    }
  };

  /** === Auth actions === */

  const registerUser = useCallback(
    async (credentials: RegisterCredentials) => {
      try {
        const response = await register(credentials).unwrap();
        toast.success(response?.message);
        return response;
      } catch (error) {
        console.log("Register Error:", error);
        toast.error(
          (error as { data?: { message?: string } })?.data?.message ||
            "حدث خطأ أثناء التسجيل"
        );
      }
    },
    [register]
  );

  const loginUser = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials).unwrap();
      toast.success(response?.message);
      return response;
    } catch (error) {
      toast.error((error as { data: { message?: string } })?.data?.message);
    }
  };

  const handleDeleteAccount = useCallback(async () => {
    try {
      const response = await deleteAccount(undefined).unwrap();
      toast.success(response?.message);
      return response;
    } catch (error) {
      console.log("Delete Account Error:", error);
    }
  }, [deleteAccount]);

  const handleForgetPassword = useCallback(
    async ({ email }: { email: string }) => {
      try {
        const response = await forgetPassword({ email }).unwrap();
        toast.success(response?.message);
        return response;
      } catch (error) {
        console.log("Forget Password Error:", error);
      }
    },
    [forgetPassword]
  );

  const handleUpdateUserInfo = useCallback(
    async (data: UpdateUserInfo) => {
      try {
        const response = await updateUserInfo(data).unwrap();
        toast.success(response?.message);
        return response;
      } catch (error) {
        console.log("Update Info Error:", error);
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
        }).unwrap();
        toast.success(response?.message);
        if (response?.data) {
          router.push("/");
          return response?.data;
        }
      } catch (error) {
        console.log("Reset Password Error:", error);
      }
    },
    [resetPassword, router]
  );
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    const res = await logout(undefined).unwrap();
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
    /** Auth state */
    user: authData?.data,
    isAuthenticated: !!authData?.data,
    isCheckAuthLoading,
    loading,

    /** User management */
    allUsers: allUsers?.data?.data,
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

    /** Actions */
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
