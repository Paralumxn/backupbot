const { MessageEmbed, Message } = require('discord.js')
const Axios = require('axios')

module.exports = {
    name: "animal",
    aliases: ["ani"],
    description: "Information Animal",
    cooldown: 0,
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle('Animal List')
            .setColor('RANDOM')
            .setTimestamp()
            .addField(`Commands:`, "`dog, cat, breed, fox, birds, panda, koala, bunny, duck, penguin`")
            .addField(`Prefix(es):`, "`ani`")

            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'dog') {
            Axios.get('https://api.thedogapi.com/v1/images/search')
            .then((res) => {
                const dog = new MessageEmbed()
                .setTitle('Arf!')
                .setImage(res.data[0].url)
                .setDescription(`${message.author.username}, get your dog now!`)
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [dog]})
            })
        } else if(args[0] === 'breed') {
            let RN = Math.floor(Math.random() * 100) - 1
            if(RN < 50) {
                Axios.get('https://api.thedogapi.com/v1/breeds')
                .then((res) => {
                    const embed = new MessageEmbed()
                    .setTitle(res.data[Math.floor(Math.random() * res.data.length)].name || "No Name found")
                    .setImage(res.data[Math.floor(Math.random() * res.data.length)].image.url)
                    .addField(`Weight:`, `${res.data[Math.floor(Math.random() * res.data.length)].weight.imperial || "No Weight found"}`, true)
                    .addField(`Height:`, `${res.data[Math.floor(Math.random() * res.data.length)].height.imperial || "No Height found"}`, true)
                    .addField(`Bred for:`, `${res.data[Math.floor(Math.random() * res.data.length)].bred_for || "No Bred found"}`, true)
                    .addField(`Breed Group`, `${res.data[Math.floor(Math.random() * res.data.length)].breed_group || "No Breed Group found"}`, true)
                    .addField(`Life Span:`, `${res.data[Math.floor(Math.random() * res.data.length)].life_span || "No Life span found"}`, true)
                    .addField(`Origin:`, `${res.data[Math.floor(Math.random() * res.data.length)].origin || "No Origin found"}`, true)
                    .setColor('RANDOM')
                    .setTimestamp()
                    message.channel.send({embeds: [embed]})
                })
            } else {
                Axios.get('https://api.thecatapi.com/v1/breeds')
                .then((res) => {
                    const embed = new MessageEmbed()
                    .setTitle(res.data[Math.floor(Math.random() * res.data.length)].name || "No Name found")
                    .setImage(res.data[Math.floor(Math.random() * res.data.length)].image.url)
                    .setDescription(res.data[Math.floor(Math.random() * res.data.length)].description || "No Description found")
                    .addField(`Weight:`, `${res.data[Math.floor(Math.random() * res.data.length)].weight.imperial || "No Weight found"}`, true)
                    .addField(`Origin:`, `${res.data[Math.floor(Math.random() * res.data.length)].origin || "No Origin found"}`, true)
                    .setColor('RANDOM')
                    .setTimestamp()
                    message.channel.send({embeds: [embed]})
                })
            }


        } else if(args[0] === 'cat') {
            Axios.get('https://api.thecatapi.com/v1/images/search')
            .then((res) => {
                const cat = new MessageEmbed()
                .setTitle('Meow!')
                .setImage(res.data[0].url)
                .setDescription(`${message.author.username}, get your cat now!`)
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [cat]})
            })

        } else if(args[0] === 'fox') {
            Axios.get('https://randomfox.ca/floof/?ref=apilist.fun')
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle('FOXY!')
                .setImage(res.data.image)
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [embed]})
            })
        } else if(args[0] === 'birds') {
            Axios.get('http://shibe.online/api/birds')
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle('BIRDS!')
                .setImage(res.data[0])
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [embed]})
            })
        } else if(args[0] === "panda") {
            let RN = Math.floor(Math.random() * 100) - 1
            if(RN > 50) {
                Axios.get('https://some-random-api.ml/img/panda')
                .then((res) => {
                    const embed = new MessageEmbed()
                    .setTitle('PANDAAAA')
                    .setImage(res.data.link)
                    .setTimestamp()
                    .setColor('RANDOM')

                    message.channel.send({embeds: [embed]})
                })
            } else {
                Axios.get('https://some-random-api.ml/img/red_panda')
                .then((res) => {
                    const embed = new MessageEmbed()
                    .setTimestamp()
                    .setTitle('RED PANDAAAA')
                    .setImage(res.data.link)
                    .setColor('RANDOM')

                    message.channel.send({embeds: [embed]})
                })
            }
        } else if(args[0] === 'koala') {
            Axios.get('https://some-random-api.ml/img/koala')
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle('KOALAAA')
                .setImage(res.data.link)
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [embed]})
            })
        } else if(args[0] === "bunny") {
            Axios.get('https://api.bunnies.io/v2/loop/random/?media=gif,png')
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle('BUNNYYY')
                .setImage(res.data.media.gif)
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [embed]})
            })
        } else if(args[0] === "duck") {
            Axios.get('https://random-d.uk/api/v1/random?type=gif')
            .then((res) => {
                const embed = new MessageEmbed()
                .setTitle('DUCKS')
                .setImage(res.data.url)
                .setColor('RANDOM')
                .setTimestamp()

                message.channel.send({embeds: [embed]})
            })
        }
    }
}