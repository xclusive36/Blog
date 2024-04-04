import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  userID: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true },
  blogID: { type: String, required: true },
  date: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
});

export const Comment = model("Comment", commentSchema);
