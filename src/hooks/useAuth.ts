"use client";

import { useEffect, useState } from "react";
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

/**
 * Handles user authentication, session management, and account actions.
 * Ensures token readiness before triggering checkAuth.
 */
export default function useAuth() {
  /** Token state — waits for client storage before running queries */
  const [token, setToken] = useState<string | null>(null);
  const [isTokenReady, setIsTokenReady] = useState(false);
  /** Pagination and filters */
  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [currentUsersLimit, setCurrentUsersLimit] = useState(5);
  const [filterFullName, setFilterFullName] = useState("");

  /** Wait for token from localStorage or cookies on mount */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedToken =
      localStorage.getItem("access_token") || getCookie("access_token") || "";
    setToken(storedToken);
    setIsTokenReady(true);
  }, []);

  /** Queries & Mutations */
  const {
    data: authData,
    isLoading: isCheckAuthLoading,
    refetch: refetchAuth,
  } = useCheckAuthQuery(
    { token: token || "" },
    { skip: !isTokenReady || !token }
  );

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

  /** Fetch paginated users list */
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

  /** Pagination helpers */
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

  /** Register new user */
  const registerUser = async (credentials: RegisterCredentials) => {
    try {
      const response = await register(credentials).unwrap();
      toast.success(response?.message);
      return response;
    } catch (error) {
      console.error("Register Error:", error);
    }
  };

  /** Login user and store token */
  const loginUser = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials).unwrap();
      const bearerToken = `Bearer ${response.token}`;
      localStorage.setItem("access_token", bearerToken);
      setCookie("access_token", bearerToken);
      setToken(bearerToken);
      refetchAuth();
      toast.success(response?.message || "تم تسجيل الدخول بنجاح");
      return response;
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("حدث خطأ أثناء تسجيل الدخول");
    }
  };

  /** Logout user */
  const logoutUser = () => {
    deleteCookie("access_token");
    deleteCookie("isAuthenticated");
    localStorage.removeItem("access_token");
    localStorage.removeItem("isAuthenticated");
    setToken(null);
    toast.success("تم تسجيل الخروج");
    window.location.reload();
  };

  /** Delete user account */
  const handleDeleteAccount = async () => {
    if (!token) return;
    try {
      const response = await deleteAccount({ token }).unwrap();
      toast.success(response?.data?.message);
      logoutUser();
      return response?.data;
    } catch (error) {
      console.error("Delete Account Error:", error);
    }
  };

  /** Forget password */
  const handleForgetPassword = async ({ email }: { email: string }) => {
    try {
      const response = await forgetPassword({ email }).unwrap();
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.error("Forget Password Error:", error);
    }
  };

  /** Update user info */
  const handleUpdateUserInfo = async (data: UpdateUserInfo) => {
    if (!token) return;
    try {
      const response = await updateUserInfo({ token, data }).unwrap();
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.error("Update Info Error:", error);
    }
  };

  /** Reset password */
  const handleResetPassword = async ({
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
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.error("Reset Password Error:", error);
    }
  };

  /** Combined loading state */
  const loading =
    isCheckAuthLoading ||
    isLoginLoading ||
    isRegisterLoading ||
    deleteAccountLoading ||
    updateUserInfoLoading ||
    forgetPasswordLoading ||
    resetPasswordLoading;

  return {
    /** Auth state */
    token,
    user: authData?.data?.[0],
    isAuthenticated: !!token,
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
  };
}
