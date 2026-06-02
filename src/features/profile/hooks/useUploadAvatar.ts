import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useUploadAvatar() {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    const uploadAvatar = async (file: File, userId: string) => {
        setIsUploading(true);
        setError("");

        try {
            const supabase = createClient();

            // File path: userId/avatar.png
            const fileExt = file.name.split(".").pop();
            const filePath = `${userId}/avatar.${fileExt}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file, {
                    upsert: true, // overwrite if exists
                });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath);

            // Update profile with avatar URL
            const { error: updateError } = await supabase
                .from("profiles")
                .update({ avatar_url: data.publicUrl })
                .eq("id", userId);

            if (updateError) throw updateError;

            return data.publicUrl;

        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return { uploadAvatar, isUploading, error };
}