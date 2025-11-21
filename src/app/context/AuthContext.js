"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "@/lib/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  const fetchUser = async () => {
    try {
      const res = await api.get("/user/auth/me");
      setUser(res.data.user || res.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Redirect Logic - Sirf loading khatam hone ke baad
  useEffect(() => {
    if (loading) return;

    const publicRoutes = ["/", "/login", "/register", "/forgot-password"];

    if (user && publicRoutes.includes(pathname)) {
      router.replace("/dashboard");
    } else if (!user && pathname.startsWith("/dashboard")) {
      router.replace("/login");
    } else if (!user && pathname.startsWith("/profile")) {
      router.replace("/login");
    }
  }, [user, loading, pathname, router]);

  const login = async (email, password) => {
    try {
      await api.post("/user/auth/login", { email, password });
      await fetchUser();
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post("/user/auth/logout");
    } catch (err) {
      console.log("Logout failed");
    } finally {
      setUser(null);
      router.replace("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refetch: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};