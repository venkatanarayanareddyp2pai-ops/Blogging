import { getPosts } from "@/lib/db";
import { notFound } from "next/navigation";
import EditPostForm from "@/app/admin/(protected)/edit/EditPostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const posts = await getPosts();
  const post = posts.find(p => p.id === id);
  if (!post) notFound();

  return <EditPostForm post={post} />;
}