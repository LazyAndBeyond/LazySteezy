module.exports = {

	aliases:[],
	args:0,
	botPermission:3072,
	broken:false,
	bypass:false,
	category:"commands",
	cooldown:5,
	cooldownGuild:false,
	description:"Provides the bots latency.",
	enabled:true,
	name:"ping",
	nsfw:false,
	usage:"",
	userPermission:0,
	execute(message, args) {

		var then = Date.now();

		message.channel.send("Pong! 0ms (Bot ping), 0ms (Websocket ping)").then(msg => {

			msg.edit(`Pong! ${Math.round(Date.now() - then)}ms (Bot ping), ${message.client.ping}ms (Websocket ping)`);

		});

	}

};
