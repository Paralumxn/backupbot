const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "scoff",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " scoffed.")
        .setImage('https://c.tenor.com/cQep850sKJ8AAAAM/hmpf-anime.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}