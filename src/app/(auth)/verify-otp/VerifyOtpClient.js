"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Loader2, ArrowLeft, Mail, RefreshCw } from "lucide-react";
import api from "@/app/lib/api";

export default function VerifyOtpClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawEmail = searchParams.get("email");
  const email = rawEmail ? decodeURIComponent(rawEmail) : "";
  const type = searchParams.get("type") || "signup";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (!email) {
      toast.error("Invalid access. Please register again.");
      router.replace("/register");
    }
  }, [email, router]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return toast.error("Please enter 6-digit OTP");

    setLoading(true);
    try {
      const res = await api.post('/user/auth/verify-otp', {email,otp,type,});
      if (res.data.success) {
        toast.success("Email verified successfully! Welcome to MentoroidAI");
        sessionStorage.removeItem("otpSession");
        setTimeout(() => router.replace("/dashboard"), 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (resendCooldown > 0) return;

    try {
      await axios.post('/user/auth/resend-otp', { email, type });
      toast.success("New OTP sent!");
      setOtp("");

      setResendCooldown(30);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  if (!email) return null;

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* LEFT HERO - Exact same as Register Page */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-primary to-primary-dark text-white flex flex-col justify-center items-center p-8 lg:p-16 relative overflow-hidden">
          <div className="relative z-10 text-center max-w-lg">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Almost There!
            </h1>
            <p className="text-base sm:text-lg lg:text-xl opacity-90 mb-10 px-4">
              Just one step to unlock your AI mentor
            </p>

            <div className="w-80 h-80 mx-auto bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white/20">
              <Mail className="w-32 h-32 text-white/90" />
            </div>
          </div>
        </div>

        {/* RIGHT FORM - Exact same styling as Register */}
        <div className="w-full lg:w-1/2 bg-gray-50 flex items-center justify-center p-6 lg:p-16">
          <div className="w-full max-w-md">

            {/* Back Button */}
            <button
              onClick={() => router.push("/register")}
              className="mb-8 flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-4xl font-bold">M</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
              Verify Your Email
            </h2>

            {/* Email Display */}
            <div className="flex items-center justify-center gap-3 bg-white px-6 py-5 rounded-2xl border border-gray-200 shadow-md mb-10">
              <Mail className="w-6 h-6 text-primary" />
              <span className="font-semibold text-gray-800 truncate max-w-xs">{email}</span>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              {/* OTP Input - Big & Beautiful */}
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                className="w-full text-center text-5xl font-mono tracking-widest py-8 
                           bg-white border-2 border-gray-300 rounded-3xl 
                           focus:border-primary focus:ring-4 focus:ring-primary/20 
                           outline-none transition-all shadow-lg"
                autoFocus
              />

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold 
                           py-5 rounded-2xl flex items-center justify-center gap-3 
                           transition-all transform hover:scale-[1.02] disabled:opacity-70 
                           shadow-xl text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin w-6 h-6" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Continue"
                )}
              </button>
            </form>

            {/* Resend OTP */}
            <div className="text-center mt-10">
              <p className="text-gray-600 mb-4">Didn't receive the code?</p>
              <button
                onClick={resendOTP}
                disabled={resendCooldown > 0}
                className="inline-flex items-center gap-2 text-primary font-bold text-lg 
                           hover:underline disabled:opacity-50 transition"
              >
                <RefreshCw className={`w-5 h-5 ${resendCooldown > 0 ? "animate-spin" : ""}`} />
                Resend OTP
                {resendCooldown > 0 && (
                  <span className="text-sm font-normal text-gray-500">
                    {" "}({resendCooldown}s)
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}