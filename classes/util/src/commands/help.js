const Discord = require('discord.js')
module.exports = {
   	aliases:["cmds", "commands", "help"],
	args:0,
	botPermission:19456,
	broken:false,
	bypass:false,
	category:"commands",
	cooldown:5,
	cooldownGuild:false,
	description:"The help menu for the bot.",
	enabled:true,
	name:"help",
	nsfw:false,
	usage:"<command/category>",
	userPermission:0,
	execute(message, args) {

 console.log(args)

        const Bot = message.client;
        const data = [];

        categories = []

        if(args.length) {args = [ `${args.join(" ")}` ]}

        Bot.commands.map(c => {
            if (!c.category) return
            if (!categories.includes(c.category)) categories.push(c.category)
        })


        if (!args.length) {
            send(message, categories, "categories")
        } else {
            if (!(Bot.commands.has(args[0].toLowerCase()) || categories.includes(args[0].toLowerCase()))) {
                return message.reply('That\'s not a valid command/category!')
            }

            if (Bot.commands.has(args[0].toLowerCase())) {

                const object = Bot.commands.get(args[0].toLowerCase())

                send(message, object, "command")

            }

            if (categories.includes(args[0].toLowerCase())) {

          send(message, args[0].toLowerCase(), "category")

        }




    }
  }
}

function send(message, data, type) {
  embed = new Discord.RichEmbed()
  embed.setColor("RANDOM")
  embed.setFooter(`${message.client.user.tag} Made By ${message.client.config.creators}`)


  if(type == "categories") {
    embed.addField("Categories: ", `**${data.join("\n").toUpperCase()}**`)
  }

  if(type == "command") {
    info = []
    if(data.usage) {
      usage = `${message.client.config.prefix}${data.name} ${data.usage}`
    } else {
      usage = `${message.client.config.prefix}${data.name}`
    }
    info.push(`**Usage:** ${usage}`)
    info.push(`**Description:** ${data.description || "None specified."}`)
    info.push(`**Permissions:** ${data.permissions || "0"}`)
    embed.addField(`Information for ${data.name}: `, `${info.join("\n")}`)
  }

  if(type == "category") {
    info = []

    i = 0

    message.client.commands.map(c => {
      if(c.category.toLowerCase() == data.toLowerCase()) {
        i++
        info.push(`${i}. ${c.name}`)
      }
    })

    embed.addField(`Commands in ${data}: `, `${info.join("\n")}`)
  }


  message.channel.send({embed})
}
