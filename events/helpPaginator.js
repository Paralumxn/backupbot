const { MessageButton, MessageActionRow } = require('discord.js')
const ms = require('ms');


const paginator = async (message, pages) => {
    if(!message && !message.channel) throw new Error("Provide a message to acces the channel")
    if(!pages) throw new Error("Please provide pages")

    let page = 0
    const btn1 = new MessageButton().setLabel("Back").setCustomId("00001").setStyle('SECONDARY')
    const btn2 = new MessageButton().setLabel("Next").setCustomId("00002").setStyle('SECONDARY')
    const row = new MessageActionRow().addComponents([btn1, btn2])
    const curPage = await message.channel.send({embeds: [pages[0]], components: [row]})
    const filter = (b) => ["00001, 00002"].includes(b.id)
    const col = await curPage.createMessageComponentCollector(filter, { time: ms('10s') })

    col.on('collect', async (button) => {
        await button.deferUpdate()
        if(button.user.id !== message.author.id) return;
        if(button.customId == '00001') {
            page = page > 0 ? --page : pages.length - 1
        } else if(button.customId == '00002') {
            page = page + 1 < pages.length ? ++page : 0;
        }

        curPage.edit({ embeds: [pages[page]], components: [row]})
        
        setTimeout(function() {
            row.components[0].setDisabled(true);
            row.components[1].setDisabled(true);
            curPage.edit({ embeds: [pages[page]], components: [row]})
        }, 15000)
    })

    return curPage
}

module.exports = paginator