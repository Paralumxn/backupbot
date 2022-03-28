const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "unlock",
    description: "Moderation Lockdown",
    usage: "unlock",
    cooldown: 0,
    aliases: [""],
    async execute(client, message, args) {
        message.channel.permissionOverwrites.edit(message.guild.id, {
            SEND_MESSAGES: null
        })
        const reason = args.slice(0).join(" ") || "No reason given."

        const embed = new MessageEmbed()
        .setDescription("Channel has been unlocked.")
        .addField("Reason:", `${reason}`)
        .setColor('RANDOM')
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}