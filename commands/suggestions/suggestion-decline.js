const { MessageEmbed } = require('discord.js')
const Schema = require('../../Schemas/suggestionSchema')

module.exports = {
    name: "decline",
    aliases: [""],
    cooldown: 0,
    description: "Suggestion Decline",
    async execute(client, message, args) {
        try {
            const data = await Schema.findOne({
                guildId: message.guild.id
            })
            const channel = message.guild.channels.cache.find(c => c.id === data.suggestionChannel)
            let SuggestionID = args[0]
            const embed = new MessageEmbed()
            .setTitle("Missing Arguement")
            .setDescription("You need to provide an ID")
            .setColor('RANDOM')
            .setTimestamp()
            if(!SuggestionID) return message.reply({embeds: [embed]})
    
            let Comment = args.slice(1).join(" ")
            const embed1 = new MessageEmbed()
            .setTitle("Missing Arguement")
            .setDescription("You need to provide a message to why this suggestion declined.")
            .setColor('RANDOM')
            .setTimestamp()
            if(!Comment) return message.reply({embeds: [embed1]})
    
            try {
                let Suggestion = await channel.messages.fetch(SuggestionID, { limit: 150});
                let SuggestionEmbed = Suggestion.embeds[0]
                const messageAuthorig = await client.users.cache.find((c) => c.tag === SuggestionEmbed.author.name)
                const guildURL = message.guild.iconURL()
                let deniedSuggestionEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor({name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true})}`})
                .setDescription(Suggestion.embeds[0].description)
                .setThumbnail(`https://cdn.discordapp.com/attachments/938866521499906069/954939060055605328/SuggestionIcon.png`)
                .setImage(SuggestionEmbed.image)
                .addField("Submitted by:", `<@${messageAuthorig.id}>`)
                .addField("Comment:", `${Comment}`)
                .setTitle("Suggestion Rejected")
                .setTimestamp()
              
                Suggestion.edit({embeds: [deniedSuggestionEmbed], content: `<@${messageAuthorig.id}>`})
                let sentembed = new MessageEmbed()
                .setAuthor({name: `${message.author.username}`})
                .setThumbnail(guildURL)
                .setDescription("**You have denied the suggestion**")
                .setColor("RANDOM")
                .setTimestamp()
                let msg = await message.channel.send({embeds: [sentembed]})
                setTimeout(() => msg.delete(), 12000)
            } catch (err) {
                const embed = new MessageEmbed()
                .setTitle("Error Occured.")
                .addField(`Reason for Errors:`, `**1. **IconURL Doesn't exist\n**2.** Admin still not setting up the suggestion channel\n**3.** This suggestion [id](${message.url}) doesn't not exist`)
                .setColor('RANDOM')
                .setTimestamp()
                
                message.reply({embeds: [embed], content: `${message.author}`})
                console.log(err)
            }
        } catch {
            message.reply("Suggestion Channel still not setted by admin.")
        }
    }
}