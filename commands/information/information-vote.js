const { MessageEmbed } = require('discord.js')
const paginator = require('../../events/votePaginator')

module.exports = {
    name: "vote",
    aliases: [""],
    description: "Vote Lists",
    async execute(client, message, args) {
        const page1 = new MessageEmbed()
        .setTitle('DISCORD BOT VOTE LINKS')
        .addField(`DiscordBotList:`, `**[Click Here](https://discordbotlist.com/bots/reborn/upvote)**`, true)
        .addField(`TopGG:`, `**[Click Here](https://top.gg/bot/920487181137625139/vote)**`, true)
        .addField(`Discord Bot Invite Link:`, `**[Click Here](https://discord.com/api/oauth2/authorize?client_id=920487181137625139&permissions=1488172220151&scope=bot)**`, true)
        .setColor('RANDOM')
        .setTimestamp()

        const page2 = new MessageEmbed()
        .setTitle('DISCORD SERVER VOTE LINKS')
        .addField(`TopGG:`, `**[Click Here](https://top.gg/servers/948476177415282738/vote)**`, true)
        .addField(`Discords:`, `**[Click Here](https://discords.com/servers/948476177415282738/upvote)**`, true)
        .addField(`Discord Street:`, `**[Click Here](https://discord.st/vote/rebornserver/)**`, true)
        .addField(`DiscordHub:`, `**[Click Here](https://discordhub.com/server/948476177415282738/bump)**`, true)
        .addField(`Discord Servers:`, `**[Click Here](https://discordservers.com/server/948476177415282738/bump)**`, true)
        .addField(`Discord Server Invite Link`, `**[Click Here](https://discord.gg/invite/PtqjKkq4n6)**`, true)
        .setColor('RANDOM')
        .setTimestamp()

        const page3 = new MessageEmbed()
        .setTitle('OTHER LINKS')
        .addField(`Say Something to me!`, `**[Click Here](https://sayout.me/say/pxralumxn)**`, true)
        .addField(`Solo Website`, `**[Click Here](https://solo.to/paraluman)**`, true)
        .addField(`Official Website`, `**[Click Here](https://kanonblanc.github.io)**`, true)
        .addField(`GoDaddy Website`, `**[Click Here](https://paraluman.godaddysites.com/)**`, true)
        .setColor('RANDOM')
        .setTimestamp()


        let pages = [page1, page2, page3]
        paginator(message, pages)
    }
}