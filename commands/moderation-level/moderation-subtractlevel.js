const { MessageEmbed, Permissions } = require('discord.js')
const Levels = require('discord.js-leveling')

module.exports = {
    name: "subtract-level",
    aliases: ["subtractlevel", "subtractlvl", "subtract-lvl"],
    description: "To add level",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command.")
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const subLEVEL = args[1]
        const user = await Levels.subtractLevel(target.id, message.guild.id, subLEVEL)
        const targetEXP = Levels.xpFor(parseInt(user.level) + 1)

        if(!target) return message.reply("Who are you going to add some level?")
        if(!subLEVEL) return message.reply("How many levels are you going to add?")
        const embed = new MessageEmbed()
        .setTitle("MODIFIED LEVEL")
        .addField(`Member:`, `${target}`, true)
        .addField(`Modified by:`, `${message.author}`, true)
        .addField(`Modified Level:`, `${user.level}`, true)
        .addField(`Required Exp:`, `${targetEXP.toLocaleString()}`, true)
        .setColor('RANDOM')
        .setTimestamp()
        
        message.channel.send({embeds: [embed]})
    }
}