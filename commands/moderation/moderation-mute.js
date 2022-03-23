const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    name: "mute",
    aliases: [""],
    description: "Mute a Person",

    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("You can't use this command")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("I can't use this command!")

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ") || "No Reason"

        if(!target) return message.reply("Who are you going to mute?")
        if(!target.moderatable) return message.reply("I can't mute this person!")
        
        const embed = new MessageEmbed()
        .setTitle("SLEEP")
        .addField(`Muted:`, `${target}`, true)
        .addField(`Muted by:`, `${message.author}`, true)
        .addField(`Reason:`, `${reason}`)

        let role = message.guild.roles.cache.find(role => role.name === "Muted")
        target.roles.add(role)

        message.channel.send({embeds: [embed]})
    }
}