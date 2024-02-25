const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');
const status = require('node-mcstatus')

const { euIP, naIP, euIPport, naIPport } = require("../config.json")

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
        embed.setThumbnail("https://notcoded.needs.rest/r/nexia.png")
        if (region != null && region == "eu") {
            status.statusJava(euip, euIPport)
                .then((eu) => {
                    if (eu.players != null && eu.players.online > 0) {
                        const euList = eu.players.list ? "\n\`\`\`" + eu.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";
                        embed.setDescription(`**EU** Playerlist: ` + euList)
                    } else {
                        embed.setDescription(`**EU** Playerlist: \n\`\`\`No players\`\`\``)
                    }
                    interaction.reply({ embeds: [embed], ephemeral: true });
                })


        } else if (region != null && region == "na") {
            status.statusJava(naIP, naIPport)
                .then((na) => {
                    if (na.players != null && na.players.online > 0) {
                        const naList = na.players.list ? "\n\`\`\`" + na.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";
                        embed.setDescription(`**NA** Playerlist: ` + naList)
                    } else {
                        embed.setDescription(`**NA** Playerlist: \n\`\`\`No players\`\`\``)
                    }
                    interaction.reply({ embeds: [embed], ephemeral: true });
                })

        } else {
            let euList = `\`\`\`No players\`\`\``
            let naList = euList

            status.statusJava(euIP, euIPport)
                .then((eu) => {
                    if (eu.players != null && eu.players.online > 0) {
                        euList = eu.players.list ? "\n\`\`\`" + eu.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";
                    }
                    status.statusJava(naIP, naIPport)
                        .then((na) => {
                            if (na.players != null && na.players.online > 0) {
                                naList = na.players.list ? "\n\`\`\`" + na.players.list.map(p => ` ${p.name_clean} `).join('\r\n') + "\`\`\`" : "";
                            }
                            embed.setDescription(`**EU** Playerlist: ` + euList + `\n**NA** Playerlist: ` + naList)
                        }).catch(() => {
                            embed.setDescription(`Please try running this command again later, as an error has occurred.`)
                        })

                }).catch(() => {
                    embed.setDescription(`Please try running this command again later, as an error has occurred.`)
                }).finally(() => {
                    interaction.reply({ embeds: [embed], ephemeral: true });
                })
        }
    },
};