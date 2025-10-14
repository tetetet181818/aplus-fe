"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  useCheckAuthQuery,
  useDeleteAccountMutation,
  useForgetPasswordMutation,
  useGetAllUsersQuery,
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useUpdateUserInfoMutation,
} from "@/store/api/auth.api";
import { LoginCredentials, RegisterCredentials, UpdateUserInfo } from "@/types";
import { deleteCookie, getCookie, setCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";

/**
 * Hook for real-time user authentication and management.
 * Reacts to token updates, syncs across tabs, and keeps user data fresh.
 */
export default function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isTokenReady, setIsTokenReady] = useState(false);

  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [currentUsersLimit, setCurrentUsersLimit] = useState(5);
  const [filterFullName, setFilterFullName] = useState("");

  /** Get token on mount and watch for cross-tab updates */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const getStoredToken = () =>
      localStorage.getItem("access_token") || getCookie("access_token");

    setToken(getStoredToken() || null);
    setIsTokenReady(true);

    // Listen for token changes in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "access_token") {
        setToken(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  /** Auth query automatically updates when token changes */
  const { data: authData, isLoading: isCheckAuthLoading } = useCheckAuthQuery(
    { token: token || "" },
    {
      skip: !isTokenReady || !token,
      pollingInterval: 60_000, // refresh user data every 1 minute
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
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
  } = useGetAllUsersQuery(
    {
      token: token || "",
      page: currentPageUser,
      limit: currentUsersLimit,
      fullName: filterFullName,
    },
    { skip: !token }
  );

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
        console.error("Register Error:", error);
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
      const bearerToken = `Bearer ${response.token}`;
      localStorage.setItem("access_token", bearerToken);
      localStorage.setItem("isAuthenticated", "true");
      setCookie("access_token", bearerToken);
      setCookie("isAuthenticated", "true");
      setToken(bearerToken);
      toast.success(response?.message);
      return response;
    } catch (error) {
      console.error("Login Error:", error);
      toast.error((error as { data: { message?: string } })?.data?.message);
    }
  };

  const logoutUser = useCallback(() => {
    deleteCookie("access_token");
    deleteCookie("isAuthenticated");
    localStorage.removeItem("access_token");
    localStorage.removeItem("isAuthenticated");
    setToken(null);
    toast.success("تم تسجيل الخروج");
    window.location.reload();
  }, []);

  const handleDeleteAccount = useCallback(async () => {
    if (!token) return;
    try {
      const response = await deleteAccount({ token }).unwrap();
      toast.success(response?.message);
      logoutUser();
      return response;
    } catch (error) {
      console.error("Delete Account Error:", error);
    }
  }, [token, deleteAccount, logoutUser]);

  const handleForgetPassword = useCallback(
    async ({ email }: { email: string }) => {
      try {
        const response = await forgetPassword({ email }).unwrap();
        toast.success(response?.message);
        return response;
      } catch (error) {
        console.error("Forget Password Error:", error);
      }
    },
    [forgetPassword]
  );

  const handleUpdateUserInfo = useCallback(
    async (data: UpdateUserInfo) => {
      if (!token) return;
      try {
        const response = await updateUserInfo({ token, data }).unwrap();
        toast.success(response?.message);
        return response;
      } catch (error) {
        console.error("Update Info Error:", error);
      }
    },
    [token, updateUserInfo]
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
        console.error("Reset Password Error:", error);
      }
    },
    [resetPassword, router]
  );

  const loading =
    isCheckAuthLoading ||
    isLoginLoading ||
    isRegisterLoading ||
    deleteAccountLoading ||
    updateUserInfoLoading;

  return {
    /** Auth state */
    token,
    setToken,
    user: authData?.data?.[0],
    isAuthenticated: !!token && !!authData?.data?.[0],
    isCheckAuthLoading,
    loading,
    isTokenReady,

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
    logoutUser,
    handleDeleteAccount,
    handleForgetPassword,
    handleUpdateUserInfo,
    handleResetPassword,
    forgetPasswordLoading,
    resetPasswordLoading,
  };
}
