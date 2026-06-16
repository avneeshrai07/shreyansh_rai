import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gate for the /admin CMS.
//
// Note: in this Next.js version (16) the old `middleware` file convention is
// renamed to `proxy` — see node_modules/next/dist/docs.
//
// This is an OPTIMISTIC check only: it redirects to the login page when no
// session cookie is present, so unauthenticated users never reach admin pages.
// The real validation (looking the token up in the database) happens in the
// admin layout — proxy deliberately avoids DB access. See the Next.js docs note
// on optimistic checks in proxy.

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

const SESSION_COOKIE = "admin_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The login page itself must stay reachable without a session.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (!request.cookies.has(SESSION_COOKIE)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
