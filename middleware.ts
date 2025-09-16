// middleware.ts (ở root project)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Nếu request tới /__vite_ping thì trả về 204 (No Content)
  if (req.nextUrl.pathname === '/__vite_ping') {
    return new NextResponse(null, { status: 204 })
  }

  return NextResponse.next()
}