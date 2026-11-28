import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import fs from "fs";
import path from "path";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif", "image/avif"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime", "video/ogg", "video/x-m4v"];
const MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB
const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized access. Only admin can upload product media." }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No media file provided." }, { status: 400 });
    }

    const fileType = file.type.toLowerCase();
    const isVideo = ALLOWED_VIDEO_TYPES.includes(fileType) || fileType.startsWith("video/");
    const isImage = ALLOWED_IMAGE_TYPES.includes(fileType) || fileType.startsWith("image/");

    // Validate MIME type
    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: `Unsupported file format (${file.type}). Allowed: JPG, PNG, WEBP, MP4, WEBM, MOV.` },
        { status: 400 }
      );
    }

    // Validate file size
    const maxLimit = isVideo ? MAX_VIDEO_SIZE_BYTES : MAX_IMAGE_SIZE_BYTES;
    if (file.size > maxLimit) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const limitMb = isVideo ? 50 : 15;
      return NextResponse.json(
        { error: `File size (${sizeMb} MB) exceeds maximum allowed limit of ${limitMb} MB.` },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const cleanBase = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
    const safeName = `prod_${Date.now()}_${cleanBase}.${ext}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Primary: Cloud Storage via Supabase Storage bucket 'product-images'
    if (supabaseUrl && supabaseKey) {
      const uploadEndpoint = `${supabaseUrl}/storage/v1/object/product-images/${safeName}`;
      
      const storageRes = await fetch(uploadEndpoint, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": file.type || "image/jpeg",
          "x-upsert": "true",
        },
        body: buffer,
      });

      if (!storageRes.ok) {
        const errorText = await storageRes.text();
        console.error("Supabase Storage error:", storageRes.status, errorText);
        return NextResponse.json(
          { error: `Cloud storage upload failed: ${storageRes.statusText || "Server error"}` },
          { status: 502 }
        );
      }

      const publicUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${safeName}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: safeName,
        size: file.size,
        mimeType: file.type,
        isVideo,
      });
    }

    // Fallback for offline local development only (when Supabase credentials are absent)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, safeName);
      fs.writeFileSync(filePath, buffer);
      return NextResponse.json({ success: true, url: `/uploads/${safeName}` });
    } catch (fsErr) {
      console.error("Local filesystem fallback failed (read-only environment):", fsErr);
      return NextResponse.json(
        { error: "Cloud storage is not configured and local filesystem is read-only." },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("Upload handler exception:", err);
    return NextResponse.json(
      { error: err?.message || "An unexpected error occurred during image upload." },
      { status: 500 }
    );
  }
}
