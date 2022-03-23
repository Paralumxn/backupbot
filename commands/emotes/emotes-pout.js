const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "pout",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const { MessageEmbed, Message } = require('discord.js');
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " pouted.")
        .setImage('https://c.tenor.com/yCR6JOoxS6wAAAAM/anime-angry.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}