const { MessageEmbed } = require("discord.js")
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "weekly",
    aliases: [""],
    cooldown: 1000 * 604800,
    description: "Casino Weekly",
    async execute(client, message, args, prefix) {
        const amount = 1000000
        const user = message.author
        economy.findOneAndUpdate({
            guildID: message.guild.id,
            userID: user.id
        }, {$inc: {wallet: amount }}, async(err, data) => {
            if(data) {
                data.wallet += amount
                data.save()
                message.channel.send(`You claimed your weekly coins worth of $${amount.toLocaleString()}`)
            } else {
                return message.channel.send(`Looks like you dont have any records yet. Create your account now by typing \`${prefix}start\``)
            }
        })
    }
}