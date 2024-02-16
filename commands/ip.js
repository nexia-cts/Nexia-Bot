const { EmbedBuilder } = require('@discordjs/builders');
const { SlashCommandBuilder } = require('discord.js');

const { euIP, naIP } = require("../config.json")

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
		embed.setThumbnail("https://notcoded.needs.rest/r/nexia.png")
		if (region != null && region == "eu") {
			embed.setDescription(`The IP of the **EU** server is:\n\`${euIP}\``)
		} else if (region != null && region == "na") {
			embed.setDescription(`The IP of the **NA** server is:\n\`${naIP}\``)
		} else {
			embed.setDescription(`The IP of the **EU** server is:\n\`${euIP}\`\n\nThe IP of the **NA** server is:\n\`${naIP}\``)
		}

		await interaction.reply({ embeds: [embed], ephemeral: true });
	},
};