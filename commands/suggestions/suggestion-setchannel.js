const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const Schema = require('../../Schemas/suggestionSchema')

module.exports = {
    name: "set-suggestion-channel",
    aliases: ["set-suggestion"],
    cooldown: 0,
    description: "Suggestion Set Channel",
    async execute(client, message, args) {
        const channel = message.mentions.channels.first() || await message.guild.channels.cache.get(args[0])

        const SuccessEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("You have successfully setup the Suggestion Channel.")
        .setDescription(`${message.author.username} You have set the suggestion Channel`)
        .addField("Suggestion Channel:", `<#${channel.id}>`)

        const UpdatedEmbed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Successfully updated the suggestion Channel. <a:exclamation_mark_red:915208461514604604>")
        .setDescription(`**${message.author.username}** You have updated the suggestion channel!`)
        .addField("Suggestion Channel:", `<#${channel.id}>`)
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("Success")
            .setCustomId("Succes")
            .setStyle("PRIMARY")
            .setDisabled(true)
            .setEmoji("916869194400796772")
        )

        const Nochannel = new MessageEmbed()
        .setColor("RED")
        .setDescription("Please mention the channel to set the suggestion channel as!")
        .setThumbnail("MISSING ARGUEMENT!")
        if (!channel) return message.reply({embeds: [Nochannel]})

        const data = await Schema.findOne({ guildId: message.guild.id }) 
        if (!data) {
            try {
                const data1 = await Schema.create({
                    guildId: message.guild.id
                })
    
                await data1.updateOne({ suggestionChannel: channel.id })
                return message.reply({ embeds: [SuccessEmbed], components: [row], allowedMentions: {repliedUser: false} })
            } catch (error) {
                console.log(error)
            }
        } else if (data) {
            await data.updateOne({ suggestionChannel: channel.id })
            return message.reply({ embeds: [UpdatedEmbed], components: [row], allowedMentions: {repliedUser: false} })
        }
    }
}