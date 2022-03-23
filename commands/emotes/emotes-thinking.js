const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "thinking",
    aliases: [""],
    description: "emotes",
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " is thinking.")
        .setImage('https://c.tenor.com/eAqD-5MDzFAAAAAM/mai-sakurajima-sakurajima-mai.gif')
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({embeds: [embed]});
    }
}