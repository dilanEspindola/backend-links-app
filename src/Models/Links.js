import { Schema, model } from "mongoose";

const linkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
      ref: "users",
    },
  },
  { versionKey: false }
);

export default model("links", linkSchema);
