const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "triggered",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " triggered.")
        .setImage('https://c.tenor.com/l0wdYHb_M9kAAAAM/triggered-anime.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}