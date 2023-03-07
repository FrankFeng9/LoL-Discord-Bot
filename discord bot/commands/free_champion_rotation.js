//command to get free to play champion rotation from riot api
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require("axios");
const { riotApiKey } = require("../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('freechampion')
        .setDescription('display free to play champion rotation')
        .addStringOption((option) => option.setName("region").setDescription("Enter palyer's region").setRequired(true)),

    async execute(interaction) {

        const region = interaction.options.getString("region").toLowerCase();

        let serverName = "";
        //get the server name
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

            const response = await axios.get(
                `https://${serverName}.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${riotApiKey}`
            );
            //get the free to play champion id
            const freeWeekIds = response.data.freeChampionIds;
            //get the free champion info
            const championsResponse = await axios.get(
                `http://ddragon.leagueoflegends.com/cdn/12.6.1/data/en_US/champion.json`
            );
            const championsInfo = Object.values(championsResponse.data.data);

            //get the champion info by champion id
            const getChampionInfo = id => {
                return championsInfo.find(champion => champion.key === String(id));
            };

            let embeds = [];
            //get the champion info by id and add it to the embeds list
            for (let i = 0; i < 10; i++) {
                const champion = getChampionInfo(freeWeekIds[i]);
                const championImgURL = `https://cdn.communitydragon.org/latest/champion/${freeWeekIds[i]}/square.png`;

                embeds[i] = new EmbedBuilder()
                    .setTitle(champion.name)
                    .setColor("Orange")
                    .setThumbnail(championImgURL)
                    .addFields({ name: 'title', value: champion.title })
                    .addFields({ name: 'role', value: champion.tags.join(", ") })
                    .addFields({
                        name: 'ratings', value: `Attack: ${champion.info.attack} ${'\xa0'} Defense: ${champion.info.defense} 
                   Magic: ${champion.info.magic} ${'\xa0'.repeat(2)} Difficulty: ${champion.info.difficulty}`
                    })
                    .setFooter({ text: 'League of Legends', iconURL: 'https://cdnb.artstation.com/p/assets/images/images/021/422/255/large/t-j-geisen-lol-icon-rendered-v001.jpg?1571640551' });
            }

            //send the champion embeds
            await interaction.reply({ content: "free champion this week \n\n", embeds: embeds });

        } catch (error) { return interaction.reply({ content: "free champion rotation not found" }); }


    }
};
