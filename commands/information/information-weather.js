const { MessageEmbed } = require('discord.js')
const Axios = require('axios')
const { weatherkey } = require('../../config.json')

module.exports = {
    name: "weather",
    aliases: ['weath', 'w'],
    description: "Information Weather",
    usage: "weather",
    cooldown: 0,
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setDescription(`To use this command, type:\n${prefix}weather <country>`)

            message.channel.send({embeds: [embed]})
        } else {
            Axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${weatherkey}&q=${args.slice(0).join(" ")}&aqi=no`)
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle(`${res.data.current.condition.text || "No data"}`)
                .setColor("RANDOM")
                .setThumbnail(`https:${res.data.current.condition.icon}`)
                .setTimestamp()
                .setFooter({text: `Last Update: ${res.data.current.last_updated || "No data"}`})
                .addFields(
                    {name: "Location:", value: `${res.data.location.name || "No data"}`, inline: true},
                    {name: "Region:", value:`${res.data.location.region || "No data"}`, inline: true},
                    {name: "Country:", value: `${res.data.location.country || "No data"}`, inline: true},
                    {name: "Temperature:", value: `${res.data.current.temp_f || "No data"}`, inline: true},
                    {name: "Wind:", value: `${res.data.current.wind_mph || "No data"}`, inline: true}
                )

                message.channel.send({embeds: [embed]})
            })
        }
    }
}