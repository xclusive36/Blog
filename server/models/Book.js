import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: { type: String, required: true, trim: true },
});

export const Book = model("Book", bookSchema);
