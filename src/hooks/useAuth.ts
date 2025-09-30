"use client";

import {
  useCheckAuthQuery,
  useDeleteAccountMutation,
  useForgetPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserInfoMutation,
} from "@/store/api/auth.api";
import { LoginCredentials, RegisterCredentials, UpdateUserInfo } from "@/types";
import { toast } from "sonner";

export default function useAuth() {
  let token: string | undefined = undefined;

  if (typeof document !== "undefined") {
    token = getCookie("access_token");
  }

  const isAuthenticated = getCookie("isAuthenticated");

  const { data, isLoading: isCheckAuthLoading } = useCheckAuthQuery(token);

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [deleteAccount, { isLoading: deleteAccountLoading }] =
    useDeleteAccountMutation();
  const [updateUserInfo, { isLoading: updateUserInfoLoading }] =
    useUpdateUserInfoMutation();

  const [forgetPassword, { isLoading: forgetPasswordLoading }] =
    useForgetPasswordMutation();
  const registerUser = async (credentials: RegisterCredentials) => {
    try {
      const response = await register(credentials);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials);
      setCookie("access_token", `Bearer ${response.data.token}`, { path: "/" });
      setCookie("isAuthenticated", "true", { path: "/" });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    deleteCookie("access_token");
    deleteCookie("isAuthenticated");
  };

  const handelDeleteAccount = async () => {
    try {
      const response = await deleteAccount({ token: token || "" });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleForgetPassword = async ({ email }: { email: string }) => {
    try {
      const response = await forgetPassword({ email });
      if (response) {
        toast.success(response?.data?.message);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handelUpdateUserInfo = async (data: UpdateUserInfo) => {
    try {
      const response = await updateUserInfo({
        token: token || "",
        data,
      });
      toast.success(response.data.message);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    registerUser,
    isRegisterLoading,
    isCheckAuthLoading,
    user: data?.data[0],
    loginUser,
    isLoginLoading,
    isAuthenticated,
    logoutUser,
    loading:
      isCheckAuthLoading ||
      isLoginLoading ||
      isRegisterLoading ||
      deleteAccountLoading ||
      updateUserInfoLoading,
    handelDeleteAccount,
    updateUserInfo,
    handelUpdateUserInfo,
    handleForgetPassword,
    forgetPasswordLoading,
  };
}

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
