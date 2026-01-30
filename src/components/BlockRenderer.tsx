'use client'
import { Block } from "@/types/builder";
import { cn } from "@/lib/utils";

interface BlockRendererProps {
  block: Block;
  isSelected: boolean;
  isPreview: boolean;
  onSelect: () => void;
  onUpdate: (content: string) => void;
  onDelete: () => void;
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
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
            className="text-3xl font-bold text-foreground outline-none focus:ring-2 focus:ring-primary/20 rounded px-1"
          >
            {block.content}
          </h2>
        );
      case "text":
        return (
          <p
            contentEditable={!isPreview}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
            className="text-base text-muted-foreground leading-relaxed outline-none focus:ring-2 focus:ring-primary/20 rounded px-1"
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
              className="w-full max-w-2xl rounded-lg object-cover"
            />
            {!isPreview && (
              <input
                type="text"
                value={block.content}
                onChange={(e) => onUpdate(e.target.value)}
                placeholder="Image URL"
                className="absolute bottom-2 left-2 right-2 px-3 py-1.5 text-sm bg-block/90 backdrop-blur border border-block-border rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              />
            )}
          </div>
        );
      case "button":
        return (
          <button
            contentEditable={!isPreview}
            suppressContentEditableWarning
            onBlur={(e) => onUpdate(e.currentTarget.textContent || "")}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity outline-none"
          >
            {block.content}
          </button>
        );
      case "divider":
        return <hr className="border-t border-border my-2" />;
      default:
        return null;
    }
  };

  if (isPreview) {
    return <div className="py-3">{renderContent()}</div>;
  }

  return (
    <div
      //   ref={setNodeRef}
      //   style={style}
      //   initial={{ opacity: 0, y: 10 }}
      //   animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative flex items-start gap-2 py-2 px-3 rounded-lg transition-all",
        isSelected && "bg-block-hover ring-2 ring-primary/30",
        !isSelected && "hover:bg-block-hover/50",
      )}
      onClick={onSelect}
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
          onDelete();
        }}
        className="mt-1 p-1.5 opacity-0 group-hover:opacity-60 hover:opacity-100! hover:bg-destructive/10 hover:text-destructive rounded transition-all"
      >
        Delete
      </button>
    </div>
  );
}
