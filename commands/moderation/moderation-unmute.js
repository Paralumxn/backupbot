const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    name: "unmute",
    aliases: [""],
    description: "Unmute a Person",

    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("You can't use this command")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("I can't use this command!")

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ") || "No Reason"

        if(!target) return message.reply("Who are you going to unmute?")
        if(!target.moderatable) return message.reply("I can't unmute this person!")

        let role = message.guild.roles.cache.find(role => role.name === "Muted")
        target.roles.remove(role)

        const embed = new MessageEmbed()
        .setTitle('SCREAM!')
        .addField(`Unmuted:`, `${target}`, true)
        .addField(`Unmuted by:`, `${message.author}`, true)
        .addField(`Reason:`, `${reason}`)
        .setColor('RANDOM')
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}