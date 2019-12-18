const path = require('path');
const WebServer = require(path.join(__dirname, "classes", "webserverclient.js"))
const DBotServer = require(path.join(__dirname, "classes", "discordbotclient.js"))
const WebCFG = require(path.join(__dirname, "WebConfig.json"))
const handler = new WebServer(WebCFG);
const botConfig = require(handler.util.pathify(`${__dirname}#config.json`));
const bothandler = new DBotServer(botConfig);
const checkpoint = new handler.checkpoint(handler.app, handler.table, handler.util, WebCFG);


//Load Assets For The Site
handler.util.loadTemplateDirectory(handler.util.pathify(`${__dirname}#classes#util#templates`));
handler.app.use(handler.express.static(handler.util.pathify(`${__dirname}#resources`)));

//Load Commands For The Bot

bothandler.util.loadSRCDirectory(handler.util.pathify(`${__dirname}#classes#util#src`));
bothandler.util.loadEventDirectory(handler.util.pathify(`${__dirname}#classes#util#src#events`));

//Redirects
new handler.redirect(handler.app, "/login", WebCFG.loginlink)
new handler.redirect(handler.app, "/invite-bot", WebCFG.botinvite)
new handler.redirect(handler.app, "/invite-server", WebCFG.serverinvite)

process.on('uncaughtException', (err, origin) => { 

console.log(err)
console.log(origin)

})









//Main

handler.util.authentication(checkpoint, handler.app, "/", async (req, res) => {

  var auth = await checkpoint.authenticate(req.body.token)

  if(auth == "noauth") return res.send(await handler.util.getTemplate('login', {}))

  res.send(await handler.util.getTemplate('loggedin', {}))

})

checkpoint.discord('/callback', 'loggedin')

     