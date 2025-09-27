"use client";
import { useState, useRef } from "react";
import { supabase } from "@/app/lib/supabaseClient";

type UploadImageProps = {
  currentImage: string;
  onUpload: (url: string) => void;
};

export default function UploadImage({ currentImage, onUpload }: UploadImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(currentImage);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Upload file to Supabase
      const fileName = `${Date.now()}-${file.name}`; // Prevent overwriting
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`avatars/${fileName}`, file, { upsert: true });

      if (error || !data?.path) throw error || new Error("Upload failed");

      // Get full public URL
      const url = supabase.storage
        .from("avatars")
        .getPublicUrl(data.path)
        .data.publicUrl;

      if (!url) throw new Error("Failed to get public URL");

      // Update local state & send URL to parent
      setImageUrl(url);
      onUpload(url);
    } catch (err) {
      console.error("Error uploading image:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-me-info-camera">
      <i onClick={handleClick} className="bi bi-camera" style={{ cursor: "pointer" }} />
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        disabled={uploading}
      />
    </div>
  );
}
