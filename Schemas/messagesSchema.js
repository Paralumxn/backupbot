const mongoose = require('mongoose')

const messages = new mongoose.Schema({
    guildID: { type: String },
    memberID: { type: String },
    messageCount: { type: Number, default: 0 },
})

module.exports = mongoose.model('messageCounts', messages)