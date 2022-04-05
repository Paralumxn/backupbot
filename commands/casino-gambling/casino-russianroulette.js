const { MessageEmbed } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')


module.exports = {
    name: "russianroulette",
    aliases: ["rr"],
    description: "Casino Russian Roulette",
    cooldown: 0,
    usage: 'russanroullete',
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle('Casino Russian Roulette')
            .setDescription(`Take note that the % of this game is 30/70`)
            .addField(`To play this game:`, `${prefix}russianroulette <all> || <amount>`)
            .setColor('RANDOM')
            .setTimestamp()
            
            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'all') {
            let RN = Math.floor(Math.random() * 100)
            const exist = await economy.findOne({
                guildID: message.guild.id,
                userID: message.author.id
            })

            if(!exist) return message.reply("You don't have any records yet.")
            if(0 > exist.wallet) return message.reply(`You don't have any balance, your current balance is $${exist.wallet.toLocaleString()}`)

            if(RN > 70) {
                economy.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id   
                }, {$inc: {wallet: 2}}, async(err, data) => {
                    if(data) {
                        data.wallet * 2
                        data.save()

                        const embed = new MessageEmbed()
                        .setDescription(message.author.username + ` You are safe for now and congratulations! You won $${exist.wallet.toLocaleString()}`)
                        .setColor('RANDOM')
                        .setTimestamp()

                        message.channel.send({embeds: [embed]})
                    }
                })
            } else {
                economy.findOne({
                    guildID: message.author.id,
                    userID: message.author.id
                }, {$sub: {wallet: wallet}}, async(err, data) => {
                    if(data) {
                        data.wallet -= data.wallet
                        data.save()

                        message.reply("You died.")
                    }
                })
            }
        } else if(args[0]) {
            const amount = parseFloat(args[0])
            const RN = Math.floor(Math.random() * 100)
            const exist = await economy.findOne({
                guildID: message.guild.id,
                userID: message.author.id
            })

            if(!exist) return message.reply("You don't have any records yet.")
            if(!amount) return message.reply("Please put an amount to bet")
            if(amount > exist.wallet) return message.reply(`You dont have any balance, your current balance is $${exist.wallet.toLocaleString()}`)

            if(RN > 70) {
                economy.findOne({
                    guildID: message.guild.id,
                    userID: message.author.id
                }, {$inc: {wallet: amount}}, async(err, data) => {
                    if(data) {
                        data.wallet += amount *2
                        data.save()
    
                        const embed = new MessageEmbed()
                        .setDescription(message.author.username + ` You survived.. for now.. Congratulations! You won $${amount.toLocaleString()}`)
                        .setColor('RANDOM')
                        .setTimestamp()
    
                        message.channel.send({embeds: [embed]})
                    }
                })
            } else {
                economy.findOne({
                    guildID: message.author.id,
                    userID: message.author.id
                }, {$sub: {wallet: wallet}}, async(err, data) => {
                    if(data) {
                        data.wallet -= data.wallet
                        data.save()

                        message.reply("You died.")
                    }
                })
            }
        }
    }
}