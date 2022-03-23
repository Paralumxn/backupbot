const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "wag",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + "'s tail is wagging~.")
        .setImage('https://c.tenor.com/jqnbSlE62aAAAAAM/anime-cute.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}