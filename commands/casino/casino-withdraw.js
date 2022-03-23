const { MessageEmbed } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "withdraw",
    aliases: ["with"],
    cooldown: 0,
    description: "Casino Withdraw",
    async execute(client, message, args, prefix) {
        if(args[0] === 'all') {
            const user = message.author

            const withdraw = await economy.findOne({
                guildID: message.guild.id,
                userID: user.id
            })

            if(args[0] > withdraw.bank) {
                return message.reply("You don't have any $ on your wallet.")
            }

            const bank = withdraw.bank

            economy.findOneAndUpdate({
                guildID: message.guild.id,
                userID: user.id
            }, {$inc: {wallet: bank}}, async (err, data) => {
                if(data) {
                    data.wallet += data.bank
                    data.bank -= data.bank
                    data.save()
                    message.channel.send(`You sucessfully withdrawed $${withdraw.bank.toLocaleString()}`)
                } else {
                    return message.channel.send(`Looks like you dont have any records yet. Create your account now by typing \`${prefix}start\``)
                }
            })
        } else {
            const user = message.author
        const withdraw = parseFloat(args[0])

        const embed = new MessageEmbed()
        .setTitle('Wrong Syntax')
        .setDescription(`**1.** Put an amount to withdraw\n**2.** Amount should be numeric not letters`)
        .setColor('RANDOM')

        if(isNaN(withdraw)) return message.reply({embeds: [embed]})

        const data = await economy.findOne({
            guildID: message.guild.id,
            userID: user.id
        })

        if(withdraw > data.bank) {
            return message.channel.send(`You don't have enough $ to withdraw this amount.`)
        } else {
            economy.findOneAndUpdate({
                guildID: message.guild.id,
                userID: user.id
            }, {$inc: {wallet: withdraw}}, async(err, data) => {
                if(data) {
                    data.wallet += withdraw
                    data.bank -= withdraw
                   await data.save()
                    message.channel.send(`You sucessfully withdrawed $${withdraw.toLocaleString()}`)
                } else {
                    return message.channel.send("Looks like you dont have any records yet. Create your account now by typing `.start`")
                }
            })
        }
        }
    }
}