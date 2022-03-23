const { MessageEmbed } = require('discord.js')
const NSFW = require('discord-nsfw')
const nsfw = new NSFW()

module.exports = {
    name: "nsfw",
    aliases: [""],
    description: "NSFW CONTENT",
    async execute(client, message, args) {
        if(message.channel.nsfw) {
            if(!args[0]) {
                const embed = new MessageEmbed()
                .setTitle('NSFW REAL LIFE LIST')
                .addField(`This command only works for NSFW Channels`, "`anal, ass, boobs, 4k || fourk, gonewild || g-wild, porngif || p-gif, pussy, thigh`")
                .setTimestamp()
                .setColor('RANDOM')
                .setFooter({text: `${message.author.username}`})

                message.channel.send({embeds: [embed]})
            } else if(args[0] === "anal") {
                const anal = await nsfw.anal();
                    const embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setImage(anal)
                    .setTimestamp()
                    .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                    
                    message.channel.send({embeds: [embed]})
                
            } else if(args[0] === 'ass') {
                const ass = await nsfw.ass();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(ass)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === 'boobs') {
                const boobs = await nsfw.boobs();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(boobs)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === "4k" || args[0] ==='fourk') {
                const fourk = await nsfw.fourk();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(fourk)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === "gonewild" || args[0] === 'g-wild') {
                const gonewild = await nsfw.gonewild();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(gonewild)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === "porngif" || args[0] === "pgif") {
                const pgif = await nsfw.pgif();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(pgif)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === "pussy") {
                const pussy = await nsfw.pussy();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(pussy)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === 'thigh') {
                const thigh = await nsfw.thigh();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(thigh)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            }
        } else {
            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
            .setDescription('This command only work in NSFW channel.')
            message.channel.send({embeds: [embed]})
        }
    }
}