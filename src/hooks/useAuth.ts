"use client";

import {
  useCheckAuthQuery,
  useDeleteAccountMutation,
  useForgetPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useUpdateUserInfoMutation,
} from "@/store/api/auth.api";
import { LoginCredentials, RegisterCredentials, UpdateUserInfo } from "@/types";
import { toast } from "sonner";

/**
 * Manage authentication state and user operations.
 */
export default function useAuth() {
  const token: string | undefined =
    typeof document !== "undefined" ? getCookie("access_token") : undefined;

  const { data, isLoading: isCheckAuthLoading } = useCheckAuthQuery(token);

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
  // const {} =
  /** Register new user */
  const registerUser = async (credentials: RegisterCredentials) => {
    try {
      const response = await register(credentials).unwrap();
      toast.success(response.message);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  /** Login user */
  const loginUser = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials).unwrap();
      localStorage.setItem("access_token", `Bearer ${response.token}`);
      localStorage.setItem("isAuthenticated", "true");
      setCookie("access_token", `Bearer ${response.token}`, { path: "/" });
      setCookie("isAuthenticated", "true", { path: "/" });
      toast.success(response.message);
      return response;
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
      toast.success(response.message);
      logoutUser();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  /** Forget password */
  const handleForgetPassword = async ({ email }: { email: string }) => {
    try {
      const response = await forgetPassword({ email }).unwrap();
      toast.success(response.message);
      return response;
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
      toast.success(response.message);
      return response;
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
      toast.success(response.message);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    token,
    user: data?.data?.[0],
    isAuthenticated: getCookie("isAuthenticated") === "true",
    isCheckAuthLoading,
    isLoginLoading,
    isRegisterLoading,
    deleteAccountLoading,
    updateUserInfoLoading,
    forgetPasswordLoading,
    resetPasswordLoading,

    registerUser,
    loginUser,
    logoutUser,
    handleDeleteAccount,
    handleForgetPassword,
    handleUpdateUserInfo,
    handleResetPassword,

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

/** Helpers: cookies */
const setCookie = (
  name: string,
  value: string,
  options: { [key: string]: string }
) => {
  let cookieString = `${name}=${value};`;
  for (const option in options) {
    cookieString += `${option}=${options[option]}; `;
  }
  document.cookie = cookieString;
};

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; max-age=0; path=/`;
};
