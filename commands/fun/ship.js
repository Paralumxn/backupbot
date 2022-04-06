const { MessageEmbed, MessageAttachment } = require('discord.js')

module.exports = {
    name: "ship",
    aliases: [""],
    description: "Fun Ship",
    cooldown: 0,
    usage: "ship",
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .setDescription(`To use this command, type:\n${prefix}ship <random> || <@member>`)
            
            message.channel.send({embeds: [embed]})
        } else if(args[0] === "random") {
            const member = message.guild.members.cache.random()
            const member1 = message.guild.members.cache.random()
            let RN = Math.floor(Math.random() * 100)

            if(RN > 50) {
                const Canvas = require('canvas')
                const path = require('path')

                const canvas = Canvas.createCanvas(700, 250)
                const ctx = canvas.getContext('2d')
                const background = await Canvas.loadImage(
                    path.join(__dirname, '../../images/background.png')
                )
                let x = 0
                let y = 0
                ctx.drawImage(background, x, y)

                const heart = [
                    "../../images/heart1.jpg",
                    "../../images/heart2.jpg"
                ]
                const random = Math.floor(Math.random() * heart.length)
                const hearty = await Canvas.loadImage(
                    path.join(__dirname, heart[random])
                )

                x = 263
                y = 25
                ctx.drawImage(hearty, x, y, 200, 200)

                const pfp = await Canvas.loadImage(
                    member1.user.displayAvatarURL({
                        format: 'png',
                    })
                )

                x = 25
                y = 25
                ctx.drawImage(pfp, x, y, 200, 200)

                const pfp1 = await Canvas.loadImage(
                    member.user.displayAvatarURL({
                        format: 'png',
                    })
                )

                x = 500
                y = 25
                ctx.drawImage(pfp1, x, y, 200, 200)

                const attachment = new MessageAttachment(canvas.toBuffer())
                message.channel.send({content: `${member1.user.username} and ${member.user.username} got ${RN}% love rate!`, files: [attachment]})
            } else {
                const Canvas = require('canvas')
                const path = require('path')

                const canvas = Canvas.createCanvas(700, 250)
                const ctx = canvas.getContext('2d')
                const background = await Canvas.loadImage(
                    path.join(__dirname, '../../images/background.png')
                )
                let x = 0
                let y = 0
                ctx.drawImage(background, x, y)

                const heart = [
                    "../../images/broken1.jpg",
                    "../../images/broken2.jpg"
                ]
                const random = Math.floor(Math.random() * heart.length)
                const hearty = await Canvas.loadImage(
                    path.join(__dirname, heart[random])
                )

                x = 263
                y = 25
                ctx.drawImage(hearty, x, y, 200, 200)

                const pfp = await Canvas.loadImage(
                    member1.user.displayAvatarURL({
                        format: 'png',
                    })
                )

                x = 25
                y = 25
                ctx.drawImage(pfp, x, y, 200, 200)

                const pfp1 = await Canvas.loadImage(
                    member.user.displayAvatarURL({
                        format: 'png',
                    })
                )

                x = 500
                y = 25
                ctx.drawImage(pfp1, x, y, 200, 200)

                const attachment = new MessageAttachment(canvas.toBuffer())
                message.channel.send({content: `${member1.user.username} and ${member.user.username} got ${RN}% love rate!`, files: [attachment]})
            }
        } else if(args[0]) {
            let RN = Math.floor(Math.random() * 100)
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if(RN > 50) {
                const Canvas = require('canvas')
                const path = require('path')

                const canvas = Canvas.createCanvas(700, 250)
                const ctx = canvas.getContext('2d')
                const background = await Canvas.loadImage(
                    path.join(__dirname, '../../images/background.png')
                )
                let x = 0
                let y = 0
                ctx.drawImage(background, x, y)

                const heart = [
                    "../../images/heart1.jpg",
                    "../../images/heart2.jpg"
                ]
                const random = Math.floor(Math.random() * heart.length)
                const hearty = await Canvas.loadImage(
                    path.join(__dirname, heart[random])
                )

                x = 263
                y = 25
                ctx.drawImage(hearty, x, y, 200, 200)

                const pfp = await Canvas.loadImage(
                    member.user.displayAvatarURL({
                        format: 'png',
                    })
                )

                x = 25
                y = 25
                ctx.drawImage(pfp, x, y, 200, 200)

                const pfp1 = await Canvas.loadImage(
                    message.author.displayAvatarURL({
                        format: 'png',
                    })
                )

                x = 500
                y = 25
                ctx.drawImage(pfp1, x, y, 200, 200)

                const attachment = new MessageAttachment(canvas.toBuffer())
                message.channel.send({content: `${message.author.username} and ${member.user.username} got ${RN}% love rate!`, files: [attachment]})
            } else {
                const Canvas = require('canvas')
                const path = require('path')

                const canvas = Canvas.createCanvas(700, 250)
                const ctx = canvas.getContext('2d')
                const background = await Canvas.loadImage(
                    path.join(__dirname, '../../images/background.png')
                )
                let x = 0
                let y = 0
                ctx.drawImage(background, x, y)

                const heart = [
                    "../../images/broken1.jpg",
                    "../../images/broken2.jpg"
                ]
                const random = Math.floor(Math.random() * heart.length)
                const hearty = await Canvas.loadImage(
                    path.join(__dirname, heart[random])
                )

                x = 263
                y = 25
                ctx.drawImage(hearty, x, y, 200, 200)

                const pfp = await Canvas.loadImage(
                    member.user.displayAvatarURL({
                        format: 'png',
                    })
                )

                x = 25
                y = 25
                ctx.drawImage(pfp, x, y, 200, 200)

                const pfp1 = await Canvas.loadImage(
                    message.author.displayAvatarURL({
                        format: 'png',
                    })
                )

                x = 500
                y = 25
                ctx.drawImage(pfp1, x, y, 200, 200)

                const attachment = new MessageAttachment(canvas.toBuffer())
                message.channel.send({content: `${message.author.username} and ${member.user.username} got ${RN}% love rate!`, files: [attachment]})
            }
        }
    }
}