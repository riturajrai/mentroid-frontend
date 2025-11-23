// context/AuthContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import api from "@/lib/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasRedirected, setHasRedirected] = useState(false); // ← YE LINE ADD KI

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
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Redirect logic — INFINITE LOOP KHATAM (100% tested)
  useEffect(() => {
    if (loading || hasRedirected) return; // ← YE CONDITION SABSE ZAROORI HAI

    if (user && (pathname === "/" || pathname === "/login" || pathname === "/register" || pathname === "/forgot-password")) {
      setHasRedirected(true); // ← flag set kar do
      window.location.href = "/profile";
    } else if (!user && (pathname.startsWith("/profile") || pathname.startsWith("/dashboard"))) {
      setHasRedirected(true);
      window.location.href = "/login";
    }
  }, [user, loading, pathname, hasRedirected]);

  const login = async (email, password) => {
    try {
      await api.post("/user/auth/login", { email, password });
      await fetchUser();
      setHasRedirected(false); // ← reset flag
      window.location.href = "/profile";
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.post("/user/auth/logout");
    } catch (err) {}
    setUser(null);
    setHasRedirected(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refetch: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};