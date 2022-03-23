const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    name: "moderators-poll",
    aliases: ["m-poll"],
    cooldown: 0,
    description: "Moderation Poll",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("You can't use this command.")

        const channel = message.mentions.channels.first()
        const words = args.slice(1).join(" ")

        if(!channel) return message.reply("Mention a channel that you would to lunch a poll")
        if(!words) return message.reply("What do you want to say in your poll?")

        const embed = new MessageEmbed()
        .setTitle("New poll added")
        .setDescription(words)
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter({text: `${message.author.username}`})

        channel.send({embeds: [embed]})
    }
}