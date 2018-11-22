import configModel from '../schemas/adminConfig'

class ConfigController {

    constructor() {
        configModel.updateOne({}, {}, { upsert: true, setDefaultsOnInsert: true })
            .then(() => console.log('init'))
    }

    getConfig() {
        return configModel.findOne({})
    }

    updateConfig(adminConfig) {
        return configModel.replaceOne({}, adminConfig, { upsert: true })
    }

    disableTelegramBot() {
        return configModel.updateOne({}, {
            $set: { 'telegramBot.active': false }
        }, { upsert: true, setDefaultsOnInsert: true })
    }

    activateTelegramBot() {
        return configModel.updateOne({}, {
            $set: { 'telegramBot.active': true }
        }, { upsert: true, setDefaultsOnInsert: true })
    }

}

export default new ConfigController()
