"use client";

import { useRef } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useUploadAvatar } from "../hooks/useUploadAvatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface UserIdentity {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export function AvatarUpload() {
  const { data: identity, refetch } = useGetIdentity<UserIdentity>();
  const { uploadAvatar, isUploading, error } = useUploadAvatar();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !identity?.id) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    const url = await uploadAvatar(file, identity.id);
    if (url) {
      refetch(); // refresh identity to show new avatar
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar Preview */}
      <div className="size-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
        {identity?.avatar ? (
          <img
            src={identity.avatar}
            alt="Avatar"
            className="size-full object-cover"
          />
        ) : (
          <span className="text-2xl font-bold text-muted-foreground">
            {identity?.name?.[0] ?? identity?.email?.[0] ?? "?"}
          </span>
        )}
      </div>

      {/* Upload Button */}
      <Button
        variant="outline"
        size="sm"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="size-4 mr-2" />
        {isUploading ? "Uploading..." : "Upload Avatar"}
      </Button>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
