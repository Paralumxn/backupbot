const { MessageEmbed } = require('discord.js')
const translate = require('@iamtraction/google-translate')

module.exports = {
    name: "translate",
    aliases: ["trans", "translator"],
    description: "Information Translate",
    cooldown: 5000,
    usage: "translate",
    async execute(client, message, args, prefix)  {
        if(!args[0]) {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setTitle('Translator')
                .setDescription(`To use this command, type:\n${prefix}translate <language> <word>`)
                .addField(`Available Language:`, '`english, filipino, indonesia, japanese, korea, vietnam, hindi`')
                .addField(`Prefixes:`, "`eng, fil, indo, jap, kor, viet, hi`")
                .setColor('RANDOM')
            
            message.channel.send({embeds: [embed]})
        } else if(args[0] === "english" || args[0] === "eng") {
            const words = args.slice(1).join(" ")
            if(!words) return message.reply("Specify a word to translate.")

            const translated = await translate(words, {to: 'en'});
            const embed = new MessageEmbed()
            .addField('Given Word:', `${words}`)
            .addField('Translated:', `${translated.text}`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0] === "filipino" || args[0] === "fil") {
            const words = args.slice(1).join(" ")
            if(!words) return message.reply("Specify a word to translate.")
            
            const translated = await translate(words, {to: 'tl'});
            const embed = new MessageEmbed()
            .addField('Given Word:', `${words}`)
            .addField("Translated:", `${translated.text}`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'indonesia' || args[0] === "indo") {
            const words = args.slice(1).join(" ")
            if(!words) return message.reply("Specify a word to translate.")

            const translated = await translate(words, {to: 'id'});
            const embed = new MessageEmbed()
            .addField('Given Word:', `${words}`)
            .addField("Translated:", `${translated.text}`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'japanese' || args[0] === "jap") {
            const words = args.slice(1).join(" ")
            if(!words) return message.reply("Specify a word to translate.")

            const translated = await translate(words, {to: 'ja'});
            const embed = new MessageEmbed()
            .addField('Given Word:', `${words}`)
            .addField("Translated:", `${translated.text}`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'korea' || args[0] === "kor") {
            const words = args.slice(1).join(" ")
            if(!words) return message.reply("Specify a word to translate.")

            const translated = await translate(words, {to: 'ko'});
            const embed = new MessageEmbed()
            .addField('Given Word:', `${words}`)
            .addField("Translated:", `${translated.text}`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'vietnam' || args[0] === "viet") {
            const words = args.slice(1).join(" ")
            if(!words) return message.reply("Specify a word to translate.")

            const translated = await translate(words, {to: 'vi'});
            const embed = new MessageEmbed()
            .addField('Given Word:', `${words}`)
            .addField("Translated:", `${translated.text}`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        } else if(args[0] === 'hindi' || args[0] === "hin") {
            const words = args.slice(1).join(" ")
            if(!words) return message.reply("Specify a word to translate.")

            const translated = await translate(words, {to: 'hi'});
            const embed = new MessageEmbed()
            .addField('Given Word:', `${words}`)
            .addField("Translated:", `${translated.text}`)
            .setColor('RANDOM')
            .setTimestamp()

            message.channel.send({embeds: [embed]})
        }
    }
}