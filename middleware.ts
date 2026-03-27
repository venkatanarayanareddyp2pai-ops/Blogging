import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const session = request.cookies.get('admin_session');
    if (session?.value !== "true") {
      return Response.redirect(new URL('/admin/login', request.url));
    }
  }
  
  if (path === '/admin/login') {
    const session = request.cookies.get('admin_session');
    if (session?.value === "true") {
      return Response.redirect(new URL('/admin', request.url));
    }
  }
}

export const config = {
  matcher: ['/admin/:path*'],
}
