//command to get summoner profile from riot api

const { SlashCommandBuilder, channelLink } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require("axios");
const { riotApiKey } = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('summoner')
        .setDescription('display summoner profile')
        .addStringOption((option) => option.setName("name").setDescription("Enter summoner name").setRequired(true))
        .addStringOption((option) => option.setName("region").setDescription("Enter palyer's region").setRequired(true)),

    async execute(interaction) {

        const summonerName = interaction.options.getString("name").split(" ").join(" ");
        const region = interaction.options.getString("region").toLowerCase();

        let serverName = "";
        switch (region) {
            //North America Server  na1
            case "na":
                serverName = "na1";
                break;
            //	Latin America North Server   la1
            case "lan":
                serverName = "la1";
                break;
            //	Latin America South Server   la2
            case "las":
                serverName = "la2";
                break;
            //	Europe Nordic & East Server  eun1
            case "eune":
                serverName = "eun1";
                break;
            //	Europe West Server   euw1
            case "euw":
                serverName = "euw1";
                break;
            default:
                await interaction.reply("Please enter a valid region/server ");
                return;
       
        }

        try {
            //get summoner data by summoner name
            const response = await axios.get(`https://${serverName}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${riotApiKey}`);
            const summoner = response.data;
            //ger summoner profile icon   
            const summonerIcon = await `http://ddragon.leagueoflegends.com/cdn/9.19.1/img/profileicon/${summoner.profileIconId}.png`;


            const embed = new EmbedBuilder()
                .setTitle("Summoner Profile")
                .setColor("Red")
                .setThumbnail(summonerIcon)
                .addFields({ name: 'Name', value: summoner.name })
                .setFooter({ text: 'League of Legends', iconURL: 'https://cdnb.artstation.com/p/assets/images/images/021/422/255/large/t-j-geisen-lol-icon-rendered-v001.jpg?1571640551' })
                .addFields({ name: 'Summoner Level', value: (summoner.summonerLevel).toString() });

            //send embed message
            await interaction.reply({ embeds: [embed], ephemeral: true });

        } catch (error) { return interaction.reply({ content: "Summoner not found" }); }


    }
};









