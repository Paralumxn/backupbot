const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "highfive",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to highfive?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " highfive " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/ch1kq7TOxlkAAAAS/anime-highfive.gif')

        message.channel.send({embeds: [embed]})
    }
}