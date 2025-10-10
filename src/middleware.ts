import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: Request): Promise<NextResponse> {
  const token = (await cookies()).get("access_token");
  const isAuthenticated = token ? "true" : "false";

  const response = NextResponse.next();
  response.cookies.set("isAuthenticated", isAuthenticated);

  return response;
}

export const config = {
  matcher: "/",
};
