const mongoose = require('mongoose')

const afkSchema = new mongoose.Schema({
    guildID: { type: String },
    userID: { type: String },
    AFK_Reason: { type: String, default: null },
    AFK: { type: Boolean, default: false }
})

module.exports = mongoose.model('afkList', afkSchema)