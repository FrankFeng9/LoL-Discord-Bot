//command to get palyer's champion mastery information from riot api

const { SlashCommandBuilder, channelLink } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require("axios");
const { riotApiKey } = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mastery')
		.setDescription('display champion mastery information')
        .addStringOption((option) =>option.setName("name").setDescription("Enter summoner name").setRequired(true))
        .addStringOption((option) =>option.setName("region").setDescription("Enter palyer's region").setRequired(true)),


    async execute(interaction) {

            const summonerName = interaction.options.getString("name").split(" ").join(" ");
            const region = interaction.options.getString("region").toLowerCase();
    
            let serverName = "";
            switch(region)
            {
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
                   
    try{

        //get summoner id by summoner name
        const { data } = await axios.get(
            `https://${serverName}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${riotApiKey}`
          );
    
        //get champion mastery
          const response = await axios.get(
            `https://${serverName}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${data.id}?api_key=${riotApiKey}`
          );

          //get the champion icon by champion id 
          const mastery = response.data[0];
          const championImgURL = `https://cdn.communitydragon.org/latest/champion/${mastery.championId}/square.png`;
          const championsResponse = await axios.get( `http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json`);
          //get champion info from champion.json
          const championsInfo = Object.values(championsResponse.data.data);
          const champion = championsInfo.find(
            champion => champion.key === String(mastery.championId)
          );


        //returen mastery information
        const embed = new EmbedBuilder()
        .setTitle("Champion Mastery")
        .setColor("Purple")
        .addFields({ name: 'Summoner', value: summonerName})
        .setImage(`${championImgURL}`)
        .addFields({ name: 'Top Champion', value: champion.name})
        .setFooter({ text: 'League of Legends', iconURL: 'https://cdnb.artstation.com/p/assets/images/images/021/422/255/large/t-j-geisen-lol-icon-rendered-v001.jpg?1571640551' })
        .addFields({ name: 'Level', value: (mastery.championLevel).toString(), inline: true})
        .addFields({ name: 'Points', value: (mastery.championPoints).toString(), inline: true});
       
        await interaction.reply({ embeds: [embed] });
          
        }catch(error)
        {return interaction.reply({ content: "champion mastery not found"});} 
                                
    }};