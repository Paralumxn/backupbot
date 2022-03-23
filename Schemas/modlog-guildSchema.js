const mongoose = require('mongoose')

const modGuild = new mongoose.Schema({
    guildID: { type: String }
})

module.exports = mongoose.model('modGuilds', modGuild)