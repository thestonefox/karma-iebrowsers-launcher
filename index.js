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
      if (body === "true") {
        self.run();
      } else {
        throw new Error(self.name + ' is not running');
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
      if (body === 'Open not available') {
        throw new Error(self.name + ' is not available');
      }
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
  'launcher:IE6': ['type', function(id, config) {
      return new IEBrowsersLauncher('IE6', id, config);
     }
  ],
  'launcher:IE7': ['type', function(id, config) {
      return new IEBrowsersLauncher('IE7', id, config);
     }
  ],
  'launcher:IE8': ['type', function(id, config) {
      return new IEBrowsersLauncher('IE8', id, config);
     }
  ],
  'launcher:IE9': ['type', function(id, config) {
      return new IEBrowsersLauncher('IE9', id, config);
     }
  ],
  'launcher:IE10': ['type', function(id, config) {
      return new IEBrowsersLauncher('IE10', id, config);
     }
  ],
  'launcher:IE11': ['type', function(id, config) {
      return new IEBrowsersLauncher('IE11', id, config);
     }
  ],
};
