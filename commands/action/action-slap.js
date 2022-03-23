const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "slap",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to slap?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " slap " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/rVXByOZKidMAAAAd/anime-slap.gif')

        message.channel.send({embeds: [embed]})
    }
}