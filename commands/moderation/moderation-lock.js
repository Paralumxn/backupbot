const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "lock",
    description: "Moderation Lockdown",
    usage: "lock",
    cooldown: 0,
    aliases: [""],
    async execute(client, message, args) {
        message.channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: false
        })
        const reason = args.slice(0).join(" ") || "No reason given."

        const embed = new MessageEmbed()
        .setDescription("Channel has been locked.")
        .addField("Reason:", `${reason}`)
        .setColor('RANDOM')
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}