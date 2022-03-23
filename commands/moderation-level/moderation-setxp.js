const Level = require('discord.js-leveling')
const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    name: "set-exp",
    aliases: ["setxp", "set-xp", "setexp"],
    description: "To set exp of someone",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command")
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const setEXP = args[1]
        const user = await Level.setXp(target.id, message.guild.id, setEXP)
        const targetEXP = Level.xpFor(parseInt(user.level) + 1)

        if(!target) return message.reply("Provide a member to modify exp")
        if(!setEXP) return message.reply("Provide some EXP to replace")
        const embed = new MessageEmbed()
        .setTitle("EXP MODIFIED")
        .addField(`Member:`, `${target}`, true)
        .addField(`Modified by:`, `${message.author}`, true)
        .addField(`Modified Exp:`, `${setEXP.toLocaleString()}`, true)
        .addField(`Required Exp:`, `${targetEXP.toLocaleString()}`, true)
        .setColor('RANDOM')
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}