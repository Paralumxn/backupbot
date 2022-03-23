const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "hug",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to hug?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " hug " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/SPs0Rpt7HAcAAAAM/chiya-urara.gif')

        message.channel.send({embeds: [embed]})
    }
}