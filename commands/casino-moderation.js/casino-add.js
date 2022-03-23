const { MessageEmbed, Permissions } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "add",
    aliases: [""],
    cooldown: 0,
    description: "Casino Add",
    async execute(client, message, args, prefix) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command")

        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle("Moderators Command")
            .addField(`Use this command by typing:`, `${prefix}add (member) wallet <amount>\n${prefix}add (member) bank <amount>`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[1] === 'wallet') {
            const amount = parseFloat(args[2])
            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!target) return message.reply(`Who would you like to give some extra credit?`)
        if(!args[1]) return message.reply(`Where would you want to add their extra credit? wallet or bank?`)
        if(!amount) return message.reply(`What amount would you like to give them?`)

            economy.findOneAndUpdate({
                guildID: message.guild.id,
                userID: target.id
            }, {$inc: {wallet: amount}}, async (err, data) => {
                if(data) {
                    data.wallet += amount
                    data.save()
                    message.channel.send(`$${amount.toLocaleString()} added credits to ${target} to their wallet.`)
                } else {
                    return message.reply("This user still not creating account.")
                }
            })
        } else if(args[1] === 'bank') {
            const amount = parseFloat(args[2])
            const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!target) return message.reply(`Who would you like to give some extra credit?`)
        if(!args[1]) return message.reply(`Where would you want to add their extra credit? wallet or bank?`)
        if(!amount) return message.reply(`What amount would you like to give them?`)

            economy.findOneAndUpdate({
                guildID: message.guild.id,
                userID: target.id
            }, {$inc: {bank: amount}}, async (err, data) => {
                if(data) {
                    data.bank += amount
                    data.save()
                    message.channel.send(`$${amount.toLocaleString()} added credits to ${target} to their bank.`)
                } else {
                    return message.reply("This user still not creating account.")
                }
            })
        }
    }
}