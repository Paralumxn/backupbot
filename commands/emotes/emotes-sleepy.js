const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "sleepy",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " is sleepy.")
        .setImage('https://c.tenor.com/re9a71mA5xwAAAAM/nogamenolife-shiro.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}