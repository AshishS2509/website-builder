import { verifyJwt } from "@/app/api/login/route";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/api/pages", "/editor"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isProtected = PROTECTED_PATHS.some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    verifyJwt(token);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
