import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: Request): Promise<NextResponse> {
  const token = (await cookies()).get("access_token");
  const isAuthenticated = token ? "true" : "false";
  console.log("from middelware ", isAuthenticated);
  console.log("from middelware token", token?.value);
  const response = NextResponse.next();
  response.cookies.set("isAuthenticated", isAuthenticated);

  return response;
}

export const config = {
  matcher: "/",
};
