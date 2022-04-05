const { Client, Intents, Collection, MessageEmbed, MessageAttachment } = require('discord.js');
require('dotenv').config();
const prefixSchema = require('./Schemas/setPrefix')

const client = new Client
({ intents: [Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
  Intents.FLAGS.GUILD_MESSAGES, 
  Intents.FLAGS.GUILD_MEMBERS, 
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_VOICE_STATES], 
 partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

 const { level, connection } = require('./config.json')

 const mongoose = require('mongoose')
 mongoose.connect(connection, {useUnifiedTopology: true, useNewUrlParser: true})

 const Levels = require('discord.js-leveling')
 Levels.setURL(level)
const ms = require('ms')
const fs = require('fs');
client.commands = new Collection();
client.aliases = new Collection();
const Timeout = new Collection();

const commandFolders = fs.readdirSync('./commands');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for(const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

    client.commands.set(command.name, command);

    command.aliases.forEach(alias => {
        client.aliases.set(alias, command.name);
      });
    }
}

for(const file of eventFiles) {
    const event = require(`./events/${file}`)

    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

client.on('messageCreate', async (message) => {

    let prefix;
    let data = await prefixSchema.findOne({
        guildID: message.guild.id
    })

    if(data === null) {
        prefix = "*"
    } else {
        prefix = data.Prefix
    }

    if(!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command) && !client.aliases.has(command)) return;
    

    try{
        const cmd = client.commands.get(command) || client.commands.find(a => a.aliases && a.aliases.includes(command))
        if(cmd) {
            if(cmd.cooldown) {
                if(Timeout.has(`${cmd.name}${message.author.id}`)) return message.channel.send(`You already used this command. Wait for ${ms(Timeout.get(`${cmd.name}${message.author.id}`) - Date.now(), {long: true})} to use again.`)
                if(cmd) cmd.execute(client, message, args, prefix)
                Timeout.set(`${cmd.name}${message.author.id}`, Date.now() + cmd.cooldown)
                setTimeout(() => {
                    Timeout.delete(`${cmd.name}${message.author.id}`)
                }, cmd.cooldown)
            } else {
                if(cmd) cmd.execute(client, message, args, prefix)
            }
        }
    } catch(err) {
        console.log(err)
    }

    
});

const messages = require('./Schemas/messagesSchema')

client.on('messageCreate', async (message) => {
    if(message.author.bot) return
    
    messages.findOne({
        guildID: message.guild.id,
        memberID: message.author.id
    }, async(err, users) => {
        if(users) {
            users.messageCount += 1
            users.save()
        } else {
            new messages({
                guildID: message.guild.id,
                memberID: message.author.id,
                messageCount: 0
            }).save()
        }
    })
})

/**
 * SCHEMA FOR SET CHANNELS
 */

const modGuild = require('./Schemas/modlog-guildSchema')
const mods = require('./Schemas/modlogSchema')
const levelEnable = require('./Schemas/levelEnableSchema')
const welcomeEnable = require('./Schemas/welcomeSchema')
const roleback = require('./Schemas/roleBackSchema')

/**
 * END OF SCHEMA FOR SET CHANNELS
 */

/**
 * MODLOG SYSTEM
 */

client.on('messageCreate', async (message) => {
    
    const mod = await modGuild.findOne({
        guildID: message.guild.id
    })

    const modlog = await mods.findOne({
        guildID: message.guild.id
    })

    try {

        if(message.guild.id === `${mod.guildID}`) {
            if(message.content.toLowerCase().includes("https://discode.gift")) {
            message.delete()
            const embed = new MessageEmbed()
            .setTitle("Deleted Link")
            .addField(`Sender:`, `${message.author}`)
            .addField(`Type of Link:`, `Pishing site`)
            .setColor('RANDOM')
            .setTimestamp()
            message.channel.send({embeds: [embed]})

            let channel = await client.channels.fetch(`${modlog.channelID}`)
            const embed1 = new MessageEmbed()
                .setTitle("Pishing site detected")
                .addField(`Sender:`, `${message.author}`)
                .addField(`Type of Link:`, `Pishing site`)
                .setColor('RANDOM')
                .setTimestamp()
            channel.send({embeds: [embed1]})
        }
        }
    } catch {

    }
})

/**
 * END OF MODLOG SYSTEM
 */

/**
 * LEVEL SYSTEM
 */

client.on('messageCreate', async (message) => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;

    const levenable = await levelEnable.findOne({
        guildID: message.guild.id
    })

        try {
            if(message.guild.id === `${levenable.guildID}`) {
            const randomXP = Math.floor(Math.random() * 29) + 1;
            const hasLeveledUP = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
            if(hasLeveledUP) {
            const user = await Levels.fetch(message.author.id, message.guild.id);
            const requiredXp = Levels.xpFor(parseInt(user.level) + 1)
            const leveledEmbed = new MessageEmbed()
            .setTitle("LEVELED UP!")
            .addField(`Member:`,`${message.author}`, true)
            .addField(`Level:`, `${user.level}`, true)
            .addField(`Current Exp:`, `${user.xp.toLocaleString()}`, true)
            .addField(`Required Exp:`, `${requiredXp.toLocaleString()}`, true)
            .setColor('RANDOM')
            .setTimestamp()
            message.channel.send({embeds: [leveledEmbed]}).catch((err) => console.log())

        if(user.level == 2) {
            let role = message.guild.roles.cache.find(role => role.name == "2・Peasant.");
            if(!role) await message.guild.roles.create({
                name: "2・Peasant.",
                color: "#8d99aa",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "2・Peasant.");
            message.member.roles.add(role).catch((err) => console.log)
        }

        if(user.level == 5) {
            let role = message.guild.roles.cache.find(role => role.name == "5・Commoner.");
            if(!role) await message.guild.roles.create({
                name: "5・Commoner.",
                color: "#84a1ce",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "5・Commoner.");
            message.member.roles.add(role).catch((err) => console.log)
        }

        if(user.level == 10) {
            let role = message.guild.roles.cache.find(role => role.name == "10・Young Hunter.");
            if(!role) await message.guild.roles.create({
                name: "10・Young Hunter.",
                color: "#688dd8",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "10・Young Hunter.");
            message.member.roles.add(role).catch((err) => console.log)
          }
      
          if(user.level == 15) {
            let role = message.guild.roles.cache.find(role => role.name == "15・Veteran Hunter.");
            if(!role) await message.guild.roles.create({
                name: "15・Veteran Hunter.",
                color: "#5e91cf",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "15・Veteran Hunter.");
            message.member.roles.add(role).catch((err) => console.log)
          }
      
          if(user.level == 20) {
            let role = message.guild.roles.cache.find(role => role.name == "20・Warrior");
            if(!role) await message.guild.roles.create({
                name: "20・Warrior",
                color: "#4b7fcf",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "20・Warrior");
            message.member.roles.add(role).catch((err) => console.log)
          }
      
          if(user.level == 25) {
            let role = message.guild.roles.cache.find(role => role.name == "25・Grand Warrior");
            if(!role) await message.guild.roles.create({
                name: "25・Grand Warrior",
                color: "#2d7acc",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "25・Grand Warrior");
            message.member.roles.add(role).catch((err) => console.log)
          }
      
          if(user.level == 30) {
            let role = message.guild.roles.cache.find(role => role.name == "30・Champion");
            if(!role) await message.guild.roles.create({
                name: "30・Champion",
                color: "#4083e4",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "30・Champion");
            message.member.roles.add(role).catch((err) => console.log)
          }
      
          if(user.level == 40) {
            let role = message.guild.roles.cache.find(role => role.name == "40・Demi God.");
            if(!role) await message.guild.roles.create({
                name: "40・Demi God",
                color: "#2961d8",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "40・Demi God");
            message.member.roles.add(role).catch((err) => console.log)
          }
      
          if(user.level == 50) {
            let role = message.guild.roles.cache.find(role => role.name == "50・God");
            if(!role) await message.guild.roles.create({
                name: "50・God",
                color: "#2456be",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "50・God");
            message.member.roles.add(role).catch((err) => console.log)
          }
      
          if(user.level == 60) {
            let role = message.guild.roles.cache.find(role => role.name == "60・Almighty God");
            if(!role) await message.guild.roles.create({
                name: "60・Almighty God",
                color: "#2f48ce",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "60・Almighty God");
            message.member.roles.add(role).catch((err) => console.log)
          }
      
          if(user.level == 70) {
            let role = message.guild.roles.cache.find(role => role.name == "70・Demon God");
            if(!role) await message.guild.roles.create({
                name: "70・Demon God",
                color: "#2e41c2",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "70・Demon God");
            message.member.roles.add(role).catch((err) => console.log)
          }
      
          if(user.level == 80) {
            let role = message.guild.roles.cache.find(role => role.name == "80・Celestial Attendant");
            if(!role) await message.guild.roles.create({
                name: "80・Celestial Attendant",
                color: "#1e37bd",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "80・Celestial Attendant");
            message.member.roles.add(role).catch((err) => console.log)
          }
      
          if(user.level == 90) {
            let role = message.guild.roles.cache.find(role => role.name == "90・Celestial");
            if(!role) await message.guild.roles.create({
                name: "90・Celestial",
                color: "#2221d3",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "90・Celestial");
            message.member.roles.add(role).catch((err) => console.log)
          }
      
          if(user.level == 100) {
            let role = message.guild.roles.cache.find(role => role.name == "100・Grand Celestial");
            if(!role) await message.guild.roles.create({
                name: "100・Grand Celestial",
                color: "#121bc0",
            }).catch(err => message.channel.send(err));
            role = message.guild.roles.cache.find(role => role.name == "100・Grand Celestial");
            message.member.roles.add(role).catch((err) => console.log)
          }
        }
            }
        } catch {
            
    }
})

/**
 * END OF LEVEL SYSTEM
 */

/**
 * WELCOME SYSTEM
 */

client.on('guildMemberAdd', async (member) => {
    const wel = await welcomeEnable.findOne({
        guildID: member.guild.id
    })

    try {
        const Canvas = require('canvas')
        const path = require('path')

        let channel = await client.channels.fetch(`${wel.channelID}`)
        const canvas = Canvas.createCanvas(1000, 400)
        const ctx = canvas.getContext('2d')
        const background = await Canvas.loadImage(
            path.join(__dirname, './background.jpg')
        )
        let x = 0
        let y = 0
        ctx.drawImage(background, x, y)
        ctx.strokeStyle = '#f5f5f5';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        const pfp = await Canvas.loadImage(
            member.user.displayAvatarURL({
            format: 'png'
            })
        )

        x = canvas.width / 2 - pfp.width / 2
        y = 100
        ctx.drawImage(pfp, x, y)
        
        ctx.fillStyle = '#f5f5f5'
        ctx.font = '50px sans-serif'
        let text = `Welcome ${member.user.tag}`
        x = canvas.width / 2 - ctx.measureText(text).width / 2
        ctx.fillText(text, x, 150 + pfp.height)

        let count = `Member #${member.guild.memberCount}`
        x = canvas.width / 2 - ctx.measureText(count).width / 2
        ctx.fillText(count, x, 200 + pfp.height)

        const attachment = new MessageAttachment(canvas.toBuffer())
        channel.send({ files: [attachment]}).catch((err) => console.log)
    } catch {

    }
})

/**
 * END WELCOME SYSTEM
 */

/**
 * ROLEBACK SYSTEM
 */

client.on('guildMemberAdd', async (member) => {

    const roleb = await roleback.findOne({
        guildID: member.guild.id
    })

    try {
        if(member.guild.id === `${roleb.guildID}`) {
            const user = await Levels.fetch(member.id, member.guild.id);
          if(user.level == 2) {
          let role = member.guild.roles.cache.find(role => role.name == "2・Peasant.");
          role = member.guild.roles.cache.find(role => role.name == "2・Peasant.");
          member.roles.add(role).catch((err) => console.log)
          }
          
          if(user.level == 5) {
          let role = member.guild.roles.cache.find(role => role.name == "5・Commoner.");
          role = member.guild.roles.cache.find(role => role.name == "5・Commoner.");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 10) {
          let role = member.guild.roles.cache.find(role => role.name == "10・Young Hunter.");
          role = member.guild.roles.cache.find(role => role.name == "10・Young Hunter.");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 15) {
          let role = member.guild.roles.cache.find(role => role.name == "15・Veteran Hunter.");
          role = member.guild.roles.cache.find(role => role.name == "15・Veteran Hunter.");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 20) {
          let role = member.guild.roles.cache.find(role => role.name == "20・Warrior");
          role = member.guild.roles.cache.find(role => role.name == "20・Warrior");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 25) {
          let role = member.guild.roles.cache.find(role => role.name == "25・Grand Warrior");
          role = member.guild.roles.cache.find(role => role.name == "25・Grand Warrior");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 30) {
          let role = member.guild.roles.cache.find(role => role.name == "30・Champion");
          role = member.guild.roles.cache.find(role => role.name == "30・Champion");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 40) {
          let role = member.guild.roles.cache.find(role => role.name == "40・Demi God.");
          role = member.guild.roles.cache.find(role => role.name == "40・Demi God.");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 50) {
          let role = member.guild.roles.cache.find(role => role.name == "50・God");
          role = member.guild.roles.cache.find(role => role.name == "50・God");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 60) {
          let role = member.guild.roles.cache.find(role => role.name == "60・Almighty God");
          role = member.guild.roles.cache.find(role => role.name == "60・Almighty God");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 70) {
          let role = member.guild.roles.cache.find(role => role.name == "70・Demon God");
          role = member.guild.roles.cache.find(role => role.name == "70・Demon God");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 80) {
          let role = member.guild.roles.cache.find(role => role.name == "80・Celestial Attendant");
          role = member.guild.roles.cache.find(role => role.name == "80・Celestial Attendant");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 90) {
          let role = member.guild.roles.cache.find(role => role.name == "90・Celestial");
          role = member.guild.roles.cache.find(role => role.name == "90・Celestial");
          member.roles.add(role).catch((err) => console.log)
          }
    
          if(user.level == 100) {
          let role = member.guild.roles.cache.find(role => role.name == "100・Grand Celestial");
          role = member.guild.roles.cache.find(role => role.name == "100・Grand Celestial");
          member.roles.add(role).catch((err) => console.log)
        }
    }
    } catch {

    }
})

/**
 * END ROLEBACK SYSTEM
 */

client.on('messageCreate', async (message) => {
    const AFKS = require('./Schemas/afkSchema')
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

    let data2;

    try {
        data2 = await AFKS.findOne({
            userID: message.author.id,
            guildID: message.guild.id
        })

        if(!data2) {
            data2 = new AFKS({
                userID: message.author.id,
                guildID: message.guild.id
            })
        }
    } catch {

    }

    if(data2.AFK === true) {
        data2.AFK_Reason = null
        data2.AFK = false
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTimestamp()
        .addField(`Status`,`You're not afk anymore`)

        message.channel.send({embeds: [embed]})
        .then(msg => {
            setTimeout(() => msg.delete(), 5000)
        })
        data2.save()
    }

    const mentioned = message.mentions.members.first()
    if(mentioned) {
        let data3;
        try {
            data3 = await AFKS.findOne({
                userID: mentioned.id,
                guildID: message.guild.id
            })
            if(!data3) {
                data3 = new AFKS({
                    userID: mentioned.id,
                    guildID: message.guild.id
                })
            }
        } catch {

        }

        if(data3.AFK == true) {
            const embed = new MessageEmbed()
            .setTimestamp()
            .setColor('RANDOM')
            .addField(`Status:`,`${mentioned.user.tag} is AFK`)
            .addField(`Reason:`, `${data3.AFK_Reason || `No Reason`}`)
            .addField(`Days:`, `${days}`, true)
            .addField(`Hours:`, `${hours}`, true)
            .addField(`Minutes:`, `${minutes}`, true)
            .addField(`Seconds:`, `${seconds}`, true)

            message.channel.send({embeds: [embed]})
        }
    }
})

 client.login(process.env.token)