<!-- PROJECT SHIELDS -->

<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<p  align="center">

A discord bot that utilizes the Riot Games API to retrieve information about League of Legends players and servers. It responds to slash commands and presents the data in embed messages.


### Key Features

The bot currently supports the following slash commands:

- /summoner: Retrieve summoner profile information, including summoner name, level, and profile icon.
- /rank: Retrieve ranked game information, including tier, rank, league points, win/loss, and win rate.
- /mastery: Retrieve mastery system information, including top champion, champion level, and points.
- /serverstatus: Retrieve server status
- /freechampion: Retrieve information about the free champion rotation

Please note that the bot can only retrieve information for servers located in North America (NA), Latin America North (LAN), Latin America South (LAS), Europe Nordic & East (EUNE), and Europe West (EUW).



#### Built With 
 [![node.js][node.js]][node.js.url] [![Discord][discord]][discord.url] [![riot][riot]][riot.url]

<br>

<img src="discord%20bot/screenshots/summoner.PNG" width=300 height=330 title="summoner">  <img src="discord%20bot/screenshots/rank.PNG" height=300 width=330 title="ranked game"> <img src="discord%20bot/screenshots/server.PNG" height=330 width=330 title="server"> 
 <img src="discord%20bot/screenshots/freetoplay.PNG" width= 300 height=495 title="free champion" > <img src="discord%20bot/screenshots/freetoplay2.PNG" width= 300 height=495 title="free champion"> 

### Installation and Setup



- Clone or download the repository to your local machine.
- Navigate to the project directory and run npm install to install the required dependencies.
- In the Discord Developer Portal, create a new application and bot account.
- Copy  and replace token in the config.js file.
- Copy and replace client ID and guild ID in the config.js file.
- Run 'node deploy-commands' to register the slash commands.
- Run 'node index.js' to start the bot.















<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge

[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge

[forks-url]: https://github.com/github_username/repo_name/network/members

[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge

[stars-url]: https://github.com/github_username/repo_name/stargazers

[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge

[issues-url]: https://github.com/github_username/repo_name/issues

[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge

[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/linkedin_username

[product-screenshot]: images/screenshot.png

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white

[Next-url]: https://nextjs.org/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB

[React-url]: https://reactjs.org/

[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D

[Vue-url]: https://vuejs.org/

[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white

[Angular-url]: https://angular.io/

[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00

[Svelte-url]: https://svelte.dev/

[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white

[Laravel-url]: https://laravel.com

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white

[Bootstrap-url]: https://getbootstrap.com

[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white

[JQuery-url]: https://jquery.com

[Stripe.com]:https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white
[Stripe-url]: https://stripe.com/


[MySQL.com]:https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white
[MySQL.url]:https://www.mysql.com/

[html.com]:https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[html.url]:https://html.com/

[css.com]:https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[css.url]:https://html.com/

[node.js]:https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[node.js.url]:https://nodejs.org/en/

[discord]:https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white
[discord.url]:https://discord.com/developers/docs/intro

[riot]:https://img.shields.io/badge/Riot_Games-D32936?style=for-the-badge&logo=riot-games&logoColor=white
[riot.url]:https://developer.riotgames.com/

