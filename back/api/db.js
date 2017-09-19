
var r = require('rethinkdb');
global.connection = null;

exports.connect = function(config){
  return new Promise((resolve, reject) => {
    r.connect(config, function(err, conn) {
      if (err) {
        console.log('RethinkDB error!', err)
        reject(err);
      } else {
        global.connection = conn;
        resolve();
      }
    })
  })
}

exports.getR = function() {
  return r;
}
exports.getConnection = function() {
  return connection;
}
