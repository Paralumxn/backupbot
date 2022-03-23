const { MessageEmbed, Permissions } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "temp-mute",
    aliases: [""],
    description: "To temp mute someone",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("You can't use this command.")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return message.reply("I can't use this command.")

        const target = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
        const time = ms(args[1])
        const reason = args.slice(2).join(" ") || "No Reason"
    
        if(!target) return message.reply("Who are you going to temporary mute?")
        if(!time) return message.reply("How long you will temp mute this person?")
        
        const embed = new MessageEmbed()
        .setTimestamp("Shut up.")
        .setColor('RANDOM')
        .setTimestamp()
        .addField(`Temp muted:`, `${target}`, true)
        .addField(`Temp muted by:`, `${message.author}`, true)
        .addField(`Duration:`, `${time}`, true)
        .addField(`Reason:`, `${reason}`, true)
        
        let role = message.guild.roles.cache.find(role => role.name === "Muted")
        target.roles.add(role)

        message.channel.send({embeds: [embed]})

        setInterval(() => {
            target.roles.remove(role)
        }, time)
    }
}