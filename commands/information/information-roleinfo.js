const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: "role-info",
    aliases: ["roleinfo"],
    description: "Information about the role",
    cooldown: 0,
    async execute(client, message, args) {
        const role = message.mentions.roles.first() || message.guild.roles.cache.find(role => role.id == args[0])

        const embed = new MessageEmbed()
        .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
        .setTitle('Wrong Syntax')
        .setColor('RANDOM')
        .setTimestamp()

        if(!role) return message.reply({embeds: [embed]})
        const members = message.guild.members.cache.filter(member => member.roles.cache.has(role.id)).map(member => member.id);

        const embed1 = new MessageEmbed()
        .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
        .addField(`Role:`, `${role}`, true)
        .addField(`Role Created Time:`, `${moment(role.createdAt).format('ddd, MMM Do, YYYY, h:mm a')}`, true)
        .addField(`Members with this role:`, `${members?.length}`, true)
        .setColor('RANDOM')
        .setTimestamp()

        message.channel.send({embeds: [embed1]})
    }
}