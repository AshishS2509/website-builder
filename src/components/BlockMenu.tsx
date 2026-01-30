'use client'
import { cn } from "@/lib/utils";
import { BlockType } from "@/types/builder";
import { useState } from "react";

interface BlockMenuProps {
  onAdd: (type: BlockType) => void;
}

const blockOptions: { type: BlockType; label: string }[] = [
  { type: "heading", label: "Heading" },
  { type: "text", label: "Text" },
  { type: "image", label: "Image" },
  { type: "button", label: "Button" },
  { type: "divider", label: "Divider" },
];

export function BlockMenu({ onAdd }: BlockMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex justify-center py-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
          "bg-block border border-block-border shadow-block hover:shadow-block-hover",
          isOpen && "bg-primary text-primary-foreground border-primary",
        )}
      >
        {/* <Plus
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-45")}
        /> */}
        <span className="text-sm font-medium">Add Block</span>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 flex gap-2 p-2 bg-toolbar rounded-xl border border-block-border shadow-toolbar z-10">
          {blockOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => {
                onAdd(option.type);
                setIsOpen(false);
              }}
              className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-lg hover:bg-accent transition-colors min-w-18"
            >
              {/* <option.icon className="w-5 h-5 text-foreground" /> */}
              <span className="text-xs text-muted-foreground font-medium">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
