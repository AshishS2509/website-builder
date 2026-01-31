import mongoose, { Schema, Document, Model } from "mongoose";

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

const Page: Model<PageDocument> =
  mongoose.models.Page || mongoose.model<PageDocument>("Page", PageSchema);

export default Page;

export interface IUser extends Document {
  slug: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
