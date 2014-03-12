var request = require("request");

var IEBrowsersLauncher = (function() {
  function IEBrowsersLauncher(name, id) {
    this.name = name;
    this.id = id;
    this.wasRunning = false;
    this.captured = false;
    this.host = "http://be-lstx-uitest.causeway.local/ie-browsers/iecontrol.php";
  }

  IEBrowsersLauncher.prototype.actionUrl = function(action, version, data) {
    return this.host + "?action=" + action + "&version=" + version.replace("IE", "") + "&data=" + data;
  }

  IEBrowsersLauncher.prototype.start = function(url) {
    url = "http://192.168.24.106:8080?id=" + this.id;
    var path = this.actionUrl('open', this.name, url);
    request(path, function (error, response, body) {
      if(error) throw error;
    });
  };

  IEBrowsersLauncher.prototype.kill = function(done) {
    var path = this.actionUrl('close', this.name, '');
    request(path, function (error, response, body) {
      if(error) throw error;
      return done();
    });
  };

  IEBrowsersLauncher.prototype.markCaptured = function() {
    return this.captured = true;
  };

  IEBrowsersLauncher.prototype.isCaptured = function() {
    return this.captured;
  };

  return IEBrowsersLauncher;
})();

module.exports = {
  'launcher:IE10': ['type', function(id) {
      return new IEBrowsersLauncher('IE10', id);
     }
  ]
};
