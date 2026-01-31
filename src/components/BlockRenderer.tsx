"use client";
import { Block } from "@/types/builder";
import { cn } from "@/lib/utils";

interface BlockRendererProps {
  block: Block;
  isSelected?: boolean;
  isPreview: boolean;
  onSelect?: () => void;
  onUpdate?: (content: string) => void;
  onDelete?: () => void;
}

export function BlockRenderer({
  block,
  isSelected,
  isPreview,
  onSelect,
  onUpdate,
  onDelete,
}: BlockRendererProps) {
  const renderContent = () => {
    switch (block.type) {
      case "heading":
        return (
          <h2
            contentEditable={!isPreview}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.(e.currentTarget.textContent || "")}
            className="text-3xl font-semibold tracking-tight text-foreground outline-none rounded-md px-1 focus-visible:ring-2 focus-visible:ring-primary/30"
          >
            {block.content}
          </h2>
        );
      case "text":
        return (
          <p
            contentEditable={!isPreview}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.(e.currentTarget.textContent || "")}
            className="text-base leading-7 text-muted-foreground outline-none rounded-md px-1 focus-visible:ring-2 focus-visible:ring-primary/20"
          >
            {block.content}
          </p>
        );
      case "image":
        return (
          <div className="relative group">
            <img
              src={block.content}
              alt="Block image"
              className="w-full rounded-xl object-cover border border-border shadow-sm"
            />
            {!isPreview && (
              <div className=" absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-all">
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => onUpdate?.(e.target.value)}
                  placeholder="Image URL"
                  className="absolute bottom-2 left-2 right-2 px-3 py-1.5 text-sm bg-block/90 backdrop-blur border border-block-border rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            )}
          </div>
        );
      case "button":
        return (
          <button
            contentEditable={!isPreview}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate?.(e.currentTarget.textContent || "")}
            className=" bg-blue-600 inline-flex items-center justify-center px-6 py-2.5 bg-primary text-primary-foreground font-medium text-sm rounded-lg shadow-sm hover:shadow-md hover:opacity-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {block.content}
          </button>
        );
      case "divider":
        return <hr className="my-4 border-t border-border/70" />;
      default:
        return null;
    }
  };

  if (isPreview) {
    return <div className="py-3">{renderContent()}</div>;
  }

  return (
    <div
      onClick={onSelect}
      className={cn(
        "group relative flex items-start gap-3",
        "py-2 px-3 rounded-xl",
        "transition-all duration-150",
        "hover:-translate-y-px",
        isSelected
          ? "bg-accent/20 shadow-sm ring-1 ring-primary/30"
          : "hover:bg-accent/10",
      )}
    >
      {/* <div
        {...attributes}
        {...listeners}
        className="mt-1 p-1 cursor-grab opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity"
      >
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div> */}

      <div className="flex-1 min-w-0">{renderContent()}</div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
        className="text-red-600 mt-1 p-1.5 rounded-md text-muted-foreground opacity-0 group-hover:opacity-60 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all"
      >
        Delete
      </button>
    </div>
  );
}
