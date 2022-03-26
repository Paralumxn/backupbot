const mongoose = require('mongoose')

const Allow = new mongoose.Schema({
    guildID: { type: String },
    userID: { type: String },
})

module.exports = mongoose.model("MarriageAllowed", Allow)