const { MessageEmbed } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "beg",
    aliases: [""],
    cooldown: 1800000,
    description: "Casino Beg",
    async execute(client, message, args, prefix) {

        let RN = Math.floor(Math.random() * 100) + 1
        if(RN > 50) {
            const min = 10000
            const max = 15000
            const user = message.author

            let amount = Math.floor(Math.random() * (max - min + 1) + min)

            economy.findOneAndUpdate({
                guildID: message.guild.id,
                userID: user.id
            }, {$inc: {wallet: amount}}, async(err, data) => {
                if(data) {
                    data.wallet += amount
                    data.save()
                    message.channel.send(user.username + ` begged and obtained $${amount.toLocaleString()}.`)
                } else {
                    return message.channel.send(`Looks like you dont have any records yet. Create your account now by typing \`${prefix}start\``)
                }
            })
        } else {
            message.channel.send("You failed to beg.")
        }
    }
}