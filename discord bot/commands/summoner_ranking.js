//command to get palyer's champion mastery information from riot api

const { SlashCommandBuilder, channelLink } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require("axios");
const { riotApiKey } = require("../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('display ranked game information')
    .addStringOption((option) => option.setName("name").setDescription("Enter summoner name").setRequired(true))
    .addStringOption((option) => option.setName("queue").setDescription("Enter the Queue type(Solo or Flex)").setRequired(true))
    .addStringOption((option) => option.setName("region").setDescription("Enter summoner's region").setRequired(true)),



  async execute(interaction) {

    const summonerName = interaction.options.getString("name").split(" ").join(" ");
    const region = interaction.options.getString("region").toLowerCase();
    const queue = interaction.options.getString("queue").toLowerCase();


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

      //get summoner data by summoner name
      const { data } = await axios.get(
        `https://${serverName}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${riotApiKey}`
      );

      //get summoner ranked game information by summoner id
      const response = await axios.get(
        `https://${serverName}.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}?api_key=${riotApiKey}`
      );
      // queue type data
      let rankSolo;
      let rankFlex;

      rankSolo = response.data[0];
      rankFlex = response.data[1];

    
      const thumbnail = "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_LeagueofLegends_RiotGames_S2_1200x1600-7fd64f0f7b674900bdd172967865d545";
      const rankIcon = "https://leaguefeed.net/wp-content/uploads/2020/10/League-of-legends-Ranks.jpg";

      //check the queue type
      if (queue == "solo") {

        const embed = new EmbedBuilder()
          .setTitle(`${summonerName} ranked Solo/Duo`)
          .setColor("Orange")
          .setThumbnail(`${thumbnail}`)
          .setImage(`${rankIcon}`)
          .addFields(
            { name: 'Tier', value: rankSolo.tier, inline: true },
            { name: 'Rank', value: rankSolo.rank, inline: true },
            { name: 'League Points', value: `${rankSolo.leaguePoints}` },
            { name: 'Win/Loss', value: `${rankSolo.wins}/${rankSolo.losses}`, inline: true },
            { name: 'Win rate', value: `${(rankSolo.wins / (rankSolo.wins + rankSolo.losses) * 100).toFixed(2)}%`, inline: true }
          );
        await interaction.reply({ embeds: [embed] });
      }
      else if (queue == "flex") {
        const embed = new EmbedBuilder()
          .setTitle(`${summonerName} ranked Flex 5v5`)
          .setColor("Grey")
          .setThumbnail(`${thumbnail}`)
          .setImage(`${rankIcon}`)
          .addFields({ name: 'Tier', value: rankFlex.tier, inline: true },
                     { name: 'Rank', value: rankFlex.rank, inline: true },
                     { name: 'League Points', value: `${rankFlex.leaguePoints}` },
                     { name: 'Win/Loss', value: `${rankFlex.wins}/${rankFlex.losses}`, inline: true },
                     { name: 'Win Rate', value: `${(rankFlex.wins / (rankFlex.wins + rankFlex.losses) * 100).toFixed(2)}%`, inline: true }
          );
        await interaction.reply({ embeds: [embed] });

      }
      else {
        await interaction.reply("Please enter the correct queue type");
      }
    }
    catch (error) {
      return interaction.reply({ content: "ranked game information not found" });
    }

  }
};