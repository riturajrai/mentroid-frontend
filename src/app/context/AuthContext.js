"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "@/lib/axios";
import axios from "axios";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  // Fresh user fetch (no cache issue)
  const fetchUser = async () => {
    try {
     const res = await api.get("/user/auth/me", { withCredentials: true });
      setUser(res.data.user || res.data);
    } catch (err) {
      console.log("Not logged in or token expired");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial load pe user check
  useEffect(() => {
    fetchUser();
  }, []);

  // Redirect logic - SABSE ZAROORI (production mein yeh hi kaam karta hai)
  useEffect(() => {
    if (loading) return;

    const isPublicRoute = ["/", "/login", "/register", "/forgot-password"].includes(pathname);
    const isProtectedRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/profile");

    if (user && isPublicRoute) {
      router.replace("/dashboard");
    } else if (!user && isProtectedRoute) {
      router.replace("/login");
    }
    // Agar user hai aur dashboard/profile pe hai → kuch mat karo
  }, [user, loading, pathname, router]);

  // LOGIN FUNCTION 
  const login = async (email, password) => {
    try {
      await api.post("/user/auth/login", { email, password });
      await fetchUser(); // ← USER STATE UPDATE 
    } catch (err) {
      throw err;
    }
  };

  // LOGOUT FUNCTION
  const logout = async () => {
    try {
      await api.post("/user/auth/logout");
    } catch (err) {
      console.log("Logout API failed");
    } finally {
      setUser(null);
      setLoading(false);
      router.replace("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refetch: fetchUser, // manual refetch ke liye
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};