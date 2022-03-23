const { MessageEmbed } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "rob",
    aliases: [""],
    cooldown: 1800000,
    description: "Casino Rob",
    async execute(client, message, args, prefix) {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const user = message.author
        let RN = Math.floor(Math.random() * 100) + 1        
        if(!target) return message.reply("Who would you like to rob?")

        if(RN > 70) {
            const amounts = await economy.findOne({
                guildID: message.guild.id,
                userID: target.id
            })

            if(!amounts) return message.reply(`This person doesn't have any record yet.`)
    
            const consumed = amounts.wallet
            let amount = Math.floor(Math.random() * (consumed / 2) + 0)
    
            economy.findOneAndUpdate({
                guildID: message.guild.id,
                userID: user.id
            }, {$inc: {wallet: amount}}, async(err, data) => {
                if(data) {
                    data.wallet += amount
                    data.save()
                } else {
                    message.reply(`Looks like you dont have any records yet. Create your account now by typing \`${prefix}start\``)
                }
            })
    
            economy.findOneAndUpdate({
                guildID: message.guild.id,
                userID: target.id
            }, {$inc: {wallet: amount}}, async(err, data) => {
                if(data) {
                    data.wallet -= amount
                    data.save()
                    message.channel.send(`You have successfully robbed ` + target.user.username + ` amount of $${amount.toLocaleString()}`)
                } else {
                    return message.reply("This person doesn't have any record yet.")
                }
            })
        } else {
            let RN = Math.floor(Math.random() * 100) + 1
            const member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])

            if(RN > 50) {
                const user = message.author

                const amounts = await economy.findOne({
                    guildID: message.guild.id,
                    userID: user.id
                })

                if(!amounts) return message.reply(`Looks like you dont have any records yet. Create your account now by typing \`${prefix}start\``)

                const consumed = amounts.wallet
                let amount = Math.floor(Math.random() * (consumed / 2) + 0)
                const embed = new MessageEmbed()
                .setDescription(`You failed to rob ${member} and paid $${amount.toLocaleString()}`)
                .setColor('RANDOM')
                .setTimestamp()

                economy.findOneAndUpdate({
                    guildID: message.guild.id,
                    userID: user.id
                }, {$inc: {wallet: amount}}, async(err, data) => {
                    if(data) {
                        data.wallet -= amount
                        data.save()
                        message.channel.send({embeds: [embed]})
                    } else {
                        message.reply(`Looks like you dont have any records yet. Create your account now by typing \`${prefix}start\``)
                    }
                })

                economy.findOneAndUpdate({
                    guildID: message.guild.id,
                    userID: member.id
                }, {$inc: {wallet: amount}}, async(err, data) => {
                    if(data) {
                        data.wallet += amount
                        data.save()
                    }
                })

            } else {
                const member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
                const embed = new MessageEmbed()
                .setDescription(`You failed to rob ${member} and luckily you escaped.`)
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [embed]})
            }
        }
    }
}