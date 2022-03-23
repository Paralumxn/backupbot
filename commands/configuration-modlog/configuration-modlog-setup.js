const { MessageEmbed, Permissions } = require('discord.js')
const setChannel = require('../../Schemas/modlogSchema')

module.exports = {
    name: "setmodlog",
    aliases: ["set-modlog"],
    description: "To set a modlog",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply("You can't use this command")
        if(!message.guild.me.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.reply("I can't use this command.")
        
        
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply("What channel would you like to setup as modlog?")

        setChannel.findOne({
            guildID: message.guild.id,
            channelID: channel.id
        }, async (data, err) => {
            if(data) {
                data.channelID
                data.save()
            } else {
                new setChannel({
                    guildID: message.guild.id,
                    channelID: channel.id
                }).save()
            }
        })

        const embed = new MessageEmbed()
        .setTitle("MODLOG")
        .setColor('RANDOM')
        .setTimestamp()
        .addField(`Modlog channel:`, `${channel}`)
        .addField(`Set by: `, `${message.author}`)
        
        message.channel.send({embeds: [embed]})
    }
}