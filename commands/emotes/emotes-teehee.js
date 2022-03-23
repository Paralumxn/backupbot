const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "teehee",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " c:.")
        .setImage('https://c.tenor.com/-5AUG9ixQZgAAAAM/anime-girl.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}