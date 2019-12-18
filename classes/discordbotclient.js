const path = require('path')
const Discord = require('discord.js')
const EventEmitter = require('events')
const util = require(path.join(__dirname, 'util', 'util.js'))
const EzDB = require(path.join(__dirname, 'EzDB.js'))

class Handler extends EventEmitter {

  constructor(config) {

    super();

    this.util = new util()

    this.util.getClient().then(client => {

    this.client = client;
    this.client.login(config.token)

    this.cooldowns = new Discord.Collection()
    this.commands = new Discord.Collection()

    this.table = {
      "guilds":new EzDB('guilds')
    };

    this.EzDB = EzDB;

    this.client.config = config;
    this.config = config;
    this.client.table = this.table

    })
  }
}

module.exports = Handler
