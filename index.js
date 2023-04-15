const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

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

const { clientId, guildId, token } = require('./config.json');
client.commands = new Collection();


client.on(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on(Events.InteractionCreate, async interaction => {
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

client.on(Events.MessageCreate, message => {
    if (message.channel.id === "1094219232276910142" && (message.author.bot || !message.content.includes("<@&1094218935211147290>"))) {
        message.delete();
    } else if (message.channel.id === "1096876116624556032" && (message.author.bot || !message.content.includes("<@&1096876294702104618>"))) {
        message.delete();
    }
});

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