const Database = require("quick.db")

//This database handler only works for quick.db@6.3.2

class DB {
  fetch(a) {return this.data[a]}
  set(a, b) {return this.data[a] = b}
  delete(a) {return delete this.data[a]}
  fetchAll() {return this.data}
  fetchGlobal(a) {return Database.fetch(a)}
  setGlobal(a, b) {return Database.set(a, b)}
  deleteGlobal(a) {return Database.delete(a)}
  fetchAllGlobal() {return Database.fetchAll()}
  save() {
  var data = Database.fetch(this.name)
  console.log("Saving DATABASE...")
  Database.set(this.name, this.data)
  console.log("Saved")
  }
  constructor(name) {
  this.name = name
  var data = Database.fetch(name)
  if(!data) data = {}
  this.data = data
  setInterval(() => {
  var data = Database.fetch(name)
  if(data == this.data) return console.log('Database is the same as last save.')
  Database.set(this.name, this.data)
  }, 10000)
  }
}

module.exports = DB