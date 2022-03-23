const Levels = require('discord.js-leveling')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "level",
    aliases: ["rank", "lvl"],
    description: "To see your current rank/level",
    async execute(client, message, args) {
        const target = message.mentions.members.first() || await message.guild.members.cache.get(args[0]) || message.author
        const user = await Levels.fetch(target.id, message.guild.id);
        const requiredXp = Levels.xpFor(parseInt(user.level) + 1)
        if(!user) return message.channel.send(`User don't have any records yet`);
    
        const levelgained = new MessageEmbed()
        .setThumbnail(target.displayAvatarURL({ dynamic: true }))
        .addField(`Member:`, `${target}`)
        .addField(`Current Level:`, `${user.level}`, true)
        .addField(`Current Exp:`, `${user.xp.toLocaleString()}`, true)
        .addField(`Required Exp:`, `${requiredXp.toLocaleString()}`, true)
        .setColor('RANDOM')
        .setTimestamp()
        .setTitle(`Rank Information`)

        message.channel.send({embeds: [levelgained]});
    }
}