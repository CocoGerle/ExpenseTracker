"use client";

import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { api } from "../lib/axios";

const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext();
const authPaths = ["/login", "/register"];

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      toast.success(res.data.message);
      router.replace("/");
    } catch (error) {
      toast.error(error.res?.data.message ?? "Check your password or email");
    }
  };

  const register = async (name, email, password) => {
    try {
      await api.post("auth/register", {
        name,
        email,
        password,
      });
      router.push("/login");
    } catch (err) {
      console.log(err);
      // toast.error(err.response?.data.message ?? err.message);
      const errorMessage = err.res?.data?.message ?? "ene email burtgeltei bna";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsReady(false);

        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);

        // console.log(res.data);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        toast.error("Your session has expired. Please login again");
      } finally {
        setIsReady(true);
      }
    };
    loadUser();
  }, []);

  const LogOut = async () => {
    try {
      localStorage.removeItem("token");
      toast.success("You have been logged out successfully.");
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Log out hiihed alda garla.");
    }
  };

  useEffect(() => {
    if (authPaths.includes(pathname)) return;

    if (!isReady) return;

    if (!user) router.replace("/login");
  }, [pathname, user, isReady]);

  if (!isReady) return null;

  return (
    <AuthContext.Provider value={{ user, login, register, LogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
