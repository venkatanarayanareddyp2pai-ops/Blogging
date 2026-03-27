import Link from "next/link";
import { logoutAction } from "@/app/actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Narayana | Admin Control",
  robots: "noindex, nofollow"
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
