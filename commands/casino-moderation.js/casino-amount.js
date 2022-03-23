const { MessageEmbed, Permissions } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "add-amount",
    aliases: ["addamount"],
    cooldown: 0,
    description: "Casino Add member role bank | wallet",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command.")

        try {
            if(args[1] === 'wallet') {
                const role = message.mentions.roles.first()
                if(!role) role = message.guild.roles.cache.find(role => role.name == args[0]) || message.guild.roles.cache.find(role => role.id == args[0])
                const amount = parseFloat(args[2])
                if(!role) return message.reply("What role do you wanted to give some extra credit?")
                if(!amount) return message.reply("How many credits do you want to give?")

                const members = message.guild.members.cache.filter(member => member.roles.cache.has(role.id)) 
                await Promise.all([...members.values()].map(u => {

                    economy.findOneAndUpdate({
                        guildID: message.guild.id,
                        userID: u.id
                    }, {$inc: {wallet: amount}}, async(err, data) => {
                        if(data) {
                            data.wallet += amount
                            data.save()
                        }
                    })
                }))

                const embed = new MessageEmbed()
                    .setDescription(`**$${amount.toLocaleString()}** added to ${members.size} members with the ${role} role to their wallet.`)
                    .setColor('RANDOM')
                    .setTimestamp()

                    message.channel.send({embeds: [embed]})

            } else if(args[1] === 'bank') {
                const role = message.mentions.roles.first()
                if(!role) role = message.guild.roles.cache.find(role => role.name == args[0]) || message.guild.roles.cache.find(role => role.id == args[0])
                const amount = parseFloat(args[2])
                if(!role) return message.reply("What role do you wanted to give some extra credit?")
                if(!amount) return message.reply("How many credits do you want to give?")
                
                const members = message.guild.members.cache.filter(member => member.roles.cache.has(role.id)) 
                await Promise.all([...members.values()].map(u => {

                    economy.findOneAndUpdate({
                        guildID: message.guild.id,
                        userID: u.id
                    }, {$inc: {bank: amount}}, async(err, data) => {
                        if(data) {
                            data.bank += amount
                            data.save()
                        }
                    })
                }))

                const embed = new MessageEmbed()
                    .setDescription(`**$${amount.toLocaleString()}** added to ${members.size} members with the ${role} role to their bank.`)
                    .setColor('RANDOM')
                    .setTimestamp()

                    message.channel.send({embeds: [embed]})
            }
        } catch (err) {
           console.log(err)
        }
    }
}