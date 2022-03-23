const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "poke",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to poke?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " poke " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('')

        message.channel.send({embeds: [embed]})
    }
}