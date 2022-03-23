const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "kiss",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to kiss?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " kiss " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/03wlqWILqpEAAAAS/highschool-dxd-asia.gif')

        message.channel.send({embeds: [embed]})
    }
}