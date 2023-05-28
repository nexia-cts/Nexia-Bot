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
            "clientId": ""
        }
        , null, 2), "utf-8")
}

const { token } = require('./config.json');
client.commands = new Collection();


client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.GuildMemberUpdate, (oldMember, newMember) => {
    var supporterID = '1107264322951979110'

    if (!oldMember.premiumSince && newMember.premiumSince && !newMember.roles.cache.has(supporterID)) {
        newMember.roles.add(supporterID)
    } else if (oldMember.premiumSince && !newMember.premiumSince && newMember.roles.cache.has(supporterID)) {
        newMember.roles.remove(supporterID)
    }
});


const buttonCooldown = new Set()

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isButton()) {
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