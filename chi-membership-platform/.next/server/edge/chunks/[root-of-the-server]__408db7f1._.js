(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__408db7f1._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/membership-platform/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// middleware.ts
__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$membership$2d$platform$2f$node_modules$2f$next$2d$auth$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/membership-platform/node_modules/next-auth/middleware.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$membership$2d$platform$2f$chi$2d$membership$2d$platform$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/membership-platform/chi-membership-platform/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$membership$2d$platform$2f$chi$2d$membership$2d$platform$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/membership-platform/chi-membership-platform/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$membership$2d$platform$2f$node_modules$2f$next$2d$auth$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["withAuth"])(function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    const isPublicPage = req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/pricing" || req.nextUrl.pathname === "/about" || req.nextUrl.pathname === "/terms" || req.nextUrl.pathname === "/privacy";
    // Redirect authenticated users away from auth pages
    if (isAuthPage && isAuth) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$membership$2d$platform$2f$chi$2d$membership$2d$platform$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", req.url));
    }
    // Allow access to public pages
    if (isPublicPage) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$membership$2d$platform$2f$chi$2d$membership$2d$platform$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Check subscription status for premium features
    const isPremiumFeature = req.nextUrl.pathname.startsWith("/courses/advanced") || req.nextUrl.pathname.startsWith("/coaching") || req.nextUrl.pathname.startsWith("/analytics/advanced");
    if (isPremiumFeature && token?.subscriptionTier === "FREE") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$membership$2d$platform$2f$chi$2d$membership$2d$platform$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/pricing?upgrade=true", req.url));
    }
    // Check onboarding status
    if (token?.onboardingStatus === "NOT_STARTED" && !req.nextUrl.pathname.startsWith("/onboarding") && !isAuthPage && !isPublicPage) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$membership$2d$platform$2f$chi$2d$membership$2d$platform$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/onboarding", req.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$membership$2d$platform$2f$chi$2d$membership$2d$platform$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}, {
    callbacks: {
        authorized: ({ token, req })=>{
            const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
            const isPublicPage = req.nextUrl.pathname === "/" || req.nextUrl.pathname === "/pricing" || req.nextUrl.pathname === "/about" || req.nextUrl.pathname === "/terms" || req.nextUrl.pathname === "/privacy";
            // Allow access to auth and public pages without token
            if (isAuthPage || isPublicPage) {
                return true;
            }
            // Require token for all other pages
            return !!token;
        }
    }
});
const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - api/webhooks (webhook endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */ "/((?!api/auth|api/webhooks|_next/static|_next/image|favicon.ico|public).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__408db7f1._.js.map