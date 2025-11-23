"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, Mail, User, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import img1 from '../../../../public/mentoroid.png';
import api from "@/app/lib/api";


async function registerUser(data) {return await api.post('/user/auth/register', data, {withCredentials: true})};

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    setLoading(true);

    try {
      const res = await registerUser({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      toast.success("OTP sent to your email!");

      sessionStorage.setItem(
        "otpSession",
        JSON.stringify({
          allowed: true,
          type: "signup",
          email: formData.email,
          expiry: Date.now() + 5 * 60 * 1000,
        })
      );

      router.push(`/verify-otp?type=signup&email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* LEFT HERO */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-primary to-primary-dark text-white flex flex-col justify-center items-center p-8 lg:p-16 relative overflow-hidden">
          <div className="relative z-10 text-center max-w-lg">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Join <span className="text-yellow-300">MentoroidAI</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-10 px-4">
              Unlock your potential with personalized AI mentorship.
            </p>

            <Image
              src={img1}
              width={420}
              height={420}
              alt="MentoroidAI"
              className="rounded-2xl shadow-2xl mx-auto border-4 border-white/20"
              priority
            />
          </div>
        </div>

        {/* RIGHT REGISTER FORM */}
        <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6 lg:p-16">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl font-bold">M</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-4 rounded-2xl border-2 border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition text-gray-800 placeholder-gray-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-4 rounded-2xl border-2 border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition text-gray-800 placeholder-gray-500"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition text-gray-800"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition text-gray-800"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] disabled:opacity-70 shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Creating Account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:text-primary-dark hover:underline transition"
              >
                Login Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}