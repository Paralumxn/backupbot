const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "pat",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to pat?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " pat " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/OGnRVWCps7IAAAAM/anime-head-pat.gif')

        message.channel.send({embeds: [embed]})
    }
}