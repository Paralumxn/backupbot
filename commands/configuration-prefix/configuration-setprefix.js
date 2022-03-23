const newPrefix = require('../../Schemas/setPrefix')
const { Permissions } = require('discord.js')

module.exports = {
    name: "setprefix",
    aliases: ["set-prefix"],
    description: "To set a new prefix",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command.")
        
        const settingprefix = args[0]
        if(!settingprefix) return message.reply("Provide a new prefix")
        if(settingprefix.length > 5) return message.reply("This prefix is too long, max 5 characters only.")

        newPrefix.findOne({
            guildID: message.guild.id,
            Prefix: settingprefix
        }, async (data, err) => {
            if(data) {
                data.Prefix
                data.save()
            } else {
                new newPrefix({
                    guildID: message.guild.id,
                    Prefix: settingprefix
                }).save()
            }
        })

        message.channel.send(`The prefix is set as ${settingprefix}`)
    }
}