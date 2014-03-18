var request = require("request");

var IEBrowsersLauncher = (function() {
  function IEBrowsersLauncher(name, id, config) {
    this.checkConfig(config);
    this.name = name;
    this.id = id;
    this.wasRunning = false;
    this.captured = false;
    this.host = config.iebrowsers.host;
    this.callbackUrl = "http://" + config.hostname + ":" + config.port;
  }

  IEBrowsersLauncher.prototype.checkConfig = function(config) {
    if (typeof config.hostname === 'undefined' ||
        typeof config.port === 'undefined') {
      throw new Error('karma hostname and port are both required to be set in karma.conf.js');
    }

    if (typeof config.iebrowsers === 'undefined' ||
        typeof config.iebrowsers.host === 'undefined') {
      throw new Error('iebrowsers not correctly configured in karma.conf.js');
    }
  };

  IEBrowsersLauncher.prototype.start = function(url) {
    var path = this.actionUrl('running', this.name, '');
    var self = this;
    request(path, function (error, response, body) {
      if (error) throw error;
      if (response.statusCode === 200) {
        self.run();
      } else {
        throw new Error(self.name + " is not running.");
      }
    });
  };

  IEBrowsersLauncher.prototype.kill = function(done) {
    var path = this.actionUrl('close', this.name, '');
    request(path, function (error, response, body) {
      if (error) throw error;
      return done();
    });
  };

  IEBrowsersLauncher.prototype.actionUrl = function(action, version, data) {
    return this.host + '?action=' + action + '&version=' + version.replace('IE', '') + '&data=' + data;
  };

  IEBrowsersLauncher.prototype.run = function() {
    url = this.callbackUrl + '?id=' + this.id;
    var path = this.actionUrl('open', this.name, url);
    var self = this;
    request(path, function (error, response, body) {
      if (error) throw error;
      if (response.statusCode !== 200) {
        throw new Error(self.processResponse(response.body));
      }
    });
  };

  IEBrowsersLauncher.prototype.processResponse = function(body) {
    return body;
  };


  IEBrowsersLauncher.prototype.markCaptured = function() {
    return this.captured = true;
  };

  IEBrowsersLauncher.prototype.isCaptured = function() {
    return this.captured;
  };

  return IEBrowsersLauncher;
})();


function getLauncher(name) {
  return function(id, config) {
    return new IEBrowsersLauncher(name, id, config);
  }
}


var IEVersions = ['IE6', 'IE7' , 'IE8', 'IE9', 'IE10' ,'IE11'];

module.exports = {};
IEVersions.forEach(function(version) {
  module.exports['launcher:' + version] = ['type', getLauncher(version)];
});

