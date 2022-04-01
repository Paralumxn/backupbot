const { MessageEmbed } = require('discord.js')
const economy = require('../../Schemas/casinoSchema/main-schema')

module.exports = {
    name: "slotmachine",
    aliases: ["slot", "slots"],
    description: "Casino Slot Machine",
    cooldown: 0,
    usage: "slotmachine",
    async execute(client, message, args) {
        const amount = parseFloat(args[0])
        const exist = await economy.findOne({
            guildID: message.guild.id,
            userID: message.author.id
        })

        if(!exist) return message.reply("You don't have any records yet.")
        const embed = new MessageEmbed()
        .setDescription(`You don't have enough balance, your current balance is $${exist.wallet.toLocaleString()}`)
        if(amount > exist.wallet) return message.channel.send({embeds: [embed]})

        let slots = ["💎", "❤️", "♠️"];
        let result1 = Math.floor((Math.random() * slots.length));
        let result2 = Math.floor((Math.random() * slots.length));
        let result3 = Math.floor((Math.random() * slots.length));

        if (result1 === result2 && result1 === result3) {
            economy.findOneAndUpdate({
                guildID: message.guild.id,
                userID: message.author.id
            }, {$inc: {wallet: amount}}, async(err, data) => {
                data.wallet += amount * 2
                data.save()
                const embed = new MessageEmbed()
                .setFooter({text: `You won total of $${amount.toLocaleString() * 2}`})
                .setTitle(':slot_machine: :slot_machine: :slot_machine:')
                .addField('Result:', `${slots[result1]} ${slots[result2]} ${slots[result3]}`)
                .setColor('RANDOM')
                message.channel.send({embeds: [embed]});
            })
        } else {
            economy.findOneAndUpdate({
                guildID: message.guild.id,
                userID: message.author.id
            }, {$inc: {wallet: amount}}, async(err, data) => {
                data.wallet -= amount
                data.save()

                const embed = new MessageEmbed()
                .setFooter({text: `You lost total of $${amount.toLocaleString()}`})
                .setTitle(':slot_machine: :slot_machine: :slot_machine:')
                .addField('Result:', `${slots[result1]} ${slots[result2]} ${slots[result3]}`, true)
                .setColor('RANDOM')
                message.channel.send({embeds: [embed]});
            })
        }
    }
}