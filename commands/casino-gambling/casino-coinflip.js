const { MessageEmbed } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "coinflip",
    aliases: ["cf"],
    description: "Casino Coinflip",
    cooldown: 0,
    usage: "coinflip",
    async execute(client, message, args) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle("Casino Coinflip")
            .setDescription("You need to choose `head | tail` then <amount>")
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'heads' || args[0] === 'heads' || args[0] === "h") {
            const exist = await economy.findOne({
                guildID: message.guild.id,
                userID: message.author.id
            })

            if(!exist) return message.reply("You don't have records yet to gamble")

            const amount = parseFloat(args[1])
            if(amount > exist.wallet) return message.reply(`You dont have enough balance, your current balance is $${exist.wallet.toLocaleString()}`)
            let RN = Math.floor(Math.random() * 100) + 1
            if(RN > 50) {
                economy.findOneAndUpdate({
                    guildID: message.guild.id,
                    userID: message.author.id
                }, {$inc: {wallet: amount}}, async(err, data) => {
                    data.wallet += amount
                    data.save()
                    message.channel.send(`You bet for head and won $${amount.toLocaleString()}!`)
                })
            } else {
                economy.findOneAndUpdate({
                    guildID: message.guild.id,
                    userID: message.author.id
                }, {$inc: {wallet: amount}}, async(err, data) => {
                    data.wallet -= amount
                    data.save()
                    message.channel.send(`You bet for head and lost $${amount.toLocaleString()}!`)
                })
            }
        } else if(args[0] === "tails" || args[0] === "tail" || args[0] === "t") {
            const exist = await economy.findOne({
                guildID: message.guild.id,
                userID: message.author.id
            })

            if(!exist) return message.reply("You don't have records yet to gamble")

            const amount = parseFloat(args[1])
            if(amount > exist.wallet) return message.reply(`You dont have enough balance, your current balance is $${exist.wallet.toLocaleString()}`)
            let RN = Math.floor(Math.random() * 100) + 1
            if(RN > 50) {
                economy.findOneAndUpdate({
                    guildID: message.guild.id,
                    userID: message.author.id
                }, {$inc: {wallet: amount}}, async(err, data) => {
                    data.wallet += amount
                    data.save()
                    message.channel.send(`You bet for tails and won $${amount.toLocaleString()}!`)
                })
            } else {
                economy.findOneAndUpdate({
                    guildID: message.guild.id,
                    userID: message.author.id
                }, {$inc: {wallet: amount}}, async(err, data) => {
                    data.wallet -= amount
                    data.save()
                    message.channel.send(`You bet for tails and lost $${amount.toLocaleString()}!`)
                })
            }
        }
    }
}