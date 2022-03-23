const mongoose = require('mongoose')

const report = new mongoose.Schema({
    guildID: { type: String},
    memberID: { type: String },
    reportedID: { type: String },
    reason: { type: Array, default: [] }
})

module.exports = mongoose.model('reportFile', report)