const mongoose = require('mongoose')

const cooldown = new mongoose.Schema({
    Guild: { type: String },
    CommandName: { type: String },
    Used: { type: String, default: Date.now() },
    UsedBy: { type: String },
    Cooldown: {type: Number }
})

module.exports = mongoose.model('Cooldown', cooldown)