const { Permissions } = require('discord.js')
const setPrefix = require('../../Schemas/setPrefix')

module.exports = {
    name: "deleteprefix",
    aliases: ["delete-prefix"],
    description: "To delete generated prefix",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("I can't use this command. Missing Permission!")

        await setPrefix.findOneAndRemove({
            guildID: message.guild.id
        })

        message.channel.send("Registered prefix deleted.")
    }
}