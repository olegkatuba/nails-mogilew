import TelegramRecipientsModel from '../schemas/telegramRecipients'
import AdminConfigModel from '../schemas/adminConfig'

class TelegramRecipientsController {

    getTelegramRecipients() {
      return TelegramRecipientsModel.find()
    }

    getTelegramRecipient(id) {
      return TelegramRecipientsModel.find({ id })
    }
    
    addTelegramRecipient(recipient) {
      return new TelegramRecipientsModel(recipient).save()
    }

    deleteTelegramRecipient(recipientId) {
      return TelegramRecipientsModel.deleteOne({ id: recipientId })
    }

    disableTelegramBot() {
        return AdminConfigModel.updateOne({}, {
            $set: { 'telegramBot.active': false }
        }, { upsert: true, setDefaultsOnInsert: true })
    }

    activateTelegramBot() {
        return AdminConfigModel.updateOne({}, {
            $set: { 'telegramBot.active': true }
        }, { upsert: true, setDefaultsOnInsert: true })
    }

}

export default new TelegramRecipientsController()
