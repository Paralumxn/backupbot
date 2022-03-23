const { MessageEmbed, Permissions, Message } = require('discord.js')

module.exports = {
    name: "remove-role",
    aliases: ["removerole"],
    description: "To remove role to specific member",
    async execute(client, message, args) {
        try {
            
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.reply("You can't use this command")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.reply("I can't use this command!")
    
        const role = message.guild.roles.cache.find(role => role.id === `${args[1]}`) || message.guild.roles.cache.find(role => role.name === `${args.slice(1).join(" ")}`)
        const target = message.mentions.members.first() || await message.guild.members.cache.get(args[0])

        if(!target) return message.reply("Who are you going to remove role?")
        if(!role) return message.reply("What role do you want to remove?")

        const embed = new MessageEmbed()
        .setTitle("ROLE REMOVED")
        .setColor('RANDOM')
        .setTimestamp()
        .addField(`Role removed to:`, `${target}`, true)
        .addField(`Role removed by:`, `${message.author}`, true)
        .addField(`Role:`, `${role}`, true)

        target.roles.remove(role)
        message.channel.send({embeds: [embed]})
        } catch {
            message.reply("Role not found.")
        }
    }
}