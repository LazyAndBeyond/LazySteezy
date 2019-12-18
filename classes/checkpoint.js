const path = require('path');
const EventEmitter = require('events');
const fetch = require('node-fetch');

class Checkpoint extends EventEmitter {

  constructor(app, table, util, config) {
    super()
    this.app = app 
    this.table = table
    this.util = util
    this.config = config;
  };

  async auth(req, res, dir) { 


    return new Promise(async (resolve, reject) => {

      var jvsc = await this.util.getTemplate('loadlocal', {"callback":`${dir}`, "object":"{'value':window.localStorage.getItem('token'), 'name':'token'}" });
      var js = `<body><p>Loading. This might take awhile</p></body>\n\n${jvsc}\n\n`;

      res.send(js);

    })

  }

  async discord(path, cb) {

    this.app.get(path, async (req, res) => {

      var code = req._parsedOriginalUrl.search.split("?code=").join("")
      var cred = this.table.cred;
      var uidgen = this.table.uidGenerator;
      var URL = `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}${this.config.uri}&scope=guilds%20identify`;

      var resp = await fetch(URL, { method: 'POST', headers: { 'Authorization':`Basic ${cred}`, 'Content-Type':'application/x-www-form-urlencoded' } });
      var json1 = await resp.json();
      var json2 = await this.util.getEndpoint('https://discordapp.com/api/v6/users/@me', json1.access_token);
      var json3 = await this.util.getEndpoint('https://discordapp.com/api/v6/users/@me/guilds', json1.access_token);

      var json = json2;
      json.extend = json3;

      var token = await getToken(this.table)

      this.table.tokens.set(json2.id, token);
      this.table.ids.set(token, json)

      var js = await this.util.getTemplate('savelocal', {"key":"'token'", "value":`'${token}'`})

      res.send(await this.util.getTemplate(cb, {"jsplchldr":js}))

      
    
    })

  }

  authenticate(token, type, value) {

    return new Promise(async (resolve, reject) => {    
    var user = this.table.ids.fetch(token);

      if(type == "checkguild") {
        await user.extend.forEach(async (guild) => {
          if(!!(guild.permissions & 0x8) == true) {
            if(guild.id == value) {
              resolve(user);
            }
          }
        })
        resolve("noauth")      
      }

      if(!token || !user || !user.id) resolve("noauth");
      resolve(user);
    })
  }


};

async function getToken(table) {

  return new Promise(async(resolve, reject) => {

    var token = await table.uidGenerator.generate()

    var content = table.ids.fetch(token)

    if(content) return await getToken(table)

    resolve(token)

  })

}


module.exports = Checkpoint;