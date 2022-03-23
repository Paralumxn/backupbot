const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "dance",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " dance.")
        .setImage('https://c.tenor.com/2vRn7mgoMRMAAAAS/cute-anime-dance.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}