const { MessageEmbed } = require('discord.js')
const report = require('../../Schemas/reportedSchema')

module.exports = {
    name: "report",
    aliases: [""],
    description: "Report a Person",
    async execute(client, message, args) {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ") || "No Reason"

        if(!target) return message.reply("Who do you wanted to report?")

        report.findOne({
            guildID: message.guild.id,
            memberID: message.author.id,
            reportedID: target.id
        }, async (err, data) => {
            if(data) {
                const report = {
                    reason: reason
                }
                data.reason = [...data.reason, report]
                await data.save()
            } else {
                new report({
                    guildID: message.guild.id,
                    memberID: message.author.id,
                    reportedID: target.id,
                    reason: reason
                }).save()
            }
        })

        if(!target) return message.reply("Who are you going to report?")
        const embed = new MessageEmbed()
        .setTitle("REPORT")
        .addField(`Reported:`, `${target}`, true)
        .addField(`Reported by:`, `${message.author}`, true)
        .addField(`Reason:`, `${reason}`)
        .setColor('RANDOM')
        .setTimestamp()
        
        message.channel.send({embeds: [embed]})
        
        const embed1 = new MessageEmbed()
        .setTitle("YOU HAVE BEEN REPORTED")
        .setDescription(`${reason}`)
        .setColor('RANDOM')
        .setTimestamp()

        target.send({embeds: [embed1]})
    }
}