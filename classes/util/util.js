const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const Discord = require('discord.js');

class Util {

  constructor(Client) {
    this.templates = {}
    this.commands = {}
    this.client = new Discord.Client()
    this.getClient = async() => { return new Promise((resolve, reject) => { resolve(this.client) })}
  }

  authentication(checkpoint, app, dir, callback) {

    var authenticate = require(pathify("..#authentication.js"));
    return new authenticate(checkpoint, dir, app, callback);

  }

  async getEndpoint(endpoint, token) {

    var response = await fetch(endpoint, { method: 'GET', headers: { 'Authorization':`Bearer ${token}`, 'Content-Type':'application/x-www-form-urlencoded' } });
    return await response.json();

  }

  pathify(str) {
  var array = str.split("#");
  var string = "";
    array.forEach((item) => {
      string = path.join(string, item);
    });
  return string;
  }

  loadTemplateDirectory(dir) {
    fs.readdir(pathify(dir), (err, files) => {
      if(err) return console.log(err);
      files.forEach(async (file) => {
        this.templates[file.split(".")[0]] = await readFile(pathify(`${dir}#${file}`));
      })
    })
  }

  loadSRCDirectory(dir) {

    fs.readdir(dir, (err, srcs) => {

    if(err) return console.error(err);

      srcs.forEach(src => {

        this.client[src] = new Discord.Collection();

        fs.readdir(pathify(`${dir}#${src}`), (err, files) => {

          files.forEach(file => {

            if(!file.endsWith('.js')) return;

            var properties = require(pathify(`#${dir}#${src}#${file}`));

            this.client[src].set(properties.name, properties);

          });

        });

      });

    });


  }

  loadEventDirectory(dir) {

    fs.readdir(dir, (err, files) => {
      if(err) return console.error(err);
      files.forEach(file => {
        if(!file.endsWith('.js')) return;
	const event = require(pathify(`#${dir}#${file}`))
	let eventName = file.split(".")[0];
	this.client.on(eventName, event.bind(null, this.client));
      });
    });

  }

  getTemplate(name, parameters) {
    return new Promise(async (resolve, reject) => {
      var template = this.templates[name];
      if(!template) reject();
      if(parameters) {
        if(typeof parameters == "string") parameters = JSON.parse(parameters)
        Object.keys(parameters).forEach((key) => {
          template = template.replace(new RegExp(key, 'gi'), parameters[key])
        });
      }
      resolve(template);
    })
  }

  async readFile(dir) {
    return await fs.readFileSync(dir, "utf8");
  }

}

module.exports = Util;


//Functions for this utility file (not accessable by user unless defined in the class)

var utilities = new Util()

pathify = ((str) => {return utilities.pathify(str)});
readFile = (async (dir) => {return await utilities.readFile(dir)});


//utilities.loadTemplateDirectory(utilities.pathify(`${__dirname}#templates`))

