const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendmsg')
        .setDescription('Sends a message in the current channel (developer only).')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('msg')
                .setRequired(false)
                .addChoices(
                    { name: 'Join Ping', value: 'joinping' },
                )
                .addChoices(
                    { name: 'Rules', value: 'rules' },
                )),
    async execute(interaction) {
        const message = interaction.options.getString('msg');
        const embed = new EmbedBuilder()
        embed.setColor([144, 81, 202])
        //embed.setTimestamp(Date.now())
        //embed.setFooter({ text: "Footer" })
        embed.setTitle(`Nexia  •  Placeholder`)
        embed.setThumbnail("https://notcoded.needs.rest/r/nexia.png")
        if (message != null && message == "joinping") {
            embed.setTitle(`Nexia  •  Join Ping`)
            embed.setDescription(`Click one of the two buttons to ping either the <@&1096876294702104618> or <@&1094218935211147290> role.\n\nOnce you click one of the buttons, you will have a **15 minute cooldown**.`)

            const eu = new ButtonBuilder()
                .setCustomId('eu')
                .setLabel('| EU Ping')
                .setEmoji('🇪🇺')
                .setStyle(ButtonStyle.Primary);

            const na = new ButtonBuilder()
                .setCustomId('na')
                .setLabel('| NA Ping')
                .setEmoji('🇺🇸')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()
                .addComponents(eu, na);

            await interaction.channel.send({ embeds: [embed], components: [row] });
        }
        if (message != null && message == "rules") {
            embed.setTitle(`Nexia  •  Rules`)
            embed.setDescription(`Click the buttons to view either the **Discord** or the **Minecraft** rules.`)

            const discord = new ButtonBuilder()
                .setCustomId('discord')
                .setLabel('Discord')
                .setStyle(ButtonStyle.Primary);

            const minecraft = new ButtonBuilder()
                .setCustomId('minecraft')
                .setLabel('Minecraft')
                .setStyle(ButtonStyle.Success);

            const row = new ActionRowBuilder()
                .addComponents(discord, minecraft);

            await interaction.channel.send({ embeds: [embed], components: [row] });
        }
        await interaction.reply({ content: "Sent message.", ephemeral: true });
    },
};