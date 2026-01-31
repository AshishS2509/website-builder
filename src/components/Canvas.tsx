"use client";
import { Block } from "@/types/builder";
import { BlockRenderer } from "./BlockRenderer";
import { BlockMenu } from "./BlockMenu";
import { BlockType } from "@/types/builder";

interface CanvasProps {
  blocks: Block[];
  selectedBlockId: string | null;
  isPreview: boolean;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onAddBlock: (type: BlockType) => void;
}

export function Canvas({
  blocks,
  selectedBlockId,
  isPreview,
  onSelect,
  onUpdate,
  onDelete,
  onAddBlock,
}: CanvasProps) {
  return (
    <div className="flex-1 overflow-auto" onClick={() => onSelect(null)}>
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div
          className="bg-block rounded-2xl border border-block-border shadow-block p-8 min-h-[60vh] bg-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {blocks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Start Building
              </h3>
            </div>
          ) : (
            <div className="space-y-1">
              {blocks.map((block) => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  isSelected={selectedBlockId === block.id}
                  isPreview={isPreview}
                  onSelect={() => onSelect(block.id)}
                  onUpdate={(content) => onUpdate(block.id, content)}
                  onDelete={() => onDelete(block.id)}
                />
              ))}
            </div>
          )}

          {!isPreview && <BlockMenu onAdd={onAddBlock} />}
        </div>
      </div>
    </div>
  );
}
