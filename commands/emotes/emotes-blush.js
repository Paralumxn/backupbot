const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "blush",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " blushed.")
        .setImage('https://c.tenor.com/T51BLj_Cj8cAAAAC/blush.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}