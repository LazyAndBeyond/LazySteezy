class Authentication {
  constructor(checkpoint, name, app, callback) {

    this.checkpoint = checkpoint;
    this.app = app;
    this.name = name;
    this.callback = callback;
    this.table = checkpoint.table

    this.app.get(this.name, (req, res) => {  
      this.checkpoint.auth(req, res, this.name);
    });

    this.app.post(this.name, (req, res) => {
      callback(req, res)
    })

  };
};

module.exports = Authentication;