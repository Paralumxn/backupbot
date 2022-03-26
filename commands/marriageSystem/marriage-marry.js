const marriage = require('../../Schemas/marriageSystem/marriageSchema')
const { MessageEmbed } = require('discord.js')

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
                guildID: message.guild.id
            })

            if(!exist != member.id) return message.reply("This user didnt allow to get married")
            if(!exist != user.id) return message.reply("You still didn't allow to get married")
            
            if(exist == user.id) return message.reply("You are already married!")
            if(exist == member.id) return message.reply("This person is already married!")
            if(member.id == message.author.id) return message.reply("You can't marry yourself!")
            if(exist.userID != user.id && exist.memberID != member.id) {
                const proposal = new MessageEmbed()
                .setTitle("IMPORTANT ANNOUNCEMENT!!")
                .setDescription(`${user.username} makes a marriage proposal to ${member.user.username}.\n\nAre you ready to get married?`)
                .setColor('RANDOM')
                .setTimestamp()
                message.channel.send({embeds: [proposal]}).then((msg) => {
                    msg.react("👍").then(() => msg.react("👎")).catch((err) => console.log(err))
                });

                return message.awaitReactions((reaction, user) => user.id == member.id && (reaction.emoji.name == "👍" || reaction.emoji.name == "👎"), {max: 1, time:  10000, errors: ["time"]})
                .then((collected) => {
                    const reaction = collected.first();
                    if(reaction.emoji.name === "👎") {
                        return message.channel.send("I think **no**...");
                    }

                    if(reaction.emoji.name === "👍") {
                        marriage.findOne({
                            guildID: message.guild.id
                        },async (err, data) => {
                            if(data) {
                                data.memberID
                                data.userID
                                data.save()
                            } else {
                                new marriage({
                                    guildID: message.guild.id,
                                    userID: user.id,
                                    memberID: member.user.id
                                }).save()

                                return message.channel.send(`${user.username} and ${member.user.username} are now married!`)
                            }
                        }).catch(() => {
                            message.reply("No reaction after 10 seconds, operation canceled.")
                        })
                    }
                })
            }
        }
    }
}