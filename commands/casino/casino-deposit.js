const { MessageEmbed } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "deposit",
    aliases: ["dep"],
    cooldown: 0,
    description: "Casino Deposit",
    async execute(client, message, args, prefix) {
        if(args[0] === 'all') {
            const user = message.author

            const deposit = await economy.findOne({
                guildID: message.guild.id,
                userID: user.id
            })

            if(args[0] > deposit.wallet) {
                return message.reply("You don't have any $ on your wallet.")
            }

            const wallet = deposit.wallet

            economy.findOneAndUpdate({
                guildID: message.guild.id,
                userID: user.id
            }, {$inc: {wallet: wallet}}, async (err, data) => {
                if(data) {
                    data.bank += data.wallet
                    data.wallet -= data.wallet
                    data.save()
                    message.channel.send(`You sucessfully deposited $${deposit.wallet.toLocaleString()}`)
                } else {
                    return message.channel.send(`Looks like you dont have any records yet. Create your account now by typing \`${prefix}start\``)
                }
            })
        } else {
            const user = message.author
            const deposit = parseFloat(args[0])

        const embed = new MessageEmbed()
        .setTitle('Wrong Syntax')
        .setDescription(`**1.** Put an amount to deposit\n**2.** Amount should be numeric not letters`)
        .setColor('RANDOM')

        if(isNaN(deposit)) return message.reply({embeds: [embed]})

        const data = await economy.findOne({
            guildID: message.guild.id,
            userID: user.id
        })

        if(deposit > data.wallet) {
            return message.channel.send(`You don't have enough $ to deposit this amount.`)
        } else {
            economy.findOneAndUpdate({
                guildID: message.guild.id,
                userID: user.id
            }, {$inc: {wallet: deposit}}, async(err, data) => {
                if(data) {
                    data.wallet -= deposit
                    data.bank += deposit
                   await data.save()
                    message.channel.send(`You sucessfully deposited $${deposit.toLocaleString()}`)
                } else {
                    return message.channel.send("Looks like you dont have any records yet. Create your account now by typing `.start`")
                }
            })
        } 
        }
    }
}