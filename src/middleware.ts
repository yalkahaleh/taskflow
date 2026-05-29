import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware({ ...routing, localeDetection: false });

const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
    const intlResponse = intlMiddleware(request);

    let supabaseResponse = intlResponse || NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const url = request.nextUrl.clone();
    const segments = url.pathname.split("/");
    const firstSegment = segments[1];

    // Check if first segment is a locale
    const isLocaleSegment = routing.locales.includes(firstSegment as any);
    const pathWithoutLocale = isLocaleSegment
        ? "/" + segments.slice(2).join("/")
        : "/" + segments.slice(1).join("/");

    const locale = isLocaleSegment
        ? firstSegment
        : routing.defaultLocale;

    const isAuthRoute = authRoutes.some((route) =>
        pathWithoutLocale.startsWith(route)
    );
    const isProtectedRoute = !isAuthRoute;

    if (!user && isProtectedRoute) {
        url.pathname = locale === routing.defaultLocale
            ? `/login`         // no prefix for default locale
            : `/${locale}/login`;
        return NextResponse.redirect(url);
    }

    if (user && isAuthRoute) {
        url.pathname = locale === routing.defaultLocale
            ? `/dashboard`     // no prefix for default locale
            : `/${locale}/dashboard`;
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};