"use client";

import { useAuth } from "../providers/AuthProvider";
import { useState, useEffect } from "react";
import api from "../lib/api";
import { toast } from "react-hot-toast";

const icons = {
  user: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  email: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l9 6 9-6M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8" /></svg>,
  phone: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
  school: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0l2 2m-2-2l-2 2M5 21l-2 2m2-2l2 2" /></svg>,
  board: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  class: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422A12.083 12.083 0 0112 21.5c-2.485 0-4.828-.837-6.84-2.322M12 14l9-5-9-5-9 5 9 5z" /></svg>,
  edit: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  save: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  cancel: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
};

export default function ProfilePage() {
  const { user, loading, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({});

  const loadProfile = async () => {
    try {
      const res = await api.get("/user/profile/get");
      setProfile(res.data.profile);
      setFormData(res.data.profile || {});
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    if (user) loadProfile();
  }, [user]);

  const handleEdit = () => {
    setFormData(profile || {});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profile || {});
    toast("Changes cancelled", { icon: "Undo" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/user/profile/update", formData);
      if (formData.name) setUser(prev => ({ ...prev, name: formData.name }));
      await loadProfile();
      setIsEditing(false);
      toast.success("Profile updated!", { icon: "Success" });
    } catch (err) {
      toast.error("Update failed. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-600 text-lg font-medium">Please login first</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-[#3C88A7] to-[#25607d] rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-xl flex-shrink-0">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>

              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{user?.name || "Student"}</h1>
                <p className="text-gray-600 mt-2 flex items-center justify-center sm:justify-start gap-2 text-base">
                  {icons.email} <span>{user?.email}</span>
                </p>
              </div>

              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#3C88A7] hover:bg-[#2c708f] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all active:scale-95"
                >
                  {icons.edit} Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Profile Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            Profile Details
          </h2>

          {profile ? (
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Responsive Grid: 1 col mobile, 2 col tablet+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div>
                  <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2">
                    {icons.user} Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={isEditing ? formData.name || "" : profile.name || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-5 py-4 rounded-xl border text-base ${
                      isEditing
                        ? "border-gray-300 bg-white focus:border-[#3C88A7] focus:ring-4 focus:ring-[#3C88A7]/20"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                    placeholder="Enter your name"
                  />
                </div>

                {/* Student WhatsApp */}
                <div>
                  <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2">
                    {icons.phone} Student WhatsApp
                  </label>
                  <input
                    type="text"
                    name="studentWhatsapp"
                    value={formData.studentWhatsapp || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="+91 98765 43210"
                    className={`w-full px-5 py-4 rounded-xl border text-base ${
                      isEditing
                        ? "border-gray-300 bg-white focus:border-[#3C88A7] focus:ring-4 focus:ring-[#3C88A7]/20"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                  />
                </div>

                {/* Parent WhatsApp */}
                <div>
                  <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2">
                    {icons.phone} Parent WhatsApp
                  </label>
                  <input
                    type="text"
                    name="parentWhatsapp"
                    value={formData.parentWhatsapp || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="+91 98765 00000"
                    className={`w-full px-5 py-4 rounded-xl border text-base ${
                      isEditing
                        ? "border-gray-300 bg-white focus:border-[#3C88A7] focus:ring-4 focus:ring-[#3C88A7]/20"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                  />
                </div>

                {/* School */}
                <div>
                  <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2">
                    {icons.school} School Name
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-5 py-4 rounded-xl border text-base ${
                      isEditing
                        ? "border-gray-300 bg-white focus:border-[#3C88A7] focus:ring-4 focus:ring-[#3C88A7]/20"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all`}
                    placeholder="Your school name"
                  />
                </div>

                {/* Board */}
                <div>
                  <label className="flex items-center gap-2 text fences text-base font-semibold text-gray-700 mb-2">
                    {icons.board} Board
                  </label>
                  <select
                    name="board"
                    value={formData.board || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-5 py-4 rounded-xl border text-base ${
                      isEditing
                        ? "border-gray-300 bg-white focus:border-[#3C88A7] focus:ring-4 focus:ring-[#3C88A7]/20"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all appearance-none`}
                  >
                    <option value="">Select Board</option>
                    {["CBSE", "ICSE", "State Board", "IB", "IGCSE"].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                {/* Class */}
                <div>
                  <label className="flex items-center gap-2 text-base font-semibold text-gray-700 mb-2">
                    {icons.class} Class
                  </label>
                  <select
                    name="class"
                    value={formData.class || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-5 py-4 rounded-xl border text-base ${
                      isEditing
                        ? "border-gray-300 bg-white focus:border-[#3C88A7] focus:ring-4 focus:ring-[#3C88A7]/20"
                        : "border-gray-200 bg-gray-50"
                    } focus:outline-none transition-all appearance-none`}
                  >
                    <option value="">Select Class</option>
                    {["6", "7", "8", "9", "10", "11", "12"].map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons - Full width on mobile */}
              {isEditing && (
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-[#3C88A7] hover:bg-[#2c708f] text-white font-bold py-5 rounded-xl text-lg flex items-center justify-center gap-3 shadow-lg disabled:opacity-70 active:scale-95 transition-all"
                  >
                    {saving ? "Saving..." : <> {icons.save} Save Changes</>}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-5 rounded-xl text-lg flex items-center justify-center gap-3 transition-all active:scale-95"
                  >
                    {icons.cancel} Cancel
                  </button>
                </div>
              )}
            </form>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg">No profile data yet. Click Edit to add details!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}