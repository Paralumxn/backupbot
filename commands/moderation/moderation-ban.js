const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    name: "ban",
    aliases: [""],
    description: "Ban a Person",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("You can't use this command")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("Sorry, but I can't use this command!")

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ") || "No Reason"

        if(!target) return message.reply("Who are you going to ban?")
        if(!target.bannable) return message.reply("I can't ban this person")

        const embed = new MessageEmbed()
        .setTitle('BAN HAMMER')
        .addField(`Banned:`, `${target}`, true)
        .addField(`Banned by:`, `${message.author}`, true)
        .addField(`Reason:`, `${reason}`)
        .setColor('RANDOM')
        .setTimestamp()

        message.channel.send({embeds: [embed]})
        await target.ban({
            reason: reason
        })
    }
}