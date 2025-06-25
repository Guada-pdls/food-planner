import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  const isPublic = [
    '/',
    '/api',
    '/_next',
    '/favicon.ico',
    '/auth',
    '/login',
  ].some((p) => pathname.startsWith(p));

  // No autenticado → redirigir a login
  if (!token && !isPublic) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/api/auth/signin';
    return NextResponse.redirect(loginUrl);
  }

  // Autenticado pero no completó perfil
  if (token && token.data_completed !== true && (pathname !== '/survey' && pathname !== '/preferences')) {
    const surveyUrl = req.nextUrl.clone();
    surveyUrl.pathname = '/survey';
    return NextResponse.redirect(surveyUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico|auth|login).*)',
  ],
};