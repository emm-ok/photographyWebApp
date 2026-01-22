"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

export const ImageUploader = ({ value, onChange }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string>(value || "");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPreview(value || "");
  }, [value]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to Cloudinary (example)
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "photography_profile_upload"); // set in Cloudinary

      const res = await fetch("https://api.cloudinary.com/v1_1/dyliae7ie/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      onChange(data.secure_url); // pass the uploaded URL back
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative w-full h-48 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">Click to upload image</span>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-sm">
            Uploading...
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
