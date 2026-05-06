import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ACCESS_TOKEN } from '@/config/auth'

// Routes anyone can access without login
const PUBLIC_PATHS = [
  '/auth/login',
  '/auth/register',
  '/auth/reset-password',
  '/auth/verify-email',
  '/',
  '/shop',
  '/product',
]

const isPublic = (pathname: string) =>
  PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/__vite_ping') {
    return new NextResponse(null, { status: 204 })
  }

  // Token is stored in cookie by setLocalUserData
  const token = req.cookies.get(ACCESS_TOKEN)?.value

  // Protect private routes — redirect to login if no token
  if (!isPublic(req.nextUrl.pathname) && !token) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('redirect', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Already logged in — redirect away from auth pages
  if (token && req.nextUrl.pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
}
