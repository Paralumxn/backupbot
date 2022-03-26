const mongoose = require('mongoose')

const marriage = new mongoose.Schema({
    guildID: { type: String },
    memberID: { type: String },
    userID: { type: String }
})

module.exports = mongoose.model("MarriageList", marriage)