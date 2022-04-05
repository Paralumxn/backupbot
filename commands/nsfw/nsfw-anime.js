const { MessageEmbed, UserFlags, Message } = require('discord.js')
const NSFW = require('discord-nsfw')
const nsfw = new NSFW()
const Axios = require('axios')

module.exports = {
    name: "hentai-nsfw",
    aliases: ["hentai"],
    cooldown: 0,
    description: "NSFW Content",
    async execute(client, message, args) {
        if(message.channel.nsfw) {
            if(!args[0]) {
                const embed = new MessageEmbed()
                .setTitle('NSFW REAL LIFE LIST')
                .addField(`This command only works for NSFW Channels`, "`erokemo, hentai, ass, midriff, thigh, kitsune, lewd, nekopussy, nekofeet, nekosolo, nekotits, wallpaper`")
                .addField(`New added:`, "`ecchi, nsfw_avatar, nsfw_neko_gif`")
                .setTimestamp()
                .setColor('RANDOM')
                .setFooter({text: `${message.author.username}`})

                message.channel.send({embeds: [embed]})
            } else if(args[0] === "erokemo") {
                const erokemo = await nsfw.erokemo();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(erokemo)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === 'hentai') {
                const hentai = await nsfw.hentai();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(hentai)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === "ass") {
                const hentaiass = await nsfw.hentaiass();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(hentaiass)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === "midriff") {
                const hmidriff = await nsfw.hmidriff();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(hmidriff)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === "thigh") {
                const hentaithigh = await nsfw.hentaithigh();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(hentaithigh)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === 'kitsune') {
                const kitsune = await nsfw.kitsune();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(kitsune)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === "lewd") {
                const lewd = await nsfw.lewd();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(lewd)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === 'nekofeet') {
                const nekofeet = await nsfw.nekofeet();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(nekofeet)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === 'nekopussy') {
                const nekopussy = await nsfw.nekopussy();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(nekopussy)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === 'nekosolo') {
                const solo = await nsfw.solo();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(solo)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === "nekotits") {
                const nekotits = await nsfw.nekotits();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(nekotits)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === "wallpaper") {
                const wallpaper = await nsfw.wallpaper();
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setImage(wallpaper)
                .setTimestamp()
                .setAuthor({iconURL: `${message.author.avatarURL()}`,name: `${message.member.user.tag}`})
                
                message.channel.send({embeds: [embed]})
            } else if(args[0] === "ecchi") {
                Axios.get('https://api.waifu.im/random/?selected_tags=ecchi')
                .then((res) => {
                    const picture = res.data.images[0]
                    const generate = res.data.images[0].tags[0]
                    const embed = new MessageEmbed()
                    .setTitle(generate.description)
                    .setImage(picture.url)
                    .setColor('RANDOM')
                    .setTimestamp()
                    .setFooter({text: `Favorites: ${res.data.images[0].favourites}`})

                    message.channel.send({embeds: [embed]})
                })
            } else if(args[0] === "nsfw_avatar") {
                Axios.get('https://nekos.life/api/v2/img/nsfw_avatar')
                .then((res) => {
                    const embed = new MessageEmbed()
                    .setTitle('NSFW AVATAR')
                    .setImage(res.data.url)
                    .setColor('RANDOM')
                    .setTimestamp()
                    
                    message.channel.send({embeds: [embed]})
                })
            } else if(args[0] === "nsfw_neko_gif") {
                Axios.get('https://nekos.life/api/v2/img/nsfw_neko_gif')
                .then((res) => {
                    const embed = new MessageEmbed()
                    .setTitle('Neko Gif')
                    .setImage(res.data.url)
                    .setColor('RANDOM')
                    .setTimestamp()

                    message.channel.send({embeds: [embed]})
                })
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