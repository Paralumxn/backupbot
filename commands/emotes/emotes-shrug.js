const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "shrug",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " shrugged.")
        .setImage('https://c.tenor.com/0GOwPHgcUj0AAAAM/anime-shrug.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}