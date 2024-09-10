import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Define routes that are accessible based on roles
const roleBasedRoutes: Record<string, string[]> = {
  ADMIN: ["/admin/requests", "/admin/calendar", "/admin/logs"],
  FACULTY: ["/faculty/requests", "/faculty/calendar", "/faculty"],
  USER: ["/forms-page"],
};

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Avoid writing logic between createServerClient and supabase.auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/auth")
  ) {
    // If no user is authenticated, redirect to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  if (user) {
    // Fetch the user's role from your database or Supabase
    const { data: userData } = await supabase
      .from("users") // assuming your user roles are stored in the 'users' table
      .select("role")
      .eq("id", user.id)
      .single();

    const role = userData?.role;

    if (role) {
      const allowedRoutes = roleBasedRoutes[role] || [];
      if (!allowedRoutes.includes(request.nextUrl.pathname)) {
        // If the user tries to access a route not allowed for their role, redirect them
        const url = request.nextUrl.clone();
        url.pathname = allowedRoutes[0] || "/forms-page"; // Redirect to the first allowed route
        return NextResponse.redirect(url);
      }
    }
  }

  // Return the supabaseResponse object as it is
  return supabaseResponse;
}
