const { MessageEmbed } = require('discord.js')
const Axios = require('axios')

module.exports = {
    name: "trivia",
    aliases: ["triv"],
    cooldown: 0,
    description: "Infomation Trivia",
    async execute(client, message, args) {
        if(!args[0]) {
            let RN = Math.floor(Math.random() * 100) - 1
            if(RN > 75) {
                Axios.get('http://numbersapi.com/random/date')
                .then((res) => {
                    const embed = new MessageEmbed()
                    .setTitle("Day Trivia")
                    .setDescription(res.data)
                    .setColor('RANDOM')
                    .setTimestamp()
                    .setFooter({text: `${message.author.username}`})
    
                    message.channel.send({embeds: [embed]})
                })
            } else if(RN > 50) {
                Axios.get('http://numbersapi.com/random/trivia')
                .then((res) => {
                    const embed = new MessageEmbed()
                    .setTitle("Trivia")
                    .setDescription(res.data)
                    .setColor('RANDOM')
                    .setTimestamp()
                    .setFooter({text: `${message.author.username}`})
    
                    message.channel.send({embeds: [embed]})
                })
            } else if(RN > 25) {
                Axios.get('http://numbersapi.com/random/year')
                .then((res) => {
                    const embed = new MessageEmbed()
                    .setTitle("Year Trivia")
                    .setDescription(res.data)
                    .setColor('RANDOM')
                    .setTimestamp()
                    .setFooter({text: `${message.author.username}`})
    
                    message.channel.send({embeds: [embed]})
                })
            } else {
                Axios.get('http://numbersapi.com/random/math')
                .then((res) => {
                    const embed = new MessageEmbed()
                    .setTitle("Math Trivia")
                    .setDescription(res.data)
                    .setColor('RANDOM')
                    .setTimestamp()
                    .setFooter({text: `${message.author.username}`})
    
                    message.channel.send({embeds: [embed]})
                })
            }

        } else if(args[0] === 'day') {
            Axios.get('http://numbersapi.com/random/date')
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle("Day Trivia")
                .setDescription(res.data)
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter({text: `${message.author.username}`})

                message.channel.send({embeds: [embed]})
            })
        } else if(args[0] === 'year') {
            Axios.get('http://numbersapi.com/random/year')
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle("Year Trivia")
                .setDescription(res.data)
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter({text: `${message.author.username}`})

                message.channel.send({embeds: [embed]})
            })
        } else if(args[0] === 'trivia') {
            Axios.get('http://numbersapi.com/random/trivia')
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle("Trivia")
                .setDescription(res.data)
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter({text: `${message.author.username}`})

                message.channel.send({embeds: [embed]})
            })
        } else if(args[0] === 'math') {
            Axios.get('http://numbersapi.com/random/math')
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle("Math Trivia")
                .setDescription(res.data)
                .setColor('RANDOM')
                .setTimestamp()
                .setFooter({text: `${message.author.username}`})

                message.channel.send({embeds: [embed]})
            })
        }
    }
}