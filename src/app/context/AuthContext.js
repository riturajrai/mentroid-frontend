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

  // App start pe user check karo
  useEffect(() => {
    fetchUser();
  }, []);

  // Redirect logic — INFINITE LOOP PROOF (sabse important fix)
  useEffect(() => {
    if (loading) return;

    // Agar user logged in hai aur public page pe hai (login, register, etc.)
    if (user && (pathname === "/" || pathname === "/login" || pathname === "/register" || pathname === "/forgot-password")) {
      window.location.href = "/profile"; // ya "/dashboard" jo bhi ho
      return;
    }

    // Agar user nahi hai aur protected page pe hai
    if (!user && (pathname.startsWith("/profile") || pathname.startsWith("/profile"))) {
      window.location.href = "/login";
      return;
    }

    // Agar user hai aur /profile pe hai → kuch mat karo (loop nahi hoga)
    // Agar user nahi hai aur /login pe hai → kuch mat karo
  }, [user, loading]); // ← pathname dependency hata di → loop khatam!

  // Login function
  const login = async (email, password) => {
    try {
      await api.post("/user/auth/login", { email, password });
      await fetchUser();
      window.location.href = "/profile"; // ya "/dashboard"
    } catch (err) {
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/user/auth/logout");
    } catch (err) {
      console.log("Logout failed");
    } finally {
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refetch: fetchUser,
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
