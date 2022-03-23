const { MessageEmbed } = require('discord.js')
const Schema = require('../../Schemas/suggestionSchema')

module.exports = {
    name: "suggest",
    aliases: ["suggestion"],
    cooldown: 1000 * 600,
    description: "Suggestion Suggest",
    async execute(client, message, args) {
        try {
            function generateRandomString(length) {
                var chars = "1234567890abcdeghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var random_string = "";
                if(length > 0) {
                    for(var i = 0; i < length; i++) {
                        random_string += chars.charAt(Math.floor(Math.random() * chars.length))
                    }
                }
                return random_string;
            }
            const SuggestionID = generateRandomString(7);
            IDNumber = `${SuggestionID}`;
            const data = await Schema.findOne({guildId: message.guild.id})
            const channel = message.guild.channels.cache.find(c => c.id === data.suggestionChannel)
            let suggestionMessage = args.slice(0).join(' ')
            const nosuggestion = new MessageEmbed()
            .setTitle("Missing Arguement")
            .setColor('RANDOM')
            .setDescription('Please provide a suggestion!')
            if(!suggestionMessage) return message.channel.send({embeds: [nosuggestion]})
    
            const suggestembed = new MessageEmbed()
            .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true})}`})
            .setDescription(`**Suggestion:**\n${suggestionMessage}`)
            .setTimestamp()
            .setColor('RANDOM')
            .setImage(message.attachments.first()?.proxyURL || null)
            .setThumbnail(`https://cdn.discordapp.com/attachments/938866521499906069/954939060055605328/SuggestionIcon.png`)
            .setFooter({text: `UserID: ${message.author.id} | ID: ${IDNumber}`})
            
    
            const msg = await channel.send({embeds: [suggestembed]})
            msg.react("✅");
            msg.react("❌");

            const guildURL = message.guild.iconURL()
            const urls = msg.url
            let sentembed = new MessageEmbed()
            .setAuthor({name: `${message.author.username}`})
            .setThumbnail(guildURL)
            .setDescription(`Your suggestion posted in **[Suggestion Channel](${urls})**`)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter({text: `Suggestion ID: ${IDNumber}`})
    
            let msg2 = await message.channel.send({embeds: [sentembed]})
            setTimeout(() => msg2.delete(), 12000);
        } catch (err) {
            const embed = new MessageEmbed()
            .setTitle("Error Occured.")
            .addField(`Reason for Errors:`, `**1. **IconURL Doesn't exist\n**2.** Admin still not setting up the suggestion channel`)
            .setColor('RANDOM')
            .setTimestamp()
            
            message.reply({embeds: [embed], content: `${message.author}`})
            console.log(err)
        }
    }  
}