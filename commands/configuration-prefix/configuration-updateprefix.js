const { Permissions } = require('discord.js')
const newPrefix = require('../../Schemas/setPrefix')

module.exports = {
    name: "updateprefix",
    aliases: ["update-prefix"],
    description: "To update guild prefix",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command")

        const newprefix = args[0]
        if(!newprefix) return message.reply("Provide a new prefix to update.")
        if(newprefix.length > 5) return message.reply("This prefix is too long, max 5 characters only.")

        await newPrefix.findOneAndUpdate({
            guildID: message.guild.id,
            Prefix: newprefix
        })

        message.channel.send(`Prefix for this guild is updated to ${newprefix}`)
    }
}