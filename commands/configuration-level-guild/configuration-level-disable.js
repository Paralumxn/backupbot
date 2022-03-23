const { MessageEmbed, Permissions } = require('discord.js')
const levelDisable = require('../../Schemas/levelEnableSchema')

module.exports = {
    name: "disablelevel",
    aliases: ["disable-level"],
    description: "Disable level system",
    async execute(client, message, args) {

        if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.reply("You can't use this command.")

        await levelDisable.findOneAndRemove({
            guildID: message.guild.id
        })

        message.channel.send("Leveling system disabled.")
    }
}