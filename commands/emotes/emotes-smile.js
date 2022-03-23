const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "smile",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " smiled.")
        .setImage('https://c.tenor.com/H7KcvGa568gAAAAM/dance-blush.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}