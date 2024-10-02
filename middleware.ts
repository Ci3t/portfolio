import { clerkMiddleware, createRouteMatcher,clerkClient  } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/admin"]);
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])
export default clerkMiddleware(async (auth, req) => {
  
  if (isProtectedRoute(req)) {
    const { userId } = auth();

    if (!userId) return NextResponse.redirect(new URL("/", req.url));

    const user = await clerkClient.users.getUser(userId);
    const role = user.publicMetadata?.role;

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
