const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "bite",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to bite?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " bite " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/n0DPyBDtZHgAAAAM/anime-bite.gif')

        message.channel.send({embeds: [embed]})
    }
}