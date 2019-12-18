const express = require('express');
const EventEmitter = require('events');
const bodyParser = require('body-parser');
const path = require('path');
const btoa = require('btoa');
const UIDGenerator = require('uid-generator')
const EzDB = require(path.join(__dirname, 'EzDB.js'))
const util = require(path.join(__dirname, 'util', 'util.js'))

class Handler extends EventEmitter {

  constructor(config) {

    super();

    this.app = express();
    this.app.listen(config.port, () => { console.log(`Web-Server Ready On Port: ${config.port}.`) });
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.express = express

    this.table = {
      "tokens":new EzDB('tokens'),
      "ids":new EzDB('ids'),
      "cred":btoa(`${config.appid}:${config.appsecret}`),
      "uidGenerator":new UIDGenerator(config.tokenbits)
    };

    this.util = new util()
    this.checkpoint = require(path.join(__dirname, "checkpoint"));
    this.redirect = require(path.join(__dirname, "redirect"));
    this.getServers = require(path.join(__dirname, "getServers"))

    this.EzDB = EzDB;

  }
}

module.exports = Handler
