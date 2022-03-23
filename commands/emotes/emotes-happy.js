const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "happy",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " is happy.")
        .setImage('https://c.tenor.com/LMxwdxg5Ba8AAAAM/gabriel-dropout.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}