const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "avatar",
    aliases: [""],
    cooldown: 0,
    description: "Information Avatar",
    async execute(client, message, args) {
        if(!args[0]) {
            const user = message.author
            const embed = new MessageEmbed()
            .setDescription(`${user.username}`)
            .setImage(`${user.displayAvatarURL({size: 4096, dynamic: true})}`)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter({text: `Requested by: ${user.username}`})

            message.channel.send({ embeds: [embed] })
        } else if(args[0] === 'random') {
            const member = message.guild.members.cache.random()
            const embed = new MessageEmbed()
            .setDescription(`${member.user.username}`)
            .setImage(`${member.displayAvatarURL({size: 4096, dynamic: true})}`)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter({text: `Requested by: ${message.author.username}`})

            message.channel.send({embeds: [embed]})
        } else {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            
            if(!member) {
                return message.reply("I can't find this user, or doesn't exist.")
            }
            
            const embed = new MessageEmbed()
            .setDescription(`${member.user.username}`)
            .setImage(`${member.displayAvatarURL({size: 4096, dynamic: true})}`)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter({text: `Requested by: ${message.author.username}`})

            message.channel.send({embeds: [embed]})
        }
    }
}