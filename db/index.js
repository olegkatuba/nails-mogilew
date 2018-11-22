import mongoose from 'mongoose'
import config from './config.json'

mongoose.Promise = global.Promise

const connectionUrl = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.name}`

mongoose.connect(connectionUrl, { useNewUrlParser: true })
    .catch(err => console.error(err))

let db = mongoose.connection;

db.on('connected', () => console.log(`Mongoose connection opened on ${connectionUrl}`));

db.on('error', err => console.error(err));

db.on('disconnected', () => console.log('Disconnected'));

process.on('SIGINT', () => {
    db.close(() => {
        console.log('Disconnected')
        process.exit()
    })
})