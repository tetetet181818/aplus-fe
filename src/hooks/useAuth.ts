"use client";

import {
  useCheckAuthQuery,
  useLoginMutation,
  useRegisterMutation,
} from "@/store/api/auth.api";
import { LoginCredentials, RegisterCredentials } from "@/types";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function useAuth() {
  let token: string | undefined = undefined;

  if (typeof document !== "undefined") {
    token = getCookie("access_token");
  }

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, isLoading: isCheckAuthLoading } = useCheckAuthQuery(token);

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const registerUser = async (credentials: RegisterCredentials) => {
    try {
      const response = await register(credentials);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const loginUser = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials);
      setCookie("access_token", `Bearer ${response.data.token}`, { path: "/" });
      setIsAuthenticated(true);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    deleteCookie("access_token");
    setIsAuthenticated(false);
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
    loading: isCheckAuthLoading || isLoginLoading || isRegisterLoading,
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
