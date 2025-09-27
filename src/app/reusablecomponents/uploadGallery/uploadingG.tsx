"use client";
import { useState, useRef } from "react";
import { supabase } from "@/app/lib/supabaseClient";

type UploadGalleryProps = {
  professionalId: number;
  onUpload: (urls: string[]) => void;
};

export default function UploadGallery({ professionalId, onUpload }: UploadGalleryProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${Date.now()}-${file.name}`;

        const { data, error } = await supabase.storage
          .from("gallery")
          .upload(`${professionalId}/${fileName}`, file, { upsert: true });

        if (error || !data?.path) {
          console.error("Upload failed for file:", file.name, error);
          continue;
        }

        const url = supabase.storage.from("gallery").getPublicUrl(data.path).data.publicUrl;
        if (!url) continue;

        uploadedUrls.push(url);
      }

      setImageUrls((prev) => [...prev, ...uploadedUrls]);
      if (uploadedUrls.length > 0) onUpload(uploadedUrls);
    } catch (err) {
      console.error("Error uploading gallery images:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-gallery-upload">
      <i onClick={handleClick} className="bi bi-images"/>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        disabled={uploading}
      />
    </div>
  );
}
