const mongoose = require('mongoose')

const warnfiles = new mongoose.Schema({
    guildID: { type: String},
    memberID: { type: String },
    reportedID: { type: String },
    reason: { type: Array, default: [] }
})

module.exports = mongoose.model('WarningFiles', warnfiles)