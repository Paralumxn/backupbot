const { Permissions, MessageEmbed } = require('discord.js')
const modGuild = require('../../Schemas/modlog-guildSchema')

module.exports = {
    name: "enablemodlog",
    aliases: ["enable-modlog"],
    description: "To enable modlog",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("You can't use this command.")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.reply("I can't use this command. Missing Permission")

        modGuild.findOne({
            guildID: message.guild.id
        }, async (data, error) => {
            if(data) {
                data.guildID
                data.save()
            } else {
                new modGuild({
                    guildID: message.guild.id
                }).save()
            }
        })

        const embed = new MessageEmbed()
        .setTitle("MODLOG")
        .setColor('RANDOM')
        .setTimestamp()
        .addField(`Server:`, `${message.guild}`)
        .addField(`Set by: `, `${message.author}`)
        
        message.channel.send({embeds: [embed]})
    }
}