const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "greet",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to greet?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " greet " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/uGN3n2O03GIAAAAS/anime-wave.gif')

        message.channel.send({embeds: [embed]})
    }
}