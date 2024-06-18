import mongoose from "mongoose";
const { Schema } = mongoose;

const shortURLScheme = new Schema(
  {
    url: {
      type: String,
      required: true,
      index: true,
    },
    short: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    counter: {
      type: Number,
      default: 0,
    },
    tags: [
      {
        type: String,
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: false,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("short_url", shortURLScheme);
