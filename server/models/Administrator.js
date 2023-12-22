import { Schema, model } from "mongoose";

const AdministratorSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
});

export const Administrator = model("Administrator", AdministratorSchema);
