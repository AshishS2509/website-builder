import { useState, useCallback } from "react";
import { Block, BlockType, PageState } from "@/types/builder";

const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultContent: Record<BlockType, string> = {
  heading: "Your Heading",
  text: "Start typing your paragraph here...",
  image:
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  button: "Click Me",
  divider: "",
};

const initialState: PageState = {
  title: "Untitled Page",
  blocks: [
    { id: generateId(), type: "heading", content: "Welcome to Your Page" },
    {
      id: generateId(),
      type: "text",
      content:
        "This is your website builder. Add blocks, edit content, and create something amazing.",
    },
  ],
};

export function useBuilder() {
  const [state, setState] = useState<PageState>(initialState);
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

  return {
    state,
    selectedBlockId,
    setSelectedBlockId,
    isPreview,
    setIsPreview,
    addBlock,
    updateBlock,
    deleteBlock,
    updateTitle,
  };
}
