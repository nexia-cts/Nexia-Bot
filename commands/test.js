const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('frfr'),
    async execute(interaction) {
        await interaction.reply({ content: "yeah" });
    },
};