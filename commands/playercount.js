const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const status = require('node-mcstatus')

const { euIP, naIP, euIPport, naIPport } = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playercount')
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
        const embed = new EmbedBuilder()
        embed.setColor([144, 81, 202])
        embed.setTimestamp(Date.now())
        embed.setFooter({ text: "Use /ip :)" })
        embed.setTitle(`Nexia  •  Player count`)
        embed.setThumbnail("https://notcoded.needs.rest/r/nexia.png")
        if (region != null && region == "eu") {
            status.statusJava(euIP, euIPport)
                .then((result) => {
                    if (result.players != null) {
                        embed.setDescription(`There are currently \`${result.players.online}/${result.players.max}\`\nplayers online on **EU**.`)
                    } else {
                        embed.setDescription(`Please try running this command again later, as an error has occurred.`)
                    }
                }).catch(() => {
                    embed.setDescription(`Please try running this command again later, as an error has occurred.`)
                }).finally(() => {
                    interaction.reply({ embeds: [embed], ephemeral: true });
                })
        } else if (region != null && region == "na") {
            status.statusJava(naIP, naIPport)
                .then((result) => {
                    if (result.players != null) {
                        embed.setDescription(`There are currently \`${result.players.online}/${result.players.max}\`\nplayers online on **NA**.`)
                    } else {
                        embed.setDescription(`Please try running this command again later, as an error has occurred.`)
                    }
                }).catch(() => {
                    embed.setDescription(`Please try running this command again later, as an error has occurred.`)
                }).finally(() => {
                    interaction.reply({ embeds: [embed], ephemeral: true });
                })
        } else {
            status.statusJava(euIP, euIPport)
                .then((eu) => {
                    if (eu != null && eu.players != null) {
                        status.statusJava(naIP, naIPport)
                            .then((na) => {
                                if (na != null && na.players != null) {
                                    embed.setDescription(`There are currently \`${eu.players.online}/${eu.players.max}\` players online on **EU**.\n\nAnd there are currently \`${na.players.online}/${na.players.max}\` online on **NA**.`)
                                } else {
                                    embed.setDescription(`Please try running this command again later, as an error has occurred.`)
                                }
                            }
                            ).catch(() => {
                                embed.setDescription(`Please try running this command again later, as an error has occurred.`)
                            })
                    } else {
                        embed.setDescription(`Please try running this command again later, as an error has occurred.`)
                    }
                }
                ).catch(() => {
                    embed.setDescription(`Please try running this command again later, as an error has occurred.`)
                }).finally(() => {
                    interaction.reply({ embeds: [embed], ephemeral: true });
                })
        }
    }
};