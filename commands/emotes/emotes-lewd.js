const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "lewd",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " is not old enough for that.")
        .setImage('https://c.tenor.com/Tk2xYonmrsEAAAAM/anime-blushing.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}