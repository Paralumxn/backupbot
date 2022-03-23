const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "holdinghands",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to holding hands?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " holding hands " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/-76rfR0BNTAAAAAM/anime-couple-hand-holding.gif')

        message.channel.send({embeds: [embed]})
    }
}