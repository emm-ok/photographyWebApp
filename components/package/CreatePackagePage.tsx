"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { createPackage, updatePackage } from "@/lib/package";
import { toast } from "sonner";
import { Skeleton } from "../ui/Skeleton";

const PackageFormSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <Skeleton className="h-6 w-1/3" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-xl" />
      ))}
    </div>

    <Skeleton className="h-24 w-full rounded-xl" />

    <div className="flex flex-col md:flex-row gap-4">
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>

    <Skeleton className="h-5 w-40" />

    <div className="flex justify-end gap-3 pt-4">
      <Skeleton className="h-10 w-24 rounded-xl" />
      <Skeleton className="h-10 w-32 rounded-xl" />
    </div>
  </div>
);

interface PackageForm {
  name: string;
  price: string;
  duration: string;
  delivery: string;
  description: string;
  imageCount: string;
  isActive: boolean;
  type: "one-time" | "subscription";
  coverImage?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  initialData?: any;
  onSuccess: () => void;
}

export default function CreatePackagePage({
  open,
  onClose,
  initialData,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false); // loading for image/data fetch
  const [form, setForm] = useState<PackageForm>({
    name: "",
    price: "",
    duration: "",
    delivery: "",
    description: "",
    imageCount: "",
    isActive: true,
    type: "one-time",
    coverImage: "",
  });

  // -----------------------------
  // PREFILL FORM WHEN EDITING
  // -----------------------------
  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setFormLoading(true);
      setForm({
        name: initialData.name ?? "",
        price: initialData.price?.toString() ?? "",
        duration: initialData.duration?.toString() ?? "",
        delivery: initialData.delivery?.toString() ?? "",
        description: initialData.description ?? "",
        imageCount: initialData.imageCount?.toString() ?? "",
        isActive: initialData.isActive ?? true,
        type: initialData.type ?? "one-time",
        coverImage: initialData.coverImage ?? "", // display existing image
      });
      setFormLoading(false);
    } else {
      setForm({
        name: "",
        price: "",
        duration: "",
        delivery: "",
        description: "",
        imageCount: "",
        isActive: true,
        type: "one-time",
        coverImage: "",
      });
    }
  }, [initialData, open]);

  // -----------------------------
  // HANDLE INPUT CHANGES
  // -----------------------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // -----------------------------
  // HANDLE IMAGE UPLOAD
  // -----------------------------
  const handleImageUpload = (url: string) => {
    setForm((prev) => ({ ...prev, coverImage: url }));
  };

  // -----------------------------
  // SUBMIT HANDLER
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.coverImage) {
      toast.error("Please upload a cover image before saving.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        price: Number(form.price),
        duration: Number(form.duration),
        delivery: Number(form.delivery),
        imageCount: Number(form.imageCount),
      };

      if (!form.coverImage) {
        toast.error("Please upload a cover image");
        setLoading(false);
        return;
      }

      if (initialData?._id) {
        // EDIT → PUT
        await updatePackage(initialData._id, payload);
        toast.success("Package updated successfully");
      } else {
        // CREATE → POST
        await createPackage(payload);
        toast.success("Package created successfully");
      }

      onSuccess();
      onClose();
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-2 md:p-4">
      <div className="bg-white dark:bg-neutral-900 w-full max-w-xl rounded-t-2xl md:rounded-2xl p-5 md:p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Package" : "Create Package"}
        </h3>

        {formLoading ? (
          <PackageFormSkeleton />
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Package Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                label="Price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
              <Input
                label="Duration (hours/sessions)"
                name="duration"
                type="number"
                value={form.duration}
                onChange={handleChange}
              />
              <Input
                label="Delivery Days"
                name="delivery"
                type="number"
                value={form.delivery}
                onChange={handleChange}
              />
              <Input
                label="Image Count"
                name="imageCount"
                type="number"
                value={form.imageCount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                className="w-full rounded-xl border p-3 text-sm dark:bg-neutral-800 dark:border-neutral-700"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">
                  Package Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-3 py-2 text-sm dark:bg-neutral-800 dark:border-neutral-700"
                >
                  <option value="one-time">One-time</option>
                  <option value="subscription">Subscription</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">
                  Cover Image
                </label>
                <ImageUploader
                  value={form.coverImage}
                  onChange={handleImageUpload}
                />
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm mt-2">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
              />
              Visible to clients
            </label>

            <div className="sticky bottom-0 bg-white dark:bg-neutral-900 pt-4 mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-neutral-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-black text-white"
              >
                {loading ? "Saving..." : "Save Package"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
