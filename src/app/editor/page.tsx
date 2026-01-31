import { Builder } from "@/components/Builder";
import { getServerConfig } from "@/lib/server-config";
import { PageState } from "@/types/builder";

export default async function Home() {
  const config = await getServerConfig();
  return <Builder config={config.page as PageState} />;
}
