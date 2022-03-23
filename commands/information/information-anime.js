const { MessageEmbed } = require('discord.js')
const Axios = require('axios')

module.exports = {
    name: "anime",
    aliases: [""],
    cooldown: 0,
    description: "Information Anime",
    async execute(client, message, args) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle("ANIME LIST")
            .addField("COMMANDS", "`uniform, maid, waifu, oppai`")
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0] === "uniform") {
            Axios.get('https://api.waifu.im/random/?selected_tags=uniform')
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
        } else if(args[0] === 'maid') {
            Axios.get('https://api.waifu.im/random/?selected_tags=maid')
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
        } else if(args[0] === 'waifu') {
            Axios.get('https://api.waifu.im/random/?selected_tags=waifu')
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
        } else if(args[0] === 'oppai') {
            Axios.get('https://api.waifu.im/random/?selected_tags=oppai')
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
        }
    }
}