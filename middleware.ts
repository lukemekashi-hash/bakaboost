import { auth } from "@/app/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl))
  }

  return NextResponse.next()
})

// Optionally configure middleware to match dashboard routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
} 