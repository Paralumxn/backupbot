const Level = require('discord.js-leveling')
const { MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    name: "set-level",
    aliases: ["setlevel", "set-lvl", "setlvl"],
    description: "To set level to a member",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command.")
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const setLEVEL = args[1]
        const user = await Level.setLevel(target.id, message.guild.id, setLEVEL)
        const targetEXP = Level.xpFor(parseInt(user.level) + 1)

        if(!target) return message.reply('Provide a member to modify level')
        if(!setLEVEL) return message.reply('Provide some LEVEL to replace')
        const embed = new MessageEmbed()

        .setTitle("MODIFIED LEVEL")
        .addField(`Member:`, `${target}`, true)
        .addField(`Modified by:`, `${message.author}`, true)
        .addField(`Modified Level:`, `${setLEVEL.toLocaleString()}`, true)
        .addField(`Required Exp:`, `${targetEXP.toLocaleString()}`, true)
        .setColor('RANDOM')
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}