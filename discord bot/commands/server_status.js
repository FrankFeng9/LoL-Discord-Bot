//command to get League of Legends status for the given platform

const { SlashCommandBuilder, channelLink, inlineCode } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require("axios");
const { riotApiKey } = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverstatus')
        .setDescription('display server status')
        .addStringOption((option) => option.setName("region").setDescription("Enter palyer's region").setRequired(true)),


    async execute(interaction) {

        const region = interaction.options.getString("region").toLowerCase();
        let serverName = "";
        switch (region) {
            case "na":             //North America Server  na1
                serverName = "na1";
                break;
            case "lan":             //Latin America North Server   la1
                serverName = "la1";
                break;
            case "las":
                serverName = "la2";   //Latin America South Server   la2
                break;
            case "eune":
                serverName = "eun1";  //Europe Nordic & East Server  eun1
                break;
            case "euw":
                serverName = "euw1";  //Europe West Server   euw1
                break;
            default:
                await interaction.reply("Please enter a valid region/server ");
                return;
        }

        try {

            const response = await axios.get(
                `https://${serverName}.api.riotgames.com/lol/status/v4/platform-data?api_key=${riotApiKey}`
            );

            let maintenance;
            //check if server is under maintenance
            if (response.data.maintenances.length === 0) {
                maintenance = "No maintenance -- Server is online";
            } else {
                maintenance = response.data.maintenances.toString();
            }

            //return server information
            const embed = new EmbedBuilder()
                .setTitle(`Server Status`)
                .setColor(0x00AE86)
                .addFields({ name: 'Server', value: response.data.name, inline: true })
                .addFields({ name: 'Abbreviation', value: response.data.id, inline: true })
                .addFields({ name: 'Maintenances', value: maintenance })
                .setFooter({ text: 'League of Legends', iconURL: 'https://cdnb.artstation.com/p/assets/images/images/021/422/255/large/t-j-geisen-lol-icon-rendered-v001.jpg?1571640551' })
                .addFields({ name: 'Incidents', value: `${response.data.incidents[0].updates[0].translations[0].content}` })

            await interaction.reply({ embeds: [embed] });

        }
        catch (error) {
            return interaction.reply({ content: " Server not found" });
        }


    }
};