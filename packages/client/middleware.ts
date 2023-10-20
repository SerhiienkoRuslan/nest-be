import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
  const verify = req.cookies.get('token');

  if (!verify && !req.url.includes('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
