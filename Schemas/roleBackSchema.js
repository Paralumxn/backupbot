const mongoose = require('mongoose')

const roleback = new mongoose.Schema({
    guildID: { type: String }
})

module.exports = mongoose.model('enableRoleBack', roleback)