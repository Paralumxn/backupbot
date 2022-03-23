const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "kill",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to kill?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " kill " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/py184W4488kAAAAM/anime.gif')

        message.channel.send({embeds: [embed]})
    }
}