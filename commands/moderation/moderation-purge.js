module.exports = {
    name: "clear",
    aliases: ["purge"],
    description: "To clear messages",
    cooldown: 0,
    usage: "clear",
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .addField("To use this command:", `${prefix}clear <amount>`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0]) {
            try {
                let amount = args[0]

                if(amount > 100 || amount < 1) {
                    return message.reply("You can only delete message starting with 1-100")
                }

                message.channel.bulkDelete(amount).catch(async () => {
                    return message.reply("Due to Discord Limitation, I can't a message that over 14 days passed.")
                })

                await message.channel.send(`**${amount}** messages deleted.`).then((msg) => {
                    setTimeout(() => {
                        msg.delete()
                    }, 5000)
                })  
            } catch {
                
            }
        }
    }
}