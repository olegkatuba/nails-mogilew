import mongoose from "mongoose";

const telegramRecipientsSchema = new mongoose.Schema({
  id: { type: Number, default: 0, required: true },
  firstName: { type: String },
  lastName: { type: String },
  photoUrl: { type: String }
});

export default mongoose.model("telegramRecipients", telegramRecipientsSchema);
