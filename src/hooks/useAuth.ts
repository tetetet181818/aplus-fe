import {
  useCheckAuthQuery,
  useLoginMutation,
  useRegisterMutation,
} from "@/store/api/auth.api";
import { LoginCredentials, RegisterCredentials } from "@/types";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = window.localStorage.getItem("access_token");
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
      window.localStorage.setItem(
        "access_token",
        `Bearer ${response.data.token}`
      );
      setIsAuthenticated(true);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    window.localStorage.removeItem("access_token");
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
  };
}
