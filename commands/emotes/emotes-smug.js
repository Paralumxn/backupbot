const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "smug",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " thinks little of you~.")
        .setImage('https://c.tenor.com/p2dWs1LsL_wAAAAM/vampire-anime-girl.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}