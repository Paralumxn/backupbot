const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "cry",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " cried.")
        .setImage('https://c.tenor.com/r0XjQL8Fd5MAAAAM/crying-sad.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}