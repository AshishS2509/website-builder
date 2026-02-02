import { connectDB } from "@/lib/mongodb";
import Page from "@/models/schema";
import { redirect } from "next/navigation";

const SLUG = process.env.SLUG as string;

export async function getServerConfig() {
  await connectDB();

  if (!SLUG) {
    redirect("/register");
  }

  const page = await Page.findOne({ slug: SLUG });

  if (!page) {
    throw new Error(`No page found for slug: ${SLUG}`);
  }

  return {
    page: { ...page.toObject(), _id: page._id.toString() },
  };
}

export type ServerConfig = Awaited<ReturnType<typeof getServerConfig>>;
