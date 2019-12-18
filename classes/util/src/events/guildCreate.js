const Discord = require('discord.js');
module.exports = async (Bot, guild) => {

	const value = await Bot.table.guilds.fetch(guild.id);

	  if(!value) {

	    Bot.table.guilds.set(guild.id, {"id":guild.id, "config":{}});

	    console.log(`Creating a new guild database - ${guild.name}`);

	  } else {

	    console.log(`Loaded a guild database - ${guild.name}`);

	  }

	


}
