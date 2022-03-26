const { MessageEmbed } = require('discord.js')
const e = require('express')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "give",
    aliases: [""],
    cooldown: 0,
    description: "Casino Give Command",
    usage: "give <@member>",
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle("Casino Give")
            .setTimestamp()
            .setColor('RANDOM')
            .addField(`To use this command, type:`, `${prefix}give <@member>`)

            message.channel.send({embeds: [embed]})
        } else if(args[0]) {
        const member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
        const user = message.author
        const amount = parseFloat(args[1])

        const data = await economy.findOne({
            guildID: message.guild.id,
            userID: member.id
        })

        if(!data) return message.reply("This user doesn't have any account.")

        economy.findOneAndUpdate({
            guildID: message.guild.id,
            userID: member.id
        }, {$inc: {wallet: amount}}, async(err, data) => {
            if(data) {
                data.wallet += amount
                data.save()

                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTimestamp()
                .setDescription(`${message.author.username} successfully given ${member.user.username} $${amount.toLocaleString()}.`)

                message.channel.send({embeds: [embed]})
            }
        })

        const balance = await economy.findOne({
            guildID: message.guild.id,
            userID: user.id
        })

        if(!balance) return message.reply("You don't have any records yet.")

        if(balance.wallet < amount) {
            return message.reply(`You don't have enough money to give. Your current balance is $${balance.wallet.toLocaleString()}`)
        }

        economy.findOneAndUpdate({
            guildID: message.guild.id,
            userID: user.id
        }, {$inc: {wallet: amount}}, async(err, data) => {
            if(data) {
                data.wallet -= amount
                data.save()
            }
        })
        }
    }
}