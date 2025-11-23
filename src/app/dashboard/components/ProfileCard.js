"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Edit, X } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import api from "../../lib/api";

export default function ProfileCard() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch Profile (No Loading – Dashboard ProtectedRoute handles it)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile/get");

        if (res.data.success) {
          setUser(res.data.profile);
          setFormData(res.data.profile);
        } else {
          toast.error("Failed to fetch profile");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await api.put("/user/profile/update", formData);

      if (res.data.success) {
        setUser(formData);
        toast.success("Profile updated successfully!");
        setEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  // If user profile didn't load (error case)
  if (!user) {
    return (
      <div className="p-10 text-center text-sm text-red-500">
        No profile data available.
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <div className="bg-[#006188] rounded-3xl shadow-xl p-4 md:p-6 mx-auto max-w-5xl transition-all">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">

          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden bg-gray-300 border-4 border-white shadow-lg">
              <Image
                src="https://static.vecteezy.com/system/resources/previews/014/194/232/original/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg"
                alt="Profile"
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Edit button */}
            <button
              onClick={() => setEditing(!editing)}
              className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 md:p-2 shadow-lg hover:bg-gray-100 transition"
            >
              {editing ? (
                <X className="w-4 h-4 text-red-600" />
              ) : (
                <Edit className="w-4 h-4 text-teal-700" />
              )}
            </button>
          </div>

          {/* User Details */}
          <div className="flex-1 text-white mt-3 md:mt-0">
            <h2 className="text-sm md:text-base font-bold mb-2 truncate">
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-black rounded px-2 py-1 w-full md:w-auto"
                />
              ) : (
                user.name
              )}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
              {[
                { label: "MENTOROID ID", key: "email", editable: false },
                { label: "XP COIN", key: "xp", editable: false, value: 1000 },
                { label: "SCHOOL NAME", key: "schoolName", editable: true },
                { label: "BOARD", key: "board", editable: true },
                { label: "CLASS", key: "class", editable: true },
                { label: "STUDENT MOBILE", key: "studentWhatsapp", editable: true },
                { label: "PARENT MOBILE", key: "parentWhatsapp", editable: true },
              ].map((field) => (
                <div key={field.key} className="flex items-center gap-1">
                  <span className="opacity-80 font-medium">{field.label}:</span>

                  {editing && field.editable ? (
                    <input
                      type="text"
                      name={field.key}
                      value={formData[field.key] || ""}
                      onChange={handleChange}
                      className="text-black rounded px-1 py-0.5 flex-1"
                    />
                  ) : (
                    field.value || user[field.key]
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="flex gap-2 flex-shrink-0 mt-3 md:mt-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white bg-teal-600 hover:bg-teal-500 hover:scale-110 transition cursor-pointer shadow-md"
              />
            ))}
          </div>
        </div>

        {/* Save Button */}
        {editing && (
          <div className="mt-4 md:mt-6 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-white text-[#006188] font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </>
  );
}
