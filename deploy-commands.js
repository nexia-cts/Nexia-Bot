const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [
    {
        "name": 'ip',
        "description": 'Shows you the ip of the server.',
        "options": [
            {
                "name": "region",
                "description": "Server Region",
                "type": 3,
                "choices": [
                    {
                        "name": "EU",
                        "value": "eu",
                    },
                    {
                        "name": "NA",
                        "value": "na",
                    },
                ],
                "required": false,
            },
        ]
    },
    {
        "name": 'playercount',
        "description": 'Shows you how many players are online on the server.',
        "options": [
            {
                "name": "region",
                "description": "Server Region",
                "type": 3,
                "choices": [
                    {
                        "name": "EU",
                        "value": "eu",
                    },
                    {
                        "name": "NA",
                        "value": "na",
                    },
                ],
                "required": false
            },
        ]
    },
    {
        "name": 'playerlist',
        "description": 'Shows you the players are online on the server.',
        "options": [
            {
                "name": "region",
                "description": "Server Region",
                "type": 3,
                "choices": [
                    {
                        "name": "EU",
                        "value": "eu",
                    },
                    {
                        "name": "NA",
                        "value": "na",
                    },
                ],
                "required": false
            },
        ]
    },
    /*
    {
        "name": 'sendmsg',
        "description": 'Sends a message in the current channel (developer only)',
        "options": [
            {
                "name": "msg",
                "description": "Message to send",
                "type": 3,
                "default_member_permissions": "0x0000000000100000",
                "choices": [
                    {
                        "name": "Join Ping",
                        "value": "joinping",
                    },
                ],
                "required": true
            },
        ]
    },
    */
    /*
    {
        "name": 'test',
        "description": 'frfr',
    },
    */
];
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
//const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

/*
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    }
}
*/
// doesnt work (buggy)

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();