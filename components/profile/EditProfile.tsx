'use client';

import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { toast } from "sonner";
import { getCurrentUser, updateUserById } from "@/lib/user";
import { User as UserIcon, X } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "../ui/Skeleton";

/* -------------------------
   Types
------------------------- */
type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  image?: string;
};

/* -------------------------
   Skeleton UI
------------------------- */
const EditProfileSkeleton = () => (
  <div className="max-w-3xl mx-auto">
    <Skeleton className="h-7 w-40 mb-6" />
    <div className="rounded-2xl p-6 space-y-6 bg-background border">
      <div className="flex items-center gap-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-9 w-32 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        ))}
        <div className="md:col-span-2 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <Skeleton className="h-12 w-40 rounded-xl" />
        </div>
      </div>
    </div>
  </div>
);

/* -------------------------
   Main Component
------------------------- */
const EditProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
    image: "",
  });

  /* Load user */
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

  /* Handlers */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setFormData((p) => ({ ...p, image: data.secure_url }));
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
      const updated = await updateUserById(user._id, formData);
      setUser(updated);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <EditProfileSkeleton />;
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <h2 className="text-xl font-semibold text-foreground">
        Edit Profile
      </h2>

      <div className="rounded-2xl p-6 space-y-6 bg-background">
        {/* Avatar + Preview */}
        <div className="flex items-center gap-6">
          <div className="relative">
            {formData.image ? (
              <Image
                src={formData.image}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full object-cover border dark:border-zinc-700 cursor-pointer"
                onClick={() => setPreviewImage(formData.image)}
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 cursor-pointer"
                onClick={() => toast("Upload a profile image")}>
                <UserIcon className="text-zinc-500" size={48} />
              </div>
            )}
            {imageLoading && (
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          <label className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer
            bg-background text-foreground">
            Change Photo
            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <Input label="Email" value={user.email} disabled />
          <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <Input label="Location" name="location" value={formData.location} onChange={handleChange} />

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-foreground">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full mt-1 rounded-xl p-4 text-sm
                bg-stone-200 text-neutral-800
                focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              disabled={saving}
              className="px-6 py-3 rounded-xl font-medium cursor-pointer
                bg-background text-foreground border border-border
                disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* ===========================
          Image Preview Modal
      =========================== */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="relative max-w-xl w-full rounded-xl overflow-hidden">
            <Image
              src={previewImage}
              alt="Preview"
              width={800}
              height={800}
              className="object-contain w-full h-full"
            />
            <button
              className="absolute top-3 right-3 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
              onClick={() => setPreviewImage(null)}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;
