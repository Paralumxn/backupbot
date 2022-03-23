const { MessageEmbed } = require('discord.js')
const Axios = require('axios')

module.exports = {
    name: "wholesome",
    aliases: [""],
    description: "Wholesome Information",
    cooldown: 0,
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .setTitle("Wholesome List")
            .addField('Commands:', "`hex, rgba`")
            .addField(`How to use:`, `${prefix}hex hex || ${prefix}rgba rgba`)

            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'rgba') {
            const color = args.slice(1).join(" ")
            Axios.get(`https://some-random-api.ml/canvas/hex?rgb=${color}`)
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle("RGB")
                .setDescription(res.data.hex)
                .setColor('RANDOM')
                .setTimestamp()

                return message.channel.send({embeds: [embed]})

            })
            .catch(() => {
                const embed = new MessageEmbed()
                .setTitle("Incorrect rgb query")
                .setColor('RANDOM')
                .addField(`EXAMPLE:`, `rgba225,225,255`, true)
                .addField(`To execute this command:`, `${prefix}wholesome rgba rgba225,225,225`, true)
                .setTimestamp()
                message.reply({embeds: [embed]})
            })
        } else if(args[0] === 'hex') {
            const color = args.slice(1).join(" ")
            Axios.get(`https://some-random-api.ml/canvas/rgb?hex=${color}`)
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle("HEX")
                .setColor('RANDOM')
                .addField('R:', `${res.data.r}`, true)
                .addField('G:', `${res.data.g}`, true)
                .addField('B:', `${res.data.b}`, true)
                .setTimestamp()

                message.channel.send({embeds: [embed]})
            })
            .catch((err) => {
                const embed = new MessageEmbed()
                .setTitle("Incorrect hex query")
                .setColor('RANDOM')
                .addField(`EXAMPLE:`, `ANE100`, true)
                .addField(`To execute this command:`, `${prefix}wholesome hex ANE100`, true)
                .addField('Incorrect Query:', "#ANE100, ANE1000, #ane19999")
                .setTimestamp()
                message.reply({embeds: [embed]})
            })
        }
    }
}