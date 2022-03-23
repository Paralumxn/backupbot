const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "bully",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to bully?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " bully " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/WK3t25D8fhgAAAAM/bully-mean.gif')

        message.channel.send({embeds: [embed]})
    }
}