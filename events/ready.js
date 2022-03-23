module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        client.user.setPresence({
            status: "streaming"
        });
      
        client.user.setActivity({
            type: "STREAMING",
            name: `over ${client.guilds.cache.size} servers.`,
            url: "https://www.twitch.tv/paralumxn"
        });
      
          console.log(client.user.tag + ' has logged in.');
    }
}