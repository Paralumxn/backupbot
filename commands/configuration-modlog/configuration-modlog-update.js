const { Permissions } = require('discord.js')
const updateModlog = require('../../Schemas/modlogSchema')

module.exports = {
    name: "updatemodlog",
    aliases: ["update-modlog"],
    description: "To update or change modlog channel",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("You can't use this command.")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("I can't use this command. Missing Permission!")

        const channel = message.mentions.channels.first()

        if(!channel) return message.reply("Mention a channel to update modlogs.")

        await updateModlog.findOneAndUpdate({
            guildID: message.guild.id,
            channelID: channel
        })

        message.channel.send(`The modlog has been updated to ${channel}`)
    }
}