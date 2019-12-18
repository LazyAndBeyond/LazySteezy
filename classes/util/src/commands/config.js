module.exports = {

	aliases:["conf", "setting"],
	args:0,
	botPermission:3072,
	broken:false,
	bypass:false,
	category:"commands",
	cooldown:5,
	cooldownGuild:false,
	description:"Sets a configuration for the guild",
	enabled:true,
	name:"config",
	nsfw:false,
	usage:"list",
	userPermission:8,
	execute(message, args) {

		check(message, args)

		

	}

};





function check(message, args) {

	if(args.length < 1) return message.reply(`You can use \`config list\` for the list of configs, Or go on the website http://flexiboat.ga/!`)

	if(args[0].toLowerCase() == "list") return message.reply(`Here are the avaliable configs you can change!\n \n ${message.client.configs.map(c => "\n" + c.name)}`)

	config = message.client.configs.get(args[0])
	
	if(!config) return message.reply("Couldn't find the config specified")

           arguments = args.join("").slice(args[0].length).split(" ")

	config.execute(message, arguments)


}