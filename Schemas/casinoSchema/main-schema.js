const mongoose = require('mongoose');

const ecoSchema = new mongoose.Schema({
    guildID: { type: String },
    userID: { type: String },
    userName: { type: String },
    wallet: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    items: { type: Array, default: [] }
    
})

module.exports = mongoose.model("economy-main", ecoSchema);