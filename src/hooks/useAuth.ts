"use client";

import { useState } from "react";
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

/**
 * Hook to manage authentication logic, user actions, and pagination for users.
 */
export default function useAuth() {
  let token = "";

  if (typeof window !== "undefined") {
    token = window.localStorage.getItem("access_token") || "";
  }

  /** Pagination and filters */
  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [currentUsersLimit, setCurrentUsersLimit] = useState(5);
  const [filterFullName, setFilterFullName] = useState("");

  /** Queries & Mutations */
  const { data: authData, isLoading: isCheckAuthLoading } = useCheckAuthQuery({
    token: token || "",
  });

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
  } = useGetAllUsersQuery({
    token: token || "",
    page: currentPageUser,
    limit: currentUsersLimit,
    fullName: filterFullName,
  });

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
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  /** Login user */
  const loginUser = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials).unwrap();
      localStorage.setItem("access_token", `Bearer ${response.token}`);
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  /** Logout user */
  const logoutUser = () => {
    deleteCookie("access_token");
    deleteCookie("isAuthenticated");
    localStorage.removeItem("access_token");
    localStorage.removeItem("isAuthenticated");
    toast.success("تم تسجيل الخروج");
    window.location.reload();
  };

  /** Delete account */
  const handleDeleteAccount = async () => {
    try {
      const response = await deleteAccount({ token: token || "" }).unwrap();
      toast.success(response?.data?.message);
      logoutUser();
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  /** Forget password */
  const handleForgetPassword = async ({ email }: { email: string }) => {
    try {
      const response = await forgetPassword({ email }).unwrap();
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  /** Update user info */
  const handleUpdateUserInfo = async (data: UpdateUserInfo) => {
    try {
      const response = await updateUserInfo({
        token: token || "",
        data,
      }).unwrap();
      toast.success(response?.data?.message);
      return response?.data;
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  return {
    /** Auth */
    token,
    user: authData?.data?.[0],
    isAuthenticated: !!token,
    isCheckAuthLoading,
    isLoginLoading,
    isRegisterLoading,
    deleteAccountLoading,
    updateUserInfoLoading,
    forgetPasswordLoading,
    resetPasswordLoading,

    /** Users & pagination */
    allUsers: allUsers?.data?.data,
    usersLoading,
    currentPageUser,
    currentUsersLimit,
    totalUsers,
    totalPages,
    filterFullName,
    setFilterFullName,
    setCurrentUsersLimit,
    handleNextPage,
    handlePrevPage,
    setCurrentPageUser,
    refetchUsers,

    /** Auth operations */
    registerUser,
    loginUser,
    logoutUser,
    handleDeleteAccount,
    handleForgetPassword,
    handleUpdateUserInfo,
    handleResetPassword,

    /** Combined loading state */
    loading:
      isCheckAuthLoading ||
      isLoginLoading ||
      isRegisterLoading ||
      deleteAccountLoading ||
      updateUserInfoLoading ||
      forgetPasswordLoading ||
      resetPasswordLoading,
  };
}

/** ------------------ Cookie Helpers ------------------ */

/** Get cookie by name */
export const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

/** Delete cookie by name */
const deleteCookie = (name: string) => {
  document.cookie = `${name}=; max-age=0; path=/`;
};
