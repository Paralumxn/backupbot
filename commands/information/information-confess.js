const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "confession",
    aliases: ["confess"],
    description: "To confess for someone",
    async execute(client, message, args) {
        const target = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
        const conf = args.slice(1).join(" ")
        if(!target) return message.reply("Who do you wanted to confess?")
        if(!conf) return message.reply("What do you like to confess?")
        setTimeout(() => {
            message.delete()
        }, 2000)
        target.send(conf).catch(() => {
            message.channel.send("I can't message. this person").then((err) => {
                setTimeout(() => {
                    err.delete()
                }, 5000)
            })
            
        })     
    }
}