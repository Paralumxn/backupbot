const { MessageEmbed } = require('discord.js')
const paginator = require('../../events/helpPaginator')

module.exports = {
    name: "help",
    aliases: ["h"],
    description: "Help List",
    usage: "help || h",
    async execute(client, message, args, prefix) {
        if(!args[0]) {
            const page1 = new MessageEmbed()
            .setTitle("Help List Commands")
            .setDescription(`**MODERATION COMMAND** || To use this command, type ${prefix}commands`)
            .setColor('RANDOM')
            .setTimestamp()
            .addField(`Configuration Level:`, `${prefix}enable-level\n${prefix}disable-level`, true)
            .addField(`Configuration Modlog:`, `${prefix}set-modlog\n${prefix}delete-modlog\n${prefix}update-modlog`, true)
            .addField(`Configuration Modlog:`, `${prefix}enable-modlog\n${prefix}disable-modlog`, true)
            .addField(`Configuration Prefix:`, `${prefix}set-prefix\n${prefix}update-prefix\n${prefix}delete-prefix`, true)
            .addField(`Configuration Roleback:`, `${prefix}enable-roleback\n${prefix}disable-roleback`, true)
            .addField(`Configuration Welcome Banner:`, `${prefix}enable-welcome\n${prefix}disable-welcome`, true)
            .addField(`Configuration Suggestion:`, `${prefix}set-suggestion`, true)

            const page2 = new MessageEmbed()
            .setTitle("Help List Commands")
            .setDescription(`**MODERATORS LEVEL COMMAND** || To use this command, type ${prefix}commands`)
            .setColor('RANDOM')
            .setTimestamp()
            .addField(`MODERATION:`, "`add-exp, add-level, set-level, set-exp, subtract-level, subtract-exp`")

            const page3 = new MessageEmbed()
            .setTitle("Help List Commands")
            .setDescription(`**MODERATORS COMMAND** || To use this command, type ${prefix}commands`)
            .setColor('RANDOM')
            .setTimestamp()
            .addField(`MODERATION:`, "`add-role, ban, kick, mute, unmute, poll, remove-role, temp-mute, warning, accept-suggestion, decline-suggestion`")

            const page4 = new MessageEmbed()
            .setTitle("Help List Commands")
            .setDescription(`**ACTION & EMOTES COMMAND** || To use this command, type ${prefix}commands`)
            .setColor('RANDOM')
            .setTimestamp()
            .addFields(
                {
                    name: "ACTIONS:", value: "`bite, boop, bully, cuddle, greet, highfive, hold, holdinghands, hug, kill, kiss, lick, nom, pat, poke, punch, revive, slap, snuggle, stare, tickle, wave`"
                },
                {
                    name: "EMOTES:", value: "`blush, cry, dance, deredere, grin, happy, lewd, pout, scoff, shrug, sleepy, smile, smug, teehee, thinking, thumbsup, triggered, wag`"
                }
            )

            const page5 = new MessageEmbed()
            .setTitle("Help List Commands")
            .setDescription(`**INFORMATION COMMAND** || To use this command, type ${prefix}commands`)
            .setColor('RANDOM')
            .setTimestamp()
            .addField(`FRIENDLY COMMANDS:`, "`nsfw, casino, afk, animal, anime, avatar, confess, leaderboard-xp, level, meme, messagecount, roleinfo, trivia, uptime, vote, whois, suggestion, base64, binary, help <command>`")

            
            let pages = [page1, page2, page3, page4, page5]
            paginator(message, pages)
        } else if(args[0]) {
            try {
                const cmd = client.commands.find(x => x.name == args[0])
            
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTimestamp()
                .addField(`NAME:`, `${cmd.name}`)
                .addField(`DESCRIPTION:`, `${cmd.description || "No Description Found"}`)
                .addField(`ALIASES:`, `${cmd?.aliases[0] ? cmd.aliases.join(", ") : "No aliases"}`)
                
                message.channel.send({embeds: [embed]})
            } catch {
                message.reply("Wrong Syntax, Give Command name.")
            }
            
        }
    }
}