const mongoose = require('mongoose')

const levelEnable = new mongoose.Schema({
    guildID: { type: String }
})

module.exports = mongoose.model('EnabledLevel', levelEnable)