import { BlockRenderer } from "@/components/BlockRenderer";
import { getServerConfig } from "@/lib/server-config";

export default async function Home() {
  const config = await getServerConfig();
  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="bg-block rounded-2xl border border-block-border shadow-block p-8 min-h-[60vh] bg-gray-700">
          <div className="space-y-1">
            {config.page.blocks.map((block) => (
              <BlockRenderer key={block.id} block={block} isPreview={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
