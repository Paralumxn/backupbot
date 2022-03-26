const economy = require('../../Schemas/casinoSchema/shopSchema')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "add-item",
    aliases: [""],
    description: "Casino Add Item",
    usage: "add-item",
    cooldown: 0,
    async execute(client, message, args) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle("CASINO ADD ITEM")
            .addField(`To use this command, you need to provide the following items:`, "> **1. Role\n> 2. Item Name\n> 3. Item Price\n> 4. Item Description**")
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})

        } else if(args[0]) {
            const item = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
            const itemName = args[1]
            const itemPrice = parseFloat(args[2])
            const itemDescription = args.slice(3).join(" ")

            if(!item) return message.reply("You must state a role first")
            if(!itemName) return message.reply("What name for this item?")
            if(!itemPrice) return message.reply("What price for this item?")
            if(!itemDescription) return message.reply("What description for this item?")
            
            economy.findOne({
                guildID: message.guild.id,
            }, async(err, data) => {
                
                if(!data) return new economy({
                    guildID: message.guild.id,
                    items: {
                        item: item.id,
                        itemName: itemName,
                        itemPrice: itemPrice,
                        itemDescription: itemDescription
                    }
                }).save()

                if(data.items && data.items.length && data.items.find((i) => i.item === item.id.toString())) {
                    return message.reply("This item already exist!")
                } else {
                    data.items.push({
                        item: item.id,
                        itemName: itemName,
                        itemPrice: itemPrice,
                        itemDescription: itemDescription
                    })
                    
                    const embed = new MessageEmbed()
                        .setTitle("New item Added")
                        .setColor('RANDOM')
                        .setTimestamp()
                        .addField(`Item Name:`, `${itemName}`)
                        .addField(`Item Description:`, `${itemDescription}`)
                        .addField(`Item Price:`, `$${itemPrice.toLocaleString()}`)
                        .addField(`Added by:`, `${message.author.username}`)
                    message.channel.send({embeds: [embed]})
                    
                    data.save()
                }
            })

        }
    }
}