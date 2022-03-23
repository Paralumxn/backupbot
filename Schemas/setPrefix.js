const mongoose = require('mongoose')

const prefix = new mongoose.Schema({
    guildID: { type: String },
    Prefix: { type: String },
})

module.exports = mongoose.model('Prefixes', prefix)