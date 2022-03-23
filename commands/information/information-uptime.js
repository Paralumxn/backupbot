const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "uptime",
    aliases: [""],
    cooldown: 0,
    description: "Information about uptime of the bot",
    async execute(client, message, args) {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const embed = new MessageEmbed()
        .setTitle("Uptime")
        .addField(`Days:`, `${days}`, true)
        .addField(`Hours:`, `${hours}`, true)
        .addField(`Minutes:`, `${minutes}`, true)
        .addField(`Seconds:`, `${seconds}`, true)
        .setColor('RANDOM')
        .setTimestamp()

        message.reply({embeds: [embed]})
    }
}