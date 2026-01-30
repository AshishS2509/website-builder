import { connectDB } from "@/lib/mongodb";
import Page from "@/models/schema";

const SLUG = process.env.SLUG as string;

if (!SLUG) {
  throw new Error("SLUG env variable is missing");
}

export async function getServerConfig() {
  await connectDB();

  const page = await Page.findOne({ slug: SLUG });

  if (!page) {
    throw new Error(`No page found for slug: ${SLUG}`);
  }

  return {
    page: { ...page.toObject(), _id: page._id.toString() },
  };
}

export type ServerConfig = Awaited<ReturnType<typeof getServerConfig>>;
