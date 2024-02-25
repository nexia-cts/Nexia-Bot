const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const config_path = "./config.json"

if (!fs.existsSync(config_path)) {
    fs.writeFileSync(config_path, JSON.stringify(
        {
            "token": "",
            "guildId": "",
            "clientId": "",
            "discordInvite": "",
            "euIP": "",
            "euIPport": "25565",
            "naIP": "",
            "naIPport": "25565"
        }
        , null, 2), "utf-8")
}

const { token, guildId } = require(config_path);
client.commands = new Collection();


client.on(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let list = client.guilds.cache.get(guildId);

    try {
        await list.members.fetch();

        list.members.cache.forEach(member => {
            var supporterID = '1107264322951979110'
            var patreonID = '1125368330245636096'
            var boosterID = '1064928408510943373'

            var hasBoosted = member.roles.cache.has(boosterID)
            var hasPatreon = member.roles.cache.has(patreonID)

            var hasRole = member.roles.cache.has(supporterID)

            if ((hasBoosted || hasPatreon) && !hasRole) {
                member.roles.add(supporterID)
                console.info(`${member.user.username} (${member.user.id}): Added Supporter Role [+]`)
            } else if ((!hasBoosted && !hasPatreon) && hasRole) {
                member.roles.remove(supporterID)
                console.info(`${member.user.username} (${member.user.id}): Removed Supporter Role [-]`)
            }
        });
    } catch (err) {
        console.error(err);
    }
});

client.on(Events.GuildMemberUpdate, (oldMember, newMember) => {
    var supporterID = '1107264322951979110'
    var patreonID = '1125368330245636096'
    var boosterID = '1064928408510943373'

    var hasBoosted = newMember.roles.cache.has(boosterID)
    var hasPatreon = newMember.roles.cache.has(patreonID)

    var hasRole = newMember.roles.cache.has(supporterID)

    if ((hasBoosted || hasPatreon) && !hasRole) {
        newMember.roles.add(supporterID)
        console.info(`${newMember.user.username} (${newMember.user.id}): Added Supporter Role [+]`)
    } else if ((!hasBoosted && !hasPatreon) && hasRole) {
        newMember.roles.remove(supporterID)
        console.info(`${newMember.user.username} (${newMember.user.id}): Removed Supporter Role [-]`)
    }
});


const buttonCooldown = new Set()

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isButton()) {


        if (interaction.customId === "eu" || interaction.customId === "na") {
            let cooldown = 900000 // 15 minutes 
            // counted in ms (1000 ms = 1 second)

            const embed = new EmbedBuilder()
            embed.setTimestamp(Date.now())
            embed.setColor([144, 81, 202])
            embed.setTitle(`Nexia  •  Join Ping`)
            embed.setFooter({ text: "Check the pinned message, to ping the roles" })
            embed.setDescription(`Requested by\n<@${interaction.user.id}>`)
            embed.setThumbnail("https://notcoded.needs.rest/r/nexia.png")

            setTimeout(() => buttonCooldown.delete(interaction.user.id), cooldown)
            if (buttonCooldown.has(interaction.user.id)) {

                embed.setFooter({ text: "Do you have patience?" })
                embed.setDescription(`You are currently on cooldown!\nMaybe you can wait?`)

                await interaction.reply({ embeds: [embed], ephemeral: true });
            }

            if (interaction.customId === "eu" && !buttonCooldown.has(interaction.user.id)) {
                await interaction.channel.send({ content: "<@&1096876294702104618>", embeds: [embed] });
                await interaction.deferUpdate();
                buttonCooldown.add(interaction.user.id)
            }
            if (interaction.customId === "na" && !buttonCooldown.has(interaction.user.id)) {
                await interaction.channel.send({ content: "<@&1094218935211147290>", embeds: [embed] });
                await interaction.deferUpdate();
                buttonCooldown.add(interaction.user.id)
            }
        }

        if (interaction.customId === "discord" || interaction.customId === "minecraft") {
            const embed = new EmbedBuilder()
            embed.setColor([144, 81, 202])
            embed.setTitle(`Nexia  •  Rules`)
            embed.setFooter({ text: "Breaking the rules will lead to punishment!" })
            embed.setThumbnail("https://notcoded.needs.rest/r/nexia.png")

            if (interaction.customId === "minecraft") {
                embed.setTitle(`Nexia  •  Minecraft Server Rules`)
                embed.setThumbnail("https://notcoded.needs.rest/r/minecraft_small.png")
                embed.setColor([107, 191, 54])
                embed.setDescription("By playing on the minecraft server, you agree to follow the rules. Breaking them will result in punishment like muting, kicking or banning.")
                embed.addFields(
                    { name: '**1. No hacking, cheating, griefing or exploiting bugs.**', value: 'Using any client modifications or hack clients that give an unfair advantage against others or abusing unintended behaviour is not allowed.' },
                    { name: '**2. Be respectful. No toxicity and/or annoying behaviour.**', value: 'Please be respectful. Hateful and/or insulting behaviour is not tolerated.' },
                    { name: '**3. No advertising.**', value: 'Advertising anything, including other Minecraft servers, is not permitted.' },
                    { name: '**4. No encouraging of illegal activity.**', value: 'Self-explanatory.' },
                    { name: '**5. No interrupting other player\'s fights.**', value: 'Please do not interrupt other player\'s fights, focusing on killing certain players is not allowed too.' },
                    { name: '**6. No spamming/filling up chat**', value: 'Please do not spam the chat, nor fill up the chat.' },
                    { name: '**7. No stalling/combat logging.**', value: 'You may not stall (running away for a long time), or combat log (logging out when you\'re low).' },
                    { name: '**8. No bedrock bridging**', value: 'You may not use bedrock bridging or reach-around bridging, **NO EXCEPTIONS**.' }
                )
            }

            if (interaction.customId === "discord") {
                embed.setTitle(`Nexia  •  Discord Server Rules`)
                embed.setThumbnail("https://media.pocketgamer.biz/2021/5/110514/discord-new-logo-2021-r225x225.jpg")
                embed.setColor([88, 101, 242])
                embed.setDescription("By chatting on this server, you agree to follow the rules. Breaking them will result in punishment like muting, kicking or banning.")
                embed.addFields(
                    { name: '**1. No illegal activity. Follow the discord guidelines.**', value: 'https://discord.com/guidelines' },
                    { name: '**2. No pornography or NSFW (Not safe for work) content/media/messages.**', value: 'Do not send any porn or otherwise sensitive media and messages.' },
                    { name: '**3. Be respectful. No toxicity and/or annoying behaviour.**', value: 'Please be respectful. Hateful and/or insulting behaviour is not tolerated.' },
                    { name: '**4. No advertising unless in <#1097191136235364362>.**', value: 'Advertising anything, including other Minecraft/Discord servers, is not permitted unless in the <#1097191136235364362> channel.' },
                    { name: '**5. Use the appropriate channels on the server.**', value: 'All channels (unless self-explanatory) have a description that tells you what they should be used for.' },
                    { name: '**6. Avoid heated arguments.**', value: 'Please try to keep all discussions friendly. No insulting the other "side". This relates to rule 3.' },
                    { name: '**7. No discussion about sensitive topics or politics.**', value: 'Discussion about sensitive topics or politics are prohibited.' }
                )
            }

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

/*
client.on(Events.MessageCreate, message => {

});
*/

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
}



client.login(token);