const Datastore = require('nedb')
module.exports.db = new Datastore({
  filename: './database/database.JSON',
  autoload: true
  // corruptAlertThreshold: 1
})

// module.export.db = db
// module.exports.createMes = (req, res, next) => {
