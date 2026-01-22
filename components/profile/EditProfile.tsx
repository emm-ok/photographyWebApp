"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { toast } from "sonner";
import { getCurrentUser, updateUserById } from "@/lib/user";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "../ui/Skeleton";

/* ----------------------------------
   Types
---------------------------------- */
type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  image?: string;
};

/* ----------------------------------
   Skeleton UI (Shape-matched)
---------------------------------- */
const EditProfileSkeleton = () => {
  return (
    <div className="max-w-3xl">
      <Skeleton className="h-7 w-40 mb-6" />

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        {/* Avatar row */}
        <div className="flex items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-9 w-32 rounded-full" />
        </div>

        {/* Form grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ))}

          {/* Bio */}
          <div className="md:col-span-2 space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>

          {/* Save button */}
          <div className="md:col-span-2 flex justify-end">
            <Skeleton className="h-12 w-40 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------
   Main Component
---------------------------------- */
const EditProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
    image: "",
  });

  /* ----------------------------------
     Load user
  ---------------------------------- */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          location: data.location || "",
          bio: data.bio || "",
          image: data.image || "",
        });
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /* ----------------------------------
     Handlers
  ---------------------------------- */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "photography_profile_upload");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyliae7ie/image/upload",
        { method: "POST", body: uploadData },
      );

      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
      toast.success("Photo updated");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setImageLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const updatedUser = await updateUserById(user._id, formData);
      setUser(updatedUser);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  /* ----------------------------------
     Render
  ---------------------------------- */
  if (loading) return <EditProfileSkeleton />;

  if (!user) return null;

  return (
    <div className="max-w-3xl">
      <h2 className="text-xl font-semibold mb-6">Edit Profile</h2>

      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-6">
          <div className="relative">
            {formData.image ? (
              <Image
                src={formData.image}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full w-24 h-24 object-cover border"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-stone-200 rounded-full">
                <UserIcon size={48} />
              </div>
            )}

            {imageLoading && (
              <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-full">
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          <label className="bg-stone-200 px-4 py-2 rounded-full cursor-pointer text-sm font-medium hover:bg-stone-300">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <Input label="Email" value={user.email} disabled />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <label className="text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full mt-1 rounded-xl bg-stone-100 p-4 text-sm focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              disabled={saving}
              className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
