const mongoose = require('mongoose')

const SuggestionSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    suggestionChannel: { type: String, required: false }
})

module.exports = mongoose.model('SuggestionChannel', SuggestionSchema)