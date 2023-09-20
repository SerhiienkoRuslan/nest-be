import { NextRequest, NextResponse } from 'next/server';

// const redirectUrlArr = ['/dashboard', '/blog'];
export default function middleware(req: NextRequest) {
  const verify = req.cookies.get('token');
  const url = req.url;

  // if (!verify && redirectUrlArr.some((v) => url.includes(v))) {
  //   return NextResponse.redirect(new URL('/auth/login', url));
  // }

  if (!verify && !url.includes('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', url));
  }
}
