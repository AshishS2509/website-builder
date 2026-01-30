export type BlockType = "heading" | "text" | "image" | "button" | "divider";

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  props?: Record<string, unknown>;
}

export interface PageState {
  blocks: Block[];
  title: string;
}
