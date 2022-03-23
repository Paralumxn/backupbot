const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "wave",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
        
        if(!user) return message.reply("Who are you going to wave?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " wave " + user.username)
        .setColor('RANDOM')
        .setTimestamp()
        .setImage('https://c.tenor.com/UPa7j2Dz3rgAAAAM/wave.gif')

        message.channel.send({embeds: [embed]})
    }
}