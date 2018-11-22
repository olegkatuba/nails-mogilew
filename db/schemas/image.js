import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, default: "/nails-default.png", required: true },
  name: { type: String },
  description: { type: String }
});

export default mongoose.model("image", imageSchema);
