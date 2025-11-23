"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "@/lib/axios";
import toast from "react-hot-toast"; // Make sure you have this installed

export default function Profile() {
  const { user, loading, logout, refetch } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editData, setEditData] = useState({
    name: "",
    studentWhatsapp: "",
    parentWhatsapp: "",
    schoolName: "",
    board: "",
    class: "",
  });

  // Fill form when user loads
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || "",
        studentWhatsapp: user.studentWhatsapp || "",
        parentWhatsapp: user.parentWhatsapp || "",
        schoolName: user.schoolName || "",
        board: user.board || "",
        class: user.class || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePhone = (num) => {
    const cleaned = num.replace(/\D/g, "");
    return cleaned.length === 10 || cleaned.length === 12; // 10 or +91...
  };

  const handleSave = async () => {
    setError("");

    // Required field: studentWhatsapp
    if (!editData.studentWhatsapp?.trim()) {
      setError("Your WhatsApp number is required.");
      return;
    }

    if (!validatePhone(editData.studentWhatsapp)) {
      setError("Please enter a valid 10-digit WhatsApp number.");
      return;
    }

    setSaving(true);
    try {
      await api.put("/user/profile/update", {
        name: editData.name.trim() || undefined,
        studentWhatsapp: editData.studentWhatsapp.replace(/\D/g, "").replace(/^91/, "+91"),
        parentWhatsapp: editData.parentWhatsapp
          ? editData.parentWhatsapp.replace(/\D/g, "").replace(/^91/, "+91")
          : undefined,
        schoolName: editData.schoolName.trim() || undefined,
        board: editData.board || undefined,
        class: editData.class || undefined,
      });

      await refetch();
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-6 px-4 text-xs leading-relaxed">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="h-28 md:h-40 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="relative px-4 md:px-10 -mt-16 md:-mt-24 pb-8">
            <div className="flex flex-col items-center md:flex-row md:items-end gap-5">
              <div className="bg-white p-2 rounded-full shadow-2xl ring-4 ring-white">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-xl">
                  {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {user.name || "Student"}
                </h1>
                <p className="text-gray-600 mt-1">{user.email}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-3">
                  {user.class && (
                    <span className="px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      Class {user.class}
                    </span>
                  )}
                  {user.board && (
                    <span className="px-4 py-1.5 bg-teal-100 text-teal-800 rounded-full text-xs font-semibold">
                      {user.board}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-10 pb-8">
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="text-gray-600 font-semibold">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleChange}
                    className="mt-1.5 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your name"
                  />
                ) : (
                  <p className="mt-1.5 font-medium text-gray-900">{user.name || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="text-gray-600 font-semibold">Email Address</label>
                <p className="mt-1.5 font-medium text-gray-900">{user.email}</p>
              </div>

              {/* Student WhatsApp - Required */}
              <div>
                <label className="text-gray-600 font-semibold">
                  Your WhatsApp <span className="text-red-500">*</span>
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="studentWhatsapp"
                    value={editData.studentWhatsapp}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="mt-1.5 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="mt-1.5 font-medium text-gray-900">
                    {user.studentWhatsapp || "Not provided"}
                  </p>
                )}
              </div>

              {/* Parent WhatsApp */}
              <div>
                <label className="text-gray-600 font-semibold">Parent's WhatsApp</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="parentWhatsapp"
                    value={editData.parentWhatsapp}
                    onChange={handleChange}
                    placeholder="+91 98765 00000"
                    className="mt-1.5 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="mt-1.5 font-medium text-gray-900">
                    {user.parentWhatsapp || "Not provided"}
                  </p>
                )}
              </div>

              {/* Board & Class */}
              <div>
                <label className="text-gray-600 font-semibold">Board</label>
                {isEditing ? (
                  <select
                    name="board"
                    value={editData.board}
                    onChange={handleChange}
                    className="mt-1.5 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Select Board</option>
                    {["CBSE", "ICSE", "State Board", "IB", "IGCSE"].map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                ) : (
                  <p className="mt-1.5 font-medium text-gray-900">{user.board || "Not set"}</p>
                )}
              </div>

              <div>
                <label className="text-gray-600 font-semibold">Class</label>
                {isEditing ? (
                  <select
                    name="class"
                    value={editData.class}
                    onChange={handleChange}
                    className="mt-1.5 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Select Class</option>
                    {[6, 7, 8, 9, 10, 11, 12].map((c) => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                ) : (
                  <p className="mt-1.5 font-medium text-gray-900">
                    {user.class ? `Class ${user.class}` : "Not set"}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-600 font-semibold">School Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="schoolName"
                    value={editData.schoolName}
                    onChange={handleChange}
                    placeholder="e.g. Delhi Public School"
                    className="mt-1.5 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="mt-1.5 font-medium text-gray-900">
                    {user.schoolName || "Not provided"}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-70"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={logout}
                    className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          Profile last updated: {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString("en-IN") : "Never"}
        </div>
      </div>
    </div>
  );
}
