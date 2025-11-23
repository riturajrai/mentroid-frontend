// context/AuthContext.jsx
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

  // Yeh function ab sirf /user/profile/get se full data lata hai
  const fetchUser = async () => {
    try {
      setLoading(true);

      const res = await api.get("/user/profile/get");

      if (res.data.success && res.data.profile) {
        setUser(res.data.profile); // Yeh wahi object hai jo tumhara backend bhej raha hai
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log("Not logged in or token expired →", err.response?.data || err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // App load hote hi user check karo
  useEffect(() => {
    fetchUser();
  }, []);

  // Redirect logic (public vs protected routes)
  useEffect(() => {
    if (loading) return;

    const publicRoutes = ["/", "/login", "/register", "/forgot-password"];
    const isPublic = publicRoutes.includes(pathname);
    const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/profile");

    if (user && isPublic) {
      router.replace("/dashboard");
    } else if (!user && isProtected) {
      router.replace("/login");
    }
  }, [user, loading, pathname, router]);

  // Login function
  const login = async (email, password) => {
    try {
      await api.post("/user/auth/login", { email, password });
      await fetchUser(); // Full profile data load karega
      router.push("/dashboard");
    } catch (err) {
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await api.post("/user/auth/logout");
    } catch (err) {
      console.log("Logout API failed, clearing anyway");
    } finally {
      setUser(null);
      setLoading(false);
      router.replace("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,         // Ab isme full profile data hoga (name, whatsapp, board, class, etc.)
        loading,
        login,
        logout,
        refetch: fetchUser,   // Profile update karne ke baad call karna
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
