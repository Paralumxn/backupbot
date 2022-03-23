const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "hold",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to hold?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " hold " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/RFY9xILOZHUAAAAM/princess-mononoke-hug.gif')

        message.channel.send({embeds: [embed]})
    }
}