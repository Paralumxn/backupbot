const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "handlers",
    description: "Information Handlers",
    usage: "handlers",
    cooldown: 0,
    aliases: ["handler"],
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle("Handlers")
            .setDescription(`To see the handlers type:\n${prefix}handlers <command> | <slash>`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0] === "command") {
            const embed = new MessageEmbed()
            .setTitle("Command Handler")
            .setDescription("**[Command Handler, Click here](https://drive.google.com/uc?id=1jxbh8QfelEhDHPYMNnkCyZ9xbynJEcqR&export=download)**")
            .setColor('RANDOM')
            .setTimestamp()
            .setAuthor({name: "Handler Creator: Paralumxn"})

            message.channel.send({embeds: [embed]})
        } else if(args[0] === "slash") {
            const embed = new MessageEmbed()
            .setTitle("Slash Command Handler")
            .setDescription("**[Slash Command Handler, Click here](https://drive.google.com/uc?id=1GBRY0W7qz9pkaT_JSeX3zbhek25S4ScF&export=download)**")
            .setColor('RANDOM')
            .setTimestamp()
            .setAuthor({name: "Handler Creator: Paralumxn"})

            message.channel.send({embeds: [embed]})
        }
    }
}