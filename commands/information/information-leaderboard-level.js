const Levels = require('discord.js-leveling')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "leaderboard-xp",
    aliases: ["lb-exp", "lb-xp", "leaderboard-exp"],
    description: "To see the top 5 level rankings",
    async execute(client, message, args) {
       try {
        const Leaderboard = await Levels.fetchLeaderboard(message.guild.id, 5);
        if (Leaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(client, Leaderboard, true);
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);
        const leaderboardembed = new MessageEmbed()
        .setTitle("**LEADERBOARD**")
        .setDescription(`${lb.join("\n\n")}`)
        .setColor('RANDOM')
        .setTimestamp()
        message.channel.send({embeds: [leaderboardembed]});
       } catch (err){
           console.log(err)
       }
    }
}