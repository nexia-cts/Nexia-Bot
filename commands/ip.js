const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Shows you the ip of the server.')
		.addStringOption(option =>
			option.setName('region')
				.setRequired(true)
				.addChoices(
					{ name: 'EU', value: 'eu' },
					{ name: 'NA', value: 'na' }
				)),
	async execute(interaction) {
		const region = interaction.options.getString('region');
		if (region != null && region == "eu") {
			await interaction.reply({ content: '**EU:** nexia.mcserver.us', ephemeral: true });
		} else if (region != null && region == "na") {
			await interaction.reply({ content: '**NA:** nanexia.mcserver.us', ephemeral: true });
		} else {
			await interaction.reply({ content: '**EU:** nexia.mcserver.us\n**NA:** nanexia.mcserver.us', ephemeral: true });
		}
	},
};