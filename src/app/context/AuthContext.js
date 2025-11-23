// context/AuthContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import api from "@/lib/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  // Full user data fetch from profile endpoint
  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await api.get("/user/profile/get");

      if (res.data.success && res.data.profile) {
        setUser(res.data.profile);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log("Session expired or not logged in");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchUser();
  }, []);

  // Redirect logic — Production-safe using window.location
  useEffect(() => {
    if (loading) return;

    const publicRoutes = ["/", "/login", "/register", "/forgot-password" , "/dashboard"];
    const isPublic = publicRoutes.includes(pathname);
    const isProtected = pathname.startsWith("/profile") || pathname.startsWith("/profile");

    if (user && isPublic) {
      window.location.href = "/profile";
    } else if (!user && isProtected) {
      window.location.href = "/login";
    }
  }, [user, loading, pathname]);

  // Login function — Production safe
  const login = async (email, password) => {
    try {
      await api.post("/user/auth/login", { email, password });
      await fetchUser(); // Fresh data load
      window.location.href = "/profile"; // 100% reliable in production
    } catch (err) {
      throw err;
    }
  };

  // Logout function — Production safe
  const logout = async () => {
    try {
      await api.post("/user/auth/logout");
    } catch (err) {
      console.log("Logout API failed, clearing anyway");
    } finally {
      setUser(null);
      setLoading(false);
      window.location.href = "/login"; // Full reload, clears everything
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refetch: fetchUser, // Manual refresh (profile save ke baad use karna)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
