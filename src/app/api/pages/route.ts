import { NextRequest, NextResponse } from "next/server";
import Page, { Block } from "@/models/schema";

interface CreatePageBody {
  title?: string;
  slug: string;
  blocks: Block[];
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreatePageBody;

    if (!Array.isArray(body.blocks)) {
      return NextResponse.json(
        { error: "blocks must be an array" },
        { status: 400 },
      );
    }

    const page = await Page.findOneAndUpdate(
      {
        slug: body.slug,
      },
      {
        title: body.title,
        blocks: body.blocks,
      },
      { upsert: true, new: true },
    );

    return NextResponse.json({ success: true, data: page }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save page" }, { status: 500 });
  }
}
