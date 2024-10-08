import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected and public routes
const isProtectedRoute = createRouteMatcher(["/admin/:path*"]);
const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Handle public routes first
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Handle protected routes (like /admin)
  if (isProtectedRoute(req)) {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      // Fetch the user and check the role
      const user = await clerkClient.users.getUser(userId);
      const role = user.publicMetadata?.role;

      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      console.error("Error fetching user from Clerk:", error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Allow other routes to proceed as normal
  return NextResponse.next();
});

// Configure the routes that use this middleware
export const config = {
  matcher: ["/admin/:path*", "/sign-in", "/sign-up"],
};
