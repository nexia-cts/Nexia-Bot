const { SlashCommandBuilder } = require('discord.js');
const util = require('minecraft-server-util')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playerlist')
        .setDescription('Shows you how many players are online on the server.')
        .addStringOption(option =>
            option.setName('region')
                .setRequired(false)
                .addChoices(
                    { name: 'EU', value: 'eu' },
                    { name: 'NA', value: 'na' }
                )),
    async execute(interaction) {
        const region = interaction.options.getString('region');
        eu = await util.status("nexia.mcserver.us")
        na = await util.status("nanexia.mcserver.us");
        const embed = new EmbedBuilder()
        embed.setColor([144, 81, 202])
        embed.setTimestamp(Date.now())
        embed.setFooter({ text: "Use /ip :)" })
        embed.setTitle(`Nexia  •  Player count`)
        embed.setThumbnail("https://cdn.discordapp.com/icons/1041553022246998087/6a007c32cc01332188bbb3efcab73499.webp?size=80")
        if (region != null && region == "eu") {
            embed.setDescription(`There are currently \`${eu.players.online}/${eu.players.max}\` online. on **EU**.`)
        } else if (region != null && region == "na") {
            embed.setDescription(`There are currently \`${na.players.online}/${na.players.max}\` online on **NA**.`)
        } else {
            embed.setDescription(`There are currently \`${eu.players.online}/${eu.players.max}\` online. on **EU**.\n\nAnd there are currently \`${na.players.online}/${na.players.max}\` online on **NA**.`)
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};