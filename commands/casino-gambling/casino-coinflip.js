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
            .setTitle("Casino Coinflip!")
            .setDescription("Test your own luck\n**Note:** The % of this game is 50/50")
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'all') {
            const exist = await economy.findOne({
                guilID: message.guild.id,
                userID: message.author.id
            })

            if(!exist) return message.reply("You don't have any records yet.")
            if(0 > exist.wallet) return message.reply(`You don't have any balance, your current balance is $${exist.wallet.toLocaleString()}`)
            let RN = Math.floor(Math.random() * 100)

            if(RN > 50) {
                economy.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id
                }, {$mul: {wallet: 2}}, async(err, data) => {
                    if(data) {
                        data.wallet * 2
                        data.save()
                        const embed = new MessageEmbed()
                        .setDescription(message.author.username + ` Congratulations! You won $${exist.wallet.toLocaleString()}`)
    
                        message.channel.send({embeds: [embed]})
                    }
                })
            } else {
                economy.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id   
                }, {$sub: {wallet: wallet}}, async(err, data) => {
                    if(data) {
                        data.wallet -= data.wallet
                        data.save()

                        message.reply("You just lost.")
                    }
                })
            }
        } else if(args[0] === "head" || args[0] === 'heads' || args[0] === "h") {
                let RN = Math.floor(Math.random() * 100)
                const amount = parseFloat(args[1])

                const exist = await economy.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id
                })
                    if(!exist) return message.reply("You don't have any records yet.")
                    if(!amount) return message.reply("How much would you like to bet?")
                    if(amount > exist.wallet) return message.reply(`You don't have enough balance, you only have $${exist.wallet.toLocaleString()}`)
            if(RN > 50) {
                economy.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id
                }, {$inc: {wallet: amount}}, async(err, data) => {
                    if(data) {
                        data.wallet += amount * 2
                        data.save()
                        const embed = new MessageEmbed()
                        .setDescription(message.author.username + ` Congratulations! You won $${amount.toLocaleString()}!`)
                        .setColor('RANDOM')
                        .setTimestamp()
    
                        message.channel.send({embeds: [embed]})
                    }
                })
            } else {
                economy.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id
                }, {$inc: {wallet: amount}}, async(err, data) => {
                    if(data) {
                        data.wallet -= amount
                        data.save()

                        message.reply("You lost the bet.")
                    }
                })
            }
        } else if(args[0] === "tail" || args[0] === "tails" || args[0] === "t") {
            let RN = Math.floor(Math.random() * 100)
            const amount = parseFloat(args[1])
            const exist = await economy.findOne({
                guildID: message.guild.id,
                userID: message.author.id
            })

            if(!exist) return message.reply("You don't have any records yet")
            if(!amount) return message.reply("How much would you like to bet?")
            if(amount > exist.wallet) return message.reply(`You don't have enough balance, your current balance is $${exist.wallet.toLocaleString()}`)
            if(RN > 50) {
                economy.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id
                }, {$inc: {wallet: amount}}, async(err, data) => {
                    if(data) {
                        data.wallet += amount * 2
                        data.save()

                        const embed = new MessageEmbed()
                        .setDescription(message.author.username + ` Congratulations! You won $${amount.toLocaleString()}`)
                        .setColor('RANDOM')
                        .setTimestamp()

                        message.channel.send({embeds: [embed]})
                    }
                })
            } else {
                economy.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id
                }, {$inc: {wallet: amount}}, async(err, data) => {
                    if(data) {
                        data.wallet -= amount
                        data.save()

                        message.reply("You lost the bet.")
                    }
                })
            }
        }
    }
}