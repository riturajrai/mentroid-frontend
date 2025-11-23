"use client";

import React, { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { toast } from "react-hot-toast";
const icons = {
  user: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  phone: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  board: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  class: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422A12.083 12.083 0 0112 21.5c-2.485 0-4.828-.837-6.84-2.322M12 14l9-5-9-5-9 5 9 5z" />
    </svg>
  ),
  school: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0l2 2m-2-2l-2 2M5 21l-2 2m2-2l2 2" />
    </svg>
  ),
  check: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  close: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

export default function PopUp({ onClose }) {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    studentWhatsapp: "",
    parentWhatsapp: "",
    schoolName: "",
    board: "",
    class: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile/get", { withCredentials: true });
        if (res.data?.profile) {
          const p = res.data.profile;
          setFormData({
            studentWhatsapp: p.studentWhatsapp || "",
            parentWhatsapp: p.parentWhatsapp || "",
            schoolName: p.schoolName || "",
            board: p.board || "",
            class: p.class || "",
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Basic validation
    const required = ["studentWhatsapp", "parentWhatsapp", "schoolName", "board", "class"];
    for (const field of required) {
      if (!formData[field]?.trim()) {
        toast.error("Please fill all fields");
        return;
      }
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };

      const res = await api.put("/user/profile/update", payload, { withCredentials: true });

      if (res.data.success) {
        toast.success("Profile completed successfully!");
        onClose(); // This will hide the popup forever
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose(); // Allow manual close (optional)
  };

  if (loading) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 z-10"
        >
          {icons.close}
        </button>

        <div className="bg-gradient-to-br from-[#3C88A7] to-[#2a6b8a] px-6 py-10 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <div className="text-[#3C88A7] scale-125">{icons.user}</div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Complete Your Profile</h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-2">Just one step away from personalized learning!</p>
        </div>

        <div className="p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
          <div className="space-y-4">

            <InputField label="Student WhatsApp" name="studentWhatsapp" placeholder="+91 98765 43210" value={formData.studentWhatsapp} onChange={handleChange} icon={icons.phone} />
            <InputField label="Parent WhatsApp" name="parentWhatsapp" placeholder="+91 98765 00000" value={formData.parentWhatsapp} onChange={handleChange} icon={icons.phone} />
            <SelectField label="Board" name="board" value={formData.board} onChange={handleChange} options={["CBSE", "ICSE", "State Board", "IB", "IGCSE"]} icon={icons.board} />
            <SelectField label="Class" name="class" value={formData.class} onChange={handleChange} options={["6","7","8","9","10","11","12"]} icon={icons.class} />
            <InputField label="School Name" name="schoolName" placeholder="Enter your school name" value={formData.schoolName} onChange={handleChange} icon={icons.school} />

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-[#3C88A7] hover:bg-[#2a6b8a] text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
            >
              {submitting ? "Saving..." : (
                <>
                  {icons.check}
                  Complete Profile
                </>
              )}
            </button>
          </div>
        </div>

        <div className="px-6 pb-5 text-center">
          <p className="text-[10px] text-gray-500">Your data is safe and used only to improve your experience</p>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder, icon }) {
  return (
    <div>
      <label className="block font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</span>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:border-[#3C88A7] focus:ring-2 focus:ring-[#3C88A7]/30 focus:outline-none transition"
        />
      </div>
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, icon }) {
  return (
    <div>
      <label className="block font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</span>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-11 pr-10 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:border-[#3C88A7] focus:ring-2 focus:ring-[#3C88A7]/30 focus:outline-none appearance-none cursor-pointer transition"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}