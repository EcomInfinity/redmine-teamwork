module.exports = function() {
  var _http = require('http'),
      _config = require('./config')();

  var _base64 = new Buffer(_config.teamwork.key + ":xxx").toString("base64"),
      _hostname = _config.teamwork.company + ".teamworkpm.net",
      _headers =  { "Authorization": "BASIC " + _base64 }

  return {
    'send': function(path, method, callback) {
      var options = {
        hostname: _hostname,
        path: path,
        method: method,
        headers: _headers
      }, 
      req = _http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          callback(chunk);
        });
      });

      req.on('error', function(e) {
        throw new Error(e.message);
      });
      req.end();
    }
  }
};