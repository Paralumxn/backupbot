const { MessageEmbed } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "start",
    aliases: [""],
    description: "Casino Start",
    cooldown: 0,
    async execute(client, message, args) {
        const member = message.author

        economy.findOne({
            guildID: message.guild.id,
            userID: member.id,
        }, async(error, data) => {
            if(data) {
                return message.channel.send(`${member}, you have an exisiting account. Play now`)
            } else {
                new economy({
                    guildID: message.guild.id,
                    userName: member.username,
                    userID: member.id,
                    wallet: 0,
                    bank: 0,
                    items: {
                        item: "",
                        itemName: "",
                        itemDescription: ""
                    }
                }).save()
            }

            message.channel.send(member.username + " Created a new account.")
        })
    }
}