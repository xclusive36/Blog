import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  userID: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true },
  blogID: { type: String, required: true },
  commentID: { type: String, required: false },
  parentCommentID: { type: String, required: false },
  date: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
  votes: [
    {
      userID: { type: String, required: true },
      voteNumber: { type: Number, required: true },
    },
  ],
  voteTotal: { type: Number, default: 1 },
});

export const Comment = model("Comment", commentSchema);
