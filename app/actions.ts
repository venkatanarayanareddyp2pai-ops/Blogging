"use server";
import { createPost, deletePost, updatePost } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import path from "path";
import { promises as fs } from "fs";

export async function submitPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const tagsRaw = formData.get("tags") as string;
  const content = formData.get("content") as string;
  
  let coverImage = formData.get("coverImage") as string;
  const file = formData.get("coverFile") as File | null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    coverImage = `/uploads/${filename}`;
  }

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }
  
  const tags = tagsRaw
    ? tagsRaw.split(",").map(t => t.trim()).filter(Boolean)
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
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const tagsRaw = formData.get("tags") as string;
  const content = formData.get("content") as string;
  
  let coverImage = formData.get("coverImage") as string;
  const file = formData.get("coverFile") as File | null;

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    coverImage = `/uploads/${filename}`;
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map(t => t.trim()).filter(Boolean)
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
  const username = formData.get("username");
  const password = formData.get("password");
  
  if (username === "admin" && password === "admin123") {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", { 
      path: "/", 
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7
    });
    return { success: true };
  }
  
  return { success: false, error: "Invalid credentials." };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/");
}
