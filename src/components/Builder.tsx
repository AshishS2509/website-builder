"use client";
import { Toolbar } from "./Toolbar";
import { Canvas } from "./Canvas";
import { useBuilder } from "@/hooks/useBuilder";

export function Builder() {
  const {
    state,
    selectedBlockId,
    setSelectedBlockId,
    isPreview,
    setIsPreview,
    addBlock,
    updateBlock,
    deleteBlock,
    updateTitle,
  } = useBuilder();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Toolbar
        title={state.title}
        isPreview={isPreview}
        blockCount={state.blocks.length}
        onTitleChange={updateTitle}
        onTogglePreview={() => setIsPreview(!isPreview)}
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
