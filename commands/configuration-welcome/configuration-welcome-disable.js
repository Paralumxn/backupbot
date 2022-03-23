const { MessageEmbed, Permissions } = require('discord.js')
const disableWelcome = require('../../Schemas/welcomeSchema')

module.exports = {
    name: "disablewelcome",
    aliases: ["disable-welcome"],
    description: "To disable welcome system",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command.")

        await disableWelcome.findOneAndRemove({
            guildID: message.guild.id
        })

        message.channel.send("Welcome system disabled.")
    }
}