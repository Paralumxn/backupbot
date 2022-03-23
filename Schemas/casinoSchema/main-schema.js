const mongoose = require('mongoose');

const ecoSchema = new mongoose.Schema({
    guildID: { type: String },
    userID: { type: String },
    userName: { type: String },
    wallet: { type: Number, default: 0 },
    bank: { type: Number, default: 0 }
    
})

module.exports = mongoose.model("economy-main", ecoSchema);