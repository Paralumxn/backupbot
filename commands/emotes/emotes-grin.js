const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "grin",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " grin.")
        .setImage('https://c.tenor.com/8kCSTOFZB3kAAAAM/nagatoro-smile-nagatoro-smirk.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}