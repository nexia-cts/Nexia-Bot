const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const util = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playerlist')
        .setDescription('Shows you the players are online on the server.')
        .addStringOption(option =>
            option.setName('region')
                .setRequired(false)
                .addChoices(
                    { name: 'EU', value: 'eu' },
                    { name: 'NA', value: 'na' }
                )),
    async execute(interaction) {
        const region = interaction.options.getString('region');
        const embed = new EmbedBuilder()
        embed.setColor([144, 81, 202])
        embed.setTimestamp(Date.now())
        embed.setFooter({ text: "Use /ip :)" })
        embed.setTitle(`Nexia  •  Player list`)
        embed.setThumbnail("https://cdn.discordapp.com/icons/1041553022246998087/6a007c32cc01332188bbb3efcab73499.webp?size=80")
        if (region != null && region == "eu") {
            eu = await util.get(`https://api.mcstatus.io/v2/status/java/nexia.mcserver.us:25565`)
            const euList = eu.data.players.list ? "\n\`\`\`" + eu.data.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";
            embed.setDescription("**EU** Playerlist:" + euList)
        } else if (region != null && region == "na") {
            na = await util.get(`https://api.mcstatus.io/v2/status/java/nanexia.mcserver.us:25565`)
            const naList = na.data.players.list ? "\n\`\`\`" + na.data.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";
            embed.setDescription("**NA** Playerlist:" + naList)
        } else {
            eu = await util.get(`https://api.mcstatus.io/v2/status/java/nexia.mcserver.us:25565`)
            na = await util.get(`https://api.mcstatus.io/v2/status/java/nanexia.mcserver.us:25565`)
            const euList = eu.data.players.list ? "\n\`\`\`" + eu.data.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";
            const naList = na.data.players.list ? "\n\`\`\`" + na.data.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";
            embed.setDescription(`**EU** Playerlist:` + euList + `\n**NA** Playerlist:` + naList)
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};