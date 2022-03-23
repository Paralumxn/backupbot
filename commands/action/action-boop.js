const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "boop",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        const user = message.mentions.users.first() || await message.guild.members.cache.get(args[0])

        if(!user) return message.reply("Who are you going to boop?")
        const embed = new MessageEmbed()
        .setTitle(message.author.username + " booped " + user.username)
    }
}