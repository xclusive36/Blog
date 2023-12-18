import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  userID: { type: String, required: true, trim: true },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: { type: String, required: false, trim: true },
  imageURL: { type: String, required: false, trim: true },
  imageAlt: { type: String, required: false, trim: true },
  date: { type: Date, required: true, trim: true },
  slug: { type: String, required: true, trim: true },
  introduction: { type: String, required: false, trim: true },
  content: { type: String, required: true, trim: true },
  approved: { type: Boolean, required: true, default: false },
});

export const Blog = model("Blog", blogSchema);
