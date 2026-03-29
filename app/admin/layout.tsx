import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Narayana | Admin Control",
  robots: "noindex, nofollow"
};

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || headersList.get('referer')?.split('/').slice(-1)[0] || '';
  
  const isLoggedIn = session?.value && session.value !== "true" && session.value.length >= 20;
  
  if (pathname === '/admin/login') {
    if (isLoggedIn) {
      redirect('/admin');
    }
    // Allow access to login page if not logged in
  } else {
    if (!isLoggedIn) {
      redirect('/admin/login');
    }
  }
  
  return <>{children}</>;
}
