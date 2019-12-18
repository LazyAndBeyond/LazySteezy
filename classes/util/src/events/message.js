const Discord = require('discord.js');
module.exports = (Bot, message) => {


  if(message.author.id == Bot.user.id) console.log(`${message.channel.type} | ${message.content || "Image"}`)

  if(message.author.bot) return;

  if(message.channel.type == "dm") return;

  console.log(message.content)

  const msg = message.content.toLowerCase();

  guildDatabase = Bot.table.guilds.fetch(message.guild.id);

  if(guildDatabase.config.prefix) var prefix = guildDatabase.config.prefix;
  if(!prefix) var prefix = Bot.config.prefix;

    if(!(msg.startsWith(prefix) || msg.startsWith(`<@${Bot.user.id}> `) || msg.startsWith(`<@!${Bot.user.id}> `))) { return; }

    if(msg.startsWith(prefix)) var args = message.content.slice(prefix.length).split(/\s+/);
    if(!args) var args = message.content.split(/\s+/).slice(1);

    const CommandName = args.shift().toLowerCase();

    const getCommand = (CommandName) => {return Bot.commands.get(CommandName) || Bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(CommandName))};

    var Command = getCommand(CommandName)

    if(!Command && !CommandName) return;

    if(!Command) return message.react("❌")

    console.log(`${message.guild.name} | ${message.author.tag} | ${message.content}`);

    //Checking for all options

    if(!Command.enabled) return;
    if(Command.broken) return message.reply("This command is temporarly out of order, try again later.");
    if(Command.bypass) if(!(Bot.config.bypass.includes(message.author.id))) return message.reply(`This is a **Bypass** only command!`);
    if(Command.args && args.length) if(!(args.length >= Command.args)) return message.reply(`\nThe proper usage would be: \`${Bot.config.prefix}${Command.name} ${Command.usage}\`.`);
    if(!Bot.config.bypass.includes(message.author.id)) if(Command.userPermission) if(!message.member.permissions.has(parseInt(Command.userPermission))) return message.reply(`You do not have enough permissions to run the \`${Command.name}\` command.`);
    if(Command.botPermission) if(!message.guild.me.permissions.has(parseInt(Command.botPermission))) return message.reply(`I do not have enough permissions to preform this action.`);
    if(Command.nsfw) if(!message.channel.nsfw) return message.reply(`Set this channel to nsfw before executing this command!`);
    if(Command.cooldownGuild) { var cooldownType = "guild" } else { var cooldownType = "user" };

    //Cooldowns

    if (!Bot.cooldowns) Bot.cooldowns = new Discord.Collection();
    if (!Bot.cooldowns.has(Command.name)) Bot.cooldowns.set(Command.name, new Discord.Collection());

      if(cooldownType == "guild") var id = message.guild.id;
      if(cooldownType == "user") var id = message.guild.id;

    const timestamps = Bot.cooldowns.get(Command.name);
    const cooldownAmount = (Command.cooldown || 5) * 1000;

    if(!timestamps.has(id)) {
      timestamps.set(id, Date.now());
      setTimeout(() => timestamps.delete(id), cooldownAmount);
    } else {

      //Time left message

      const expirtationTime = timestamps.get(id) + cooldownAmount;

      if(Date.now() < expirtationTime) {
        const timeLeft = (expirtationTime - Date.now()) / 1000;
        return message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the **${Command.name}** command.`);
      };

      timestamps.set(id, Date.now());
      setTimeout(() => timestamps.delete(id), cooldownAmount);

    };

    //Executing the command

    try {

      Command.execute(message, args);

      message.react("☑");

    } catch (error) {

      console.log(error);
      return message.react("⚠");

    }


};