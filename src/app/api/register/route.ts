import Page, { IUser, User } from "@/models/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password, slug } = (await req.json()) as IUser;
  const formattedSlug = slug
    .replace(/^\s+|\s+$|\s+/g, "-")
    .replace(/^-+|-+$/g, "");
  const user = await User.create({
    name,
    email,
    password,
    slug: formattedSlug,
  });

  await Page.create({
    title: "Untitled Page",
    slug: user.slug,
    blocks: [],
  });

  return NextResponse.json({ success: true, data: user }, { status: 201 });
}
