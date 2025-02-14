import { NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function middleware(request) {
    const session = await getKindeServerSession();

    if (!(await session.isAuthenticated())) {
        return NextResponse.redirect(new URL("/api/auth/login?post_login_redirect_url=/details/38", request.url));
    }

    return NextResponse.next(); // Allow access if authenticated
}

export const config = {
    matcher: ["/dashboard/:path*", "/details/38:path*"], // Protect both dashboard & details
};
