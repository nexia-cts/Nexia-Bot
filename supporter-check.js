const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

const fs = require('node:fs');
const config_path = "./config.json"

if (!fs.existsSync(config_path)) {
    fs.writeFileSync(config_path, JSON.stringify(
        {
            "token": "",
            "guildId": "",
            "clientId": ""
        }
        , null, 2), "utf-8")
}

const { token, guildId } = require('./config.json');

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

client.login(token)