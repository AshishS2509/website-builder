import mongoose, { Schema, Document, Model } from "mongoose";

/* ---------- Types ---------- */
export interface Block {
  id: string;
  type: "heading" | "text";
  slug: string;
  content: string;
}

export interface PageDocument extends Document {
  title: string;
  slug: string;
  blocks: Block[];
  createdAt: Date;
  updatedAt: Date;
}

/* ---------- Schemas ---------- */
const BlockSchema = new Schema<Block>(
  {
    id: { type: String, required: true },
    slug: { type: String, required: true },
    type: {
      type: String,
      enum: ["heading", "text"],
      required: true,
    },
    content: { type: String, required: true },
  },
  { _id: false },
);

const PageSchema = new Schema<PageDocument>(
  {
    title: { type: String, default: "Untitled Page" },
    slug: { type: String, required: true, unique: true },
    blocks: { type: [BlockSchema], default: [] },
  },
  { timestamps: true },
);

/* ---------- Model ---------- */
const Page: Model<PageDocument> =
  mongoose.models.Page || mongoose.model<PageDocument>("Page", PageSchema);

export default Page;
