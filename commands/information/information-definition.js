const { MessageEmbed } = require('discord.js')
const Axios = require('axios')
const { key } = require('../../config.json')

module.exports = {
    name: "definition",
    aliases: ["def", "define"],
    cooldown: 0,
    description: "To give definiton to a word",
    usage: "definition",
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setDescription('DEFINITION')
            .setDescription("You can use this for finding a definition of a word.")
            .addField("To use this:", `${prefix}definition <Word>`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed] })
        } else if(args[0]) {
            const word = args.slice(0).join(" ")
            Axios.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${key}`)
            .then((res) => {
                try {
                    const embed = new MessageEmbed()
                    .setTitle(`${word}`)
                    .setDescription(`${res.data[Math.floor(Math.random() * res.data.length)].shortdef[0] || "No meaning."}`)
                    .setColor('RANDOM')
                    .setTimestamp()
    
                    message.channel.send({embeds: [embed]})
                } catch (err) {
                    message.reply("Word didn't exist")
                }
            })
        }
    }
}