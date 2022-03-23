const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "deredere",
    aliases: ["dere"],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " is inlove ~.")
        .setImage('https://c.tenor.com/11XPK5HEweUAAAAM/koisuru-asteroid-asteroid-in-love.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}