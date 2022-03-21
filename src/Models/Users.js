import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    links: [
      {
        type: String,
        ref: "links",
      },
    ],
  },
  { versionKey: false }
);

export default model("users", userSchema);
