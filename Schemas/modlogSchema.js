const mongoose = require('mongoose')

const channel = new mongoose.Schema({
    guildID: { type: String },
    channelID: { type: String },
})

module.exports = mongoose.model('Modlog', channel)