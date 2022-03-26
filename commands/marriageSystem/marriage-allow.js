const { MessageEmbed } = require('discord.js')
const marriage = require('../../Schemas/marriageSystem/allowMarriage')

module.exports = {
    name: "allow-marriage",
    aliases: ["allowmarriage", "allow-marry", "allowmarry"],
    description: "Marriage System",
    usage: "allow-marriage",
    cooldown: 0,
    async execute(client, message, args, prefix) {
        const user = message.author
        marriage.findOne({
            guildID: message.guild.id,
            userID: user.id
        }, async(err, data) => {
            if(data) {
                return message.reply("You already have a record!")
            } else {
                new marriage({
                    guildID: message.guild.id,
                    userID: user.id
                })
                message.reply("You can now marry someone or be married.")
            }
        })
    }
}