const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
    guildID: { type: String },
    items: { type: Array, default: [] }
})

module.exports = mongoose.model("economy-shop", ShopSchema)