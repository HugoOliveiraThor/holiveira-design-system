import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { AppRole } from "./permissions";

interface AuthSession {
  session: Record<string, unknown> | null;
  user: Record<string, unknown>;
}

interface AuthAPI {
  api: {
    getSession: (opts: {
      headers: Headers;
    }) => Promise<AuthSession | null>;
  };
}

export interface RoleProtectedRoute {
  prefix: string;
  requiredRole: AppRole;
}

export interface CreateProxyOptions {
  auth: AuthAPI;
  signInPath: string;
  authPaths?: string[];
  homePath?: string;
  sessionCookieName?: string;
  matcher?: string;
  roleProtected?: RoleProtectedRoute[];
  onError?: (error: unknown, request: NextRequest) => void;
}

interface ProxyResult {
  proxy: (request: NextRequest) => Promise<NextResponse>;
  config: { matcher: string[] };
}

function getDefaultCookieName(): string {
  return process.env.NODE_ENV === "development"
    ? "better-auth.session_token"
    : "__Secure-better-auth.session_token";
}

export function createProxy(opts: CreateProxyOptions): ProxyResult {
  const {
    auth,
    signInPath,
    authPaths = [signInPath, "/auth/sign-up"],
    homePath = "/",
    sessionCookieName = getDefaultCookieName(),
    matcher = "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    roleProtected = [],
    onError = console.error,
  } = opts;

  async function proxy(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl;
    const callbackUrl = `${pathname}${request.nextUrl.search}`;
    const isAuthPage = authPaths.some((p) => pathname.startsWith(p));
    const sessionCookie = request.cookies.get(sessionCookieName)?.value;

    if (!sessionCookie) {
      if (!isAuthPage) {
        return buildRedirect(request, signInPath, callbackUrl);
      }
      return NextResponse.next();
    }

    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      if (session?.user && roleProtected.length > 0) {
        const userRole = (session.user as { role?: string }).role;
        const matched = roleProtected.find((r) =>
          pathname.startsWith(r.prefix),
        );
        if (matched && userRole !== matched.requiredRole) {
          return NextResponse.redirect(new URL(homePath, request.url));
        }
      }

      if (!session?.session && !isAuthPage) {
        return buildRedirect(request, signInPath, callbackUrl);
      }

      if (isAuthPage && session?.session) {
        return NextResponse.redirect(new URL(homePath, request.url));
      }
    } catch (error) {
      onError(error, request);
      if (!isAuthPage) {
        return buildRedirect(request, signInPath, callbackUrl);
      }
    }

    return NextResponse.next();
  }

  return {
    proxy,
    config: { matcher: [matcher] },
  };
}

function buildRedirect(
  request: NextRequest,
  signInPath: string,
  callbackUrl: string,
): NextResponse {
  const url = request.nextUrl.clone();
  url.searchParams.set("callbackUrl", callbackUrl);
  url.pathname = signInPath;
  return NextResponse.redirect(url);
}
