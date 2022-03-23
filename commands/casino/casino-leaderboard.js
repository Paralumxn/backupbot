const economy = require('../../Schemas/casinoSchema/main-schema')
const { MessageEmbed, Collection } = require('discord.js')

module.exports = {
    name: "leaderboard",
    aliases: ["lb"],
    cooldown: 0,
    description: "Casino Leaderboard",
    async execute(client, message, args) {
        if(!args[0]) {
            economy.find({
                guildID: message.guild.id
            }).sort([
                ['wallet' + 'bank', 'descending']
            ]).exec((err, res) => {
                if(err) console.log(err)

                let embed = new MessageEmbed()
                .setTitle(`Leaderboard Overall -- 5`)

                if(res.length === 0) {
                    embed.setColor('RANDOM')
                    embed.addField(`No Data Found`, `Play now to join the Leaderboard!`)
                } else if(res.length < 5) {
                    embed.setColor('RANDOM')
                
                    for(i = 0; i < res.length; i++) {
                        let member = message.guild.members.cache.get(res[i].userID || "User Left")
                        if(member === "User Left") {
                            
                            embed.addField(`${i + 1}. ${member}`, `**Total Amount:** $${parseInt(res[i].wallet+res[i].bank).toLocaleString()}`)
                        } else {
                            embed.addField(`${i + 1}. ${member.user.username}`, `**Total Amount:** $${parseInt(res[i].wallet+res[i].bank).toLocaleString()}`)
                        }
                    }
                } else {
                    for(i = 0; i < 5; i++) {
                        let member = message.guild.members.cache.get(res[i].userID || "User Left")
                        if(member === "User Left") {
                            embed.addField(`${i + 1}. ${member}`, `**Total Amount:** $${parseInt(res[i].wallet+res[i].bank).toLocaleString()}`)
                        } else {
                            embed.addField(`${i + 1}. ${member.user.username}`, `**Total Amount:** $${parseInt(res[i].wallet+res[i].bank).toLocaleString()}`)
                        }
                    }
                }

                message.channel.send({embeds: [embed]})
            })
        } else if(args[0] === 'wallet') {
            economy.find({
                guildID: message.guild.id
            }).sort([
                ['wallet', 'descending']
            ]).exec((err, res) => {
                if(err) console.log(err)

                let embed = new MessageEmbed()
                .setTitle(`Leaderboard Wallet -- 5`)

                if(res.length === 0) {
                    embed.setColor('RANDOM')
                    embed.addField(`No Data Found`, `Play now to join the Leaderboard!`)
                } else if(res.length < 5) {
                    embed.setColor('RANDOM')

                    for(i = 0; i < res.length; i++) {
                        let member = message.guild.members.cache.get(res[i].userID || "User Left")
                        if(member === "User Left") {
                            embed.addField(`${i + 1}. ${member}`, `**Wallet Amount:** $${res[i].wallet.toLocaleString()}`)
                        } else {
                            embed.addField(`${i + 1}. ${member.user.username}`, `**Wallet Amount:** $${res[i].wallet.toLocaleString()}`)
                        }
                    }
                } else {
                    for(i = 0; i < 5; i++) {
                        let member = message.guild.members.cache.get(res[i].userID || "User Left")
                        if(member === "User Left") {
                            embed.addField(`${i + 1}. ${member}`, `**Wallet Amount:** $${res[i].wallet.toLocaleString()}`)
                        } else {
                            embed.addField(`${i + 1}. ${member.user.username}`, `**Wallet Amount:** $${res[i].wallet.toLocaleString()}`)
                        }
                    }
                }

                message.channel.send({embeds: [embed]})
            })

        } else if(args[0] === 'bank') {
            economy.find({
                guildID: message.guild.id
            }).sort([
                ['bank', 'descending']
            ]).exec((err, res) => {
                if(err) console.log(err)

                let embed = new MessageEmbed()
                .setTitle(`Leaderboard Bank -- 5`)

                if(res.length === 0) {
                    embed.setColor('RANDOM')
                    embed.addField(`No Data Found`, `Play now to join the Leaderboard!`)
                } else if(res.length < 5) {
                    embed.setColor('RANDOM')

                    for(i = 0; i < res.length; i++) {
                        let member = message.guild.members.cache.get(res[i].userID || "User Left")
                        if(member === "User Left") {
                            embed.addField(`${i + 1}. ${member}`, `**Bank Amount:** $${res[i].bank.toLocaleString()}`)
                        } else {
                            embed.addField(`${i + 1}. ${member.user.username}`, `**Bank Amount:** $${res[i].bank.toLocaleString()}`)
                        }
                    }
                } else {
                    for(i = 0; i < 5; i++) {
                        let member = message.guild.members.cache.get(res[i].userID || "User Left")
                        if(member === "User Left") {
                            embed.addField(`${i + 1}. ${member}`, `**Bank Amount:** $${res[i].bank.toLocaleString()}`)
                        } else {
                            embed.addField(`${i + 1}. ${member.user.username}`, `**Bank Amount:** $${res[i].bank.toLocaleString()}`)
                        }
                    }
                }

                message.channel.send({embeds: [embed]})
            })
        }
    }
}