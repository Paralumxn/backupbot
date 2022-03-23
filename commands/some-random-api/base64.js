const { MessageEmbed, Message } = require('discord.js')
const Axios = require('axios')

module.exports = {
    name: "base64",
    aliases: [""],
    cooldown: 1000 * 5,
    description: "Information Binary",
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .setTitle("Binary List")
            .addField('Commands:', "`encode, decode`")
            .addField(`How to use:`, `${prefix}base64 encode (binary) || ${prefix}base64 decode (binary)`)

            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'encode') {
            const messages = args.slice(1).join(" ")
            Axios.get(`https://some-random-api.ml/base64?encode=${messages}`)
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle('Encoder')
                .setDescription(res.data.base64)
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [embed]})
            })
        } else if(args[0] === 'decode') {
            const messages = args.slice(1).join(" ")
            Axios.get(`https://some-random-api.ml/base64?decode=${messages}`)
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle('Decoder')
                .setDescription(res.data.text)
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [embed]})
            })
        }
    }
}