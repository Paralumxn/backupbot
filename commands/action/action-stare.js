const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "stare",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to stare?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " stare " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/W9kzAnY4pQoAAAAd/ram-anime.gif')

        message.channel.send({embeds: [embed]})
    }
}