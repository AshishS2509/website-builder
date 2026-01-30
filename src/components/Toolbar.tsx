"use client";
import { cn } from "@/lib/utils";
import { PageState } from "@/types/builder";

interface ToolbarProps {
  title: string;
  isPreview: boolean;
  blockCount: number;
  onTitleChange: (title: string) => void;
  onTogglePreview: () => void;
  state: PageState;
}

export function Toolbar({
  title,
  isPreview,
  blockCount,
  onTitleChange,
  onTogglePreview,
  state,
}: ToolbarProps) {
  return (
    <header className="sticky top-0 z-20 bg-toolbar border-b border-block-border shadow-toolbar backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              =
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="text-lg font-semibold bg-transparent border-none outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1"
            />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm">
            <span className="font-medium">{blockCount}</span>
            <span className="text-muted-foreground">blocks</span>
          </div>
        </div>

        <button
          onClick={onTogglePreview}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
            isPreview
              ? "bg-indigo-700 text-primary-foreground"
              : "bg-amber-700 text-secondary-foreground hover:bg-secondary/80",
          )}
        >
          {isPreview ? (
            <>
              <span className="hidden sm:inline">Edit</span>
            </>
          ) : (
            <>
              <span className="hidden sm:inline">Preview</span>
            </>
          )}
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors"
          onClick={async () => {
            const resp = await fetch("/api/pages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                title: state.title,
                slug: state.slug,
                blocks: state.blocks,
              }),
            });
            const data = (await resp.json()) as { success: boolean };
            if (data.success) {
              alert("Page published successfully!");
            } else {
              alert("Failed to publish the page.");
            }
          }}
        >
          Publish
        </button>
      </div>
    </header>
  );
}
