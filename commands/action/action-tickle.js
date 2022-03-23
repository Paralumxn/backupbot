const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "tickle",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to tickle?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " tickle " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/PXL1ONAO9CEAAAAM/tickle-laugh.gif')

        message.channel.send({embeds: [embed]})
    }
}