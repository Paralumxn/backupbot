const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "revive",
    aliases: [""],
    description: "Action",
    async execute(client, message, args) {
        let user = message.author
        
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setTitle(`${user.username} revived himself/herself!`)
            .setColor('RANDOM')
            .setTimestamp()
            .setImage('https://c.tenor.com/xAWRN4fLcoIAAAAM/resurrect-anime.gif')

            message.channel.send({embeds: [embed]})
        } else {
            let user1 = message.mentions.users.first() || await message.guild.members.cache.get(args[0])
            
            if(!user1) {
                return message.channel.send("I can't find this person")
            }
            
            const embed1 = new MessageEmbed()
            .setTitle(`${message.author.username} revived ${user1.user.username}`)
            .setColor('RANDOM')
            .setTimestamp()
            .setImage('https://c.tenor.com/xAWRN4fLcoIAAAAM/resurrect-anime.gif')

            message.channel.send({embeds: [embed1]})
        }
    }
}