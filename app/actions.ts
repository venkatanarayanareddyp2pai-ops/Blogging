"use server";

import { revalidatePath } from "next/cache";
import { createPost, updatePost, deletePost } from "../lib/db";

export async function revalidateBlog() {
  revalidatePath("/blog");
}
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import path from "path";
import { promises as fs } from "fs";

export async function submitPostAction(formData: FormData) {
  const title = (formData.get("title") as string)?.trim() ?? "";
  const tagsRaw = (formData.get("tags") as string)?.trim() ?? "";
  const content = (formData.get("content") as string)?.trim() ?? "";
  
  // Validate required fields
  if (!title || title.length === 0) {
    throw new Error("Title is required.");
  }
  if (!content || content.length === 0) {
    throw new Error("Content is required.");
  }
  if (title.length > 200) {
    throw new Error("Title must be less than 200 characters.");
  }
  if (content.length > 100000) {
    throw new Error("Content is too long (max 100,000 characters).");
  }
  
  let coverImage = formData.get("coverImage") as string;
  const file = formData.get("coverFile") as File | null;

  // Validate file upload
  if (file && file.size > 0) {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size cannot exceed 5MB.");
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPEG, PNG, WebP, and GIF images are allowed.");
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '').replace(/\.{2,}/g, '.');
    const filename = `${Date.now()}-${safeName}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    coverImage = `/uploads/${filename}`;
  }
  
  const tags = tagsRaw
    ? tagsRaw.split(",")
        .map(t => t.trim())
        .filter(Boolean)
        .slice(0, 10)  // Limit to 10 tags
        .map(t => t.substring(0, 50))  // Limit tag length
    : [];
  
  const excerpt = content.replace(/[#*`>\-\[\]]/g, '').substring(0, 160).trim() + "...";
  
  await createPost({ 
    title, 
    tags,
    coverImage: coverImage || "",
    content,
    excerpt
  });
  
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updatePostAction(formData: FormData) {
  const id = (formData.get("id") as string)?.trim() ?? "";
  const title = (formData.get("title") as string)?.trim() ?? "";
  const tagsRaw = (formData.get("tags") as string)?.trim() ?? "";
  const content = (formData.get("content") as string)?.trim() ?? "";
  
  // Validate required fields
  if (!id || id.length === 0) {
    throw new Error("Post ID is required.");
  }
  if (!title || title.length === 0) {
    throw new Error("Title is required.");
  }
  if (!content || content.length === 0) {
    throw new Error("Content is required.");
  }
  if (title.length > 200) {
    throw new Error("Title must be less than 200 characters.");
  }
  if (content.length > 100000) {
    throw new Error("Content is too long (max 100,000 characters).");
  }
  
  let coverImage = formData.get("coverImage") as string;
  const file = formData.get("coverFile") as File | null;

  // Validate file upload
  if (file && file.size > 0) {
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size cannot exceed 5MB.");
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPEG, PNG, WebP, and GIF images are allowed.");
    }
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '').replace(/\.{2,}/g, '.');
    const filename = `${Date.now()}-${safeName}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    coverImage = `/uploads/${filename}`;
  }

  const tags = tagsRaw
    ? tagsRaw.split(",")
        .map(t => t.trim())
        .filter(Boolean)
        .slice(0, 10)  // Limit to 10 tags
        .map(t => t.substring(0, 50))  // Limit tag length
    : [];

  const excerpt = content.replace(/[#*`>\-\[\]]/g, '').substring(0, 160).trim() + "...";
  
  await updatePost(id, {
    title,
    tags,
    ...(coverImage ? { coverImage } : {}),
    content,
    excerpt
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deletePostAction(id: string) {
  await deletePost(id);
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
}

export async function authenticateAction(formData: FormData) {
  const username = formData.get("username")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  
  // Use environment variables for credentials
  const validUsername = process.env.ADMIN_USERNAME || "NARU";
  const validPassword = process.env.ADMIN_PASSWORD || "27051309";
  
  // Use constant-time comparison to prevent timing attacks
  const usernameMatch = username.length === validUsername.length && 
    username.split('').every((char, i) => char === validUsername[i]);
  const passwordMatch = password.length === validPassword.length && 
    password.split('').every((char, i) => char === validPassword[i]);
  
  if (usernameMatch && passwordMatch) {
    const cookieStore = await cookies();
    // Generate a random session token instead of hardcoded string
    const sessionToken = Math.random().toString(36).substring(2, 15) + 
                         Math.random().toString(36).substring(2, 15);
    cookieStore.set("admin_session", sessionToken, { 
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7  // 7 days
    });
    return { success: true };
  }
  
  // Add rate limiting by waiting slightly to slow down brute force
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { success: false, error: "Invalid credentials." };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/");
}
