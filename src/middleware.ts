import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { appConfig } from './config/app';

export const middleware = async (req: NextRequest) => {
  const token = await getToken({
    req,
    secret: appConfig.authSecret,
  });

  const isLoginPage = req.nextUrl.pathname.includes('/login');

  if (!token) {
    if (isLoginPage) return;

    return NextResponse.redirect(new URL('/login', req.url), {
      status: 307,
    });
  }

  if (isLoginPage) return NextResponse.redirect(new URL('/agenda', req.url));
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|monitoring).*)'],
};
