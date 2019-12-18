const Discord = require('discord.js');
module.exports = async (Bot) => {

	console.log(`Ready on ${Bot.user.tag} with ${Bot.guilds.size} servers and ${Bot.users.size} Users! :D`);


	games = Bot.config.presence.games;

	setInterval(function() {

		presence = {

			"status":Bot.config.presence.status,
			"game":games[Math.floor(Math.random() * games.length) + 1]

		};

		Bot.user.setPresence(presence);

	}, 30000);




  Bot.guilds.map(g => {

    var value = Bot.table.guilds.fetch(g.id)

    if(!value) {

      Bot.table.guilds.set(g.id, {"id":g.id, "config":{}});

      console.log(`Creating a new guild database - ${g.name}`);

    } else {

      console.log(`Loaded a guild database - ${g.name}`);

    }

  })




}
