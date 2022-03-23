const { MessageEmbed } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "daily",
    aliases: [""],
    cooldown: 86400,
    description: "Casino Daily",
    async execute(client, message, args) {
        const amount = 500000
        const user = message.author

        economy.findOneAndUpdate({
            guildID: message.guild.id,
            userID: user.id
        }, {$inc: {wallet: amount}}, async (err, data) => {
            if(data) {
                data.wallet += amount
                data.save()
                message.channel.send(`You claimed your daily coins worth of $${amount.toLocaleString()}`)
            } else {
                return message.channel.send("Looks like you dont have any records yet. Create your account now by typing `.start`")
            }
        })  
    }
}