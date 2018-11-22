import mongoose from 'mongoose'

const emailRecipientsSchema = new mongoose.Schema({
  name: { type: String, default: '', required: true },
  email: { type: String, default: '', required: true },
  type: { type: String, default: 'to', required: true }
})

export default mongoose.model('emailRecipients', emailRecipientsSchema)
