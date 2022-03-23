const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "snuggle",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to snuggle?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " snuggle " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/4mJqTEl73VwAAAAS/dragon-hug.gif')

        message.channel.send({embeds: [embed]})
    }
}