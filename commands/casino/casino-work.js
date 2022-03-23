const { MessageEmbed } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "work",
    aliases: [""],
    description: "Casino Work",
    cooldown: 1000 * 30,
    async execute(client, message, args) {

        const min = 10000
        const max = 15000

        let amount = Math.floor(Math.random() * (max - min + 1) + min)
        const member = message.author

        economy.findOneAndUpdate({
            guildID: message.guild.id,
            userID: member.id,
        }, {$inc: {wallet: amount}}, async(err, data) => {
            if(data) {
                data.wallet += amount
                data.save()
                message.channel.send(member.username + ` worked and obtained $${amount.toLocaleString()}.`)
            } else {
                return message.channel.send("Looks like you dont have any records yet. Create your account now by typing `.start`")
            }
            
        })
    }
}