const { MessageEmbed } = require('discord.js')
const schema = require('../../Schemas/afkSchema')

module.exports = {
    name: "afk",
    aliases: [""],
    cooldown: 0,
    description: "Information AFK",
    async execute(client, message, args) {
        let data;
        try {
            data = await schema.findOne({
                userID: message.author.id,
                guildID: message.guild.id
            })

            if(!data) {
                data = await schema.create({
                    userID: message.author.id,
                    guildID: message.guild.id
                })
            }
        } catch (er) {
            console.log(er)
        }

        data.AFK = true
        data.AFK_Reason = args.join(" ")
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTimestamp()
        .addField(`Status:`, `You are now AFK`, true)
        .addField(`Reason:`, `${data.AFK_Reason || `No Reason`}`, true)

        message.channel.send({embeds: [embed]})
        await data.save()
    }
}