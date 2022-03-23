const { MessageEmbed, Permissions, Message } = require('discord.js')

module.exports = {
    name: "add-role",
    aliases: ["addrole"],
    description: "To add role to specific member",
    async execute(client, message, args) {
        try {

        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.reply("You can't use this command")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return message.reply("I can't use this command!")
    
        const role = message.guild.roles.cache.find(role => role.id === `${args[1]}`)
        const target = message.mentions.members.first() || await message.guild.members.cache.get(args[0])

        if(!target) return message.reply("Who are you going to add role?")
        if(!role) return message.reply("What role do you want to add?")
        if(!target.moderatable) return message.reply("I can't add this role to a person")

        const embed = new MessageEmbed()
        .setTitle("ROLE ADDED")
        .setColor('RANDOM')
        .setTimestamp()
        .addField(`Role given to:`, `${target}`, true)
        .addField(`Role given by:`, `${message.author}`, true)
        .addField(`Role:`, `${role}`, true)

        target.roles.add(role).catch((err) => {
            return message.reply(`${message.author.username}, I can't give this role to the person.`)
        })
        await message.channel.send({embeds: [embed]})
        } catch {
            message.reply("Role not found.")
        }
    }
}