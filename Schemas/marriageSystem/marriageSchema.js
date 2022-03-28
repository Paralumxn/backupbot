const mongoose = require('mongoose')

const marriage = new mongoose.Schema({
    guildID: { type: String },
    memberID: { type: String },
    userID: { type: String },
    status: { type: Boolean, default: true }
})

module.exports = mongoose.model("MarriageList", marriage)