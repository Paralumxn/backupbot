const { MessageEmbed, Permissions } = require('discord.js')
const levelEnable = require('../../Schemas/levelEnableSchema')

module.exports = {
    name: "enable-level",
    aliases: ["enablelevel"],
    description: "Enable Level system",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command")

        levelEnable.findOne({
            guildID: message.guild.id,
        }, async(data, err) => {
            if(data) {
                data.guildID
                data.save()
            } else {
                new levelEnable({
                    guildID: message.guild.id,
                }).save()
            }
        })

        message.channel.send("Level system enabled")
    }
}