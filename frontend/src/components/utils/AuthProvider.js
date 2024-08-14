"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "../lib/axios";

const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      toast.success(response.data.message);
      setIsLoggedIn(true);
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data.message ?? error.message);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) router.push("/signup");
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
