const { Permissions, MessageEmbed } = require('discord.js')
const roleBackEnable = require('../../Schemas/roleBackSchema')

module.exports = {
    name: "enable-roleback",
    aliases: ["enableroleback"],
    description: "To give back the role level to the member",
    async execute(client, message, args) {
        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command.")

        roleBackEnable.findOne({
            guildID: message.guild.id
        }, async(err, data) => {
            if(data) {
                data.guildID
                data.save()
            } else {
                new roleBackEnable({
                    guildID: message.guild.id
                }).save()
            }
        })

        message.channel.send("Role back system Enabled.")
    }
}