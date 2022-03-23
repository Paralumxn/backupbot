const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const warning = require('../../Schemas/warningFileSchema')
const report = require('../../Schemas/reportedSchema')

module.exports = {
    name: "whois",
    aliases: [""],
    description: "To see their information the guild",
    async execute(client, message, args) {
        
        try{
            if(!args[0]) {
                let user = message.author

                const warns = await warning.findOne({
                    guildID: message.guild.id,
                    reportedID: user.id
                })

                const rep = await report.findOne({
                    guildID: message.guild.id,
                    reportedID: user.id
                })

                const embed = new MessageEmbed()
                .setTitle(`**REBORN PROJECT**`)
                .setColor('RANDOM')
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .addField(`Account Type:`, `${message.content.bot ? 'Bot' : 'Human'}`, true)
                .addField(`Roles:`, `${message.member.roles.cache.size}`, true)
                .addField(`Joined At`, `${moment(user.joinedAt).format('ddd, MMM Do, YYYY, h:mm a')}`, true)
                .addField(`Created At`, `${moment(user.createdAt).format('ddd, MMM Do, YYYY, h:mm a')}`, true)
                .addField(`Warning Count:`, `${warns?.reason?.length || "0"} found.`, true)
                .addField(`Report Count:`, `${rep?.reason?.length || "0"} found.`, true)
                .addField(`User tag:`, `${user.tag}`)
                .addField(`User ID:`, `${user.id}`)
                .setTimestamp()
                message.channel.send({embeds: [embed]})
            } else {
                let member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
                
                if(!member) {
                    return message.reply("User not found.")
                }

                const warns1 = await warning.findOne({
                    guildID: message.guild.id,
                    reportedID: member.id
                })

                const rep1 = await report.findOne({
                    guildID: message.guild.id,
                    reportedID: member.id
                })


                const embed1 = new MessageEmbed()
                .setTitle(`**REBORN PROJECT**`)
                .setColor('RANDOM')
                .setThumbnail(member.displayAvatarURL({ dynamic: true}))
                .setDescription('Personal ID: \n' + `${member}`)
                .addField(`Account Type:`, `${message.content.bot ? 'Bot' : 'Human'}`, true)
                .addField(`Roles:`, `${member.roles.cache.size}`, true)
                .addField(`Joined At`, `${moment(member.joinedAt).format('ddd, MMM Do, YYYY, h:mm a')}`, true)
                .addField(`Created At`, `${moment(member.createdAt).format('ddd, MMM Do, YYYY, h:mm a')}`, true)
                .addField(`Warning Count:`, `${warns1?.reason?.length || "0"} found.`, true)
                .addField(`Report Count:`, `${rep1?.reason?.length || "0"} found.`, true)
                .addField(`Member tag:`, `${member.user.tag}`, true)
                .addField(`Member ID:`, `${member.id}`, true)
                .setTimestamp()
                message.channel.send({embeds: [embed1]})
            }
        } catch (err) {
            console.log(err)
        }
    }
}