import { NextRequest, NextResponse } from 'next/server';

const redirectUrlArr = ['/dashboard', '/blog'];
export default function middleware(req: NextRequest) {
  const verify = req.cookies.get('isLogged');
  const url = req.url;

  if (!verify && redirectUrlArr.some((v) => url.includes(v))) {
    return NextResponse.redirect(new URL('/auth/login', url));
  }
  console.log(url);
  if (!verify && url === 'http://localhost:4200/') {
    return NextResponse.redirect(new URL('/auth/login', url));
  }
}
