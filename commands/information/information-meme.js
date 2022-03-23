const { MessageEmbed } = require('discord.js')
const Axios = require('axios')

module.exports = {
    name: "meme",
    aliases: [""],
    cooldown: 0,
    description: "Information Meme",
    async execute(client, message, args) {
        if(!args[0]) {
            Axios.get('https://meme-api.herokuapp.com/gimme')
            .then((res) => {
            const embed = new MessageEmbed()
            .setTitle(res.data.title)
            .setImage(res.data.url)
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter({text: res.data.author})

            message.channel.send({embeds: [embed]})
        })
        } else if(args[0] === 'get') {
            Axios.get('https://api.imgflip.com/get_memes')
            .then((res) => {
                const generate = res.data.data.memes[Math.floor(Math.random() * res.data.data.memes.length)]
                const embed = new MessageEmbed()
                .setTitle(generate.name)
                .setImage(generate.url)
                .setColor('RANDOM')
                .setTimestamp()
                message.channel.send({embeds: [embed]})
            })
        }
    }
}