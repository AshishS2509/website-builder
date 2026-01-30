"use client";
import { Toolbar } from "./Toolbar";
import { Canvas } from "./Canvas";
import { Block, BlockType, PageState } from "@/types/builder";
import { useCallback, useEffect, useState } from "react";

const defaultContent: Record<BlockType, string> = {
  heading: "Your Heading",
  text: "Start typing your paragraph here...",
  image:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  button: "Click Me",
  divider: "",
};

const generateId = () => Math.random().toString(36).substring(2, 9);

export function Builder({ config }: { config: PageState }) {
  const [state, setState] = useState<PageState>(config);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const addBlock = useCallback((type: BlockType) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: defaultContent[type],
    };
    setState((prev) => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
    }));
    setSelectedBlockId(newBlock.id);
  }, []);

  const updateBlock = useCallback((id: string, content: string) => {
    setState((prev) => ({
      ...prev,
      blocks: prev.blocks.map((block) =>
        block.id === id ? { ...block, content } : block,
      ),
    }));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((block) => block.id !== id),
    }));
    setSelectedBlockId(null);
  }, []);

  const updateTitle = useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }));
  }, []);

  console.log(state);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toolbar
        title={state.title}
        isPreview={isPreview}
        blockCount={state.blocks.length}
        onTitleChange={updateTitle}
        onTogglePreview={() => setIsPreview(!isPreview)}
        state={state}
      />
      <Canvas
        blocks={state.blocks}
        selectedBlockId={selectedBlockId}
        isPreview={isPreview}
        onSelect={setSelectedBlockId}
        onUpdate={updateBlock}
        onDelete={deleteBlock}
        onAddBlock={addBlock}
      />
    </div>
  );
}
