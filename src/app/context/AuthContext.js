"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import api from "../../lib/axios.js"; 

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();

  // User data's for cleaning
  const normalizeUser = (raw) => {
    if (!raw) return null;
    return {
      id: raw._id || raw.id,
      name: raw.name,
      email: raw.email,
      role: raw.role || "user",
      isVerified: raw.isVerified,
      ...raw,
    };
  };

  // Ye client-side se chalega → cookie automatically jayegi
  const fetchUser = async () => {
    try {
      const res = await api.get("/user/auth/me");
      const userData = normalizeUser(res.data.user);

      // Optional: profile bhi merge kar sakta hai
      let profileData = {};
      try {
        const profileRes = await api.get("/user/auth/me");
        profileData = profileRes.data.profile || {};
      } catch (err) {
        console.log("Profile fetch failed (optional)");
      }

      setUser({ ...userData, ...profileData });
    } catch (err) {
      // Token invalid ya nahi hai → user null
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Page load pe ek baar user check karo
  useEffect(() => {
    fetchUser();
  }, []);

  // Auto redirect logic (middleware ki jagah yeh kaam karega)
  useEffect(() => {
    if (loading) return;
    const publicRoutes = ["/", "/login", "/register", "/forgot-password"];
    // Agar logged in hai aur login/register pe hai → dashboard pe bhej do
    if (user && publicRoutes.includes(pathname)) {
      router.replace("/dashboard");
    };

    // Agar logged in nahi aur protected page pe hai → login pe bhej do
    if (!user && (pathname.startsWith("/dashboard") || pathname.startsWith("/profile"))) {
      router.replace("/login?redirect=" + encodeURIComponent(pathname));
    }
  }, [user, pathname, loading, router]);

  // Login function
const login = async (email, password) => {
  try {
    await api.post("/user/auth/login", { email, password });

    // Direct dashboard bhejo – fetchUser pe wait mat karo
    router.replace("/dashboard");

    // Background mein user fetch kar lo (no blocking)
    setTimeout(() => {
      fetchUser().catch(() => {});
    }, 300);

  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

  // Logout function
  const logout = async () => {
    try {
      await api.post("/user/auth/logout");
    } catch (err) {
      console.log("Logout API failed, clearing anyway");
    }
    setUser(null);
    localStorage.clear(); // just in case kuch pada ho
    router.replace("/login");
  };

  // Manual refetch (kisi page pe zarurat pade to)
  const refetch = () => fetchUser();

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
