import { verifyJwt } from "@/app/api/login/route";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "./lib/mongodb";

const PROTECTED_PATHS = ["/api/pages", "/editor", "/api/logout"];

export function proxy(req: NextRequest) {
  connectDB();

  const token = req.cookies.get("token")?.value;

  if (token && req.nextUrl.pathname === "/login") {
    try {
      verifyJwt(token);
      return NextResponse.redirect(new URL("/editor", req.url));
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

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
