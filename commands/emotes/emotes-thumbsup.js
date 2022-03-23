const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "thumbsup",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " thumbs up!.")
        .setImage('https://c.tenor.com/LbyT0UNhPfEAAAAM/anime-thumbs-up.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}