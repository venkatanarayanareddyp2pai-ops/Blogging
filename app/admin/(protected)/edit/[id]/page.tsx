import { getPosts } from "@/lib/db";
import { notFound } from "next/navigation";
import EditPostForm from "@/app/admin/(protected)/edit/EditPostForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  if (!session?.value || session.value === "true" || session.value.length < 20) {
    redirect('/admin/login');
  }
  
  const { id } = await params;
  const posts = await getPosts();
  const post = posts.find(p => p.id === id);
  if (!post) notFound();

  return <EditPostForm post={post} />;
}