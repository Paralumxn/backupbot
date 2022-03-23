const { MessageEmbed } = require('discord.js')
const schema = require('../../Schemas/messagesSchema')

module.exports = {
    name: "messages",
    aliases: ['msg'],
    cooldown: 0,
    description: "Information messages",
    async execute(client, message, args) { 

        if(!args[0]) {
            const user = message.author
            const data = await schema.findOne({
                guildID: message.guild.id,
                memberID: user.id
            })

            if(!data) {
                return message.reply("You don't have any records yet.")
            }
            
            const embed = new MessageEmbed()
            .setAuthor({iconURL: `${user.avatarURL()}`,name: `${user.tag}`})
            .addField(`Member:`, `${user}`, true)
            .addField(`Message Count:`, `${data.messageCount.toLocaleString() || "0"}`, true)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else {
            let target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            const data = await schema.findOne({
                guildID: message.guild.id,
                memberID: target.id
            })

            if(!target) {
                return message.reply("I cant find this person")
            }

            if(!data) {
                return message.reply("This person doesn't have any records yet")
            }

            const embed = new MessageEmbed()
            .setAuthor({iconURL: `${target.user.avatarURL()}`,name: `${target.user.tag}`})
            .addField(`Member:`, `${target}`, true)
            .addField(`Message Count:`, `${data.messageCount || "0"}`, true)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        }
    }
}