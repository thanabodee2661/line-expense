import { NextResponse, NextRequest } from 'next/server'

// Example of default export
export default function middleware(request: NextRequest) {
  // Middleware logic
  // console.log("Request Path:", request.nextUrl.pathname, request.); // Log the request path

  // return NextResponse.redirect(new URL(`/expenses/${request.nextUrl.pathname}`, request.url))
  // return request.nex

}

// export const config = {
//   matcher: [
//     // Match all paths except `/report` and `/expenses`
//     "/((?!report|expenses).*)",
//   ],
// }