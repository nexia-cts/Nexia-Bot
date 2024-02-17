const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits, Attachment } = require('discord.js');
const { EmbedBuilder } = require('@discordjs/builders');

const { euIP, naIP, discordInvite } = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendmsg')
        .setDescription('Sends a message in the current channel (developer only).')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('msg')
                .setRequired(false)
                .addChoices(
                    { name: 'Join Ping', value: 'joinping' },
                )
                .addChoices(
                    { name: 'Rules', value: 'rules' },
                )),

    async execute(interaction) {
        const message = interaction.options.getString('msg');
        const embed = new EmbedBuilder()
        embed.setColor([144, 81, 202])
        //embed.setTimestamp(Date.now())
        //embed.setFooter({ text: "Footer" })
        embed.setTitle(`Nexia  •  Placeholder`)
        embed.setThumbnail("https://notcoded.needs.rest/r/nexia.png")
        if (message != null && message == "joinping") {
            embed.setTitle(`Nexia  •  Join Ping`)
            embed.setDescription(`Click one of the two buttons to ping either the <@&1096876294702104618> or <@&1094218935211147290> role.\n\nOnce you click one of the buttons, you will have a **15 minute cooldown**.`)

            const eu = new ButtonBuilder()
                .setCustomId('eu')
                .setLabel('| EU Ping')
                .setEmoji('🇪🇺')
                .setStyle(ButtonStyle.Primary);

            const na = new ButtonBuilder()
                .setCustomId('na')
                .setLabel('| NA Ping')
                .setEmoji('🇺🇸')
                .setStyle(ButtonStyle.Danger);

            const row = new ActionRowBuilder()
                .addComponents(eu, na);

            await interaction.channel.send({ embeds: [embed], components: [row] });
        }
        if (message != null && message == "rules") {
            embed.setTitle(`Nexia  •  Rules`)
            embed.setThumbnail('attachment://nexia-rules.png');
            embed.setDescription(`Click the buttons to view either the **Discord** or the **Minecraft** rules.`)

            const discord = new ButtonBuilder()
                .setCustomId('discord')
                .setLabel('Discord')
                .setStyle(ButtonStyle.Primary);

            const minecraft = new ButtonBuilder()
                .setCustomId('minecraft')
                .setLabel('Minecraft')
                .setStyle(ButtonStyle.Success);

            const row = new ActionRowBuilder()
                .addComponents(discord, minecraft);

            await interaction.channel.send({ embeds: [embed], files: ['./images/nexia-rules.png'], components: [row] });
        }
        if (message != null && message == "info") {
            embed.setTitle(`Nexia  •  Info`)
            embed.setThumbnail('attachment://nexia-info.png');
            embed.setDescription(`Here you will get information about the server.`)

            embed.addFields(
                { name: 'Minecraft', value: `The IPs of the minecraft servers are:\n\n**EU**: \`${euIP}\`\n**NA**: \`${naIP}\`\n**Version**: \`Combat Test Snapshot 8c\`\n\nYou may also use </playerlist:1097209692285046894> or </playercount:1096826365883449444>.` },
                { name: 'Discord', value: `The discord server invite link is:\n**${discordInvite}**` }
            )

            await interaction.channel.send({ embeds: [embed], files: ['./images/nexia-info.png'] });
        }

        // START: How to install CTS

        if (message != null && message == "installcts") {
            // START: Define variables

            /////////////////////////////// TEXT 2/13 /////////////////////////////////////

            const text1 =
                `## Vanilla Combat Test 8a and 8c Installation guide

### First a few important notes

- The Combat Tests are forks of various versions made by jeb\_, this means that you will be playing with some bugs from back then.
- Although since it's a fork, it's not on the Vanilla Launcher, so the installation is a bit different and slighly more complicated.
- **CTS** means Combat Test Snapshots
- There is an specific fabric version for CTS: **<https://github.com/rizecookey/fabric-installer/releases/tag/0.11.1>** for the installation of fabric head to <#1132688511305273416>, here you will also find a **Mod List** which we recommend.

## Windows/MacOS/Linux Installation (automatic)
A new tool released called the **Combat Test Installer**, using this you can install any combat test snapshot you want using a GUI.

Download the tool from: **https://github.com/nexia-cts/combat-test-installer/releases**
Requirement: **[Java 8](<https://www.java.com/download/ie_manual.jsp>) or later**`

            const text1_img = './images/how-to-install-cts/combat-test-installer.png'

            /////////////////////////////// TEXT 2/13 /////////////////////////////////////
            const text2 =
                `## Windows Installation (manual)

### Step 1

Installing the latest version, 8c: **[Recommended]**

Download the version from: **<https://www.rizecookey.net/dl/file/combat-test-patched/1_16_combat-6.zip>**

That version **fixes** the **Log4J vulnerability**, although if you want the version made by **jeb_**, here is the original link:
||<https://launcher.mojang.com/experiments/combat/ea08f7eb1f96cdc82464e27c0f95d23965083cfb/1_16_combat-6.zip>||

### 8a: <https://drive.google.com/file/d/1oRmYoklkSu9QArdgnlMKy6MPMj0awk6G/view?usp=share_link>

### Step 2

Putting the version in your \`.minecraft\` folder.

Press the open button after clicking on the link shown above, this should open the zip file directly.`

            const text2_img = './images/how-to-install-cts/step2_download.png'

            /////////////////////////////// TEXT 3/13 /////////////////////////////////////

            const text3 =
                `After clicking on the open button you will be in the zip file, left click once on the folder named: \`1_16_combat-6\` **(8c)** or \`1_16_combat-4\` **(8a)**

And copy it, by pressing \`CTRL + C\` at the same time.

### Note: You don't copy the **.zip** file only the folder within it

Now click the same bar as shown in the following screenshot:`

            const text3_img = './images/how-to-install-cts/step2_folder.png'

            /////////////////////////////// TEXT 4/13 /////////////////////////////////////

            const text4 =
                `In that bar type \`%appdata%\`, this will direct you to the \`Roaming\` folder, and there navigate to \`.minecraft\` and then towards \`versions\`.

\`\`\`
C:\\Users\\[YOUR_NAME]\\AppData\\Roaming\\.minecraft\\versions
\`\`\`

Now when you are in the versions folder paste the folder you copied earlier into the folder if done correctly your versions folder should now contain the \`1_16_combat-6/4\` version(s)

### Step 3

Launching the game.

Open the Minecraft launcher, go to installations and check the following boxes:`

            const text4_img = './images/how-to-install-cts/step3_mc_installations.png'

            /////////////////////////////// TEXT 5/13 /////////////////////////////////////

            const text5 = `Create a new installation with \"pending 1.16_combat-6\" as version.`

            const text5_img = './images/how-to-install-cts/step3_mc_new-installation.png'

            /////////////////////////////// TEXT 6/13 /////////////////////////////////////

            const text6 =
                `In order to find the correct version type in \"pending\" as shown below:`

            const text6_img = './images/how-to-install-cts/step3_mc_find-version.png'

            /////////////////////////////// TEXT 7/12 /////////////////////////////////////

            const text7 =
                `Click on the version you downloaded.

\`\`\`
pending 1.16_combat-6 = 8c
pending 1.16_combat-4 = 8a
\`\`\`

Now press the **green** create button.

Navigate towards the **Play** Tab and make sure the **correct version** is selected.`

            const text7_img = './images/how-to-install-cts/step3_mc_play.png'

            /////////////////////////////// TEXT 8/13 /////////////////////////////////////

            const text8 =
                `## Common Issues

### 1: The version folder has 2 folders within each other in it`

            const text8_img = './images/how-to-install-cts/common_issues1-2folders.png'

            /////////////////////////////// TEXT 9/13 /////////////////////////////////////

            const text9 =
                `In order to fix this, copy \`(CTRL + C)\` the **.json** file and **navigate towards** the folder before where the **.json** file is.

After navigating there and having copied the .json folder make sure it looks like this:`

            const text9_img = './images/how-to-install-cts/common_issues1-2folders_fix1.png'

            /////////////////////////////// TEXT 10/13 /////////////////////////////////////

            const text10 =
                `Paste the **.json** in this folder and delete the folder where you just came from, visible here so that it looks like this:

**Note: ** ***First*** copy the file then delete the folder!`

            const text10_img = './images/how-to-install-cts/common_issues1-2folders_fix2.png'

            /////////////////////////////// TEXT 11/13 /////////////////////////////////////

            const text11 =
                `### 2: "Sorry, unable to start minecraft"

As of now, it's unknown what exactly causes this issue however there is an fix for it.
  
Our suspicions are that it's an issue that Mojang has on their side within the launcher.`

            const text11_img = './images/how-to-install-cts/common_issues2-unable_to_start.png'

            /////////////////////////////// TEXT 12/13 /////////////////////////////////////

            const text12 =
                `To fix this issue you will need to install either **MultiMC** or **Prism Launcher**.

**Prism Launcher: <https://prismlauncher.org/download/>** *(recommended)*

If you want to use **MultiMC**, but don't have it installed, you can download it by following this YouTube tutorial:
**<https://www.youtube.com/watch?v=Yrkpb0n4CRo>**

**If you have already played Minecraft 1.16+ you won't need to follow the Java Installation part.**

Now after having setup **MultiMC** or **PrismLauncher**, press add instance and make sure the following is selected:`

            const text12_img = './images/how-to-install-cts/common_issues2-unable_to_start_fix.png'

            /////////////////////////////// TEXT 13/13 /////////////////////////////////////

            const text13 =
                `Then press **"OK"** and **double click** the instance to launch it.

If any more issues arise please ask in <#1041553023052296224> or create a <#1106646791652376586>!`

            // END: Define variables
            // START: Send messages

            await interaction.channel.send({ content: text1, files: [text1_img] });
            await interaction.channel.send({ content: text2, files: [text2_img] });
            await interaction.channel.send({ content: text3, files: [text3_img] });
            await interaction.channel.send({ content: text4, files: [text4_img] });
            await interaction.channel.send({ content: text5, files: [text5_img] });
            await interaction.channel.send({ content: text6, files: [text6_img] });
            await interaction.channel.send({ content: text7, files: [text7_img] });
            await interaction.channel.send({ content: text8, files: [text8_img] });
            await interaction.channel.send({ content: text9, files: [text9_img] });
            await interaction.channel.send({ content: text10, files: [text10_img] });
            await interaction.channel.send({ content: text11, files: [text11_img] });
            await interaction.channel.send({ content: text12, files: [text12_img] });
            await interaction.channel.send({ content: text13 });



            // END: Send messages

        }
        // END: How to install CTS

        if (message != null && message == "installfabriccts") {
        }

        if (message != null && (message != "installcts" || message != "installfabric")) {
            await interaction.reply({ content: "Sent message.", ephemeral: true });
        }

    },
};