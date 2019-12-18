class getServers {
  constructor(util) {
    this.util = util
  };

  fetch(auth) {

    var buttons = [];

    auth.extend.forEach(async (guild) => {

      var guildid = guild.id
      var guildname = guild.name

      if(!!(guild.permissions & 0x8) == true) {

	var btnhtml = await this.util.getTemplate('activebutton', {"callback":`/guild/${guildid}/main`, "name":guildname})     
	buttons.push(btnhtml);   

      } else {

	var btnhtml = await this.util.getTemplate('disabledbutton', {"name":guildname})
	buttons.push(btnhtml);

      }

    })

  return buttons


  }


};

module.exports = getServers;