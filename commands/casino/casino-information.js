const { MessageEmbed } = require('discord.js')


module.exports = {
    name: "casino",
    aliases: [""],
    cooldown: 0,
    description: "Casino Information",
    async execute(client, message, args, prefix) {
        const embed = new MessageEmbed()
        .setTitle('CASINO GAME')
        .setDescription(`Start playing casino by typing ${prefix}start`)
        .addField("Moderators Commands:", "`add, add-amount`")
        .addField("Members Commands:", "`balance, beg, daily, weekly, work, rob, deposit, withdraw, leaderboard`")
        .setColor('RANDOM')
        .setTimestamp()

        message.channel.send({embeds: [embed]})
    }
}