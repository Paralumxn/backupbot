const { Permissions } = require('discord.js')
const delModlog = require('../../Schemas/modlog-guildSchema')

module.exports = {
    name: "disablemodlog",
    aliases: ["disable-modlog"],
    description: "To disable Modlog",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("You can't use this command.")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("I can't use this command. Missing Permission")

        await delModlog.findOneAndRemove({
            guildID: message.guild.id
        })

        message.channel.send("Modlog Disabled")
    }
}