"use client";

import dynamic from "next/dynamic";

const VerifyOtpClient = dynamic(() => import("./VerifyOtpClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading verification...</p>
      </div>
    </div>
  ),
});

export default function VerifyOtpPage() {
  return <VerifyOtpClient />;
}
