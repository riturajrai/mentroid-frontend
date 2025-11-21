"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "../../lib/axios";

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

  // Sirf loading khatam hone ke baad redirect karo
  useEffect(() => {
    if (loading) return;

    const publicRoutes = ["/", "/login", "/register", "/forgot-password"];

    // Logged in + public page → dashboard
    if (user && publicRoutes.includes(pathname)) {
      router.replace("/dashboard");
    }
    // Not logged in + protected page → login
    else if (!user && (pathname.startsWith("/dashboard") || pathname.startsWith("/profile"))) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, pathname, router]);

  const login = async (email, password) => {
    await api.post("/user/auth/login", { email, password });
    await fetchUser(); // ab user set ho jayega
    router.replace("/dashboard");
  };

  const logout = async () => {
    api.post("/user/auth/logout").finally(() => {
      setUser(null);
      router.replace("/login");
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refetch: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
