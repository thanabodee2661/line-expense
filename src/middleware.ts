import { NextResponse, NextRequest } from 'next/server'

// Example of default export
export default function middleware(request: NextRequest) {
  // Middleware logic
  return NextResponse.redirect(new URL('/expenses', request.url))

}

export const config = {
  matcher: '/',
}