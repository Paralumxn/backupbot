const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "servers",
    aliases: [""],
    cooldown: 0,
    description: "Secret Developer Command",
    async execute(client, message, args) {
        try {
            if(message.author.id != "431099770212319232") {
                return message.reply("You're not the Owner of this bot.")
            }

            let data = [];
            client.guilds.cache.forEach((x) => {
                const embed = new MessageEmbed()
                .addField(`Server Name:`, `**${x.name}**`)
                .addField(`Member Count:`, `${x.memberCount}`)
                .addField(`Members ID:`, `${x.id}\n............................`)
                message.channel.send({embeds: [embed]})
            })

            if (data.length > 0) {
                data.sort();
                data = `+ ` + data.join("\n+");
              } else {
                data = "[No server found]";
              }

        } catch (err) {
            console.log(err)
        }
    }
}