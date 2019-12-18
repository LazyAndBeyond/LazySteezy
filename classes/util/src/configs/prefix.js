module.exports = {
	name:'prefix',
	cname:'prefix',
	async execute(message, args) {
		client = message.client;
		config = client.config

		if(message.content.toLowerCase().startsWith(message.prefix)) var args = message.content.slice(prefix.length).split(/\s+/).slice(1);
		if(!args) var args = message.content.split(/\s+/).slice(1);

		console.log(args)

		if(args.join(" ") == "") args = [ config.prefix ]

		message.channel.send(`Changing the bot prefix to "${args.join(" ")}"`)

		guild = client.table.guilds.fetch(message.guild.id)

		guild.config.prefix = args.join(" ")

		client.table.guilds.set(message.guild.id, guild)

	}
}