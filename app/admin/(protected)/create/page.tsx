import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreatePostForm from "./CreatePostForm";

export default async function CreatePostPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  if (!session?.value || session.value === "true" || session.value.length < 20) {
    redirect('/admin/login');
  }
  
  return <CreatePostForm />;
}
