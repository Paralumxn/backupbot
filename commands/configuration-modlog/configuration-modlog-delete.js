const { Permissions } = require('discord.js')
const deleteModlog = require('../../Schemas/modlogSchema')

module.exports = {
    name: "deletemodlog",
    aliases: ["delete-modlog"],
    description: "To delete current modlog channel",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("You can't use this command!")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("I can't use this command. Missing Permission!")

        await deleteModlog.findOneAndRemove({
            guildID: message.guild.id,
            messageID: channel
        })

        message.channel.send("Modlog Channel has been deleted.")
    }
}