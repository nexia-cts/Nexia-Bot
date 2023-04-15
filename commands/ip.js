const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Shows you the ip of the server.')
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
		embed.setTimestamp(Date.now())
		embed.setColor([144, 81, 202])
		embed.setTitle(`Nexia  •  IP`)
		embed.setFooter({ text: "Use /playercount :)" })
		embed.setThumbnail("https://cdn.discordapp.com/icons/1041553022246998087/6a007c32cc01332188bbb3efcab73499.webp?size=80")
		if (region != null && region == "eu") {
			embed.setDescription("The IP of the **EU** server is:\n`nexia.mcserver.us`")
		} else if (region != null && region == "na") {
			embed.setDescription("The IP of the **NA** server is:\n`nanexia.mcserver.us`")
		} else {
			embed.setDescription("The IP of the **EU** server is:\n`nexia.mcserver.us`\n\nThe IP of the **NA** server is:\n`nanexia.mcserver.us`")
		}

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};