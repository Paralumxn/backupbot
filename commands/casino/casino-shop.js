const economy = require('../../Schemas/casinoSchema/shopSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name:"shop",
    description: "Casino Shop",
    aliases: [""],
    cooldown: 0,
    usage: "shop",
    async execute(client, message, args) {
       const data = await economy.findOne({
           guildID: message.guild.id
       })

       if(!data) return message.reply("No item added.")

       const arrays = data.items.map((value, index) => {
           return `**${index+1})**\nRole: <@&${value.item}>\nName: ${value.itemName}\nDescription: ${value.itemDescription}\nPrice: $${value.itemPrice.toLocaleString()}`
       });

       const embed = new MessageEmbed()
       .setTitle("Casino Shop")
       .setDescription(`${arrays.join("\n\n")}`)
       .setColor('RANDOM')
       .setTimestamp()

       message.channel.send({embeds: [embed]})
    }
}