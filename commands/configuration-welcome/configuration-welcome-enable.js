const { MessageEmbed, Permissions } = require('discord.js')
const welcomeChannel = require('../../Schemas/welcomeSchema')

module.exports = {
    name: "enable-welcome",
    aliases: ["enablewelcome"],
    description: "To enable welcome banner",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command.")
        const channel = message.mentions.channels.first()
        if(!channel)return message.reply("Mention a channel.")

        welcomeChannel.findOne({
            guildID: message.guild.id,
            channelID: channel.id
        }, async(error, data) => {
            if(data) {
                data.channelID
                data.save()
            } else {
                new welcomeChannel({
                    guildID: message.guild.id,
                    channelID: channel.id
                }).save()
            }
        })

        message.channel.send("Welcome System Enabled.")
    }
}