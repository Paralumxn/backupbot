const { MessageEmbed, Permissions } = require('discord.js')
const disableroleback = require('../../Schemas/roleBackSchema')

module.exports = {
    name: "disableroleback",
    aliases: ["disable-roleback"],
    description: "To disable roleback.",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command")

        await disableroleback.findOneAndRemove({
            guildID: message.guild.id
        })

        message.channel.send("Role back system disabled.")
    }
}