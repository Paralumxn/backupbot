const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "punch",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to punch?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " punch " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/SwMgGqBirvcAAAAM/saki-saki-kanojo-mo-kanojo.gif')

        message.channel.send({embeds: [embed]})
    }
}