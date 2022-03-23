const { MessageEmbed } = require('discord.js')
const Axios = require('axios')

module.exports = {
    name: "binary",
    aliases: [""],
    cooldown: 0,
    description: "Information Binary",
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .setTitle("Binary List")
            .addField('Commands:', "`encode, decode`")
            .addField(`How to use:`, `${prefix}binary encode (binary) || ${prefix}binary decode (binary)`)

            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'encode') {
            const messages = args.slice(1).join(" ")
            Axios.get(`https://some-random-api.ml/binary?encode=${messages}`)
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle('Encoder')
                .setDescription(res.data.binary)
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [embed]})
            })
        } else if(args[0] === 'decode') {
            const messages = args.slice(1).join(" ")
            Axios.get(`https://some-random-api.ml/binary?decode=${messages}`)
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