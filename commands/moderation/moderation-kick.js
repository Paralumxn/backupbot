const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    name: "kick",
    aliases: [""],
    description: "Kick a person",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("You can't use this command")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("I can't use this command!")

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ") || "No Reason"

        if(!target) return message.reply("Who are you going to kick?")
        if(!target.kickable) return message.reply("I can't kick this person!")
        const embed = new MessageEmbed()
        .setTitle("PHOENIX KICK")
        .addField(`Kicked:`, `${target}`, true)
        .addField(`Kicked by:`, `${message.author}`, true)
        .addField(`Reason:`, `${reason}`)

        message.channel.send({embeds: [embed]})
        await message.guild.members.kick(target)
    }
}