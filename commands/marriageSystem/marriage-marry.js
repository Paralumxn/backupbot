const marriage = require('../../Schemas/marriageSystem/marriageSchema')
const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: "marry",
    description: "To marry someone",
    aliases: [""],
    usage: "marry",
    async execute(client, message, args, prefix) {

        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle("Marriage System")
            .addField(`To use this command, type:`, `${prefix}marry <@member>`)
            .setTimestamp()
            .setColor('RANDOM')

            message.channel.send({embeds: [embed]})
        } else if(args[0]) {
            const member = message.mentions.members.first() || await message.guild.members.cache.get(args[0])
            const user = message.author

            const exist = await marriage.findOne({
                guildID: message.guild.id,
                userID: user.id,
                memberID: member.id
            })
            
            if(!exist) return message.reply("You're already married! / This person is already married!")
            if(member.id == message.author.id) return message.reply("You can't marry yourself!")
            if(exist != user.id && exist != member.id) {
                const proposal = new MessageEmbed()
                .setTitle("IMPORTANT ANNOUNCEMENT!!")
                .setDescription(`${user.username} makes a marriage proposal to ${member.user.username}.\nAre you ready to get married?`)
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [proposal]})
                .then((message) => {
                    message.react("❤️")
                    message.react("💔")

                const filter = (reaction, user) => {
                    return (reaction.emoji.name == "❤️" || reaction.emoji.name == "💔")
                    && user.id == member.id
                }

                return message.awaitReactions({ filter, max: 1, time: ms('2m'), errors:["time "]})
                })

                .then((collected) => {
                    const reaction = collected.first()
                    if(reaction.emoji.name === "❤️") {
                        marriage.findOne({
                            guildID: message.guild.id
                        }, async(err, data) => {
                            if(data) {
                                data.userID
                                data.memberID
                                data.status
                                data.save()
                            } else {
                                new marriage({
                                    guildID: message.guild.id,
                                    memberID: member.id,
                                    userID: user.id,
                                    status: true
                                }).save()
                            }
                        }) 

                        const embed = new MessageEmbed()
                        .setDescription(`**${user.username}** and **${member.user.username}** are now married!! Congratulations!`)
                        .setColor('RANDOM')
                        .setTimestamp()

                        message.channel.send({embeds: [embed]})
                    } else if(reaction.emoji.name === "💔") {
                        const embed = new MessageEmbed()
                        .setDescription("I think no for now...")
                        .setColor('RANDOM')
                        .setTimestamp()
                        message.channel.send({embeds: [embed]})
                    }
                })
                .catch(() => { 
                    message.channel.send(`No reaction after 2 minutes, operation canceled`)
                })
            }
        }
    }
}
