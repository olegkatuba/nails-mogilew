import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
  telegramBot: { type: Boolean, default: true, required: true },
  email: { type: Boolean, default: true, required: true },
  comments: { type: Boolean, default: true, required: true },
  images: { type: Boolean, default: true, required: true }
});

export default mongoose.model("adminConfig", configSchema);
