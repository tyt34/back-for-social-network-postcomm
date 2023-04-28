const Datastore = require('nedb')
module.exports.db = new Datastore({
  filename: './database/database.JSON',
  autoload: true
})
