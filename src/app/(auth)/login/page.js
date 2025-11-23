"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../providers/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import img1 from '../../../../public/mentoroid.png'
import {X, Lock,Mail,Loader2,ArrowLeft,Eye, EyeOff,Import,} from "lucide-react";
import axios from "axios";
import api from '../../lib/api';


export default function LoginPage() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Forgot Password Modal States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [step, setStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setErrorMsg("Please fill all fields");

    setLoading(true);
    setErrorMsg("");

    try {
      // just use api instance
        const res = await api.post("/user/auth/login", { email, password });
      setUser(res.data.user);
      toast.success("Welcome back to MentoroidAI!");
      router.replace("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid email or password";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    if (!forgotEmail.includes("@")) return toast.error("Enter valid email");
    setForgotLoading(true);
    try {
      await axios.post(`${API_URL}/user/forget-password`, { email: forgotEmail });
      toast.success("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) return toast.error("Enter 6-digit OTP");
    setForgotLoading(true);
    try {
      await axios.post(`${API_URL}/user/verify-forget-otp`, {
        email: forgotEmail,
        otp,
      });
      toast.success("OTP Verified!");
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setForgotLoading(false);
    }
  };

  const resetPassword = async () => {
    if (newPassword.length < 6) return toast.error("Password must be 6+ chars");
    if (newPassword !== confirmPassword) return toast.error("Passwords don't match");

    setForgotLoading(true);
    try {
      await axios.post(`${API_URL}/user/reset-password`, {
        email: forgotEmail,
        newPassword,
      });
      toast.success("Password changed successfully! Please login.");
      setShowForgotModal(false);
      setStep(1);
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setForgotLoading(false);
    }
  };

  const closeModal = () => {
    setShowForgotModal(false);
    setStep(1);
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      {/* Main Layout */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Hero */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-primary to-primary-dark text-white flex flex-col justify-center items-center p-8 lg:p-16">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Welcome Back
              <br />
              to <span className="text-yellow-300">MentoridAI</span>
            </h1>
            <p className="text-lg opacity-90 mb-10">
              Your personal AI mentor is waiting to help you grow.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Image
                src={img1}
                alt="MentoroidAI"
                width={380}
                height={380}
                className="rounded-2xl shadow-2xl border-4 border-white/20"
                priority
              />
            </div>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6 lg:p-16">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white text-4xl font-bold">M</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
              Login Account
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-5 py-4 rounded-2xl border-2 border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition text-gray-800 placeholder-gray-500"
                  required
                />
              </div>

              {/* Password Field with Show/Hide */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-primary hover:text-primary-dark font-semibold text-sm hover:underline transition"
                >
                  Forgot Password?
                </button>
              </div>

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center font-medium">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] disabled:opacity-70 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" />
                    Logging in...
                  </>
                ) : (
                  "Login Now"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-bold hover:text-primary-dark hover:underline transition">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">
                  {step === 1 && "Forgot Password"}
                  {step === 2 && "Verify OTP"}
                  {step === 3 && "Set New Password"}
                </h3>
              </div>
            </div>

            <div className="p-8">
              {/* Step 1 - Email */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      className="w-full pl-12 pr-5 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary outline-none transition"
                    />
                  </div>
                  <button
                    onClick={sendOtp}
                    disabled={forgotLoading}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition"
                  >
                    {forgotLoading ? <Loader2 className="animate-spin" /> : <Mail className="w-5 h-5" />}
                    {forgotLoading ? "Sending..." : "Send OTP"}
                  </button>
                </div>
              )}

              {/* Step 2 - OTP */}
              {step === 2 && (
                <div className="space-y-6">
                  <p className="text-center text-sm text-gray-600">
                    We sent a 6-digit code to <strong>{forgotEmail}</strong>
                  </p>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-5 py-6 border-2 border-gray-200 rounded-2xl text-center text-4xl tracking-widest font-mono focus:border-primary outline-none transition"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                    >
                      <ArrowLeft className="w-5 h-5" /> Back
                    </button>
                    <button
                      onClick={verifyOtp}
                      disabled={forgotLoading || otp.length !== 6}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-xl disabled:opacity-50 transition"
                    >
                      {forgotLoading ? "Verifying..." : "Verify OTP"}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 - New Password */}
              {step === 3 && (
                <div className="space-y-5">
                  {/* New Password */}
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm New Password"
                      className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <button
                    onClick={resetPassword}
                    disabled={
                      forgotLoading ||
                      newPassword.length < 6 || newPassword !== confirmPassword
                    }
                    className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl disabled:opacity-50 transition"
                  >
                    {forgotLoading ? "Changing..." : "Change Password"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}