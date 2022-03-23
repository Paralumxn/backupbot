const { MessageEmbed } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "balance",
    aliases: ["bal"],
    cooldown: 0,
    description: "Casino Balance",
    async execute(client, message, args, prefix) {

        const user = message.author
        const bal = await economy.findOne({
            guildID: message.guild.id,
            userID: user.id
        })

        if(!bal) {
            return message.reply(user.username + `Looks like you dont have any records yet. Create your account now by typing \`${prefix}start\``)
        }

        const total = parseInt(bal.wallet + bal.bank)

        if(!args[0]) {
            const embed = new MessageEmbed()
            .setAuthor({iconURL: `${user.avatarURL()}`, name: `${user.tag}`})
            .addField(`Member:`, `${user}`)
            .addField(`Wallet Balance:`, `$${bal.wallet.toLocaleString() || "0"}`, true)
            .addField(`Bank Balance:`, `$${bal.bank.toLocaleString() || "0"}`, true)
            .addField(`Total Balance:`, `$${total.toLocaleString() || "0"}`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            
            const bal = await economy.findOne({
                guildID: message.guild.id,
                userID: member.id
            })
    
            if(!bal) {
                return message.reply(member.user.username + ` don't have any records yet.`)
            }
    
            const total = parseInt(bal.wallet + bal.bank)
            const embed = new MessageEmbed()
            .setAuthor({iconURL: `${member.user.avatarURL()}`, name: `${member.user.tag}`})
            .addField(`Member:`, `${member}`)
            .addField(`Wallet Balance:`, `$${bal.wallet.toLocaleString() || "0"}`)
            .addField(`Bank Balance:`, `$${bal.bank.toLocaleString() || "0"}`)
            .addField(`Total Balance:`, `$${total.toLocaleString() || "0"}`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } 
    }
}