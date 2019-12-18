class Redirect {
  constructor(app, name, link) {
    this.app = app
    this.name = name
    this.link = link
    this.app.get(name, (req, res) => {  
	res.redirect(link);
    });
  };
};

module.exports = Redirect;