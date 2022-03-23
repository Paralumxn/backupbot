const mongoose = require('mongoose')

const welcome = new mongoose.Schema({
    guildID: { type: String },
    channelID: { type: String }
})

module.exports = mongoose.model('WELCOME', welcome)