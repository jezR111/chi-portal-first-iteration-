// middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    const isPublicPage = 
      req.nextUrl.pathname === "/" || 
      req.nextUrl.pathname === "/pricing" ||
      req.nextUrl.pathname === "/about" ||
      req.nextUrl.pathname === "/terms" ||
      req.nextUrl.pathname === "/privacy";

    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Allow access to public pages
    if (isPublicPage) {
      return NextResponse.next();
    }

    // Check subscription status for premium features
    const isPremiumFeature = 
      req.nextUrl.pathname.startsWith("/courses/advanced") ||
      req.nextUrl.pathname.startsWith("/coaching") ||
      req.nextUrl.pathname.startsWith("/analytics/advanced");

    if (isPremiumFeature && token?.subscriptionTier === "FREE") {
      return NextResponse.redirect(new URL("/pricing?upgrade=true", req.url));
    }

    // Check onboarding status
    if (
      token?.onboardingStatus === "NOT_STARTED" &&
      !req.nextUrl.pathname.startsWith("/onboarding") &&
      !isAuthPage &&
      !isPublicPage
    ) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
        const isPublicPage = 
          req.nextUrl.pathname === "/" || 
          req.nextUrl.pathname === "/pricing" ||
          req.nextUrl.pathname === "/about" ||
          req.nextUrl.pathname === "/terms" ||
          req.nextUrl.pathname === "/privacy";

        // Allow access to auth and public pages without token
        if (isAuthPage || isPublicPage) {
          return true;
        }

        // Require token for all other pages
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - api/webhooks (webhook endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|api/webhooks|_next/static|_next/image|favicon.ico|public).*)",
  ],
};